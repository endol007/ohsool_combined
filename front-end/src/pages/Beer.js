import React, {lazy, Suspense} from 'react';
import styled from "styled-components";
import { Route } from 'react-router-dom';
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Loader from "../share/Loader";

const BeerList = lazy(() => import("../componentsBeer/BeerList"));
const BeerDetail = lazy(() => import("../componentsBeerDetail/BeerDetail"));

const Beer = (props) => {
    //중첩라우팅 구현 beer안에서 beerlist와 beerdetail로 나누고 코드분할 적용해서
    //각각 실행시 비동기적으로 컴포넌트 불러오도록 구현
    return (
        <React.Fragment>
            <Suspense fallback={<LoaderWrap><Loader/></LoaderWrap>}>
                <Header/>
                <ConnectedRouter history={history}>
                <Route path="/beer/list/:beerCategoryId" exact component={BeerList}/>
                <Route path="/beer/detail/:beerId" component={BeerDetail}/>
                <Route path="/beer/list/search/:word" component={BeerList}/>
                </ConnectedRouter>
                <NavigationBar props={props}/>
            </Suspense>
        </React.Fragment>
    )
}

export default React.memo(Beer);

const LoaderWrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
`;
