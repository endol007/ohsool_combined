import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {socialLoginUser} from "../redux/async/user";

const SocialLoginUserInfo = (props) => {
    const { open, close } = props;
    const dispatch = useDispatch();

    const [socialUserInfo, setSoccialUserInfo] = useState({
        email: "",
        nickname: "",
    })
    const {email, nickname} = socialUserInfo;

    const onChange = (e) => {
        setSoccialUserInfo({...socialUserInfo, [e.target.name]: e.target.value});
    }

    const sendSocialLoginUserInfo = () => {
        dispatch(socialLoginUser(socialUserInfo));
    }

    return(
        <React.Fragment>
        {open ?
        <Background>
                <ModalWrap>
                <Div>
                    <SuggestTitle>
                        <span>사용할 이메일 및 닉네임</span>
                    </SuggestTitle>
                    <SubmitText 
                        onClick={sendSocialLoginUserInfo}
                        >
                        <span>보내기</span>
                    </SubmitText>
                </Div>
                <SuggestInputTitle
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="email"
                >
                </SuggestInputTitle>
                <SuggestInputTitle
                    name="nickname"
                    value={nickname}
                    onChange={onChange}
                    placeholder="Nickname"
                >
                </SuggestInputTitle>
            </ModalWrap>
        </Background>
        : <></> }
    </React.Fragment>
    )
}

export default SocialLoginUserInfo;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.50);
    animation: fadeIn .5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    z-index: 9999;
    display: flex;
    justify-content: center;
`;

const WhiteSpace = styled.div`
    width: 100vw;
    height: 100vh;
`;

const ModalWrap = styled.div`
    position: absolute;
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    background-color: #F6F6F6;
    border-radius: 10px;
    top: 30%;
    width: 360px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    @keyframes scaleUp {
        0% {
            transform: scale(.8) translateY(1000px);
            opacity: 0;
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;

const SuggestInputTitle = styled.input`
    width: 312px;
    height: 40px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 12px;
    outline: none;
    margin: 0 auto;
    border: none;
    background: #FFFFFF;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-bottom: 10px;
`;
const Div = styled.div`
    margin: 0 auto;
    width: 318px;
    display: flex;
    justify-content: space-between;
    align-items: center;

`
const SuggestTitle = styled.div`
    height: 50px;
    //width: 280px;
    //text-align: left;
    & > span {
        position: absolute;
        margin: 17px 0 0 10px;
        font-size: 14px;
        font-weight: 700;
    }
`;

const SubmitText= styled.div`
    & > span{
        margin: 20px 15px -5px 0;
        font-weight: 700;
        font-size: 14px;
        line-height: 20.27px;
    }
`;