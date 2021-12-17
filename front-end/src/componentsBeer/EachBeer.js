import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {history} from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { likeBeer, unLikeBeer, getHashtagWord} from "../redux/async/beer";
import { User } from "../redux/reducer/userSlice";
import { unLikeBeerDogam } from "../redux/async/mybeer";
import HeartButton from "./HeartButton";
import {is_Login} from "../share/checkLoginUser";


const EachBeer = (props) => {
    const dispatch = useDispatch();
    const { item, setHashtagName, page } = props; //beer
    const userId = useSelector(User); //유저아이디 스토어에서 가져오기
    const [toggle, setToggle] = useState(false); //좋아요 상태

    //like_array에 userId있으면 true 없으면 false
    useEffect(() => {
            if(item.like_array.includes(userId)){
                setToggle(true);
            }else{
                setToggle(false);
            }
    }, [item, userId]);
   
    //좋아요 누를때 로그인해있는지 판별하고 로그인되있으면 좋아요 취소 혹은 좋아요
    //로그인 안한 상태일경우 로그인페이지로
    const clickLike = () => { //좋아요 토글 함수
        if(is_Login()){
            if(toggle === true){
                if(window.confirm(`좋아요를 취소하시겠어요?`)){
                    dispatch(unLikeBeer(item._id));
                    dispatch(unLikeBeerDogam(item._id));
                    setToggle(false)
                    return;
                }
            }else{
                dispatch(likeBeer(item._id));
                setToggle(true);
            }
        }else{
            if(window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")){
                history.push("/login");
                return;
            }
        }
    }

    //해시태그 값 받아서 api요청
    const searchHashtagWord = (p) => {
        dispatch(getHashtagWord(p));
        setHashtagName(p);
    }
    const confirmIndex=(p,idx)=>{
        if(idx === 0){
            return(
                <>
                    <CountryTag 
                        onClick={(e)=>{//해시태그 클릭시 해당 해시태그 검색결과 출력
                            if(page==="beerList"){
                                e.preventDefault();
                                e.stopPropagation(); 
                                searchHashtagWord(p);
                            }
                        }}
                        key={idx}> #{p}
                    </CountryTag>
                </>
            )
        }else if(idx === 4){
            return(
                <>
                    <TasteTag 
                        onClick={(e)=>{//해시태그 클릭시 해당 해시태그 검색결과 출력
                            if(page==="beerList"){
                                e.preventDefault();
                                e.stopPropagation(); 
                                searchHashtagWord(p);
                            }
                        }}
                        key={idx}> #{p}
                    </TasteTag>
                </>

            )

        }
    }
    return(
        
        <React.Fragment>
             <RecommendBeerWrap 
                onClick={() => {
                    history.push(`/beer/detail/${item._id}`, item.like_array);
                }}>
                <BeerImage>
                    <img src={item.image} alt="beer_image">
                    </img>
                </BeerImage>
                <BeerInfoWrap>
                    <JustifyAlign>
                    <BeerName>{item.name_korean}</BeerName>
                    <HeartButton
                        _onClick={(e) => {
                            clickLike();
                            e.preventDefault();
                            e.stopPropagation();              
                        }}
                        is_like={toggle}
                    />
                    </JustifyAlign>
                    <p>{item.name_english}</p>
                </BeerInfoWrap>
                {item.hashtag.map((p, idx) => (
                    confirmIndex(p, idx)
                /*    
                idx === 4 ||idx === 0? //해시태그 2개만 정렬
                    <TasteTag 
                    onClick={(e)=>{//해시태그 클릭시 해당 해시태그 검색결과 출력
                        if(page==="beerList"){
                            e.preventDefault();
                            e.stopPropagation(); 
                            searchHashtagWord(p);
                        }
                    }}
                    key={idx}> #{p}
                    </TasteTag>:""
                */
                ))}
           
            </RecommendBeerWrap>
        </React.Fragment>
    )
}

export default React.memo(EachBeer);

const RecommendBeerWrap = styled.div`
    width: 148px;
    margin-bottom: 20px;
    margin-right: 16px;
    //z-index: 1px;
`;

const BeerImage = styled.div`
    width: 148px;
    height: 148px;
    border-radius: 13px;
    background-color: #F7F7F7;
    background-size: cover;
    cursor: pointer;
    & > img{
        width:130px;
        height: 130px;
        margin: 9px;
    }
    @media (img: img) {
        & > img { 
            width:130px;
            height: 130px;
            margin: 9px;
         }
    }
    @media (img: img) {
        & > img { 
            width:148px;
            height: 148px;
         }
    }
`;

const BeerInfoWrap = styled.div`
    width: 134px;
    margin: 10px 5px 0 5px;
    & p {
        margin: 0;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis
    }
`;


const BeerName = styled.p`
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis
`;

const TasteTag = styled.div`
    display: inline-block;
    margin-top: 2px; 
    margin-right: 3px;
    padding: 0 6px;
    height: 16px;
    border: 0.5px solid #888888;
    box-sizing: border-box;
    border-radius: 33px;
    font-size: 10px;
    line-height: 16px;
    text-align: center;
    color: #333333;
    cursor: pointer;
`;

const CountryTag = styled.div`
    display: inline-block;
    margin-top: 2px; 
    margin-right: 3px;
    padding: 0 6px;
    height: 16px;
    border: 0.5px solid #FCB425;
    box-sizing: border-box;
    border-radius: 33px;
    font-size: 10px;
    line-height: 16px;
    text-align: center;
    color: #FCB425;
    cursor: pointer;
`;

const JustifyAlign = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`