import React from "react";
import styled from "styled-components";
import TestHeader from "./TestHeader";

const BackgroundCateImage = ({ category }) => {
    const is_iphone = navigator.userAgent.toLowerCase(); //아이폰 노치디자인시 헤더좀더 밑으로

    return(
        <React.Fragment>
            <BackgroundImage style={{backgroundImage: `url(${category?.image})`}}>
                <BackgroundImageStyle> {/*이미지 블러처리*/}
                <TestHeader></TestHeader>
                <Wrap style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "40px"} : {marginTop: "0px"}}>
                    <TextWrap> 
                        <p>당신을 위한 <br/>오늘의 맥주는,</p>
                        <h1>‘{category?.name}’</h1>
                    </TextWrap>
                </Wrap>
                </BackgroundImageStyle>
            </BackgroundImage>
        </React.Fragment>
    )
}

export default BackgroundCateImage;

const BackgroundImage = styled.div`
    max-width: 400px;
    height: 270px;
    background-size: cover;
    justify-content: center;
`;

const BackgroundImageStyle = styled.div`
    display: flex;
    justify-content: center;
    max-width: 400px;
    height: 270px;
    opacity: 0.8;
    background: radial-gradient(66.94% 68.52% at 66.94% 53.82%, 
        rgba(12, 12, 12, 0) 50.82%, 
        rgba(12, 12, 12, 0.3) 100%);
`;

const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 360px;
`;

const TextWrap = styled.div`
    font-family: "GmarketSansM";
    display: inline-block;
    margin: 68px 0 0 16px;
    & > p {
        margin: 0;
        font-size: 20px;
        color: #FFFFFF;
    }
    & > h1 {
        margin-top: 9px;
        font-size: 35px;
        color: #FFFFFF;
    }
`;
