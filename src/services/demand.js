import  lyRequest from "../utils/lyRequest";
import Cookies from "js-cookie";


export async function queryAllDemands() {
  let acess_token = Cookies.get("access_token");
  return lyRequest('http://139.199.96.235:9002/dashboard/reqs',{
    headers:{
      Authorization:acess_token
    }
  });
}
