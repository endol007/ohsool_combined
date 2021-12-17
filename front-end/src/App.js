import React, { useEffect, Suspense, lazy } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Route } from "react-router-dom";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import "./App.css"
import { ReceiveNotificationsToken, kakaoApiKey } from "./share/firebase";
import Loader from "./share/Loader";

const Main = lazy(() => import("./pages/Main"));
const Test = lazy(() => import("./pages/Test"));
const Beer = lazy(() => import("./pages/Beer"));
const Mypage = lazy(() => import("./pages/Mypage"));
const TestResult = lazy(() => import("./pages/TestResult"));
const SignUp = lazy(() => import("./pages/SignUp"));
const MyBeer = lazy(() => import("./pages/MyBeer"));
const Login = lazy(() => import("./pages/Login"));
const MyReview = lazy(() => import("./pages/MyReview"));
const Setting = lazy(() => import("./pages/Setting"));
const Token = lazy(() => import("./share/Token"));
const PlaceBeer = lazy(() => import("./componentsBeerDetail/PlaceBeer"));
const BeerFeeds = lazy(() => import("./pages/BeerFeeds"));
const LostPassword = lazy(() => import("./pages/LostPassword"));

const code = process.env.REACT_APP_VERSION_CODE;

function App(props) {
  const Kakao = window.Kakao;

useEffect(() => {
    Kakao.init(kakaoApiKey);
    ReceiveNotificationsToken();
}, []);

  return (
    <React.Fragment>
      <Suspense fallback={<LoaderWrap><Loader/></LoaderWrap>}>
        <ConnectedRouter history={history}>
            <Route path="/" exact component={Main}/>
            <Route path="/test" component={Test}/>
            <Route path="/result/:category" component={TestResult}/>
            <Route path="/beer" component={Beer}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/feeds" exact component={BeerFeeds}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/mypage" exact component={Mypage}/>
            <Route path="/setting" exact component={Setting}/>
            <Route path="/mybeer/:userId/:dogam" component={MyBeer}/>
            <Route path="/dlfwh=:tokens" component={Token}/>
            <Route path="/review/:reviewId" component={MyReview}/>
            <Route path="/place" component={PlaceBeer}/>
            <Route path="/lostpassword" component={LostPassword}/>
        </ConnectedRouter>
      </Suspense>
      <GlobalStyle/>
    </React.Fragment>   
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const LoaderWrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
`;