import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { userInfo } from "../redux/async/user";
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import "../share/style/myBeer.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OtherUserInfo } from "../redux/async/mybeer";
import { otherStatus } from "../redux/reducer/mybeerSlice"
import {
    MyLikeBeerList,
    MyReviewList,
    UserPerference,
    MyDogamButton,
    MyStatusComment,
    } from "../componentsMypage/MyBeerIndex";

const MyBeer = (props)=>{
    const [is_Dogam, setIs_Dogam] = useState(true); //맥주리스트인지 리뷰리스트인지
    const userInfos = useSelector(state => state.user.currentUser);
    const othersInfo = useSelector(otherStatus);
    const is_iphone = navigator.userAgent.toLowerCase(); //아이폰인지 아닌지(노치디자인때문에)
    const { userId } = useParams(); //userId 파라미터
    const { dogam } = useParams(); //도감 or 좋아요리스트 파라미터(dogam or like)
    const [is_me, setIs_Me] = useState(true); //타유저의 맥주도감인지 내맥주도감인지 구별
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userInfo());//현재 로그인한사용자 정보 (새로고침시 상태 날라가는 것 방지)
        dispatch(OtherUserInfo(userId));
        window.scrollTo({
            top: 0,
        })
    }, []); //컴포넌트 첫 렌더링시 실행
    
    useEffect(() => {
        if(userId === undefined || userId === userInfos.userId){
            setIs_Me(true);
        }else{
            setIs_Me(false);
        }
    }, [userInfos, userId]);
    
    useEffect(()=> { //맥주도감인지 좋아요한 맥주리스트인지 판별
        if(dogam === "dogam"){
            setIs_Dogam(true);
        }else{
            setIs_Dogam(false);
        }
        return () => {
        }
    }, [dogam, is_Dogam]);

    const myBeerShow = ()=>{
        if(is_me === true || (is_me === false && othersInfo.is_public=== true)){//허용 비허용 상관없이 보여줌
            return(
                <>
                    <MyDogamButton is_Dogam={is_Dogam}/>
                    {is_Dogam === true ? 
                        <MyReviewList is_me={is_me}/>
                    : 
                        <MyLikeBeerList is_me={is_me}/>
                    }
                </>
            )
        }else if(is_me === false && othersInfo.is_public === false ){
            return(
                <>
                        <Text>비허용 상태입니다.</Text>
                </>
            )
        }
    }
    return (
        <React.Fragment>
            <Header/>
                <UserPerference 
                    othersInfo={othersInfo}
                    userInfos={userInfos} 
                    is_me={is_me}>
                </UserPerference>
                <MyStatusComment 
                    othersInfo={othersInfo}
                    userInfos={userInfos} 
                    is_me={is_me}>    
                </MyStatusComment>
                <Container style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "40px"} : {marginTop: "0px"}}>
                    <GridWrap>        
                        {myBeerShow()}
                    </GridWrap>
                </Container>
            <NavigationBar props={props}/>

        </React.Fragment>
    )
}

export default React.memo(MyBeer);

const Container = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
`;
const GridWrap = styled.div`
    width: 360px;
    margin: 0 auto;
    padding-bottom: 120px;
`

const Grid = styled.div`
    display: flex;
    background-color: #FFFFFF;
    flex-direction: column;
`;

const Wrap = styled.div`
    width: 400px;
    margin: 0 auto;
    padding-top: 16px;
    border-top: 0.5px solid #C4C4C4; 
`;

const Text = styled.div`
    width: 320px;
    text-align: center;
    margin: 0 auto;
    padding-top: 150px;
`