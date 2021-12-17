import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./moduleAxios";

//해당 맥주 리뷰 가지고 오기
export const getReview = createAsyncThunk(
  "review/getReview",
  async (data, thunkAPI) => {

    const response = await axiosInstance.get(`/api/mybeer/beer?beerId=${data}&sort=rate&pageNo=0`);
    
    return response.data;
  }
);

//맥주 리뷰 작성
export const writeReview = createAsyncThunk(
  "review/writeReview",
  async (data, thunkAPI) => {
    const beerId = data.beerId;
    delete data.beerId;

    const response = await axiosInstance.post(`/api/mybeer/${beerId}`, data);

      return response.data;
    }
);

//전체 맥주도감 받아오기
export const getAllBeerDogam = createAsyncThunk(
  "review/getAllBeerDogam",
  async(data, thunkAPI) => {
    
    const response = await axiosInstance.get(`/api/mybeer/all?sort=date&pageNo=${data}`);
    
    return response.data;
  }
);

//피드리뷰 삭제
export const deleteBeerDogaminFeeds = createAsyncThunk(
  "review/deleteBeerDogaminFeeds",
  async (data, thunkAPI) => {
    const feeds = thunkAPI.getState().review.allDogam;
    const index = feeds.findIndex((p) => p._id === data);
    
    return index;
  }
);



