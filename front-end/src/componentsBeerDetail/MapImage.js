import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Loader from "../share/Loader";

const imagesrc = "/images/marker.png";

const MapImage = ({setClickReport}) => {
        const kakao = window.kakao; //카카오객체 불러오기
        const container = useRef(null); //맵 컨테이너 Ref로 받아오기 
        const inputRef = useRef(null); //지도에 검색한 값 받아오기
        const [mapState, setMapState] = useState(false);
        const [loadingMap, setLoadingMap] = useState(false); //맵 로딩전까지 로더 보여주기 
        let map;

        const placeView = async () => {
            await findLocation();
        } 

        useEffect(() => { // 카카오 맵 실행
            if(kakao?.maps !== undefined){
                setMapState(true);
            }
            placeView();
        }, [mapState]);
        
        const findLocation  = (place) => {//사용자의 현위치 허용/차단 여부 반영
            if (navigator.geolocation.getCurrentPosition) {  // 현위치로 맵 위치 변경
                setLoadingMap(true)
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    setLoadingMap(false);
                    makeMap(place, lat, long);
                });
            } else {  // 현위치를 못 불러올 때 default 위치 적용
                setLoadingMap(true)
                const lat = 37.4995482;
                const long = 127.0291611;
                makeMap(place, lat, long);
            }
        }

        const makeMap = (place, lat, long) => {
            const options = {
                center: new kakao.maps.LatLng(lat, long),
                level: 3
            };    // 카카오 맵 생성

            map = new kakao.maps.Map(container.current, options); //맵객체

            if (place) {  // keyword of address
                const places = new kakao.maps.services.Places();
                // place 키워드로 장소검색
                places.keywordSearch(place, placesSearchWithKeyword); 
            }
        }

        const placesSearchWithKeyword = (data,status, pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();

                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i]);  // show markers of searched places

                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                map.setBounds(bounds);
            } 
        }

        const displayMarker = (place) => {//마커 표시하기
            const imageSrc = imagesrc, // 마커이미지 주소
                imageSize = new kakao.maps.Size(24.56, 33.4), // 마커이미지의 크기
                imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커의 좌표와 일치시킬 이미지 안에서의 좌표 설정
            
             const markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
            );   

            const marker = new kakao.maps.Marker({
                map: map,
                image: markerImage,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            const infowindow = new kakao.maps.InfoWindow({zIndex:1});

            const placeInfo = () => {
                infowindow.setContent(`
                <div style="
                    padding:5px;
                    font-size:12px;"> 
                ${place.place_name}
                </div>`);
            }

            kakao.maps.event.addListener(marker, 'click' , function() {  // if i click marker
                placeInfo();
                infowindow.open(map, marker);
                setClickReport(place);
            });
        }

        function searchbtnclicked() { //입력된 장소명으로 장소 검색

            const place = inputRef.current.value;

            findLocation(place);
        }

        const SearchPlace = (e) => {
            if(e.key === "Enter"){
                searchbtnclicked();
            }
        }

    return(
        <React.Fragment>
            <InputWrap onKeyPress={SearchPlace}>
                <SearchInput 
                ><input 
                ref={inputRef}
                placeholder="검색어를 입력하세요"
                /></SearchInput>
            </InputWrap>
            {loadingMap === true ? <LoaderWrap><Loader/></LoaderWrap>
            :
            <div 
                className= "map"
                ref={container}
                style={{width:"400px", height:"400px", margin: "0 auto"}}>
            </div>
            }
        </React.Fragment>
    )
}

export default React.memo(MapImage);

const InputWrap = styled.div`
    margin-top: 40px;
    width: 100%;
`;

const SearchInput = styled.div`
    width: 360px;
    & > input{
        width: 292px;
        height: 30px;
        border:none;
        margin: 20px 24px;
        background: #F6F6F6;
        border-radius: 18px;
        outline: none;
        padding-left: 20px;
    }
    margin: 0 auto;
`

const LoaderWrap = styled.div`
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -100px;
`;
