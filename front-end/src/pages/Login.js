import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { emailCheck, pwdReg } from "../share/checkReg";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/async/user";
import "../share/style/loginButton.css";
import NavigationBar from "../NavigationBar";
import { is_Login } from "../redux/reducer/userSlice";

const Login = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector(is_Login);
    const [is_typed, setIs_Typed] = useState(false);
    const [login_info, setLogin_Info] = useState({
        email: "",
        password: "",
    }); //로그인 정보

    const {email, password} = login_info;
    
    useEffect(() => { //로그인 요청후 응답이 성공으로 오면 이전 화면으로 되돌아가게 함
        if(is_login === "success"){
            history.goBack();
        }
    }, [is_login]);

    const onChange = (e) => {  // 로그인 아이디, 비밀번호 인풋값
        setLogin_Info({...login_info, [e.target.name]: e.target.value});
    }

    const submitLogin = () => {
        if(email === "" || password === ""){  //공란 체크
            alert("아이디 혹은 비밀번호를 입력하세요.");
            return;
        }
        dispatch(logIn(login_info)) //로그인 정보 디스패치
        setLogin_Info({  //로그인인풋 초기화
            email: "",
            password: ""
        });
    }

    const submitEnterLogin = (e) => {
        if(e.key === "Enter"){
            submitLogin();
        }
    }

    const onKeyUp = () => { //이메일 비밀번호 입력시 버튼 색 변화
        if(emailCheck(email) === true && pwdReg(password) === true ){
            setIs_Typed(true);
        }else{
            setIs_Typed(false);
        }
    }

    return(
        <React.Fragment>
            <LoginWrap onKeyPress={submitEnterLogin}>
                <Container>
                    <Wrap>
                        <WelcomeWrap>
                            <p>Hello.</p>
                            <span>오늘의 술에 오신걸</span><br/>
                            <span>환영합니다!</span>
                        </WelcomeWrap>
                    </Wrap>
                    <InputWrap>
                        <InputLogin
                            onChange={onChange}
                            name="email"
                            value={email}
                            placeholder="아이디(이메일)"
                        ></InputLogin>
                        <InputLogin 
                            type="password"
                            onChange={onChange}
                            name="password"
                            value={password}
                            onKeyUp={onKeyUp}
                            placeholder="비밀번호"
                        ></InputLogin>
                        <div style={{marginTop:"-10px", marginBottom:"70px"}}>
                        <LostPasswordButton
                            onClick={()=>{
                                history.push("/lostpassword");
                            }}
                        >비밀번호를 분실했어요</LostPasswordButton>
                        </div>


                        <div style={{marginTop:"-10px", marginBottom:"60px"}}>
                            <div
                                className = {is_typed ? "yellowButton" : "whiteButton"}
                                onClick={submitLogin}
                                >
                                로그인하기
                            </div>
                            <div
                                className = {"whiteButton"}
                                onClick={()=>{
                                    history.push("/signup")
                                }}
                                >
                                회원가입하기
                            </div>
                        </div>
                        <div>
                            <SocialLoginButton
                                onClick={() => {
                                    window.location.href = "https://kauth.kakao.com/oauth/authorize?client_id=e37e7e15c49d382837d031d60c753b43&redirect_uri=https://ohsool.shop/api/user/kakao/callback&response_type=code"
                                }}>
                                카카오톡으로 로그인하기
                            </SocialLoginButton>
                            <SocialLoginButton
                                style={{ marginBottom: "80px" }}
                                onClick={() => {
                                    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=https://ohsool.shop/api/user/google/callback&scope=email%20profile&client_id=191938571707-m8nhi8j2inb8dn0c0pq99f3gc1hd9sfd.apps.googleusercontent.com&flowName=GeneralOAuthFlow"
                                }}>
                                <span>구글로 로그인하기</span>
                            </SocialLoginButton>
                        </div>
                    </InputWrap>
                    <NavigationBar props={props}/>
            </Container>
            </LoginWrap>
        </React.Fragment>
    )
}

export default Login;

const LoginWrap = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    text-align: center;
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
    width: 210px;
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


const SocialLoginButton = styled.div`
    display: inline-block;
    width: 312px;
    height: 47px;
    margin: 5px auto;    
    padding-top: 12.5px;
    border: 0.5px solid #555555;
    box-sizing: border-box;
    border-radius: 22.5px;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    color: #555555;
    cursor: pointer;
`;

const LostPasswordButton = styled.div`
    float: right;    
    cursor: pointer;
    color: #FFC44F;
    font-size: 12px;
    margin-right: 37px;
    border-bottom: 1px solid #FFC44F;

`
