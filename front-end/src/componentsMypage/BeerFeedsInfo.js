import React from "react";
import styled from "styled-components";

//피드의 맥주 사진및 맥주이름 정보
const BeerFeedsInfo = ({item}) => {
    return(
        <React.Fragment>
            <Container>
                <BeerImage>
                    <img src={item.beerId.image}></img>
                </BeerImage>
                <BeerInfo>
                    <NameKorean>{item.beerId.name_korean}</NameKorean>
                    <NameEnglish>{item.beerId.name_english}</NameEnglish>
                </BeerInfo>
            </Container>
        </React.Fragment>
    )
}

export default BeerFeedsInfo;

const Container = styled.div`
    display: flex;
    margin: 10px auto;
    width: 312px;
    height: 40px;
`;

const BeerImage = styled.div`
    width: 40px;
    height: 40px;
    border: 1px solid #C4C4C4;
    border-radius: 10px;
    & > img {
        width: 40px;
        height: 40px;
    }
`;

const BeerInfo = styled.div`
    color: #151515;
`;

const NameKorean = styled.span`
    display: block;
    font-size: 12px;
    margin: 5px 0 0 10px;
    font-weight: bold;
`;
const NameEnglish = styled.span`
    font-size: 10px;
    margin-left: 10px;
`;
