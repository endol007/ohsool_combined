import React from 'react';
  
const ProgressBar = ({progress}) => {//전체 맥주 도감 101개 중 몇개 작성했는지 progress bar로 표시
     
    const Parentdiv = {
        margin: "0 auto",
        textAlign: "center",
        height: 15,
        width: '312px',
        backgroundColor: "#F7F7F7",
        borderRadius: 40,
        marginTop: "30px"
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: "#FFC44F",
        borderRadius:40,
        textAlign: 'right',
      }
      
      const progresstext = {
        paddingTop: "2.5px",
        color: 'black',
        fontWeight: 800,
        fontSize:"9px",
      }
        
    return (
      <div style={Parentdiv}> 
        <div style={Childdiv}> 
            <div style={progresstext}>{`${progress}%`}</div> {/*진도율 표시*/}
        </div> 
      </div>
    )
}
  
export default ProgressBar;