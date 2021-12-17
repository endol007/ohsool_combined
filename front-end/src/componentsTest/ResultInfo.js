import React from "react";
import styled from "styled-components";
import ShareButton from "./ShareButton";

const ResultInfo = ({ category }) => {
    
    return(
        <React.Fragment>
            <BackgroundCateInfo>
                <Div>
                <p>{category?.title}</p>
                <ShareButton
                    name={category?.name} 
                    description={category?.description} 
                    image={category?.image}
                ></ShareButton>
                </Div>
                <span>{category?.description}</span>
            </BackgroundCateInfo>
            <RecommendCategory>오늘의 추천 {category?.name}</RecommendCategory>
        </React.Fragment>
    )
}

export default ResultInfo;

const BackgroundCateInfo = styled.div`
    width: 312px;
    margin: 20px auto;
    & > p {
        font-size: 14px;
        font-weight: bold;
    }
    & > span{
        font-size: 14px;
        line-height: 146.5%;
        color: #555555;
    }
`;

const RecommendCategory = styled.p`
    width: 312px;
    margin: 20px auto;
    font-size: 14px;
    font-weight: bold;
`;

const Div = styled.div`
    width: 340px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;