import Const from "./const";
import { push } from "connected-react-router";
import store from "../store";

export function getChkBool(chkValue: number) {
    return (chkValue == 1);
}

export function getChkValue(chkBool: boolean) {
    return (chkBool ? 1 : 0);
}

export function createURL(url: string, prams?: { [key: string]: any; }) {
    const host: string = getHost();
    let opt: string = "";
    if (prams !== undefined) {
        for (const key in prams) {
            if (prams[key] !== null) {
                opt += (opt == "" ? "?" : "&");
                opt += key + "=" + prams[key];
            }
        }
    }
    return host + url + opt
}

export function getHost() {
    if (process.env.NODE_ENV === "production") {
        return Const.PRODUCT_HOST;
    } else {
        return Const.TEST_HOST;
    }
}

export function getGAID() {
    if (process.env.NODE_ENV === "production") {
        return "UA-152682775-2";
    } else {
        return "";
    }
}

export function isEnptystr(str: string | null | undefined) {
    return (str == null || str == undefined || str == "undefined" || str == "")
}

export function isEnptynum(i: number | null | undefined) {
    return (i == null || i == undefined || i == 0)
}

export function isLongWidth(location: string) {
    return (location == Const.SITE_ROOT + "/menu/list/user" || location == Const.SITE_ROOT + "/menu/list/guest")
}

export function getTokenPram(token: string) {
    return "Bearer " + token;
}

export function getUserId() {
    return store.getState().Root.loginUser!.id;
}

export function formatToPrice(price: number) {
    if (price === undefined || price === null) {
        return "0";
    } else {
        return price.toLocaleString();
    }
}

export function formatDate(date: Date) {
    if (date === undefined || date === null) {
        return '';
    } else {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
}

export function formatDateYYYYMM(date: Date) {
    if (date === undefined || date === null) {
        return '';
    } else {
        return date.getFullYear().toString().padStart(4, "0") + '-' + (date.getMonth() + 1).toString().padStart(2, "0");
    }
}

export function isNotSocial(){
    return store.getState().Root.loginUser !== undefined &&　store.getState().Root.loginUser!.email !== "" && !store.getState().Root.loginUser!.isSocial;
}