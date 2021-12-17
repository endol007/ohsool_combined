import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import EachBeer from "../componentsBeer/EachBeer";
import { getMyDogam, getOtherUserLikes } from "../redux/async/mybeer";
import { likeList } from "../redux/reducer/mybeerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const MyLikeBeerList = ({is_me}) => {
    const mydogam = useSelector(likeList);
    const { userId } = useParams();
    const otherUserLikes = useSelector(state => state.mybeer.otherLikes);
    const dispatch = useDispatch();

    useEffect(()=> {
        if(is_me){
            dispatch(getMyDogam()); //좋아요한 맥주 리스트 디스패치
        }else{
            dispatch(getOtherUserLikes(userId)); //다른사람의 맥주도감 볼때 타유저 도감 정보 요청
        }
    }, [is_me]);

    return(
        <React.Fragment>
            <List>
            {is_me ?
            mydogam.length !== 0 ? mydogam?.map((item, idx) => (
                <EachBeer 
                    page={"notbeerList"}
                    key={idx} item={item} 
                    _onClick={() =>{
                        history.push("/beer/detail")
                    }
                }/>
            )): <Text>좋아요한 맥주 목록이 <br/>🍺BEER🍺 있소</Text>
            :
            otherUserLikes.length !== 0 ? otherUserLikes?.map((item, idx) => (
                <EachBeer 
                    page={"notbeerList"}
                    key={idx} item={item} 
                    _onClick={() =>{
                        history.push("/beer/detail")
                    }
                }/>
            )): <Text>좋아요한 맥주 목록이 <br/>🍺BEER🍺 있소</Text>
        }
            </List>
        </React.Fragment>
    )
}

export default MyLikeBeerList;

const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: 74px;
`;

const Text = styled.div`
    width: 320px;
    text-align: center;
    margin: 0 auto;
    padding-top: 150px;
`