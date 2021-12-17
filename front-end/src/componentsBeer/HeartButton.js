import React from "react";
import styled from "styled-components";

const heart_filled = "/images/heart_filled.png"
const heart_black = "/images/heart_black.png"
const detail_heart = "/images/heart_detail.png"
const heart_empty = "/images/heart_empty.png"

const HeartButton = ({_onClick, heart_detail, is_like }) => {
  const icon_url = is_like? heart_filled : heart_black;
  const icon_url_detal = is_like? detail_heart : heart_empty;

  return (
    <React.Fragment>
      {heart_detail !== "detail" ? (
      <Heart onClick={_onClick} alt="좋아요버튼" src={icon_url}></Heart> //beerList 하트이미지
      ) :
      (
      <HeartDetail onClick={_onClick} alt="좋아요버튼" src={icon_url_detal}></HeartDetail> //beerDetail 하트이미지
      )}
    </React.Fragment>
  );
};

const Heart = styled.img`
  width: 16px;
  height: 16px;
  float: right;
  cursor: pointer;
`;
const HeartDetail = styled.img`
  width: 38px;
  height: 38px;
  box-sizing: border-box;
  cursor: pointer;
`;

export default React.memo(HeartButton);
