import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
    followUser, 
    unFollowUser, 
    checkFollowUser,
    changeMyDescription,
} from "../redux/async/mybeer";
import { useParams } from "react-router-dom";

const MyStatusComment = ({ userInfos, is_me, othersInfo }) => {
    const followers = useSelector(state => state.mybeer.followers); //팔로워 유저 아이디배열값
    const [toggle, setToggle] = useState(false); //팔로우 상태
    const [is_Edit, setIs_Edit] = useState(true); // 상태명 수정
    const [comment, setComment] = useState(); //상태명
    const { userId } = useParams(); //url파라미터값 userId
    const [text, setText] = useState(""); //상태명 작성 스테이트
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkFollowUser(userId));
    }, []); //팔로잉 및 팔로워 유저 체크 

    useEffect(() => {
        if(is_me){
            if(othersInfo.description === ""){
                setText("상태명을 작성해주세요!");
            }else{
                setText(userInfos.description);
            }
        }else{
            if(othersInfo.description === ""){
                setText("아직 작성 전입니다.");
            }else{
                setText(othersInfo.description);
            }
        }
    }, [is_me, othersInfo]);

    useEffect(() => {
        if(followers.includes(userInfos.userId)){//팔로우 여부에 따라 버튼 다르게 표시
            setToggle(true);
        }else{
            setToggle(false);
        }
    }, [followers, userInfos])

    const editStatusComment = () => {//상태명 작성중인지 판별
        if(is_Edit){
            setIs_Edit(false);
        }else{
            changeStatuscomment();
            setIs_Edit(true);
        }
    }

    const onChange = (e) => {
        setComment(e.target.value);
    }
    const enterKeyPress = (e) => {
        if(e.key === "Enter"){
            changeStatuscomment();
        }
    }
    const changeStatuscomment = () => {
        setText(comment);
        setIs_Edit(true);
        dispatch(changeMyDescription(comment));
    }

    const nonClickedButton = {
        backgroundColor: "#FFFFFF",
        border: "1px solid #FFC44F",
        color: "#FFC44F"
    }
    const dispatchFollowData = {
        otheruserId: userId,
        userId: userInfos?.userId
    }
    const clickFollowButton = () => {
        if(!toggle){
            setToggle(true)
            dispatch(followUser(dispatchFollowData));
        }else{
            setToggle(false)
            dispatch(unFollowUser(dispatchFollowData));
        }
    }

    return(
        <React.Fragment>
            <Container>
                <CommentWrap>
                    {is_Edit ? <span>
                        {text}
                    </span>
                    :
                    <CommentTextarea
                        onKeyPress={enterKeyPress}
                        value={comment}
                        onChange={onChange}
                    ></CommentTextarea>
                    }
                </CommentWrap>
                <FollowOrCommentButtonWrap>
                    {is_me ? 
                    <CommentButton
                        onClick={editStatusComment}
                    >상태명 수정</CommentButton>
                :
                    <FollowButton
                        style={toggle ? null : nonClickedButton}
                        onClick={clickFollowButton}
                    >{toggle ? "팔로우 취소": "팔로우"}
                    </FollowButton>
                }
                    <span>팔로워 {followers?.length}</span>
                </FollowOrCommentButtonWrap>
            </Container>
        </React.Fragment>
    )
}

export default MyStatusComment;

const Container = styled.div`
    display: flex;
    width: 360px;
    margin: 0 auto;
    padding-top: 15px;
`;

const CommentWrap = styled.div`
    width: 197px;
    height: 54px;
    font-size: 12px;
    margin: 20px;
    & > span {
        color: #151515;
        font-family: Noto Sans KR;
    }

`;
const CommentTextarea = styled.textarea`
    width: 197px;
    height: 54px;
    border: 1px solid #FFC44F;
    outline: none;
    resize:none;
    border-radius: 10px;
    font-size: 12px;
`;


const FollowOrCommentButtonWrap = styled.div`
    margin: 20px 0 0 10px;
    text-align: center;
    & > span {
        font-size: 10px;
        color: #151515;
        font-family: Noto Sans KR;
    }
`;

const FollowButton = styled.button`
    display: block;
    width: 85px;
    height: 30px;
    background-color: #FFC44F;
    color: #151515;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const CommentButton = styled.button`
    display: block;
    width: 85px;
    height: 30px;
    color: #151515;
    font-size: 12px;
    background-color: #FFFFFF;
    border: 1px solid #151515;
    border-radius: 5px;
    cursor: pointer;
`;