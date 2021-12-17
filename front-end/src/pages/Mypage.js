import React,{ useState ,useEffect} from 'react';
import styled from 'styled-components';
import {isMobile} from 'react-device-detect';
import {history} from "../redux/configureStore";
import { logOut, userInfo } from "../redux/async/user";
import { useDispatch } from "react-redux";
import MyPageModal from "../componentsMypage/MyPageModal";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import ProgressBar from '../componentsMypage/ProgressBar';
import { getReviewLength } from "../redux/async/mybeer";
import { count } from "../redux/reducer/mybeerSlice";
import { useSelector } from "react-redux";
import {is_Login} from "../share/checkLoginUser";
const arrow = "/images/suggestarrow.png";

const version = parseFloat(process.env.REACT_APP_VERSION_CODE).toFixed(1);

const MyPage = (props) => {
    const is_iphone = navigator.userAgent.toLowerCase(); //아이폰인지 아닌지(노치디자인때문에)
    const userInfos = useSelector(state => state.user.currentUser);
    const length = useSelector(count);
    const [modalOpen, setModalOpen] = useState(false);
    const [levelText, setLevelText] = useState("");
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getReviewLength(userInfos.userId)); //사용자가 쓴 리뷰리스트 개수 디스패치
    }, [userInfos]);

    const [modal_info, setModal_Info] = useState({ //건의하기 modal창 text정보
        suggestTitle: "",
        titlePlaceholder: "",
        commentPlaceholder: "",
    });

    useEffect(() => {
        dispatch(userInfo());
        levelTextconfirm();
    }, [])
    
    const openModal = () => { //modal창 오픈
        setModalOpen(true);
      };

    const closeModal = () => { // 모달창 닫기 및 텍스트 초기화
        setModalOpen(false);
        setModal_Info({
            suggestTitle: "",
            titlePlaceholder: "",
            commentPlaceholder: "",
        });
    };

    const comfirm_login = ()=>{
        if(is_Login()){
            return(
                <LogOutWrap>
                    <LogOutButton
                        style={{fontFamily: "Noto Sans KR"}}
                        onClick={confirmLogout}
                    >로그아웃
                    </LogOutButton>
                </LogOutWrap>
            )        
        }
    }

    const confirmLogout = () => { // 로그아웃
        if(window.confirm("로그아웃 하시겠어요?")){
            dispatch(logOut());
        }
    }
    const levelTextconfirm = () => {
        if(length < 33){
            setLevelText("리틀애주가")
        }else if(length < 66){
            setLevelText("맥주덕후")
        }else{
            setLevelText("맥주소믈리에")
        }


    }
    return (
        <React.Fragment>
        <Container>
            <Header/>
            <GaugeWrap style={is_iphone.indexOf("iphone") !== -1 ? {marginTop: "40px"} : {marginTop: "0px"}}>

                <Line1/>
                
                <JustifyAlign>
                    <LevelText><span>Lv.{parseInt(length/10)+1}</span> <span style={{color: "#FFC44F"}}>{levelText}</span></LevelText>
                    <DogamText><span>도감: {length}/101</span></DogamText>
                </JustifyAlign>
                <ProgressBar progress={length}/>                
            </GaugeWrap>
            <Line/>
            <PageMoveWrap>

                <MoveBoxWrap
                    onClick={() => {
                        history.push("/setting");
                    }}
                >
                    <span>계정 설정</span>
                    <ArrowImage src={arrow}></ArrowImage>
                </MoveBoxWrap>
                <MoveBoxWrap
                    onClick={() => {
                        setModal_Info({
                            suggestTitle: "맥주 건의하기",
                            titlePlaceholder: "맥주 이름",
                            commentPlaceholder: "맥주에 대한 설명을 적어주세요.",
                        })
                        openModal();
                    }}>
                    <span>맥주 건의하기</span>
                    <ArrowImage src={arrow}></ArrowImage>
                </MoveBoxWrap>
                <MoveBoxWrap
                    onClick={() => {
                        setModal_Info({
                            suggestTitle: "관리자에게 건의하기",
                            titlePlaceholder: "제목을 입력해주세요.",
                            commentPlaceholder: "건의 내용을 입력해주세요.",
                        })
                        openModal();
                    }}>
                    <span>관리자에게 건의하기</span>
                    <ArrowImage src={arrow}></ArrowImage>
                </MoveBoxWrap>                
                <MoveBoxWrap
                    onClick={() => {
                        if(isMobile){
                            window.location.href = "https://well-astronaut-b13.notion.site/team-OHSOOL-6fd0c0a5edec4040932f208321dcba2c"
                        }else{
                            window.location.href = "https://well-astronaut-b13.notion.site/team-OHSOOL-844e5fefc1d14df2b97f8b1cda4fb3ed"
                        }
                    }}
                >
                    <span>오술 팀소개</span>
                    <ArrowImage src={arrow}></ArrowImage>
                </MoveBoxWrap>
                <MyPageModal
                        suggestInfo={modal_info}
                        open={modalOpen}
                        close={closeModal}
                ></MyPageModal>

                <VersionWrap>
                <VersionText>ver.1.5</VersionText>
                </VersionWrap>

                {comfirm_login()}
                
            </PageMoveWrap>
        </Container>
        <NavigationBar props={props}/>
        </React.Fragment>
    )
};

export default MyPage;

const Container = styled.div`
    width: 100%;
    max-height: 100vh;
    bottom: 10px;
`;

const PageMoveWrap = styled.div`
    width: 360px;
    display: flex;
    flex-direction: column;
    test-align: center;
    margin: 0 auto;
    margin-top: 36px;
`;

const MoveBoxWrap = styled.div`
    display: inline-block;
    margin: 0 auto;
    width: 312px;
    height: 40px;
    border-bottom: 0.5px solid #C4C4C4;
    margin-bottom: 16px;
    cursor: pointer;
    & > span{
        line-height: 40px;
        margin-left: 10px;
        font-size: 14px;
        font-weight: bold;
    }
`;

const ArrowImage = styled.img`
    float: right;
    margin: 14px;
    width: 5px;
    height: 10px;
`;
const LogOutWrap = styled.div`
    margin: 0 auto;
    width: 360px;
    justify-content: space-around;
    display: flex;
    position: absolute;
    bottom: 100px;
`;

const LogOutButton = styled.div`
    margin: 0 auto;
    width: 70px;
    height: 23px;
    border: none;
    text-align:center;
    background-color: transparent;
    color: #FFC44F;
    cursor: pointer;
    font-weight: 700;
    font-size: 16px;
    font-family : inherit;
`;
const Line = styled.hr`
    width: 320px;
    margin-top: 35px;
    text-align: center;
    border: 0;
    border:solid #C4C4C4;
    border-width: 0.1px;
`
const Line1 = styled.hr`
    width: 320px;
    margin-top: 100px;
    text-align: center;
    border: 0;
    border:solid #C4C4C4;
    border-width: 0.1px;
`
const VersionWrap = styled.div`
    margin: 0 auto;
    width: 360px;
    justify-content: space-around;
    display: flex;
    position: absolute;
    bottom: 140px;
`;
const VersionText = styled.div`
    margin: 0 auto;
    text-align:center;
    width: 70px;
    height: 23px;
    border: none;
    background-color: transparent;
    color: #FFC44F;
    cursor: pointer;
    font-weight: 300;
    font-size: 18px;
    font-family : inherit;

`
const JustifyAlign = styled.div`
    margin: 0 auto;
    text-align: center;
    width: 320px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const GaugeWrap = styled.div`
    top: 40px;
`
const LevelText = styled.div`
    padding-top: 10px;
    padding-left: 24px;

    & > span{
        font-weight: 700;
        font-size: 16px;
    }
`

const DogamText = styled.div`
    padding-right: 24px;
    & > span{
        font-weight: 400;
        font-size: 11px;
    }
`