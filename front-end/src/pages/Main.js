import React, { useEffect } from 'react';
import styled from 'styled-components';
import MainLogo from "../componentsMain/MainLogo";
import MainInput from '../componentsMain/MainInput';
import { userInfo } from "../redux/async/user";
import { useDispatch } from 'react-redux';

const mainbeer = "/images/mainBeer.png";

const Main = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userInfo());
    }, []);

    return (
        <React.Fragment>
            <Grid>
                <GridStyle> 
                    <MainLogo/>
                    <MainInput/>
                </GridStyle>
            </Grid>
        </React.Fragment>
    )
};

export default Main;

const Grid = styled.div`
    display: flex;
    text-align: center; 
    align-items: center;
    margin: 0 auto;
    max-width: 400px;
    height: 100vh;
    background-color: #C4C4C4;
    background-image: url(${mainbeer});
    background-size: cover;
    flex-direction: column;
`;

//배경어둡게 처리
const GridStyle = styled.div` 
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(12, 12, 12, 0.2);
`;