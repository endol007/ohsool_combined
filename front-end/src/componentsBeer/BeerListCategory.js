import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getBeerCategoryList} from "../redux/async/beer";
import { beerCategory } from "../redux/reducer/beerSlice";
import {useParams} from "react-router-dom";
import EachBeer from "./EachBeer";
import _ from "lodash";
import InfinityScrollLoader from "./InfinityScrollLoader";

const BeerListCategory = (props) => {
    const { setHashtagName, pagingCate, setPagingCate } = props;
    const category_beers = useSelector(beerCategory);
    const {beerCategoryId} = useParams(); //url에서 categoryId 파라미터값
    const [beers, setBeers] = useState([]); //카테고리별 맥주 리스트 저장 스테이트
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setBeers([...beers, ...category_beers]);
    }, [category_beers]); //받아오는 데이터 추가

    const dispatchData= {
        categoryId: beerCategoryId,
        pageNo: pagingCate,
    }

    const getCategoryBeerList = useCallback (() => {
        async function getData(){
        await dispatch(getBeerCategoryList(dispatchData));
            setLoading(false);
        }
        return getData();
    }, [pagingCate, category_beers, beerCategoryId]);


    const _handleScroll = _.throttle(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight-100 && loading === false) {
          // 페이지 끝에 도달하면 추가 데이터를 받아온다
          if (pagingCate >= 4){
            return;
            }
          setPagingCate(pagingCate + 1);
          getCategoryBeerList();
          setLoading(true);
        }
    }, 500);
    
    useEffect(() => {
        if(pagingCate === 0 && beers.length === 0){
            dispatch(getBeerCategoryList(dispatchData));
            setPagingCate(pagingCate + 1);
        }
    }, []);

    useEffect(() => {
        setBeers([]);
        dispatch(getBeerCategoryList({
            categoryId: beerCategoryId,
            pageNo: 0,
        }));
    }, [beerCategoryId]);

    useEffect(() => {
        if(loading){
            return;
        }
        window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
        };
    }, [pagingCate, loading, beerCategoryId]); //스크롤 이벤트 페이지, 로딩, 카테고리id바뀔때마다 실행

    return(
        <React.Fragment>
            <List>
            {beers?.map((item, idx) => (
                <EachBeer page={"beerList"}
                setHashtagName={setHashtagName}
                key={idx} item={item} />
            ))}
            </List>
            {loading ? <InfinityScrollLoader/>: 
            ""}
        </React.Fragment>
    )
}

export default React.memo(BeerListCategory);

const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;