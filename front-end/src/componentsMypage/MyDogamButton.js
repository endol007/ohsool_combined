import React from "react";
import styled from "styled-components";
import "../share/style/myBeer.css";
import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";

const MyDogamButton = ({is_Dogam}) => {
    const { userId } = useParams();
    //url파라미터 받아서 버튼클릭
    return(
        <React.Fragment>
            <ButtonContainerWrap>
                    <button
                        className={is_Dogam === true ? 
                            "clickedButtonContainer" : "buttonContainer"} //클릭시 css변경
                        onClick={()=>{
                            history.push(`/mybeer/${userId}/dogam`);
                        }}>
                        맥주도감
                    </button>
                    <button
                        className={is_Dogam === false ? 
                            "clickedButtonContainer" : "buttonContainer"} //클릭시 css변경
                        onClick={()=>{
                            history.push(`/mybeer/${userId}/like`);
                        }}>
                        좋아요한 맥주
                    </button>
                </ButtonContainerWrap>
        </React.Fragment>
    )
}

export default MyDogamButton;

const ButtonContainerWrap = styled.div`
    display: flex;
    width: 312px;
    margin: 0 auto;
    margin-bottom: 17px;
    justify-content: space-between;
    & > button {
        font-family: Noto Sans KR;
    }
`;