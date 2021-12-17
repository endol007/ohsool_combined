import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { passwordReset } from "../redux/async/user";
import "../share/style/loginButton.css";
import NavigationBar from "../NavigationBar";
import { is_Login } from "../redux/reducer/userSlice";

const LostPassword = (props) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState(""); //로그인 정보

    const clickComfirmButton = (e) => {  // 로그인 아이디, 비밀번호 인풋값
        dispatch(passwordReset({'email': email}));
        setEmail("");
    }
    const onChange = (e) => {  // 로그인 아이디, 비밀번호 인풋값
        setEmail(e.target.value);
    }

    return(
        <React.Fragment>
            <LoginWrap>
                <Container>
                    <Wrap>
                        <WelcomeWrap>
                            <span style={{color: "#FFC44F"}}>비밀번호 재발급</span><br/>
                            <span style={{fontSize: "16px"}}>가입하신 아이디(이메일)를 입력해주세요!</span>
                        </WelcomeWrap>
                    </Wrap>
                    <InputWrap>
                        <InputLogin
                            onChange={onChange}
                            name="email"
                            value={email}
                            placeholder="아이디(이메일)"
                        ></InputLogin>

                        <div style={{marginTop:"-10px", marginBottom:"60px"}}>
                            <LostPasswordButton
                                onClick={clickComfirmButton}
                            >확인
                            </LostPasswordButton>
                        </div>

                    </InputWrap>
                    <NavigationBar props={props}/>
            </Container>
            </LoginWrap>
        </React.Fragment>
    )
}

export default LostPassword;

const LoginWrap = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    text-align: center;
    vertical-align: middle;
`;
const Container = styled.div`
    width: 360px;
    margin: 0 auto;
`;

const Wrap = styled.div`
    width: 360px;
    display: flex;
    text-align: left;
    margin-left: 24px;
`;

const WelcomeWrap = styled.div`
    font-family: "GmarketSansM";
    width: 310px;
    margin-top: 90px;
    & > p {
        font-weight: 400;
        font-size: 35px;
        color: #FFC44F;
        margin: 0 0 20px 0;
    }
    & > span {
        font-size: 25px;
        font-weight: normal;
    }
`;

const InputWrap = styled.div`
    position: absolute;
    width: 360px;
    margin-top: 40px;
`;

const InputLogin = styled.input`
    width: 312px;
    height: 35px;
    padding-top: 15px;
    margin-bottom: 15px;
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 0.5px solid #C4C4C4;
    outline: none;
`;



const LostPasswordButton = styled.div`  
    display: inline-block;
    width: 312px;
    height: 47px;
    margin: 30px auto;
    padding-top: 12.5px;
    border: 0.5px solid #FFB521;
    box-sizing: border-box;
    border-radius: 22.5px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #FFB521;
    cursor: pointer;

    &:hover {
        background-color: #FFC44F;
        color: black;
      }

`
