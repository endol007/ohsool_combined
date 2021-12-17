import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";

// 불편사항
export const suggestComment = createAsyncThunk(
  "suggest/suggestComment",
  async (data, thunkAPI) => {

    const response = await axiosInstance.post(`/api/complaint`, data);
    
    return response.data;
  }
);

// 맥주 추천
export const suggestBeer = createAsyncThunk(
  "suggest/suggestBeer",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.post(`/api/recommendation`, data);
    
  return response.data;
});

//맥주 장소 제보하기
export const mapReport = createAsyncThunk(
  "suggest/mapReport",
  async (data, thunkAPI) => {
    
    const response = await axiosInstance.post(`/api/beer/report-location`, data);
    if(response.data.message === "fail"){
      alert("이미 제보한 장소입니다!")
    }else{
      alert("제보가 완료되었습니다! \n장소는 검증후 반영될 예정입니다.")
    }
    return response.data;
  }
)
