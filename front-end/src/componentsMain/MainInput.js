import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { User } from "../redux/reducer/userSlice";
import {is_Login} from "../share/checkLoginUser";
import { history } from "../redux/configureStore";

const MainInput = (props) => { //로그인 여부 확인
    const userId = useSelector(User); //유저 정보 가지고오기
    
    const goBeerDogam = () => {//나의 맥주 도감은 로그인 후 이용 가능
        if(is_Login()){
            history.push(`/mybeer/${userId}/dogam`);
        }else{
            alert("로그인이 필요한 서비스입니다. \n로그인하고 나만의 맥주도감을 관리해보세요!✍ ");
        }
    }
    return(
        <React.Fragment>
            <LinkWrap>
                <Wrap>
                    <LinkBox onClick={() => {
                        history.push("/test/");
                    }}>
                        당신을 위한 오늘의 맥주는?
                    </LinkBox>
                    <LinkBox onClick={() => {
                        history.push("/beer/list/all")
                    }}>
                        대한민국의 모든 맥주
                    </LinkBox>
                    <LinkBox onClick={goBeerDogam}>
                        나의 맥주 도감
                    </LinkBox>
                </Wrap>
                {!is_Login() ? 
                (<ButtonWrap>
                    <LoginButton 
                        onClick={() => {
                            history.push("/signup")
                    }}>JOIN</LoginButton>
                    <LoginButton
                        onClick={() => {
                            history.push("/login")
                    }}>LOGIN</LoginButton>
                </ButtonWrap>)
                : null
                }
            </LinkWrap>
        </React.Fragment>
    )
}

export default MainInput;

const LinkWrap = styled.div`
    width: 100%;
    margin-top: 160px;
`;

const Wrap = styled.div`
    display: inline-block;
`;

const LinkBox = styled.div`
    display: flex;
    justify-content: center;
    width: 276px;
    height: 45px;
    line-height: 45px;
    margin: 0 0 16px 0;
    background-color: rgba(0, 0, 0, 0.5);
    border: 0.5px solid #FFFFFF;
    border-radius: 12px;
    color: #FFFFFF;
    z-index: 9999;
    cursor: pointer;
`;

const ButtonWrap = styled.div`
    margin: 0 auto;
    width: 161px;
    display: flex;
    justify-content: space-between;
`;

const LoginButton = styled.button`
    background-color: transparent;
    border: transparent;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
`;