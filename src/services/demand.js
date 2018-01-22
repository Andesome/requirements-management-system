import  lyRequest from "../utils/lyRequest";
import {URL1} from "../constant/config";
import Cookies from "js-cookie";

//获取所有需求
export async function queryAllDemands(offset,limit) {
  let acess_token = Cookies.get("access_token");
  return lyRequest(`${URL1}/dashboard/reqs?offset=${offset}&limit=${limit}`,{
    headers:{
      Authorization:acess_token
    }
  });
}


//审核需求 1，审核通过 2.审核不通过
export async function checkDemand(reqId) {
  let acess_token = Cookies.get("access_token");
  return lyRequest(`${URL1}/dashboard/reqs/${reqId}/audit_status`,{
    headers:{
      Authorization:acess_token
    },
    method:"put"
  });
}

//删除需求
export async function deleteDemand(reqId) {
  let acess_token = Cookies.get("access_token");
  return lyRequest(`${URL1}/dashboard/reqs/${reqId}/audit_status`,{
    headers:{
      Authorization:acess_token
    }
  });
}

