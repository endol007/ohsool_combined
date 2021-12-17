import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { history } from "../redux/configureStore";
import "../share/style/TestHeader.css";

const backWhite = "/images/testHeaderBack.png";
const backBlack = "/images/Back.png";

//테스트페이지 헤더
const TestHeader = (props) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const is_iphone = navigator.userAgent.toLowerCase(null);

    const _updateScroll = _.throttle(() => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }, 300); //스크롤 쓰로틀로 제어

    useEffect(()=>{
        window.addEventListener('scroll', _updateScroll); //스크롤이벤트 구독
        return() => {
            window.removeEventListener('scroll', _updateScroll); //스크롤이벤트 해제
        }
    }, [scrollPosition]);

    return (
        <React.Fragment>
            <div className={is_iphone.indexOf("iphone") !== -1 ? "iphoneHeaderTest" : "headerTest"}>
            {scrollPosition < 270 ?  //270밑으로 내려갔을때 헤더 글자색 바뀌게
                (<HeaderBox>             
                    <Back style={{backgroundImage: `url(${backWhite})`}}
                    onClick={()=>{ 
                        history.goBack();
                    }}></Back>
                    <WhiteHeaderLogo 
                        onClick={() => {
                        history.push("/")
                        }}>오늘의술
                    </WhiteHeaderLogo>
                    <WhiteUserImage
                    ></WhiteUserImage>
                    </HeaderBox>
                    )
                :
                (<HeaderBox>
                    <Back style={{backgroundImage: `url(${backBlack})`}}
                    onClick={()=>{ 
                        history.goBack();
                    }}></Back>
                    <BlackHeaderLogo 
                    onClick={() => {
                    history.push("/")
                    }}>오늘의술</BlackHeaderLogo>
                    <BlackUserImage
                    ></BlackUserImage>
                    </HeaderBox>
                    )
                 }
            </div>
        </React.Fragment>
    )
}

export default TestHeader;

const HeaderBox = styled.div`
    width: 360px;
    display: flex;
    z-index: 9999;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
`;

const Back = styled.div`
    width: 24px;
    height: 24px;
    background-size: cover;
    margin: 10px 0 0 12px;
    cursor: pointer;
`;

const BlackHeaderLogo = styled.div`
    font-family: "GmarketSansM";
    display: inline-block;
    font-size: 20px;
    line-height: 45px;
    color: #333333;
    font-weight: bold;
    cursor: pointer;

`;
const WhiteHeaderLogo = styled.div`
    font-family: "GmarketSansM";
    display: inline-block;
    font-size: 20px;
    line-height: 45px;
    color: #FFFFFF;
    font-weight: bold;
    cursor: pointer;
`;

const WhiteUserImage = styled.div`
    width: 24px;
    height: 24px;
`;

const BlackUserImage = styled.div`
    width: 24px;
    height: 24px;
`;