import lyRequest from '../utils/lyRequest';
import {LOGIN_URL, LOGOUT_URL, REGISTER_URL,VERIFY_PAGE,HOME_PAGE} from "../constant/config";
import {URL} from "../constant/config";
import Cookies from "js-cookie";

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

//获取用户信息
export async function getUserInfo() {
  let access_token = Cookies.get("access_token");
  return lyRequest(URL + '/server/verify',{
    headers: {
      Authorization: access_token
    },
  })
}

//注册操作
export function register() {
  window.location.href = REGISTER_URL + `?next=${LOGIN_URL}?next=${encodeURIComponent(VERIFY_PAGE)}`;
}
//登出
export function logout() {
  let access_token = Cookies.get("access_token");
  Cookies.remove('access_token');
  window.location.href = LOGOUT_URL + `?access_token=${access_token}&next=${HOME_PAGE}`;
}

//登录操作
export function login() {
  // console.log("登录URL--------------",LOGIN_URL + `?next=${encodeURIComponent(VERIFY_PAGE)}`);
  window.location.href = LOGIN_URL + `?next=${encodeURIComponent(VERIFY_PAGE)}`;
}
