import React from "react";
import styled from "styled-components";
const share_yellow = "/images/share_yellow.png"

//카카오톡 공유버튼
const ShareButton = ({name,description,image}) => { //category.name, category.description, category.image
    const Kakao = window.Kakao;
  
    const shareKakao = () => {
        Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
              title: ("오늘의 맥주는 "+name+"!🍺"),
              description: description.substr(0,45)+"..🥂",
              imageUrl: image,
              imageWidth: 160,
              imageHeight: 120,
              link: {
                webUrl: window.location.href,
                mobileWebUrl: window.location.href,
              },
            },
            buttons: [
                {
                  title: '자세히 보기',
                  link: {
                    webUrl: window.location.href ,
                    mobileWebUrl: window.location.href ,
                  },
                },
                {
                  title: '오술 바로가기',
                  link: {
                    webUrl: 'https://ohsool.com',
                    mobileWebUrl: 'https://ohsool.com',
                  },
                },
            ],
        });
      }
    return(
    <React.Fragment>
        <ShareButtonkakao
          style={{backgroundImage: `url(${share_yellow})`,width:"38px",height: "38px"}}
          id="kakao-link-btn"
          onClick={shareKakao}
        ></ShareButtonkakao>
    </React.Fragment>
    )
};

export default ShareButton;

const ShareButtonkakao = styled.div`
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: 0px 12px 0 0;
    float: right;
    cursor: pointer;
    background-size: cover;
`;