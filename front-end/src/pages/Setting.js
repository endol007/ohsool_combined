import React, {useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import "../share/style/loginButton.css";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import { changeNickname,
        checkNickname,
        changePassword,
        shareAgree,
        shareDisagree
} from "../redux/async/user";
import { is_Nickname } from "../redux/reducer/userSlice";
import { pwdReg } from "../share/checkReg";
import { CustomizedSwitches } from "../componentsMypage/MyBeerIndex";
import { otherStatus } from "../redux/reducer/mybeerSlice";
import { withDrawal } from "../redux/async/user";
import { userInfo } from "../redux/async/user";
import { OtherUserInfo } from "../redux/async/mybeer";

const Setting = (props) =>{
    const is_nickname = useSelector(is_Nickname); // 닉네임 중복체크 서버에서 응답
    const userInfos = useSelector(state => state.user.currentUser);
    const [nickname_check_text, setNickname_Check_Text] = useState("");
    const [nickname_double, setNickName_Double] = useState("");//비밀번호 alert
    const [nickname, setNickname] = useState(""); //회원정보 입력
    const [nick_change, setNick_Change] = useState(false); //닉네임 변경 버튼 클릭시 true로 바뀜
    const [passwords, setPasswords] = useState(
        {
            "password": "",
            "new_password": ""
        }
    ); //회원정보 입력
    const { password, new_password } = passwords;
    const [password_change,setPassword_Change] = useState(false) //비밀번호 변경 버튼 클릭시 true로 바뀜
    const othersInfo = useSelector(otherStatus);
    const [toggle,setToggle] = useState("");
    const [state, setState] = useState(//도감 공유 허용 여부
        toggle
      );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userInfo());
    }, [])

    useEffect(() => {
        dispatch(OtherUserInfo(userInfos.userId));
    }, [userInfos.userId])
    
    useEffect(()=>{

    },[state.checked])

    useEffect(() => { //좋아요된 상태면 좋아요 눌린걸로 아니면 false그대로
        if(othersInfo.is_public === true){
            setToggle(true);
            setState(toggle);

        }else{
            setToggle(false);
        }
    }, [othersInfo]);

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

    const clickNickConfirm=()=>{//변경된 정보 사항으로 디스패치
        if(nickname === ""){
            setNickname("");
            alert("닉네임을 다시 확인 해주세요!")
            return;
        } //공란 체크
        if(is_nickname?.message === "fail" && is_nickname?.error === "exist nickname"){
            setNickName_Double(false);
            setNickname("");
            alert("사용중인 닉네임입니다.");
            return;
        }
        else if(is_nickname?.message === "fail" && is_nickname?.error === "wrong nickname"){
            setNickName_Double(false);
            setNickname("");
            alert("사용할 수 없는 닉네임입니다.");
            return;
        }else if(nickname.length >= 8 ){
            setNickname("");
            alert("닉네임 글자 수는 8자 미만이어야합니다.");
            return;
        }else{
            setNickName_Double(true);
            if(window.confirm("닉네임을 변경하습니까?")){
                if(dispatch(changeNickname(nickname)))//dispatch(); 닉네임을 변경하는 api & 그 slice에서 변경되었습니다 띄우기!!
                    setNick_Change(false);
            }
            return;
        }
    }
    const clickPasswordConfirm=()=>{//변경된 정보 사항으로 디스패치

        if(new_password === "" ){
            alert("비밀번호를 다시 확인 해주세요!")
            return;
        } //공란 체크
    
        if(!pwdReg(new_password)){
            alert("새로운 비밀번호를 4자 이상 입력해주세요!");
            return;
        } //비밀번호 형식체크
        else{
            if(window.confirm("비밀번호를 변경하습니까?")){
                if(dispatch(changePassword(passwords)))//dispatch(); 닉네임을 변경하는 api & 그 slice에서 변경되었습니다 띄우기!!
                    setPassword_Change(false);
            }
            return;
        }

    }
    const doubleCheckNickname = useCallback(() => {
        dispatch(checkNickname(nickname));
    }, [nickname]); //닉네임 중복체크 디스패치

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    }

    const onChangePassword = (e) => {
        setPasswords({...passwords, [e.target.name]: e.target.value});
    }
    const confirmWithDrawl = ()=>{
        if(window.confirm("정말로 탈퇴하시겠습니까?")){
            dispatch(withDrawal());
            return;
        }
    }
    const clickSwitch = ()=>{//맥주 도감 공유 허용/비허용 상태 전환
        if(toggle===true){
            dispatch(shareDisagree());
            setToggle(false);
        }else{
            dispatch(shareAgree());
            setToggle(true);
        }
    }
    return (
        <>
        <Container>
            <Header/>
            <PageWrap>
                <InfoWrap>
                    <span>{userInfos.email}</span>
                </InfoWrap>
                {nick_change ? 
                <>
                <div style={{margin: "0 auto"}}>
                <InfoWrap><input
                        type="text"
                        onChange={onChangeNickname}
                        onKeyUp={doubleCheckNickname}
                        name="nickname"
                        value={nickname}
                        placeholder="닉네임을 입력해주세요 (8자미만)"
                    ></input>                
                    <ChangeButton
                        style={{marginBottom: "-2px"}}
                        onClick={()=>{
                            clickNickConfirm()
                        }}
                    >확인</ChangeButton>
                </InfoWrap>
                <p className={nickname_double === true ? "inputCheckDoubleNicknameGreen" : "inputCheckDoubleNicknameRed"}
                >{nickname_check_text}</p>
                </div>
                </>
                
                : <>
                    <InfoWrap>
                    <JustifyAlign>
                    <span>{"닉네임"}</span>
                    <ChangeButton
                        onClick={()=>{
                            setNick_Change(true)
                        }}
                    >변경</ChangeButton>
                    </JustifyAlign>
                    </InfoWrap>
                  </>
                }
                    {password_change ? 
                    <>
                    <InfoWrap>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        placeholder="기존 비밀번호를 입력해주세요"
                    ></input>
                </InfoWrap>
                <InfoWrap>
                    <input
                     type="password"
                     onChange={onChangePassword}
                     name="new_password"
                     value={new_password}
                     placeholder="비밀번호를 입력해주세요 (4자 이상)"
                    ></input>
                    <ChangeButton 
                    onClick={()=>{
                        clickPasswordConfirm();
                    }}style={{marginBottom: "-2px"}}>확인</ChangeButton>
                    </InfoWrap>
                    </>
                    :
                    <>
                    <InfoWrap>
                    <JustifyAlign>
                    <span>{"비밀번호"}</span>
                    <ChangeButton
                        onClick={()=>{
                            setPassword_Change(true)
                        }}
                    >변경</ChangeButton>
                    </JustifyAlign>
                    </InfoWrap>
                    </>
                    }
                <InfoWrap>
                    <JustifyAlign>
                        <span>{"맥주 도감 공유 허용하기"}</span>
                        <div style={{float: "right"}}>
                            <CustomizedSwitches
                            setState={setState}
                            state={state}
                            clickSwitch={clickSwitch}
                            toggle={toggle}
                        /></div>
                    </JustifyAlign>
                </InfoWrap>            
                <WithdrawalButton
                    style={{fontFamily: "Noto Sans KR"}}
                    onClick={confirmWithDrawl}
                >회원탈퇴
                </WithdrawalButton>
        </PageWrap>
        </Container>      
        <NavigationBar props={props}/>
        </>
    );
}

export default Setting;


const Container = styled.div`
    width: 100%;
    max-height: 100vh;
`;

const PageWrap = styled.div`
    width: 400;
    display: flex;
    flex-direction: column;
    test-align: center;
    margin: 0 auto;
    margin-top: 110px;
`;

const InfoWrap = styled.div`
    display: inline-block;
    margin: 0 auto;
    width: 312px;
    height: 44px;
    border-bottom: 0.5px solid #C4C4C4;
    margin-bottom: 18px;
    & > span{
        //line-height: 40px;
        margin-left: 24px;
        font-size: 14px;
        font-weight: bold;
    }
    & > input{
        width: 227px;
        height: 32px;
        border:none;
        outline: none;
        margin-left: 20px;
        outline: none;
        margin-bottom:2px;
        padding-bottom:2px;

    }
`;

const ChangeButton = styled.div`
    display: inline-block;
    padding-top: 6px;
    margin-bottom: 13px;
    width: 42px;
    height: 26px;
    border: 0.5px solid #888888;
    box-sizing: border-box;
    border-radius: 33px;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #333333;
    cursor: pointer;

`
const JustifyAlign = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 290px;
    & > span{
        line-height: 40px;
        margin-left: 24px;
        font-size: 14px;
        font-weight: bold;
    }
`

const WithdrawalButton = styled.div`
    position: absolute;
    width: 80px;
    height: 23px;
    bottom: 100px;
    left: 50%;
    margin-left: -30px;
    border: none;
    background-color: transparent;
    color: #FFC44F;
    cursor: pointer;
    font-weight: 700;
    font-size: 16px;
    font-family : inherit;
`;