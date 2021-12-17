import React,{useEffect} from "react";
import styled from "styled-components";
import { TasteGraph,StarRate } from "../componentsBeerDetail/BeerDetailIndex";
import Header from "../Header";
import NavigationBar from "../NavigationBar";

const MyReview = (props) =>{
    const item = props.location.state; 
    const is_my = true;
    const is_starsmall = false;
    const is_iphone = navigator.userAgent.toLowerCase();

    useEffect(() => { //첫 렌더링시 스크롤위치 맨위로
        window.scrollTo({
            top: 0,
        })
    }, []);

    return(
        <React.Fragment>
            <Header/>
            <Container>
            <Grid style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "80px"} : {marginTop: "40px"}}>
                
                <div style={{margin: "0 auto"}}>
                    <BeerImage>
                        <img src={item.beerId?.image}></img>
                    </BeerImage>

                    <Title><span>작성한 리뷰</span></Title>                   
                    <BeerTextWrap>
                            <span>{item.review}</span>
                    </BeerTextWrap>
                </div>
                <Text><span>점수</span></Text>
                <StarWrap>
                    <StarRate init_star={item.rate} is_my={is_my} is_starsmall={is_starsmall}/>
                </StarWrap>

                <Graph>
                    <TasteGraph beers={item.myFeatures}/>
                </Graph>
                
                </Grid>
            </Container>
            <NavigationBar props={props}/>
            
        </React.Fragment>
    )
}
export default React.memo(MyReview);



const Container = styled.div`
    display: flex;
    bottom: 71px;
    background-color: #FFFFFF;
    flex-direction: column;
    & > span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: auto;
        text-align:left;
    }
`;
const Grid = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: 40px;

`;
const Title = styled.div`
    margin: 0 auto;
    width: 360px;
    margin-top: 20px;
    padding-left: 24px;
    & > span{
        font-weight: 700;
        font-size: 14px;
        line-height: 20.27px;
    } 
`
const BeerTextWrap = styled.div`
    margin: 0 auto;
    width: 360px;
    min-height: 30px;
    margin-top: 14px;
    word-break:break-all;
    word-wrap:break-word;
    & > span{
        margin: 0 24px;
        float: left;
        font-size: 12px;
        font-weight: 300;
        line-height: 22px;
    }
`;

const Text = styled.div`
    //display: block; 
    //margin-top: 20px;

    margin: 0 auto;
    width: 360px;
    padding-top: 30px;

    text-align: center;
    & > span{
        font-size: 14px;
        font-weight: 700;
        line-height: 20.27px;
    }
`

const StarWrap = styled.div`
    margin: 0 auto;
    width: 360px;

    display: flex;
    flex-direction: column;
    text-align: center;  
`

const BeerImage = styled.div`
    margin: 0 auto;
    width: 360px;
    height: 380px;
    
    background-color: #F6F6F6;
    & > img{ 
        width: 315px;
        height: 315px;
        margin: 24px 0 22px 20px;
        
    }
    @media (img: img) {
        & > img { 
            width: 315px;
            height: 315px;
            margin: 24px 0 22px 20px;
        }
    }
`;


const Graph = styled.div`
    margin: 20px auto;
    padding: 24px;
    display: flex;
    width: 270px;
    height: 270px;
    border: 2px solid #C4C4C4;
    border-radius: 10px;
    margin-bottom: 74px;
`;
