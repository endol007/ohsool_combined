import React, { useState } from "react";
import styled from "styled-components";
import "../share/style/TestHeader.css";

//goToNext 함수 및 question context API
const TestButton = ({ goToNext, question, testResultArray, setTestResultArray }) => {

    return (
        <React.Fragment>
            <ButtonWrap>
                <QuestionButton
                    onClick={() => { //선택한 버튼의 키값으로 다음문제 찾고 키값 배열에 저장
                        let choice = Object.keys(question[0]).join()
                        goToNext(choice);
                        setTestResultArray([...testResultArray, choice])
                    }}>
                    {Object.values(question[0])}
                </QuestionButton>
                <QuestionButton
                    onClick={() => {
                        let choice = Object.keys(question[1]).join()
                        goToNext(choice);
                        setTestResultArray([...testResultArray, choice])
                    }}>
                    {Object.values(question[1])}
                </QuestionButton>
                {question[2] ? 
                <QuestionButton 
                    onClick={() => {
                        let choice = Object.keys(question[2]).join()
                        goToNext(choice);
                        setTestResultArray([...testResultArray, choice])
                    }}>
                    {Object.values(question[2])}
                </QuestionButton> : ""}
            </ButtonWrap>
        </React.Fragment>
    )
}

export default TestButton;

const ButtonWrap = styled.div`
    width: 312px;
    margin: 0 auto;
    margin-top: 120px;
`;

const QuestionButton = styled.button`
    width: 312px;
    height: 82px;
    border: none;
    margin-bottom: 16px;
    border-radius: 18px;
    background-color: #F6F6F6;
    color: #555555;
    font-size: 16px;
    cursor: pointer;
    &:active{
        background-color: #FFC44F;
    }
    @media (active: active) {
        &:active { background-color: #FFC44F; }
    }
`;