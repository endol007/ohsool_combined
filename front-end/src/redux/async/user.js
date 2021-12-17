import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";
import { removeCookie } from "../../share/Cookie";

// 회원 가입
export const signUp = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {

    const response = await axiosInstance.post(`/api/user`, data);
    
    return response.data;
  }
);

// 로그인
export const logIn = createAsyncThunk(
  "user/logIn",
  async (data, thunkAPI) => {

    const response = await axiosInstance.post(`api/user/auth`, data);
    
    return response.data;
  }
);

//로그아웃
export const logOut = createAsyncThunk(
  "user/logOut",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.post(`/api/user/logout`);
    if(response.data.message === "success"){
      alert("로그아웃되었습니다.")
      return response.data;
    }
  }
)

//회원탈퇴
export const withDrawal = createAsyncThunk(
  "user/withDrawal",
  async (data, thunkAPI) => {
    const response = await axiosInstance.delete(`/api/user`);
      alert("회원탈퇴가 완료되었습니다.")
      return response.data;
  }
)

//비밀번호 분실시 재발급
export const passwordReset = createAsyncThunk(
  "user/passwordReset",
  async (data, thunkAPI) => {
    const response = await axiosInstance.put(`/api/user/password/reset`, data);
      return response.data;
  }
)



//유저 정보 불러오기
export const userInfo = createAsyncThunk(
  "user/userInfo",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(`/api/user/me`);
    if(response.data.message === "fail" && response.data.error === "all tokens are expired"){
      removeCookie("osid");
      removeCookie("_osidRe");
      alert("로그인기간이 만료되었습니다. 다시 로그인하시겠어요?")
      window.location.href = "/"
    }
    return response.data;
  }
);

//실시간 이메일 이용가능 여부 체크
export const checkEmail = createAsyncThunk(
  "user/checkEmail",
  async (data, thunkAPI) => {
    const server_email = {
      email: data
    }
    const response = await axiosInstance.post(`/api/user/email`, server_email);
    
    return response.data;
  }
);

//실시간 닉네임 이용가능 여부 체크
export const checkNickname = createAsyncThunk(
  "user/checkNickname",
  async (data, thunkAPI) => {
    const server_nickname ={
      nickname: data
    }
    const response = await axiosInstance.post(`/api/user/nickname`, server_nickname);   
    
    return response.data;
  }
);

//소셜로그인 유저
export const socialLoginUser = createAsyncThunk(
  "user/socialLoginUser",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`/api/user/socialuser`, data);

    return response.data;
  }
)

//계정 설정 닉네임 변경
export const changeNickname = createAsyncThunk(
  "user/changeNickname",
  async (data, thunkAPI) => {

    const response = await axiosInstance.put(`/api/user/nickname`, {'nickname' : data});
    
    return data;
  }

);
//계정 설정 비밀번호 변경
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data, thunkAPI) => { //data : {"password": "oldpassword","new_password": "newpassword"}

    const response = await axiosInstance.put(`/api/user/password`, data);
    return data.new_password;
  }

);
//맥주도감 공유 허용
export const shareAgree = createAsyncThunk(
  "user/shareAgree",
  async (data, thunkAPI) => {

    const response = await axiosInstance.put(`/api/user/public/public`)
    
    return ; //어떤 값 return 할지?
  }
)
//맥주도감 공유 비허용
export const shareDisagree = createAsyncThunk(
  "user/shareDisagree",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.put(`/api/user/public/private`)
    
    return ; //어떤 값 return 할지?
  }
)
