import React, { useState } from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import { mapReport } from "../redux/async/suggest";
import MapImage from "./MapImage";
import Header from "../Header";

const PlaceBeer = (props) => {
    const dispatch = useDispatch();
    const [clickReport, setClickReport] = useState();
    const is_iphone = navigator.userAgent.toLowerCase();
    const beerId = props.location.state;

    const ReportPlace = () => {
        if(!clickReport){
            return alert("위치를 선택해주세요!!");
        };
        const mapData = {
            beerId: beerId,
            name: clickReport.place_name,
            address: clickReport.address_name,
            url: clickReport.place_url,
          } //api요청 데이터 형식
        if(window.confirm(`${clickReport.place_name}을 제보하시겠어요?`)){
            dispatch(mapReport(mapData)); //검색한 장소 서버에 저장
        }else{
            return alert("취소되었습니다!");
        }
    }
    return(
        <React.Fragment>
            <Header/>
            <MapWrap style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "80px"} : {marginTop: "40px"}}>
                <MapImage setClickReport={setClickReport}></MapImage>
            </MapWrap>
            <PlaceInfoWrap style={is_iphone.indexOf("iphone") !== -1 ? {top: "550px"} : {Top: "510px"}}>
                {clickReport ? <PlaceInfo>
                    <div>
                    <span style={{
                        fontSize: "14px", 
                        fontWeight: "500",
                        color: "#151515",
                        }}>{clickReport.place_name}</span>
                    <span style={{
                        marginLeft: "6px",
                        fontSize: "10px", 
                        fontWeight: "500",
                        color: "#C4C4C4",
                        }}>{clickReport.category_group_name}</span>
                    <br></br>
                    <span style={{
                        fontSize: "14px",
                        fontWeight: "300",
                        color: "#151515",
                        }}>{clickReport.address_name}</span>
                    </div>
                </PlaceInfo> : ""}
                <div style={{textAlign: "center"}}>
                    <PlaceButton 
                    onClick={ReportPlace}>
                        장소 제보하기
                    </PlaceButton>
            </div>
            </PlaceInfoWrap>


        </React.Fragment>
    )
}

export default PlaceBeer;



const MapWrap = styled.div`
    width: 100%;
    height:510px;
`;

const PlaceInfoWrap = styled.div`
    position: absolute;
    top: 510px;
    width: 100%;
    height: 160px;
    & > div > button {
        width: 312px;
        height: 45px;
        border: 1px solid #FFC44F;
        background-color: #FFFFFF;
        color: #FFC44F;
        border-radius: 22.5px;
        box-sizing: border-box;
        margin-top: 16px;
        cursor: pointer;
    }
`;

const PlaceInfo = styled.div`
    width: 100%;
    border-bottom: 0.5px solid #C4C4C4;
    & > div{
        margin: 20px 0 20px 24px;
    }
`;
const PlaceButton = styled.button`
    text-align: center;
    color: #FFC44F;
    font-size: 14px;
    font-weight: bold;
    line-height: 45px;
    width: 308px;
    height: 45px;
    margin: 0 auto;
    margin-top: -10px;
    background-color: transparent;
    border: 1px solid #FFC44F;
    border-radius: 22.5px;
    cursor: pointer;
`;