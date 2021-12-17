import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { testShare } from "../redux/async/beer";
import { recommendCate, recommendBeerToday } from "../redux/reducer/beerSlice";
import NavigationBar from "../NavigationBar";
import BackgroundCateImage from "../componentsTest/BackgroundCateImage";
import { ResultInfo } from "../componentsTest/TestIndex";
import { EachBeer } from "../componentsBeer/BeerIndex";

const TestResult = (props) => {
    const dispatch = useDispatch();
    const categoryParams = props.match.params.category;
    //테스트 후 나온 결과(카테고리)
    const category = useSelector(recommendCate);
    //테스트 후 나온 결과(맥주추천)
    const beerRecommends = useSelector(recommendBeerToday);

    //새로고침시에 데이터 새로 요청 
    useEffect(() => {
        if(categoryParams === "Lager" 
        || categoryParams === "Pilsner" 
        || categoryParams === "Ale" 
        || categoryParams === "IPA" 
        || categoryParams === "Weizen"
        || categoryParams === "Dunkel" 
        || categoryParams === "Stout" 
        || categoryParams === "Bock"){
        dispatch(testShare({
            result: categoryParams
        }));
        }
    }, []);

    return (
        <React.Fragment>
            <Grid>  
                <BackgroundCateImage category={category}/>
                    <ResultInfo category={category}/>
                    <List>{/* 해당 카테고리 맥주 2종 추천 */}
                        {beerRecommends?.map((item, idx) => (
                            <EachBeer key={idx} item={item} page={"notBeerList"}></EachBeer>
                        ))}
                    </List>
                <ReButton
                    onClick={() => {
                        history.push("/test/");
                    }}
                >다시 하기
                </ReButton>
            </Grid>
            <NavigationBar props={props}/>
        </React.Fragment>
    )
}

export default TestResult;

const Grid = styled.div`
    max-width: 400px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-bottom: 80px;
`;
const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const ReButton = styled.div`
    text-align: center;
    color: #FFC44F;
    font-size: 14px;
    font-weight: bold;
    line-height: 45px;
    width: 308px;
    height: 45px;
    margin: 0 auto;
    margin-top: 30px;
    background-color: transparent;
    border: 1px solid #FFC44F;
    border-radius: 22.5px;
    & > img{
        margin-left: 4px;
        width: 11px;
        height: 11px;
    }
    cursor: pointer;
`;