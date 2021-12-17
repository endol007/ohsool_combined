import React from "react";
import styled from "styled-components";

const NoSearchResult = () => {
    return (
        <Container>
            <Grid>
                <Wrap><span>🍻검색 결과가 없습니다.🍻</span></Wrap>
            </Grid>
        </Container>
    )

}
export default NoSearchResult;

const Container = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
`;
const Grid = styled.div`
    width: 360px;
    margin: 0 auto;
    bottom: 80px;
`
const Wrap = styled.div`
    //margin-left:50spx;
    //margin: 0 auto;
    margin-top: 150px;
    text-align: center;
`