import axios from "axios";
import crypto from "crypto";
import { getCookie, setCookie, setCookieRefresh } from "../../share/Cookie";

const secretAPIkey = () => {
    const unstabletime = new Date();
    const time = new Date(unstabletime.toLocaleString("en-US", {timeZone: "America/New_York"}));

    let key = String(time.getDate()) + String(time.getHours()) + String(time.getUTCFullYear()) + String(time.getUTCHours());

    key = crypto.createHmac('sha256', key).digest('base64');
    key = key.replace(/[^a-zA-Z ]/g, "")

    return key;
};


export const axiosInstance = axios.create({
    baseURL: `https://ohsool.shop`,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "accept": "application/json,",
    }
});


axiosInstance.interceptors.request.use(
    function (config){
        const dhtnf = getCookie("_dhtnf");
        const chlrh = getCookie("_chlrh");
        const dlfwh = getCookie("_dlfwh");
        const ghkxld = getCookie("_ghkxld");
        config.headers.common["ghkxld"] = `Bearer ${ghkxld}`;
        config.headers.common["dhtnf"] = `Bearer ${dhtnf}`;
        config.headers.common["chlrh"] = `Bearer ${chlrh}`;
        config.headers.common["dlfwh"] = `Bearer ${dlfwh}`;
        config.headers.common["Secretkey"] = secretAPIkey();
        return config;
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }, async function (error) {
        const originalRequest = error.config;
        if(error.response.status === 418 && !originalRequest._retry){
            originalRequest._retry = true;
            const dhtnf = originalRequest.headers.dhtnf.split(" ")[1];
            const chlrh = originalRequest.headers.chlrh.split(" ")[1];
            const dlfwh = originalRequest.headers.dlfwh.split(" ")[1];
            const ghkxld = originalRequest.headers.ghkxld.split(" ")[1];
            if(error.response.data.dlfwh){ //get new refresh
                setCookie("_dhtnf", dhtnf); //access
                setCookie("_chlrh", chlrh); //access
                setCookieRefresh("_dlfwh", error.response.data.dlfwh); //refresh
                setCookieRefresh("_ghkxld", error.response.data.ghkxld); //refresh
                originalRequest.headers.dhtnf = `${originalRequest.headers.dhtnf}`; // access
                originalRequest.headers.chlrh = `${originalRequest.headers.chlrh}`; // access
                originalRequest.headers.ghkxld = `Bearer ${error.response.data.ghkxld}`; //refresh
                originalRequest.headers.dlfwh = `Bearer ${error.response.data.dlfwh}`; //refresh
            }
            else{  //get new access
                setCookie("_dhtnf", error.response.data.dhtnf);  //access
                setCookie("_chlrh", error.response.data.chlrh);  //access
                setCookieRefresh("_dlfwh", dlfwh);
                setCookieRefresh("_ghkxld", ghkxld);
                originalRequest.headers.ghkxld = `${originalRequest.headers.ghkxld}`; //refresh
                originalRequest.headers.dlfwh = `${originalRequest.headers.dlfwh}`; //refresh
                originalRequest.headers.dhtnf = `Bearer ${error.response.data.dhtnf}`; // access
                originalRequest.headers.chlrh = `Bearer ${error.response.data.chlrh}`; // access
            }
        return axiosInstance(originalRequest);
        }
    return Promise.reject(error);
});