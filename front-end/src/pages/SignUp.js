import React, {useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../redux/configureStore";
import { signUp, checkEmail, checkNickname } from "../redux/async/user";
import { is_Signup, is_Nickname, is_Email } from "../redux/reducer/userSlice";
import { emailCheck, pwdReg} from "../share/checkReg";
import NavigationBar from "../NavigationBar";
import "../share/style/loginButton.css";

const SignUp = (props) => {
    const dispatch = useDispatch();
    const [is_typed, setIs_Typed] = useState(false);
    const is_email = useSelector(is_Email); //이메일중복체크 서버에서 응답
    const is_nickname = useSelector(is_Nickname); // 닉네임 중복체크 서버에서 응답
    const is_signup = useSelector(is_Signup); //회원가입 된 지 서버에서 체크
    const [email_check_text, setEamil_Check_Text] = useState("");
    const [nickname_check_text, setNickname_Check_Text] = useState("");
    const [email_double, setEmail_Double] = useState("");
    const [nickname_double, setNickName_Double] = useState("");
    const [signup_info, setSignUp_Info] = useState({
        email: "",
        nickname: "",
        password: "",
        confirmPassword: "",
    }); //회원정보 입력 

    const {email, nickname, password, confirmPassword} = signup_info;

    useEffect(() => { //회원가입 후 응답이 오면 메인페이지로 이동
        if(is_signup === "success"){
            alert("회원가입을 축하합니다!")
            window.location.href = "/"  
            return;
        }
    }, [is_signup]);
    
    useEffect(() => {   //아이디 중복및 형식 체크
        if(email === ""){  // 인풋이 비어있으면 인풋 밑의 글자 초기화
            setEamil_Check_Text("");
            return;
        }
        if(emailCheck(email) === false){
            setEmail_Double(false);
            setEamil_Check_Text("올바른 이메일 형식이 아닙니다.");
        }
        else if(is_email === "fail"){
            setEmail_Double(false);
            setEamil_Check_Text("사용중인 이메일입니다.");
        }
        else if(emailCheck(email) === true && is_email === "success"){
            setEmail_Double(true);
            setEamil_Check_Text("사용 가능한 이메일입니다.");
        }
        return () => {
        }
    }, [email, is_email]);

    useEffect(() => {  //닉네임 중복체크
        if(nickname === ""){
            setNickname_Check_Text("");
            return;
        }
        if(is_nickname?.message === "fail" && is_nickname?.error === "exist nickname"){
            setNickName_Double(false);
            setNickname_Check_Text("사용중인 닉네임입니다.");
        }
        else if(is_nickname?.message === "fail" && is_nickname?.error === "wrong nickname"){
            setNickName_Double(false);
            setNickname_Check_Text("사용할 수 없는 닉네임입니다.");
        }else if(nickname.length >= 8 ){
            setNickname_Check_Text("닉네임 글자 수는 8자 미만이어야합니다.");
        }else{
            setNickName_Double(true);
            setNickname_Check_Text("사용 가능한 닉네임입니다.");
        }
    }, [nickname, is_nickname]);

    const onChange = (e) => {
        setSignUp_Info({...signup_info, [e.target.name]: e.target.value});
    }

    const submitSignUp = () => {
        if(email === "" || nickname === "" || password === "" || confirmPassword === "" ){
            alert("아이디, 닉네임, 비밀번호를 다시 확인 해주세요!")
            return;
        } //공란 체크

        if(!pwdReg(password)){
            alert("비밀번호를 4자 이상 입력해주세요!");
            return;
        } //비밀번호 형식체크
        
        if(password !== confirmPassword){
            alert("비밀번호 및 비밀번호확인이 다릅니다!");
            return;
        } //비밀번호 체크

        dispatch(signUp(signup_info)); //회원가입 회원정보 디스패치

        setSignUp_Info({
            email: "",
            nickname: "",
            password: "",
            confirmPassword: ""
        }) //인풋 초기화
    }
    const submitEnterSignUp = (e) => {
        if(e.key === "Enter"){
            submitSignUp();
        }
    }
    const doubleCheckEmail = useCallback(() => {
        dispatch(checkEmail(email));
    }, [email]); //이메일 중복체크 디스패치

    const doubleCheckNickname = useCallback(() => {
        dispatch(checkNickname(nickname));
    }, [nickname]); //닉네임 중복체크 디스패치

    const onKeyUp = () => {    //비밀번호 및 이메일 양식 맞을 때 버튼색 변화
        if(emailCheck(email) && pwdReg(password) && pwdReg(confirmPassword) ){
            setIs_Typed(true);
        }else{
            setIs_Typed(false);
        }
    }

    return(
        <React.Fragment>
            <SignUpWrap>
                <Container>
                    <Wrap>
                        <WelcomeWrap>
                            <p>Hello.</p>
                            <span>오늘의술에 오신걸 환영합니다!</span>
                        </WelcomeWrap>
                    </Wrap>
                    <InputWrap>
                        <InputSignUpWrap>
                            <InputSignUP
                                onChange={onChange}
                                onKeyUp={doubleCheckEmail}
                                name="email"
                                value={email}
                                placeholder="아이디를 입력해주세요"
                            ></InputSignUP>
                            <p
                            className={email_double === true ? "inputCheckDoubleEmailGreen" : "inputCheckDoubleEmailRed"}
                            >{email_check_text}</p>
                        </InputSignUpWrap>
                        <InputSignUpWrap>
                            <InputSignUP 
                                type="text"
                                // maxLength="7"
                                onChange={onChange}
                                onKeyUp={doubleCheckNickname}
                                name="nickname"
                                value={nickname}
                                placeholder="닉네임을 입력해주세요 (8자미만)"
                            ></InputSignUP>
                            <p
                            className={nickname_double === true ? "inputCheckDoubleNicknameGreen" : "inputCheckDoubleNicknameRed"}
                            >{nickname_check_text}</p>
                        </InputSignUpWrap>
                        <InputSignUP 
                            type="password"
                            onChange={onChange}
                            name="password"
                            value={password}
                            placeholder="비밀번호를 입력해주세요 (4자 이상)"
                        ></InputSignUP>
                        <InputSignUP 
                            type="password"
                            onKeyPress={submitEnterSignUp}
                            onChange={onChange}
                            onKeyUp={onKeyUp}
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="비밀번호를 한번 더 입력해주세요"
                        ></InputSignUP>
                        <div 
                            style={{marginTop: "100px",
                                    marginBottom: "80px"
                            }}
                            className={is_typed ? "yellowButton" : "whiteButton"}
                            onClick={submitSignUp}>
                            가입하기
                        </div>
                    </InputWrap>
                    <NavigationBar props={props}/>
                </Container>
            </SignUpWrap>
        </React.Fragment>
    )
} 

export default SignUp;

const SignUpWrap = styled.div`
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
    margin-top: 45px;

`;

const InputSignUpWrap = styled.div`
    width: 312px;
    height: 52px;
    margin: 9px auto;
`;

const InputSignUP = styled.input`
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