import axios from "axios";
import { API_ENDPOINT } from "./config";

export type Req = {
  url?: string;
  method?: string;
  data?: any;
};

export const request = async (req?: Req) => {
  const _csrf = localStorage.getItem("_csrf");

  return await axios({
    method: req?.method || "GET",
    url: req?.url || API_ENDPOINT,
    data: {
      ...req?.data,
      _csrf,
    },
    withCredentials: true,
  });
};

export const getDPName = (username:string) => {
  if (!username?.length) return "";
  const name = username.split(" ");
  const profileName = name[0][0].toUpperCase() + ( name[1] ? name[1][0].toUpperCase() : "" );
  return profileName;
}