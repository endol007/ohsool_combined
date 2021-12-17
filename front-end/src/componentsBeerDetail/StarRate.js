import React,{  useState } from "react";
import styled from "styled-components";

const star_filled = "/images/star_filled.png";
const star_empty = "/images/star_empty.png";

//별점 
const StarButton = ({setStarScore, init_star,is_my, is_starsmall}) =>{
    const [score, setScore] = useState(init_star);
    const totalStarCount = 5;   
    const starCount = score; 
    const removeCount = totalStarCount - starCount;
  const handleScore = (score) => {
    setStarScore(score);
  };
  const showStar = ()=>{
    if(is_my){
      if(is_starsmall){
        return(
          <Container>
          <div style={{display:"flex"}}>
            {[...Array(starCount)].map((n, index) => {
              return (
                <StarFilledSmall //별점 채워진 상태
                  key={index}
                  style={{backgroundImage: `url(${star_filled})`,cursor:"unset"}}
                ></StarFilledSmall>
              );
            })}
            {[...Array(removeCount)].map((n, index) => {
              return (
                <StarEmptySmall //별점 비워진 상태
                  key={index}
                  style={{backgroundImage: `url(${star_empty})`,cursor:"unset"}}
                ></StarEmptySmall>
              );
            })}
          </div>
        </Container>
        )
      }else{
        return(
        <Container>
        <div style={{display:"flex"}}>
          {[...Array(starCount)].map((n, index) => {
            return (
              <StarFilled
                key={index}
                style={{backgroundImage: `url(${star_filled})`,cursor:"unset"}}
              ></StarFilled>
            );
          })}
          {[...Array(removeCount)].map((n, index) => {
            return (
              <StarEmpty
                key={index}
                style={{backgroundImage: `url(${star_empty})`,cursor:"unset"}}
              ></StarEmpty>
            );
          })}
        </div>
      </Container>
        )
      }

    }else{
      return(
      <Container>
      <div style={{display:"flex"}}>
        {[...Array(starCount)].map((n, index) => {
          return (
            <StarFilled
              key={index}
              style={{backgroundImage: `url(${star_filled})`}}
              onClick={() => {
                setScore(index + 1);
                handleScore(index + 1);
              }}
            ></StarFilled>
          );
        })}
        {[...Array(removeCount)].map((n, index) => {
          return (
            <StarEmpty
              key={index}
              style={{backgroundImage: `url(${star_empty})`}}
              onClick={() => {
                setScore(score + index + 1);
                handleScore(score + index + 1);
              }}
            ></StarEmpty>
          );
        })}
      </div>
    </Container>
      )
    }

  }
  return (
    <>
    {showStar()}
    </>
  )
}
export default React.memo(StarButton);
const Container = styled.div`
  margin: 7px auto;
`;
const StarFilled = styled.div`
  width: 36px;
  height: 36px;
  cursor: pointer;

`
const StarEmpty = styled.div`
  width: 36px;
  height: 36px;
  cursor: pointer;
`
const StarFilledSmall = styled.div`
  width: 20px;
  height: 20px;
  background-size: cover;
  margin-left: -2px;
  margin-right: -2px;

`
const StarEmptySmall = styled.div`
  width: 20px;
  height: 20px;
  background-size: cover;
  margin-left: -2px;
  margin-right: -2px;


`