import Cookies from "js-cookie";
import Const from "./const";
import { isEnptystr } from "./utils";

export function isLogin(){
  const token = Cookies.get(Const.KEY_TOKEN);
  return !isEnptystr(token);
}

export function getUserName(){
  return isEnptystr(Cookies.get(Const.KEY_TOKEN)) ? "ゲストさん" : Cookies.get(Const.KEY_TOKEN) + "さん"
}