import React ,{useState,useEffect} from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import "../share/style/ReviewWriteModal.css";
import { StarRate, SelectBar} from "./BeerDetailIndex";
import { writeReview} from "../redux/async/review";
import {editReviewDogam} from "../redux/async/mybeer";
import { starRateDetail } from "../redux/async/beer";

const remove = "/images/remove.png";

const ReviewWriteModal = (props) => {//도감 작성 모달창

    const { open, close, beerOne, item, is_edit, mybeerId } = props; 
    const taste_data = ["쓴맛", "청량감", "향", "단맛", "고소한맛"];
    const [review, setReview] = useState("");
    const [starScore, setStarScore] = useState(0);
    let arr = Array(5);
    const [featuresList, setFeaturesList] = useState(arr.fill(0));
    const [list, setList] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if(item) {
          setList(Object.values(item?.myFeatures));
        }
    }, [item]);

    useEffect(()=>{
        setReview(item?.review);
        setStarScore(item?.rate);
    },[])

    const addReview = () => { //작성하기 버튼 클릭시 
        if(review === "" || starScore === undefined){
            alert("답하지 않은 문항이 있어요!")
            return;
        }else if(review.length > 300){
            alert("글자수는 300 글자를 넘을 수 없어요!");
            return;
        }
        dispatch(writeReview({//해당 맥주에 '느낀 맛, 별점, 리뷰'를 묶어 전달
            myFeatures: {
                bitter: featuresList[0], 
                crispy: featuresList[1], 
                flavor: featuresList[2], 
                sweet: featuresList[3], 
                nutty: featuresList[4],
            },
            location: "default",
            rate: starScore,
            review: review,
            beerId: beerOne._id
        }));
        dispatch(starRateDetail(starScore));
        alert("작성 완료!🍻");
        //값 초기화
        setReview("");
        setStarScore(0);
        setFeaturesList(arr.fill(0));
        close();
    }
    const updateReview = () => {//수정시 도감 기존 데이터 불러오기
        dispatch(editReviewDogam({
            myFeatures: {
                bitter: featuresList[0], 
                crispy: featuresList[1], 
                flavor: featuresList[2], 
                sweet: featuresList[3], 
                nutty: featuresList[4]
            },
            location: "default",
            rate: starScore,
            review: review,      
            mybeerId: mybeerId,
        }));
        alert("수정 완료!🍻");
        setReview("");
        setStarScore(0);
        setFeaturesList(arr.fill(0));
        close();
    }

    const onChange = (e) => {
        setReview(e.target.value);
        if(e.target.value.length > 300){
            alert("300글자를 초과할 수 없어요!")
        }
    }
    return(
        <React.Fragment>
            {open ? 
            <Background>
                <ModalWrap>
                    <SuggestTitle onClick={close}>
                        <span>맥주도감 쓰기</span>
                    </SuggestTitle>
                    <CloseIcon 
                     style={{backgroundImage: `url(${remove})`}}
                    onClick={close}/>
                    <BeerInfo>                        
                        {is_edit ? (
                            <BeerImage style={{backgroundImage: `url(${item.beerId.image})`}}/>
                        ):(
                            <BeerImage style={{backgroundImage: `url(${beerOne.image})`}}/>
                        )}
                            {is_edit ? ( 
                                 <>
                                    <BeerTextarea 
                                        tpye="text"
                                        maxLength="300"
                                        onChange={onChange}
                                        review={review}
                                        placeholder={""}
                                    >{item.review}</BeerTextarea>
                                 </>
                            ):(
                                <>
                                    <BeerTextarea 
                                        tpye="text"
                                        maxLength="300"
                                        onChange={onChange}
                                        review={review}
                                        placeholder={"맥주에 대한 \n평가와 소감을 적어주세요.\n(300자 이내)"}
                                    ></BeerTextarea>
                                </>
                            )}

                    </BeerInfo>
                            <Div> {/* 별점 묶음 */}
                                <span style={{margin: "0 auto", fontWeight: "bold"}}>별점</span>
                                {is_edit ? ( 
                                    <>
                                        <StarRate setStarScore={setStarScore} init_star={item.rate}/>
                                    </>
                                ):(
                                    <>
                                        <StarRate setStarScore={setStarScore} init_star={0}/>
                                    </>
                                )}
                            </Div>

                            <div style={{width: "360px", height: "240px"}}>
                            <TasteFlavorWrap> {/* 질문 유형 */}
                                {taste_data.map((taste) => 
                                    (<span>{taste}</span>)
                                )}
                            </TasteFlavorWrap>

                                {is_edit ? (
                                    <> {/* {setFeaturesList(item.myFeatures)}*/}
                                        <TasteScoreWrapEdit> {/* 셀렉트 바 */}

                                        {list.map((taste, idx) => (
                                        <SelectBar key={idx} index={idx} setFeaturesList={setFeaturesList} 
                                            featuresList={featuresList} taste={taste} is_edit={true}/>
                                        ))}
                                        </TasteScoreWrapEdit>
                                    </>
                                ):(
                                    <>
                                        <TasteScoreWrapAdd>
                                        {arr.map((taste, idx) => (
                                        <SelectBar key={idx} index={idx} setFeaturesList={setFeaturesList} 
                                            featuresList={featuresList} taste={taste} is_edit={false}/>
                                        ))}
                                        </TasteScoreWrapAdd>
                                    </>
                                )}
                            
                            </div>
                        {is_edit ? (
                            <ReviewButton>
                                <button
                                onClick={() => {
                                    updateReview();
                                }}>도감 수정하기
                                </button>
                            </ReviewButton>
                        ):(
                            <ReviewButton>
                                <button
                                onClick={() => {
                                    addReview()
                                }}>
                                도감 작성하기
                                </button>
                            </ReviewButton>
                        )}
                </ModalWrap>
            </Background>
            : null }
        </React.Fragment>
    )
}

export default React.memo(ReviewWriteModal);

const Background = styled.div`
    position: fixed;
    z-index: 3;
    //position: fixed !important;
    //z-index: 9999;
    top: 0;
    left: 0;
    bottom: 71px;
    right: 0;
    background-color: rgba(0,0,0,0.50);
    animation: fadeIn .5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    display: flex;
    justify-content: center;
 
`;

const ModalWrap = styled.div`
    position: fixed !important;
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    background-color: #FFFFFF;
    border-radius: 10px 10px 0 0;
    bottom: 71px;
    width: 360px;
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

const SuggestTitle = styled.div`
    height: 50px;
    width: 280px;
    text-align: left;
    & > span {
        position: absolute;
        margin: 20px 0 0 24px;
        font-size: 14px;
        font-weight: bold;
    }
`;


const CloseIcon = styled.div`
    position: absolute;
    right: 24px;
    top: 22px;
    width: 16px;
    height: 16px;
    cursor: pointer;
`;


const BeerInfo = styled.div`
    width: 328px;
    display: flex;
    margin: 10px auto;
`;

const BeerImage = styled.div`
    border-radius: 10px;
    margin: 0 10px;
    width: 100px;
    height: 100px;
    background-size: cover;
    border:1.7px solid #c4c4c4;

`;

const BeerTextarea = styled.textarea`
    outline: none;
    width: 188px;
    padding: 10px;
    height: 80px;
    resize:none;
    border-radius: 10px;
    border:1.7px solid #c4c4c4;
    font-size: 12px;
`;

const Div = styled.div`
    margin: 5px auto;
    display: flex;
    flex-direction: column;
    text-align: center;  
`
const ReviewButton = styled.div`
    text-align:center;
    margin: 20px auto;
    & > button{
        width: 308px;
        height: 45px;
        border-radius: 22.5px;
        border: 1px solid #FFC44F;
        color: #FFC44F;
        font-weight: bold;
        background-color: #FFFFFF;
        cursor: pointer;
    }
`
const TasteFlavorWrap = styled.div`
    position: absolute;
    margin-top: -12px;
    margin-left: 30px;
    margin-bottom: 0px;
    display: inline-block;
    
    & > span {
        margin: 28px 0 13px 0;
        display: block;
        font-size: 14px;
        font-weight: 700;
        line-height: 20.27px;
    }
`;

const TasteScoreWrapEdit = styled.div`
    float: right;
    width: 200px;
    height: 240px;
    display: inline-block;
    margin: 20px 30px 0 47px;
`;

const TasteScoreWrapAdd = styled.div`
    float: right;
    width: 200px;
    height: 240px;
    display: inline-block;
    margin: -20px 30px 0 47px;
`;