import React from "react";
import styled from "styled-components";
import { history } from "./redux/configureStore";
import "./share/style/TestHeader.css";
import { useSelector } from "react-redux";
import {is_Login} from "./share/checkLoginUser";

const myPage = "/images/myPage.png";
const beer = "/images/beer.png";
const feed = "/images/feed.png";
const myBeer = "/images/mybeer.png";

const NavigationBar = (props) => {//하단 네비게이션 바
    const userInfo = useSelector(state => state.user.currentUser);
    const pathNow = props.props.match.path;

    const goMyPage = () => {
        if(is_Login()){
            history.push("/myPage");
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login");
                return;
            }
        }
    }

    const goBeerDogam = () => {
        if(is_Login()){
            history.push(`/mybeer/${userInfo.userId}/dogam`);
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. \n로그인하고 나만의 맥주도감을 관리해보세요!✍")){
                history.push("/login");
                return;
            }
        }
    }


    return (
        <React.Fragment>
            <NavBox>
                <SearchWrap 
                    style={pathNow === `/mybeer/:userId/:dogam` ? {backgroundColor: "#F7F7F7"} : null}
                    onClick={goBeerDogam}>
                    <ImageWrap style={{backgroundImage: `url(${myBeer})`}}/>
                    <Text><span>MY BEER</span></Text>
                </SearchWrap>
                <SearchWrap
                    style={pathNow === "/beer" ? {backgroundColor: "#F7F7F7"} : null}
                    onClick={() => {
                    history.push("/beer/list/all")
                }}>
                    <ImageWrap style={{backgroundImage: `url(${beer})`}}/>
                    <Text><span>BEER LIST</span></Text>
                </SearchWrap>
                <SearchWrap
                    style={pathNow === "/feeds" ? {backgroundColor: "#F7F7F7"} : null}
                    onClick={() => {
                    history.push("/feeds")
                }}
                >
                    <ImageWrap style={{backgroundImage: `url(${feed})`}}/>
                    <Text><span>BEER FEED</span></Text>
                </SearchWrap>
                <SearchWrap
                    style={pathNow === "/mypage" ? {backgroundColor: "#F7F7F7"} : null}
                    onClick={goMyPage}>
                
                    <ImageWrap style={{backgroundImage: `url(${myPage})`}}/>
                    <Text><span>MY PAGE</span></Text>
                </SearchWrap>

            </NavBox>
        </React.Fragment>
    )
}

export default NavigationBar;

const NavBox = styled.div`
    max-width: 400px;
    height: 71px;
    z-index: 10;
    background-color: white;
    font-family: "GmarketSansM";
    display: flex;
    position:fixed; 
    border-top: 0.2px solid #F7F7F7; 
    justify-content: space-around;
    bottom:0;
    margin: 0 auto;
    left: 0;
    right: 0;
`;

const Text = styled.div`
    margin: 9px auto;
    & > span{
        font-size: 8px;
    }
`

const ImageWrap = styled.div`
    margin: 0 auto;
    margin-top: 13px;
    width: 22px;
    height: 22px;
    background-size: cover;
`;

const SearchWrap = styled.div`
    text-align: center;
    width:90px;
    cursor: pointer;
`;