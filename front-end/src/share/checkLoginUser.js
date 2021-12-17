import {getCookie} from "./Cookie";

export const is_Login = () => {
    const token1 = getCookie("_dlfwh")
    const token2 = getCookie("_ghkxld")
    const token3 = getCookie("_dhtnf")
    const token4 = getCookie("_chlrh")

    if(token1 && token2 && token3 && token4){
        return true;
    }else{
        return false;
    }
}