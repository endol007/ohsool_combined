import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value) => {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);
    return cookies.set(name, value, {
        path: "/",
        expires,
    })
};
export const setCookieRefresh = (name, value) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 14);
    return cookies.set(name, value, {
        path: "/",
        expires,
    })
};

export const setCookieNotification = (name, value) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    return cookies.set(name, value, {
        path: "/",
        expires,
    })
}

export const getCookie = (name) => {
    return cookies.get(name);
};

export const removeCookie = (name) => {
    return cookies.remove(name);
};