import React from "react";
import styled from "styled-components";
import { history } from "./redux/configureStore";
import "./share/style/TestHeader.css";
import { useSelector } from "react-redux";

const myIcon = "image/HeaderIcon.png";
const Back = "/images/Back2.png";

const Header = (props) => {//상위 헤더바
    const userInfo = useSelector(state => state.user.currentUser);
    const is_iphone = navigator.userAgent.toLowerCase();
    
    const comfirm_login = ()=>{
        if(userInfo.message === "success"){
            history.push("/mypage");
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login");
                return;
            }
        }
    }
    return (
        <React.Fragment>
            <div className={is_iphone.indexOf("iphone") !== -1 ? "iphoneHeader" : "header"}>
            <HeaderBox style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "40px"} : {marginTop: "0"}}>
                    <GoBack style={{backgroundImage: `url(${Back})`}}
                    onClick={()=>{ 
                        history.goBack();
                    }}></GoBack>
                    <HeaderLogo
                    style={is_iphone.indexOf("iphone") !== -1 ? {top: "52px"} : {top: "12px"}}
                    onClick={() => {
                        history.push("/")
                    }}><span>오늘의술</span></HeaderLogo>
                    {userInfo.message === "success" ? 
                    <UserImage onClick={() => {
                        history.push("/mypage")
                    }}>
                        <span>{userInfo.nickname}</span>
                        <ImageWrap
                            style={{backgroundImage: `url(${userInfo.image})`}}
                        >
                        </ImageWrap>
                    </UserImage>
                    :
                    <NoneUserImage style={{backgroundImage: `url(${myIcon})`}}
                        onClick={() => {
                            comfirm_login();
                    }}></NoneUserImage> }
            </HeaderBox>
            </div>
        </React.Fragment>
    )
}

export default Header;

const HeaderBox = styled.div`
    width: 360px;
    z-index: 10;
    background-color: white;
`;
const GoBack = styled.div`
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: cover;
    margin: 10px 0 0 12px;
    cursor: pointer;
`;

const HeaderLogo = styled.div`
    font-family: "GmarketSansM";
    position: absolute;
    top: 12px;
    left: 50%;
    margin-left: -38px;
    font-size: 20px;
    color: #333333;
    font-weight: bold;
    cursor: pointer;
`;

const UserImage = styled.div`
    display: flex;
    float: right;
    & > span{
        font-size: 12px;
        font-weight: normal;
        margin-right: 5px;
        line-height: 45px;
    }
`;

const ImageWrap = styled.div`
    margin: 10px 12px 0 0;
    display: flex;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    background-size: cover;
    cursor: pointer;
`;

const NoneUserImage = styled.div`
    display: flex;
    float: right;
    width: 24px;
    height: 24px;
    margin: 10px 12px 0 0;
    cursor: pointer;
`;
