import { createSlice, createSelector } from "@reduxjs/toolkit";

import { 
  getAllBeer, 
  getOneBeer,
  getBeerCategoryList,
  getBeerInfinity,
  getSearchWord, 
  testShare,
  getHashtagWord,
  starRateDetail,
  likeBeer,
  unLikeBeer,
  likeBeerDetail,
  unLikeBeerDetail,
  beerOneCleanUp
} from "../async/beer";

const initialState = {
    beerList: [],
    testBeerList: [],
    categoryBeer: [],
    hashtagList: [],
    beerOne: null,
    beerToday: [],
    beerShare: [],
    searchList: [],
    isLoading: false,
    isDone: false,
    isError: false,
};

export const beerSlice = createSlice({
  name: "beer",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getAllBeer.fulfilled, (state, action) => {
          state.beerList = action.payload;
      })
      .addCase(getBeerCategoryList.fulfilled, (state, action) => {
          state.categoryBeer = action.payload.beers;
      })
      .addCase(getOneBeer.fulfilled, (state, action) => {
          state.beerOne = action.payload.beer;
      })
      .addCase(beerOneCleanUp.fulfilled, (state, action) => {
        state.beerOne = null;
      })
      .addCase(getBeerInfinity.fulfilled, (state, action) => {
        state.testBeerList = [...state.testBeerList, ...action.payload.beers];
      })
      //검색기능
      .addCase(getSearchWord.fulfilled, (state, action) => {
          state.searchList = action.payload.beers;
      })
      .addCase(getHashtagWord.fulfilled, (state, action) => {
          state.hashtagList = action.payload.beers;
      })
      .addCase(likeBeer.fulfilled, (state, action) => {
        const indexIf = action.payload.indexIf;
        const likes_array = action.payload.response.likes;
        if(indexIf === -1){
        }else{
        state.testBeerList[indexIf].like_array = likes_array;
        }
      })
      .addCase(unLikeBeer.fulfilled, (state, action) => {
        const indexIf = action.payload.indexIf;
        const likes_array = action.payload.response.likes;
        if(indexIf === -1){
        }else{
        state.testBeerList[indexIf].like_array = likes_array;
        }
        alert("취소되었습니다.");
      })
      .addCase(likeBeerDetail.fulfilled, (state, action) => {
        const index = action.payload.indexIf
        const likes_array = action.payload.response.likes
        state.beerOne.like_array = likes_array;
        if(index === -1){
        }else{
        state.testBeerList[index].like_array = likes_array;
        }
      })
      .addCase(unLikeBeerDetail.fulfilled, (state, action) => {
        const index = action.payload.indexIf
        const likes_array = action.payload.response.likes
        state.beerOne.like_array = likes_array;
        if(index === -1){
        }else{
        state.testBeerList[index].like_array = likes_array;
        }
      })
      .addCase(starRateDetail.fulfilled, (state, action) => {
        state.beerOne.avgRate = action.payload;
      })
      .addCase(testShare.fulfilled, (state, action) => {
        state.beerToday = action.payload;
      })
      // 공통
      .addMatcher(
        (action) => {
          return action.type.includes("/fulfilled");
        },
        (state, action) => {
          state.isLoading = false;
          state.isDone = true;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.includes("/rejected");
        },
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error;
        }
      ),
});

const beer_list = (state) => state.beer.beerList.beers;

const beer_One = (state) => state.beer.beerOne;

const beerSearch = (state) => state.beer.searchList;

const beerHashtag = (state) => state.beer.hashtagList;

const beer_Today = (state) => state.beer.beerToday.category;

const beer_recommend = (state) => state.beer.beerToday.recommendations;

const beer_Infinity = (state) => state.beer.testBeerList;

const beer_Category = (state) => state.beer.categoryBeer;

export const getBeerList = createSelector([beer_list], beerList => {
  return beerList;
}); //전체 맥주리스트

export const oneBeer = createSelector(beer_One, beer_One => {
  return beer_One;
}); // 맥주 1개데이터 

export const beerCategory = createSelector(beer_Category, beer_Category => {
  return beer_Category;
})

export const getHashtagList = createSelector(beerHashtag, beerHashtag => {
  return beerHashtag;
}); //해시태그로 맥주 검색

export const getSearchList = createSelector(beerSearch, beerSearch => {
  //return beerSearch.slice(0,5);
  return beerSearch;
}); //맥주 검색

export const recommendCate = createSelector(beer_Today, beer_Today => {
  return beer_Today;
});

export const recommendBeerToday = createSelector(beer_recommend, beer_recommend => {
  return beer_recommend;
});

export const InfinityBeer = createSelector(beer_Infinity, beer_Infinity => {
  return beer_Infinity;
});