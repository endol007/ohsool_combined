//DrinkDetail에 들어갈 내용
import React,{useState} from 'react';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';
import {StarRate} from "./BeerDetailIndex";
import { history } from '../redux/configureStore';
import ReviewWriteModal from "../componentsBeerDetail/ReviewWriteModal";

const EachReview=(props)=> {
    const { item, beerOne, userId } = props; 
    const [modalOpen, setModalOpen] = useState(false); //수정 버튼 클릭시 리뷰 수정 모달 띄우기
    const is_my = true;
    const is_starsmall = true;
    const closeModal = () => {
        setModalOpen(false);
    };
    
    const date = item.date.replace(/-/g,'/');
    
    const pushOtherUserDogam = () => { //아이디 클릭시 타유저의 도감보기
        history.push(`/mybeer/${item.userId._id}/dogam`);
        return;
    }

    return (
        <React.Fragment>
        <Container>
            <Grid>
                <GridHorizon>
                    <Div>
                        <NicknameText onClick={pushOtherUserDogam}>
                            <img src={item.userId.image}></img>
                            <span>
                            {item.userId.nickname}</span>
                        </NicknameText>
                        <DateText>
                            <span style={{ fontWeight: "300", fontSize: "10px", lineHeight: "14.48px"}}>
                            {moment(date).fromNow()}
                            </span>
                        </DateText>
                    </Div>

                    <Div>
                        <StarRate init_star={item.rate} is_my={is_my} is_starsmall={is_starsmall}/>
                    </Div>

                </GridHorizon>
                <ReviewText>
                    <ReviewTextWrap>
                        {item?.review.length > 50 ?
                            <>{item?.review.slice(0,50)+'...'}
                            <br/>
                            <MoreButton onClick={(e)=>{
                                history.push(`/review/${item._id}`, item);
                            }}><span>도감 상세보기</span></MoreButton>
                            </>
                            : <>{item?.review}
                                <br/>
                                <MoreButton onClick={(e)=>{
                                history.push(`/review/${item._id}`, item);
                            }}><span>도감 상세보기</span></MoreButton></>
                        }
                    </ReviewTextWrap>               
                </ReviewText>
            </Grid>
        </Container> 

        <ReviewWriteModal
            open={modalOpen}
            close={closeModal}
            beerOne={beerOne}
            item={item}
            is_edit={true}
            mybeerId={item._id}
        ></ReviewWriteModal> 

        </React.Fragment>
    )
}

export default React.memo(EachReview);

const Container = styled.div`
    width: 312px;
    min-height: 110px;
    border-radius: 5px;
    margin: 5px auto;
    border:1.7px solid #c4c4c4;
    border-radius: 10px;
`

const Grid = styled.div`
    position: absolute;
    margin: 8px 14px;
`

const GridHorizon = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`

const Div = styled.div`
    display: flex;
    padding: 0 2px;
    align-items: center

`

const NicknameText =styled.div`
    display: flex;
    padding: 2px;
    cursor: pointer;
    align-items: center;
    & > span{
        font-weight: 700;
        font-style: normal;
        font-size: 14px;
    }
    & > img{
        margin-right: 5px;
        width: 24px;
        height: 24px;
    }

`

const DateText =styled.div`
    padding: 2px 7px;
    span{
        font-weight: 500;
        font-style: normal;
        font-sixe: 8px;
    }

`
const ReviewText = styled.div`
    margin: 5px;
    max-height: 55px;
    line-height: 17px;
    font-size: 12px;

`

const ReviewTextWrap = styled.div`
    width: 280px;
    word-break:break-all;
    word-wrap:break-word;
    & > span{
        margin-left: 14px;
        float: left;
        font-size: 12px;
        font-weight: 300;
        line-height: 17.38px;
    }
`;

const MoreButton = styled.div`
    float: left;
    padding: 4px 0;
    cursor: pointer;
    & > span{
        color:#FFC44F;
        font-weight: 700;
    }
`