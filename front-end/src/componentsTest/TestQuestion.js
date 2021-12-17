import React from "react";
import styled from "styled-components";

const TestQuestion = ({ question }) => { //question 객체 context API
    return(
        <React.Fragment>
            
            <QuestionWrap>
                <p>Q.</p>
                    {question.question.split("\n").map((line) => (
                    <span>{line}</span>))}
                    <ExplainWrap><span>{question.explain}</span></ExplainWrap>
                </QuestionWrap>
        </React.Fragment>
    )
}

export default TestQuestion;

const QuestionWrap = styled.div`
    font-family: "GmarketSansM";
    width: 320px;
    margin: 0 0 0 26px;
    & > p {
        font-size: 35px;
        color: #FFC44F;
        margin: 0 0 20px 0;
    }
    & > span {
        display: block;
        font-size: 25px;
        font-weight: normal;
    }
`;

const ExplainWrap = styled.div`
    margin: 10px 26px 0 0;
    & > span {
        display: block;
        font-size: 12px;
        font-weight: light;
    }


`