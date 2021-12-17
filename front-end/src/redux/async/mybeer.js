import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";

//좋아요한 도감 가지고 오기
export const getMyDogam = createAsyncThunk(
  "mybeer/getMyDogam",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(`/api/beer/liked`);
    return response.data;
  }
);

// review 목록 가지고오기
export const getMyReview = createAsyncThunk(
    "mybeer/getMyReview", 
    async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/mybeer/my?sort="rate"&pageNo=0`);
    
  return response.data;
});

// 작성한 review 개수 가지고오기
export const getReviewLength = createAsyncThunk(
  "mybeer/getReviewLength", 
  async (data, thunkAPI) => {
    
  const response = await axiosInstance.get(`/api/mybeer/length/${data}`);
    
  return response.data;
});

//맥주도감에서 맥주 좋아요 취소
export  const unLikeBeerDogam = createAsyncThunk(
  "mybeer/unLikeBeerDogam",
  async (data, thunkAPI) => {
    const beers = thunkAPI.getState().mybeer.mydogam;
    const index = beers.findIndex((p) => p._id === data);

    return index;
  }
);
//맥주도감에서 리뷰 수정
export const editReviewDogam = createAsyncThunk(
  "mybeer/editReviewDogam",
  async (data, thunkAPI) => {
    const review = thunkAPI.getState().mybeer.myReview;
    const index  = review.findIndex((p) => p._id === data.mybeerId);
    // myFeatures, location, rate, review
    const response = await axiosInstance.put(`/api/mybeer/${data.mybeerId}`, data);

    const dataSlice = {
      myFeatures: data.myFeatures,
      rate: data.rate,
      review: data.review,
      index: index
    }
    return dataSlice;
  }
);

//맥주도감 리뷰삭제
export const deleteReviewDogam = createAsyncThunk(
  "mybeer/deleteReviewDogam",
  async (data, thunkAPI) => {
    const review = thunkAPI.getState().mybeer.myReview;
    const index = review.findIndex((p) => p._id === data);
    const response = await axiosInstance.delete(`/api/mybeer/${data}`);
    
    return index;
  }
);

//타 유저의 맥주도감 리스트 출력
export const getOtherUserDogam = createAsyncThunk(
  "mybeer/getOtherUserDogam",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/mybeer/others/${data}?sort="rate"&pageNo=0&type=beer`);
    
    return response.data;
  }
)

//타유저가 좋아요한 맥주리스트 출력
export const getOtherUserLikes = createAsyncThunk(
  "mybeer/getOtherUserLikes",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.get(`/api/mybeer/others/${data}?sort="rate"&pageNo=0&type=liked`);
    
    return response.data;
  }
)

//마이비어 상태명 변경
export const changeMyDescription = createAsyncThunk(
  "mybeer/changeMyDescription",
  async (data, thunkAPI) => {
    const sendData = {
      description: data
    }
    const response = await axiosInstance.put(`/api/user/description`, sendData);
    
    return response.data;

  }
)

//유저 팔로우 기능
export const followUser = createAsyncThunk(
  "mybeer/followUser",
  async (data, thunkAPI) => {
    const followId = {
      userId: data.otheruserId
    }
    const response = await axiosInstance.put(`/api/user/follow/follow`, followId);
    
    return data.userId;
  }
)

//유저 언팔로우 기능
export const unFollowUser = createAsyncThunk(
  "mybeer/unFollowUser",
  async (data, thunkAPI) => {
    const unFollowId = {
      userId: data.otheruserId
    }
    const followers = thunkAPI.getState().mybeer.followers;
    const index = followers.findIndex((p) => p === data.userId);
    const response = await axiosInstance.put(`/api/user/follow/unfollow`, unFollowId);

    return data.userId;
  }
)

//팔로우 유저수 체크
export const checkFollowUser = createAsyncThunk(
  "mybeer/checkFollowUser",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/user/follow/followers/${data}`);

    return response.data;
  }
)
//다른유저의 정보(마이비어페이지)
export const OtherUserInfo = createAsyncThunk(
  "mybeer/OtherUserInfo",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/user/user-info/${data}`);

    return response.data;
  }
)
