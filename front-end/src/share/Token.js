import React, { useEffect, useState } from "react";
import { setCookie, setCookieRefresh } from "./Cookie";
import SocialLoginUserInfo from "./SocialLoginUserInfo";
import {useSelector} from "react-redux";

const Token = (props) => {
    const tokens = props.match.params.tokens;
    const is_write = useSelector((state) => state.user.social_login);
    const tokensInfo = tokens.split("&");
    const dlfwh = tokensInfo[0]
    const ghkxld = tokensInfo[1].split("=")[1];
    const dhtnf = tokensInfo[2].split("=")[1];
    const chlrh = tokensInfo[3].split("=")[1];
    const first = tokensInfo[4].split("=")[1];
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
      };
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() =>{
        setCookie("_dhtnf", dhtnf);
        setCookie("_chlrh", chlrh);
        setCookieRefresh("_dlfwh", dlfwh);
        setCookieRefresh("_ghkxld", ghkxld);
    }, [dhtnf, chlrh, dlfwh, ghkxld]);

    useEffect(() => {
        if(first === "true"){
            openModal();
        }else{
            window.location.href = "/";
        }
    }, []);

    useEffect(() => {
    if(is_write === "success"){
        window.location.herf = "/";
        }   
    }, [is_write]);

    return(
        <React.Fragment>
            <SocialLoginUserInfo
                    open={modalOpen}
                    close={closeModal}
            ></SocialLoginUserInfo>  
        </React.Fragment>
    )
}

export default Token;