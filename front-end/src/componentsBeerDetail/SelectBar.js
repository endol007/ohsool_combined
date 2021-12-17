//맥주 맛 점수를 매기기 위한 컴포넌트
import React,{useState, useEffect} from "react";
import "react-step-progress-bar/styles.css";
import {ProgressBar, Step} from "react-step-progress-bar";

const SelectBar = ({index, setFeaturesList, featuresList, taste, is_edit}) => {
    const [cur_position, setCur_Position] = useState(0);
    const [score, setScore] = useState(0);

    featuresList[index] = score;
    setFeaturesList(featuresList)  
    
    useEffect(()=>{
      setCur_Position(taste*25-25)//1~5점을 0~100% 백분율로 환산
      setScore(taste)//1~5점 사이 값이 담김
    },[taste])

    return (
      <React.Fragment>
      {is_edit ? (
        <>
          {/* 도감 수정 상태 */}
          <div style={{width: "200px", marginBottom: "38px"}} >
          <ProgressBar percent={cur_position} filledBackground="#FFC44F">{/* 프로그래스바 */}
            {featuresList.map((p,index) => ( // 5개의 선택지가 있으며 선택지(position)이 20%씩 증가
              <Step key={index}> 
              {({ accomplished, position}) => ( 
                <div 
                  style={{width: "20px", height: "20px", borderRadius: "50%", backgroundColor: `${accomplished ? "#ffC44F" : "#D3D3D3"}`}}
                  onClick={() => {//프로그래스바 선택지 클릭시 position과 점수 값 반영
                    setCur_Position(position);
                    setScore(5-((100-position)/25)); 
                  }}
                />
              )}
            </Step>
            ))}   
          </ProgressBar>
          </div>  
        </>
        ):(
        <>
          {/* 신규 도감 작성 상태 */}
          <div style={{width: "200px", marginTop: "38px"}} >
          <ProgressBar percent={cur_position} filledBackground="#FFC44F">
            {featuresList.map((p,index) => (
              <Step key={index}>
              {({ accomplished, position}) => ( 
                <div 
                  style={{width: "20px", height: "20px", borderRadius: "50%", backgroundColor: `${accomplished ? "#ffC44F" : "#D3D3D3"}`}}
                  onClick={() => {
                    setCur_Position(position);
                    setScore(5-((100-position)/25)); 
                  }}
              
                />
              )}
            </Step>
            ))}   
          </ProgressBar>
          </div>
        </>
        )}
      </React.Fragment>


    );

};

export default React.memo(SelectBar);
