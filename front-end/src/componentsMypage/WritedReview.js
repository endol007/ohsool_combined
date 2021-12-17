import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch,useSelector } from "react-redux";
import { ReviewWriteModal,StarRate } from "../componentsBeerDetail/BeerDetailIndex";
import { deleteReviewDogam } from "../redux/async/mybeer";
import { deleteBeerDogaminFeeds } from "../redux/async/review";
import moment from 'moment';
import 'moment/locale/ko';


const edit = "/images/edit.png";
const remove = "/images/remove.png";
 
const WritedReview = ({item}) =>   {//마이비어에 작성한 도감 표시
    const [modalOpen, setModalOpen] = useState(false);
    const userInfos = useSelector(state => state.user.currentUser);
    const date = item.date.replace(/-/g,'/');//ios 날짜 형식으로 변환

    const dispatch = useDispatch();

    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };

    return(
        <React.Fragment>
            <WritedBeerInfo 
                onClick={()=>{
                    history.push(`/review/${item._id}`, item)
                }}
            >
                <BeerImage>
                    <img src={item?.beerId?.image}></img>
                </BeerImage>
                <BeerTextWrap>
                    <GridHorizon>
                        <Div>
                        <NicknameText>
                            <span>
                            {item.userId.nickname}</span>
                        </NicknameText>
                        <DateText>
                            <span style={{ fontWeight: "300", fontSize: "10px", lineHeight: "14.48px"}}>
                            {  moment(date).fromNow()} {/* 현재시간과 비교해 작성 시간 표시 */}
                            </span>
                        </DateText>
                        </Div>

                        <Div style={{marginRight:"5px"}}>
                            <StarRate init_star={item.rate} is_my={true} is_starsmall={true}/>
                        </Div>


                    </GridHorizon>
                    <span>{item?.review.length > 35 ? item?.review.slice(0,35)+'...' : item?.review}</span>
                </BeerTextWrap>
                {userInfos.userId ===item?.userId._id ? //유저 본인인 경우에만 수정,삭제 버튼 보이기
                            <DivReview>
                            <EditButton 
                                style={{backgroundImage: `url(${edit})`}}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    openModal();
                            }}></EditButton>
                            
                            <DeleteButton
                                style={{backgroundImage: `url(${remove})`}} 
                                onClick = {(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if(window.confirm("정말로 삭제하시나요?")){
                                    dispatch(deleteBeerDogaminFeeds(item._id));
                                    dispatch(deleteReviewDogam(item._id));
                                    return;
                                }
                            }}></DeleteButton>
                            </DivReview>
                            : ""
                        }
            </WritedBeerInfo>

            <ReviewWriteModal
                open={modalOpen}
                close={closeModal}
                //beerOne={item}
                item={item}
                is_edit={true}
                mybeerId={item._id}//수정시 해당 id로 리뷰 접근
            ></ReviewWriteModal> 
        </React.Fragment>
    )
}

export default WritedReview;

const WritedBeerInfo = styled.div`
    width: 312px;
    height: 110px;
    display: flex;
    background-color: #F6F6F6;
    border-radius: 10px;
    margin: 5px auto;
    cursor: pointer;
`;

const BeerImage = styled.div`
    margin: 10px;
    border-radius: 10px;
    width: 80px;
    height: 90px;
    background-color: #FFFFFF;
    & > img{
        width: 80px;
        height: 80px;
    }
`;

const BeerTextWrap = styled.div`
    margin: 14px 0 0 6px;
    width: 200px;
    word-break: break-all; 
    word-wrap: break-word;
    & > span{
        font-size: 12px;
        font-weight: 300;
        width: 150px;
        height: 50px;
    }
`;

const GridHorizon = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;
`;

const NicknameText = styled.p`
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;

const Div = styled.div`
    display: flex;
    padding: 0 2px;
`;

const EditButton =styled.div`
    width: 16px;
    height: 16px;
    cursor: pointer;
`

const DeleteButton =styled.div`
    width: 16px;
    height: 16px;
    cursor: pointer;
`

const DateText =styled.div`
    span{
        padding-left: 4px;
        line-height: 20px;
        font-weight: 500;
        font-style: normal;
        font-sixe: 8px;
    }

`
const DivReview = styled.div`
    position: absolute;
    left: 50%;
    margin-left: -50px;
    margin-top: 80px;
    display: flex;
    width: 50px;
    justify-content: space-around;
`