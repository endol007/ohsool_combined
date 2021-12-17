import React from "react";
import styled from "styled-components";

const Logo = "/images/mainLogo.png";

const MainLogo = () => {
    return(
        <React.Fragment>
            <ImageBlurWrap>
            </ImageBlurWrap>
            <ImageGridcenter>
                <MainLogoWrap>
                    <img alt="메인로고" src={Logo}></img>
                </MainLogoWrap>
                <MainLogoText>오늘의술</MainLogoText>
            </ImageGridcenter>
        </React.Fragment>
    )
}

export default MainLogo;

const ImageGridcenter = styled.div`
    position: absolute;
    top: 115px;
    left: 50%;
    margin-left: -63px;
    height: 141px;
    z-index: 10;
`;

const ImageBlurWrap = styled.div`
    justify-content: center;
    align-items: center;
    margin: 37px auto;
    width: 250px;
    height: 250px;
    border-radius: 250px;
    background-color: #000000;
    filter: blur(50px);
    opacity: 0.7;
`;
const MainLogoWrap = styled.div`
    display: inline-block;
    background-size: cover;
    width: 89px;
    height: 61px;
    & > img {
        width: 89px;
        height: 61px;
        background: none;
    }
`;

const MainLogoText = styled.div`
    font-family: "GmarketSansM";
    margin-top: 20px;
    width: 125px;
    height: 32px;
    font-size: 32px;
    color: #FFFFFF;
`;