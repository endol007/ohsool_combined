import React, { useEffect } from "react";
import styled from "styled-components";
import { getMyReview, getOtherUserDogam } from "../redux/async/mybeer";
import { useDispatch, useSelector } from "react-redux";
import { myReviewList } from "../redux/reducer/mybeerSlice";
import WritedReview from "./WritedReview";
import { useParams } from "react-router";

const MyReviewList = ({is_me}) => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const myReview = useSelector(myReviewList); //사용자가 단 리뷰리스트
    const otherUserReview = useSelector(state => state.mybeer.otherDogam);

    useEffect(()=> {
        if(is_me){
            dispatch(getMyReview()); //사용자가 쓴 리뷰리스트 api요청
        }else{
            dispatch(getOtherUserDogam(userId)); //타유저의 리뷰리스트 api요청
        }
    }, [is_me]);
    return(
        <React.Fragment>
            <Container>  {/* 데이터 이미지가공 까지해서 */}
            {is_me ? 
            myReview.length !== 0 ?  myReview?.map((item, idx) => (//유저가 작성한 맥주 도감 목록
                <WritedReview key={idx} item={item}
                />
            ))  : <Text>도감 목록이 <br/>🍺BEER🍺 있소</Text>
            :
            otherUserReview.length !== 0 ?  otherUserReview?.map((item, idx) => (//타유저가 작성한 맥주 도감 목록
                <WritedReview key={idx} item={item}
                />
            ))  : <Text>도감 목록이 <br/>🍺BEER🍺 있소</Text>   
        }
            </Container>
        </React.Fragment>
    )
}

export default MyReviewList;

const Container = styled.div`
    margin-top: 10px;
`

const Text = styled.div`
    width: 320px;
    text-align: center;
    margin: 0 auto;
    padding-top: 150px;
`