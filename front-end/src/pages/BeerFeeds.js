import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import { getAllBeerDogam } from "../redux/async/review";
import EachReview from "../componentsBeerDetail/EachReview";
import InfinityScrollLoader from "../componentsBeer/InfinityScrollLoader";
import BeerFeedsInfo from "../componentsMypage/BeerFeedsInfo";

const BeerFeeds = (props) => {
    const allFeeds = useSelector((state) => state.review.allDogam);
    const last = useSelector((state) => state.review.dogamLast);
    const is_iphone = navigator.userAgent.toLowerCase(); //아이폰인지 아닌지(노치디자인때문에)
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState(0);
    const dispatch = useDispatch();

    const getAllFeeds = useCallback (() => {
        async function getData(){
        await dispatch(getAllBeerDogam(paging));
            setLoading(false);
        }
        return getData();
    }, [paging, allFeeds]);
    
    //스크롤위치 계산
    const _handleScroll = _.throttle(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if(last){
            return;
        } //마지막페이지에 닿으면 함수 실행 방지
        if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
          // 페이지 끝에 도달하면 추가 데이터를 받아온다
            setPaging(paging + 1);
            getAllFeeds();
            setLoading(true);
        }
    }, 500);

    useEffect(() => {
        if(paging === 0 && allFeeds.length === 0){ //처음 실행시 0번째 페이지 불러오기
            dispatch(getAllBeerDogam(0));
            setPaging(paging+1);
            return
        }
        if(allFeeds.length !== 0 ){
            setPaging(allFeeds.length/8 + 1)
        } //다른컴포넌트 갔다 올때 렌더링시 페이지넘버 계산
    }, []);

    useEffect(() => {
        if(loading){
            return;
        }
        window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
        };
    }, [paging, loading]);

    return(
        <React.Fragment>
            <Header/>
            <FeedsContainer style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "100px"} : {marginTop: "60px"}}>
                {allFeeds?.map((item, idx) => {
                    return(
                        <>
                        <BeerFeedsInfo item={item}/> {/*리뷰단 맥주의 정보*/}
                        <EachReview item={item} key={idx} /> {/*리뷰 정보*/}
                        <BottomLine></BottomLine>
                        </>
                    )
                })}
            {loading ? 
            <div style={{marginTop: "20px"}}>
                <InfinityScrollLoader/>
            </div>
            : ""}
            </FeedsContainer>
            <NavigationBar props={props}/>
        </React.Fragment>
    )
}

export default BeerFeeds;

const FeedsContainer = styled.div`
    margin-top: 60px;
    margin-bottom: 120px;
`;

const BottomLine = styled.div`
    border-bottom: 0.5px solid #C4C4C4;
    max-width: 400px;
    margin: 16px auto;
`;