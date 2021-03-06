import express, { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
import joi from "joi";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose from "mongoose";

import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";
import Users from "../schemas/user";
import MyBeers from "../schemas/mybeer";

import { IUser } from "../interfaces/user";

import { mailSender } from "../email/mail";

import { env } from "../env";
import { access } from "fs";
import { IMailInfo } from "../interfaces/mail";

const joiSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  nickname: joi.string().min(1).max(8).required(),
  password: joi.string().min(4).pattern(new RegExp("^[a-zA-Z0-9]{4,30}$")),
  confirmPassword: joi.ref("password"),
});
// id 포함 안하게

const emailJoiSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

const nicknameJoiSchema = joi.object({
  nickname: joi.string().min(1).max(8).required(),
});

const emailNicknameJoiSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  nickname: joi.string().min(1).max(8).required(),
});

type ImageArray = {
  [index: string]: string;
  Lager: string;
  Pilsner: string;
  Ale: string;
  IPA: string;
  Weizen: string;
  Dunkel: string;
  Stout: string;
  Bock: string;
  Etc: string;
};

const imagesArray: ImageArray = {
  Lager:
    "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Lager.png",
  Pilsner:
    "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Pilsner.png",
  Ale: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Ale.png",
  IPA: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/IPA.png",
  Weizen:
    "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Weizen.png",
  Dunkel:
    "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Dunkel.png",
  Stout:
    "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Stout.png",
  Bock: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Bock.png",
  Etc: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Etc.png",
};

const test_emails = [
  "mybeertest@test.com",
  "anothermybeertest@test.com",
  "recommendationtest@test.com",
  "usertest@test.com",
];
const test_nicknames = [
  "mybeertest",
  "anothermybeertest22",
  "slackwebkittest",
  "test",
];

// 중복 이메일 확인
const existEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "fail", error: "no input" });

    return;
  }

  if (test_emails.includes(email)) {
    res
      .status(205)
      .json({ message: "fail", error: "email for test. don't use this" });

    return;
  }

  try {
    const existUser = await Users.findOne({ email }).lean();

    if (existUser) {
      res.status(205).json({ message: "fail", error: "exist email" });

      return;
    }

    const { value, error } = emailJoiSchema.validate({ email }); // joi validation 으로 이메일 형식에 맞는지 확인

    if (error) {
      res
        .status(205)
        .json({
          message: "fail",
          error: "wrong email",
          error_detail: error.details[0].message,
        });

      return;
    }

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 중복 닉네임 확인
const existNickname = async (req: Request, res: Response) => {
  const { nickname } = req.body;

  if (!nickname) {
    res.status(400).json({ message: "fail", error: "no input" });

    return;
  }

  if (test_nicknames.includes(nickname)) {
    res
      .status(205)
      .json({ message: "fail", error: "nickname for test. don't use this" });

    return;
  }

  try {
    const existUser = await Users.findOne({ nickname }).lean(); // joi validation 으로 닉네임 형식에 맞는지 확인

    if (existUser) {
      res.status(205).json({ message: "fail", error: "exist nickname" });

      return;
    }

    const { value, error } = nicknameJoiSchema.validate({ nickname });

    if (error) {
      res
        .status(205)
        .json({
          message: "fail",
          error: "wrong nickname",
          error_detail: error.details[0].message,
        });

      return;
    }

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 회원가입
const register = async (req: Request, res: Response) => {
  const { email, nickname, password, confirmPassword } = req.body;

  try {
    const existUser1 = await Users.findOne({ nickname }).lean();
    const existUser2 = await Users.findOne({ email }).lean();

    if (existUser1 || existUser2) {
      res.status(409).json({ message: "fail", error: "exist user" });

      return;
    }
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }

  const { value, error } = joiSchema.validate({
    email,
    nickname,
    password,
    confirmPassword,
  }); // joi validation 으로 이메일, 닉네임, 비밀번호 형식에 맞는지 확인

  if (!error) {
    // 비밀번호 암호화
    const crypted_password = crypto
      .createHmac("sha256", password)
      .update(env.pass_secret)
      .digest("hex");

    await Users.create({ email, nickname, password: crypted_password });

    const mailInfo: IMailInfo = {
      toEmail: email,
      nickname: nickname,
      type: "welcome",
    };

    // 성공 메일 보내기
    mailSender(mailInfo);

    res.status(201).json({ message: "success" });
  } else {
    res.status(400).json({ message: "fail", error: error.details[0].message });
  }
};

// 로그인
const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "fail", error: "wrong input" });

    return;
  }

  // 들어온 비밀번호 암호화
  const crypted_password = crypto
    .createHmac("sha256", password)
    .update(env.pass_secret)
    .digest("hex");

  try {
    const user = await Users.findOne({ email }).lean();

    if (!user) {
      res.status(401).json({ message: "fail", error: "no exist user" });

      return;
    }

    if (user.password != crypted_password) {
      res.status(205).json({ message: "fail", error: "wrong password" });

      return;
    }

    // refresh token 발급 (2주)
    const refreshToken = jwt.sign({}, env.jwt_secret, {
      expiresIn: "14d",
      issuer: "node-avengers",
    });

    // access token 발급 (1시간)
    const accessToken = jwt.sign({ userId: user._id }, env.jwt_secret, {
      expiresIn: "1h",
      issuer: "node-avengers",
    });

    await Users.findOneAndUpdate(
      { _id: user._id },
      { $set: { refreshToken } }
    ).lean();

    // refresh token 반으로 쪼개서 보내주기
    const refreshToken1 = refreshToken.split(".")[0];
    const refreshToken2 =
      "." + refreshToken.split(".")[1] + "." + refreshToken.split(".")[2];

    // access token 반으로 쪼개서 보내주기
    const accessToken1 = accessToken.split(".")[0];
    const accessToken2 =
      "." + accessToken.split(".")[1] + "." + accessToken.split(".")[2];

    res.json({
      message: "success",
      dlfwh: refreshToken1,
      ghkxld: refreshToken2,
      dhtnf: accessToken1,
      chlrh: accessToken2,
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({ message: "fail", error });

    return;
  }
};

// 로그아웃
const logout = async (req: Request, res: Response) => {
  const userId = res.locals.user._id; // auth-middleware에서 가져온 회원 정보

  try {
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { refreshToken: "" }
    ).lean();

    if (!user) {
      res.status(406).json({ message: "fail", error: "no exist user" });

      return;
    }

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 회원탈퇴
const signout = async (req: Request, res: Response) => {
  const userId = res.locals.user._id; // auth-middleware에서 가져온 회원 정보

  try {
    const user = await Users.findOne({ _id: userId }).lean();

    if (!user) {
      res.status(406).json({ message: "fail", error: "no exist user" });

      return;
    }

    // 해당 유저가 쓴 맥주도감들 삭제
    await MyBeers.deleteMany({ userId: user._id });

    // 해달 유저가 한 좋아요들 삭제
    const liked_beers = await Beers.find({
      like_array: mongoose.Types.ObjectId(userId),
    }).lean();

    for (let i = 0; i < liked_beers.length; i++) {
      let beerId = liked_beers[i]._id;

      await Beers.findOneAndUpdate(
        { _id: beerId },
        { $pull: { like_array: userId } }
      );
    }

    // 회원 탈퇴
    await Users.deleteOne({ _id: userId });

    res.status(204).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 로그인 되어있는 유저인지 확인
const checkAuth = async (req: Request, res: Response) => {
  if (!res.locals.user) {
    res.status(403).json({ message: "fail", error: "unidentified user" });

    return;
  }

  const userId = res.locals.user._id;
  const nickname = res.locals.user.nickname;
  const preference = String(res.locals.user.preference);
  const image = res.locals.user.image;
  const email = res.locals.user.email;
  let description = res.locals.user.description;

  if (!description) {
    description = "";
  }

  res.json({
    message: "success",
    userId,
    nickname,
    preference,
    image,
    email,
    description,
  });
};

// 구글 로그인 Callback
const googleLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "google",
    {
      successRedirect: "/",
      failureRedirect: "/login",
    },
    (err, profile, info) => {
      if (err) return next(err);

      const tokens = String(info.message);
      const refreshToken = tokens.split("***")[0];
      const accessToken = tokens.split("***")[1];
      const first = tokens.split("***")[2];

      // refresh token 반으로 쪼개서 보내주기
      const refreshToken1 = refreshToken.split(".")[0];
      const refreshToken2 =
        "." + refreshToken.split(".")[1] + "." + refreshToken.split(".")[2];

      // access token 반으로 쪼개서 보내주기
      const accessToken1 = accessToken.split(".")[0];
      const accessToken2 =
        "." + accessToken.split(".")[1] + "." + accessToken.split(".")[2];

      res.redirect(
        `https://ohsool.com/dlfwh=${refreshToken1}&ghkxld=${refreshToken2}&dhtnf=${accessToken1}&chlrh=${accessToken2}&first=${first}`
      );
    }
  )(req, res, next);
};

const kakaoLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "kakao",
    {
      failureRedirect: "/",
    },
    (err, profile, info) => {
      if (err) return next(err);

      const { refreshToken, accessToken, first } = info;

      // refresh token 반으로 쪼개서 보내주기
      const refreshToken1 = refreshToken.split(".")[0];
      const refreshToken2 =
        "." + refreshToken.split(".")[1] + "." + refreshToken.split(".")[2];

      // access token 반으로 쪼개서 보내주기
      const accessToken1 = accessToken.split(".")[0];
      const accessToken2 =
        "." + accessToken.split(".")[1] + "." + accessToken.split(".")[2];

      res.redirect(
        `https://ohsool.com/dlfwh=${refreshToken1}&ghkxld=${refreshToken2}&dhtnf=${accessToken1}&chlrh=${accessToken2}&first=${first}`
      );
    }
  )(req, res, next);
};

// 현재 유저 preference에 테스트 결과 값 반영 & 클라이언트에게 결과에 대한 정보 돌려주기
/*
  테스트 결과 추출 단계
  1. 맥주 카테고리 추출
  2. 카테고리 내에서 국가 선택
  3. 국가별 높은 도수/ 낮은 도수/ 랜덤 선택 
*/
const postTest = async (req: Request, res: Response) => {
  try {
    const { userId, result } = req.body;
    let isExistUser = false; // 로그인 유저와 비로그인 유저를 구분짓는 값

    if (!result) {
      res
        .status(400)
        .json({ message: "fail", error: "test result doesn't exist" });

      return;
    }

    /* 1. 카테고리에 대한 정보 추출*/
    const category = await BeerCategories.findOne({ name: result[0] }).lean();
    // category 에 대한 정보가 없다면 함수 종료
    if (!category) {
      res.status(406).json({ message: "fail", error: "no exist category" });

      return;
    }

    const preferenceCount = category.preferenceCount!;

    /* 2. 카테고리 내에서 해당되는 국가 & 도수 선택 */
    let distantOption = result[1] === "distant" ? true : false;
    let sortOption = result[2] === "many" ? -1 : 1;
    let beers = await Beers.find({
      $and: [{ categoryId: category._id }, { isDistant: distantOption }],
    })
      .sort([["degree", sortOption]])
      .lean();

    // 만약 위 조건에 맞는 맥주가 2개보다 적다면 '국가' 반영없이 도수 기준으로 리스트를 출력한다.
    if (beers.length < 2) {
      beers = await Beers.find({ categoryId: category._id })
        .sort([["degree", sortOption]])
        .lean();
    }

    /* 3. 추천 맥주 추출 */
    const recommendations = beers.slice(0, 2);

    /* 4. 로그인 유저일 시 preference 변경 */
    const user = await Users.findOne({ _id: userId }).lean();
    const preference = user!.preference;
    let image = imagesArray[result[0]];

    if (user) {
      await Users.updateOne(
        { _id: userId },
        { $set: { preference: result[0], image } }
      );

      if (preference != "Unknown") {
        // 유저의 preference가 있었다면 그 preference의 count -= 1
        await BeerCategories.updateOne(
          { name: preference },
          { $inc: { preferenceCount: -1 } }
        );
      }
      // test 결과 나온 category에 count += 1
      const beerCategory = await BeerCategories.updateOne(
        { name: result[0] },
        { $inc: { preferenceCount: 1 } }
      );

      isExistUser = true;
    }

    // 몇 명의 유저가 이 타입인지 알려주기
    const preferenceCounts = await BeerCategories.find({}).select(
      "preferenceCount -_id"
    );
    let sum = 0;

    for (let i = 0; i < preferenceCounts.length; i++) {
      const count = preferenceCounts[i]!.preferenceCount!;
      sum += count;
    }

    const percentage = (+preferenceCount / sum) * 100;

    res
      .status(201)
      .json({
        message: "success",
        isExistUser,
        category,
        recommendations,
        percentage,
      });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 첫 소셜 로그인시에만 닉네임, 이메일이 중복되거나 없을 수 있기 때문에 다시 받기
const socialUserSet = async (req: Request, res: Response) => {
  const { email, nickname } = req.body;
  const userId = res.locals.user._id;

  if (test_emails.includes(email)) {
    res
      .status(205)
      .json({ message: "fail", error: "email for test. don't use this" });

    return;
  }

  if (test_nicknames.includes(nickname)) {
    res
      .status(205)
      .json({ message: "fail", error: "nickname for test. don't use this" });

    return;
  }

  try {
    const existUser1 = await Users.findOne({ nickname }).lean();
    const existUser2 = await Users.findOne({ email }).lean();

    if (existUser1 && String(existUser1._id) != String(userId)) {
      res.status(205).json({ message: "fail", error: "exist nickname" });

      return;
    }

    if (existUser2 && String(existUser2._id) != String(userId)) {
      res.status(205).json({ message: "fail", error: "exist email" });

      return;
    }

    // joi validation으로 email, nickname이 형식에 맞는지 확인
    const { value, error } = emailNicknameJoiSchema.validate({
      email,
      nickname,
    });

    if (error) {
      res
        .status(205)
        .json({
          message: "fail",
          error: "wrong email or wrong nickname",
          error_detail: error.details[0].message,
        });

      return;
    }

    const user = await Users.findById(res.locals.user._id);

    if (!user) {
      res.status(409).json({ message: "fail", error: "no exist user" });

      return;
    }

    await Users.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $set: { nickname, email } }
    );

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 유저 정보 가져오기
const getUserInfo = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findById(userId).select(
      "nickname email image preference description follow_list follower_list is_public"
    );

    if (!user) {
      res.status(409).json({ message: "fail", error: "no exist user" });

      return;
    }

    res.json({ message: "success", user });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 닉네임 바꾸기
const changeNickname = async (req: Request, res: Response) => {
  const { nickname } = req.body;

  if (test_nicknames.includes(nickname)) {
    res
      .status(205)
      .json({ message: "fail", error: "nickname for test. don't use this" });

    return;
  }

  try {
    const existUser = await Users.findOne({ nickname }).lean();

    if (existUser) {
      res.status(205).json({ message: "fail", error: "exist nickname" });

      return;
    }

    const { value, error } = nicknameJoiSchema.validate({ nickname });

    if (error) {
      res
        .status(205)
        .json({
          message: "fail",
          error: "wrong nickname",
          error_detail: error.details[0].message,
        });

      return;
    }

    const user = await Users.findById(res.locals.user._id);

    if (!user) {
      res.status(406).json({ message: "fail", error: "no exist user" });

      return;
    }

    await Users.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $set: { nickname } }
    );

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 내 소개(description) 변경하기
const changeDescription = async (req: Request, res: Response) => {
  const description = req.body.description;
  const old_description = res.locals.user.description;
  const userId = res.locals.user._id;

  try {
    let user = await Users.findById(userId);

    if (!user) {
      res.status(406).json({ message: "fail", error: "no exist user" });

      return;
    }

    if (old_description == description) {
      res.status(409).json({ message: "fail", error: "not changed" });

      return;
    }

    if (description.length > 60) {
      res.status(400).json({ message: "fail", error: "too long" });

      return;
    }

    user = await Users.findByIdAndUpdate(userId, { $set: { description } });

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 비밀번호 리셋하기
const resetPassword = async (req: Request, res: Response) => {
  const email = req.body.email;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      res.status(406).json({ message: "fail", error: "no exist user" });

      return;
    }

    // 새 비밀번호 발급해주기 (암호화)
    const time = new Date();
    let newPassword = String(
      time.getMilliseconds() +
        String(time.getDate()) +
        String(time.getMinutes()) +
        String(time.getSeconds())
    );
    newPassword = newPassword.replace("1", "a");
    newPassword = newPassword.replace("5", "x");
    newPassword = newPassword.replace("9", "b");
    newPassword = newPassword.replace("0", "z");

    const cryptedPassword = crypto
      .createHmac("sha256", newPassword)
      .update(env.pass_secret)
      .digest("hex");

    await Users.findOneAndUpdate(
      { _id: user._id },
      { $set: { password: cryptedPassword } }
    );

    // 새로 발급된 비밀번호 메일로 보내주기
    const mailInfo: IMailInfo = {
      toEmail: user.email!,
      nickname: user.nickname,
      type: "resetpassword",
      password: newPassword,
    };

    mailSender(mailInfo);

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 비밀번호 변경하기
const changePassword = async (req: Request, res: Response) => {
  const old_password = req.body.password;
  const new_password = req.body.new_password;
  const user = res.locals.user;
  const userId = res.locals.user._id;

  if (!user) {
    res.status(406).json({ message: "fail", error: "no exist user" });

    return;
  }

  try {
    const crypted_old_password = crypto
      .createHmac("sha256", old_password)
      .update(env.pass_secret)
      .digest("hex");

    if (crypted_old_password != user.password) {
      res.status(400).json({ message: "fail", error: "wrong password" });

      return;
    }

    const crypted_new_password = crypto
      .createHmac("sha256", new_password)
      .update(env.pass_secret)
      .digest("hex");

    await Users.findByIdAndUpdate(userId, {
      $set: { password: crypted_new_password },
    });

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 계정 공개로 설정하기
const setToPublic = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const is_public = res.locals.user.is_public;

  try {
    let user = await Users.findById(userId);

    if (!user) {
      res.status(406).json({ message: "fail", error: "no exist user" });

      return;
    }

    // is_public == true: 공개
    // is_public == false: 비공개
    // is_public == undefined: 공개
    if (is_public || is_public == null) {
      res
        .status(409)
        .json({ message: "fail", error: "user is already public" });

      return;
    }

    user = await Users.findByIdAndUpdate(userId, { $set: { is_public: true } });

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 계정 비공개로 설정하기
const setToPrivate = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const is_public = res.locals.user.is_public;

  try {
    let user = await Users.findById(userId);

    if (!user) {
      res.status(406).json({ message: "fail", error: "no exist user" });

      return;
    }

    // is_public == true: 공개
    // is_public == false: 비공개
    // is_public == undefined: 공개
    if (is_public == false) {
      res
        .status(409)
        .json({ message: "fail", error: "user is already private" });

      return;
    }

    user = await Users.findByIdAndUpdate(userId, {
      $set: { is_public: false },
    });

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 특정 유저 팔로우하기
// follow_list: 내가 팔로우 하는 유저 리스트
// follower_list: 나를 팔로우 하는 유저 리스트
const followUser = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const myFollowList = res.locals.user.follow_list;
  const followUserId = req.body.userId;

  if (userId == followUserId) {
    res.status(400).json({ message: "fail", error: "cannot follow myself" });

    return;
  }

  try {
    const user = await Users.findById(userId);
    const followUser = await Users.findById(followUserId);

    if (!user || !followUser) {
      res.status(406).json({ message: "fail", error: "no exist user" });

      return;
    }

    const userFollowerList = followUser!.follower_list;

    if (!myFollowList) {
      // 내 팔로우 리스트가 비어있다면 (첫번째 팔로우라면)
      await Users.findByIdAndUpdate(userId, {
        $set: { follow_list: [followUserId] },
      });

      if (!userFollowerList) {
        // 상대방의 팔로워 리스트도 비어있다면 (첫번째 팔로워라면)
        await Users.findByIdAndUpdate(followUserId, {
          $set: { follower_list: [userId] },
        });
      } else if (userFollowerList?.includes(userId) == false) {
        await Users.findByIdAndUpdate(followUserId, {
          $push: { follower_list: [userId] },
        });
      }

      res.json({ message: "success" });

      return;
    }

    if (myFollowList.includes(followUserId)) {
      // 내 팔로우 리스트에 그 유저가 이미 있다면
      if (userFollowerList?.includes(userId) == false) {
        // 근데 상대방 팔로워 리스트에 내가 없다면 (오류)
        await Users.findByIdAndUpdate(followUserId, {
          $push: { follower_list: [userId] },
        });
      } else if (!userFollowerList) {
        await Users.findByIdAndUpdate(followUserId, {
          $set: { follower_list: [userId] },
        });
      }

      res
        .status(409)
        .json({ message: "fail", error: "user already follow this user" });

      return;
    }

    if (userFollowerList?.includes(userId)) {
      // 그 유저 팔로우 리스트에 내가 이미 있다면
      if (myFollowList.includes(followUserId) == false) {
        // 근데 내 팔로우 리스트에 그 유저가 없다면 (오류)
        await Users.findByIdAndUpdate(userId, {
          $push: { follow_list: [followUserId] },
        });
      } else if (!myFollowList) {
        await Users.findByIdAndUpdate(userId, {
          $set: { follow_list: [followUserId] },
        });
      }

      res
        .status(409)
        .json({ message: "fail", error: "user already follow this user" });

      return;
    }

    await Users.findByIdAndUpdate(userId, {
      $push: { follow_list: [followUserId] },
    });
    await Users.findByIdAndUpdate(followUserId, {
      $push: { follower_list: [userId] },
    });

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 특정 유저 팔로우 취소하기
const unfollowUser = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const myFollowList = res.locals.user.follow_list;
  const followUserId = req.body.userId;

  if (userId == followUserId) {
    res.status(400).json({ message: "fail", error: "cannot unfollow myself" });

    return;
  }

  try {
    const user = await Users.findById(userId);
    const followUser = await Users.findById(followUserId);

    if (!user || !followUser) {
      res.status(406).json({ message: "fail", error: "no exist user" });

      return;
    }

    const userFollowerList = followUser!.follower_list;

    if (
      !myFollowList ||
      myFollowList.length == 0 ||
      myFollowList.includes(followUserId) == false
    ) {
      // 팔로우 리스트가 비어있거나 팔로우 리스트에 그 유저가 없다면
      res
        .status(409)
        .json({ message: "fail", error: "user is not following this user" });

      return;
    }

    if (myFollowList.includes(followUserId)) {
      // 팔로우 리스트에 그 유저가 있다면
      await Users.findByIdAndUpdate(userId, {
        $pull: { follow_list: followUserId },
      });

      if (
        !userFollowerList ||
        userFollowerList.length == 0 ||
        userFollowerList?.includes(userId) == false
      ) {
        // 그 유저 팔로워 리스트가 비어있거나 그 유저 팔로워 리스트에 내가 없다면
        res.json({ message: "success" });

        return;
      }

      await Users.findByIdAndUpdate(followUserId, {
        $pull: { follower_list: userId },
      });
    }

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 특정 유저의 팔로우, 팔로워 리스트 보내주기
const givesFollows = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      res.status(406).json({ message: "fail", error: "no exist user" });

      return;
    }

    let follow_list = user.follow_list;
    let follower_list = user.follower_list;

    if (!follow_list) {
      follow_list = [];
    }

    if (!follower_list) {
      follower_list = [];
    }

    res.json({ message: "success", follow_list, follower_list });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

export default {
  existEmail,
  existNickname,
  register,
  login,
  logout,
  signout,
  checkAuth,
  googleLogin,
  kakaoLogin,
  postTest,
  socialUserSet,
  changeNickname,
  changeDescription,
  resetPassword,
  changePassword,
  setToPublic,
  setToPrivate,
  followUser,
  unfollowUser,
  givesFollows,
  getUserInfo,
};
