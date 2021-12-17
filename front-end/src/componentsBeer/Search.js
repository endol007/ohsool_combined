import React,{ useState,useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getSearchWord } from "../redux/async/beer";
import _ from 'lodash';

const remove = "/images/remove_gray.png"
const search = "/images/search_gray.png"

const Search = (props) => {
    const { setSearch_Beer,
            setIs_Search,
            setOpen_Modal,
            setHashtag,
            words,
            } = props;
    const check_eng = /[a-zA-Z]/; // 영어체크
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
    const [word, setWord] = useState(""); //실시간으로 입력하는 단어담김
    const [input, setInput] = useState(true);
    const [language, setLanguage] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        if(word === null || words.length===0 /*|| word === "" || language==="" */){//검색창에 아무것도 입력 하지 않은 상태면 검색 모달 닫기 
            setOpen_Modal(false);           
        } else{
            checkLanguage();
        }
    },[word, words]);

    const onChange = (e) =>{     
        if(e.target.value === ''){//검색어 지웠을 때 검색목록 사라지도록 함
            setWord(null);
        }else{
            setWord(e.target.value);
        }    
    }

    const searchWord = () =>{//실시간으로 자동완성 된 값 불러옴   
        dispatch(getSearchWord(word));
    }

    const searchThrottle = _.throttle(() => {
        searchWord();
    }, 500);
    
    const EnterSubmit = (e) =>{
        if(e.key === "Enter"){
            findBeerbySearchButtonClick();
            setInput(false);
            setLanguage("");
        }
    }

    const clickSearch = () =>{
        findBeerbySearchButtonClick();
        setInput(false);
        setLanguage("");
    }
    
    const searchModalOpen = ()=>{
        if(language==="english"){
            return (
                <SearchModal>
                {words?.length > 0 ? words.map((item, idx) => (
                    idx > 4 ? "":
                    <p  key={idx} 
                        onClick={()=>{
                        findBeerbyWordClick(item.name_english);
                        setLanguage("");
                        }}>{item.name_english}</p> 
                )):""}                                          
                </SearchModal>
            )
        }else if(language==="korean"){
            return (
                <SearchModal>
                {words?.length > 0 ? words.map((item, idx) => (
                    idx > 4 ? "":
                    <p key={idx} onClick={()=>{
                        findBeerbyWordClick(item.name_korean);
                        setLanguage("");
                        }}>{item.name_korean}</p> 
                )):""}                                          
                </SearchModal>
            )
        }else{
            return(
                null
            )
        }
    }

    const checkLanguage =()=>{//검색어가 한국어인지 영어인지 체크
        if(check_kor.test(word)){
            setLanguage("korean");
        }else if(check_eng.test(word)){
            setLanguage("english");
        }
    }

    const findBeerbyWordClick = (name)=>{//특정 맥주명을 누른 경우 해당 맥주 명으로 검색
        setSearch_Beer([]);
        setHashtag([]);
        if(language==="english"){//영어로 검색            
            setSearch_Beer(words?.filter((p) => p.name_english.includes(name)));
        }else if(language==="korean"){ //한국어로 검색           
            setSearch_Beer(words?.filter((p) => p.name_korean.includes(name)));   
        }
        setIs_Search(true);
    }
    const findBeerbySearchButtonClick = ()=>{//엔터 키를 누른 경우 해당 단어로 검색
        setSearch_Beer([]);
        setHashtag([]);
        setSearch_Beer(words);
        setIs_Search(true);
    }

    return (
        <React.Fragment>
            <SearchInput>
                {input ? 
                <input
                    onClick={()=>{
                        setOpen_Modal(true)
                    }} 
                    onChange={onChange}
                    onKeyUp={() => {
                        setInput(true);
                        searchWord();
                        searchThrottle();
                        if(word !== null){//아무것도 입력 안한상태면 모달 닫기
                            setOpen_Modal(true);
                        }
                    }}
                    onKeyPress={EnterSubmit}
                    placeholder="검색어를 입력하세요."
                ></input>
                :  <input //x버튼 클릭시 input value 글씨 지워짐
                    value={""}
                    onClick={()=>{
                        setInput(true);
                        setOpen_Modal(true)
                    }}
                    placeholder="검색어를 입력하세요."
                ></input>
            }
                <ButtonWrap>
                    <ImageWrap style={{backgroundImage: `url(${remove})`}}
                        onClick={()=>{
                            setWord(null);
                            setInput(false);
                            setLanguage("");
                         }}
                    />
                    <ImageWrap style={{backgroundImage: `url(${search})`}}
                        onClick={()=>{
                            clickSearch();
                        }} 
                    />
                </ButtonWrap>
            </SearchInput>

            {searchModalOpen()}

        </React.Fragment>
    )
}
export default React.memo(Search);

const SearchInput = styled.div`
    width: 312px;
    margin: 10px 24px;
    background: #F6F6F6;
    border-radius: 18px;
    outline: none;
    & > input{
        width: 200px;
        height: 30px;
        border:none;
        outline: none;
        background: #F6F6F6;
        margin-left: 20px;
        outline: none;
    }
`
const ButtonWrap = styled.div`
    display: inline-block;
    float: right;
    margin-right: 8px;
`
const ImageWrap = styled.div`
    display: inline-block;
    margin: 8px ;
    width: 16px;
    height: 16px;
    background-size: cover;
    cursor: pointer;
`;

const SearchModal = styled.div`
    display: inline-block;
    position: absolute;
    z-index: 5;
    padding-left: 26px;
    width: 360px;
    background-color: #FFFFFF;
    border-bottom: 2px solid #F7F7F7;
    //글자 라인 수 제한하기
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    & > p {
        margin-left: 20px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20.51px;
    }
`