import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const UserPreference = ({userInfos, is_me, othersInfo}) => {
    const is_iphone = navigator.userAgent.toLowerCase();

    const userTypeText = () => {
        if(userInfos.preference === 'Unknown'){//테스트 하지 않은 경우 안내 글과 테스트로 이동버튼 표시
           return( 
           <>
           <span>안녕하세요 <strong>{userInfos.nickname}</strong>님!</span><br/>
            <Typetext><strong>테스트 진행 후</strong> 이곳에 <br/>고객님의 <strong>맥주 타입</strong>이 보여집니다.</Typetext>
            <TestButton
                onClick={()=>{
                    history.push("/test");
                }}
            >테스트 하기</TestButton>
            </>
            )
        }else{//테스트 한 경우 유저의 preference로 텍스트 표시
            return(
                <>
            <span>안녕하세요 <strong>{userInfos.nickname}</strong>님!</span><br/>
            <span>오늘의술은 <strong>{userInfos.preference}</strong>입니다.</span>
            </>
            )
        }
    }
    const otherUserTypeInfo = () => {
           return(
                <span>어서오세요.  
                <strong> {othersInfo.nickname}</strong>
                    님의<br/> 맥주도감입니다.
                </span>
           )
    }

    return(
        <React.Fragment>
            <Container style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "115px"} : {marginTop: "75px"}}>
                {userInfos.message !== "success" ? 
                <>
                    <PreferenceWrap
                    style={{backgroundImage: `url(${userInfos.image})`}}
                    >
                    </PreferenceWrap>
                    <UserInfoWrap>
                        <span>안녕하세요!</span><br/>
                        <span>오늘의술입니다.</span>
                    </UserInfoWrap>
                </> 
                :
                <>
                    <PreferenceWrap
                    style={{backgroundImage: `url(${userInfos.image})`}}
                    >
                    </PreferenceWrap>
                    <UserInfoWrap>
                        {is_me ? userTypeText()
                        : otherUserTypeInfo()    
                        }
                    </UserInfoWrap>
                </>
                }
            </Container>
        </React.Fragment>
    )
}

export default UserPreference;

const Container = styled.div`
    display: flex;
    margin-top: 75px;
    width: 300px;
    height: 65px;
    margin: 0 auto;
`;

const PreferenceWrap = styled.div`
    display: flex;
    justify-content: center;
    width: 65px;
    height: 65px;
    background-size: cover;
    border-radius: 65px;
`;

const UserInfoWrap = styled.div`
    margin: 12px 0 0 16px;
    width: 223px;
    height: 46px;
    & > span {
        font-size: 16px;
        line-height: 146.5%;
    }
    & > span > strong{
        font-color: #151515;
        font-weight: bold;
    }
`;
const Typetext = styled.div`
    font-size: 12px;
    padding-top: 4px;

`
const TestButton = styled.div`
    float: right;    
    cursor: pointer;
    color: #FFC44F;
    font-size: 12px;
    margin-right: 37px;
    border-bottom: 1px solid #FFC44F;

`