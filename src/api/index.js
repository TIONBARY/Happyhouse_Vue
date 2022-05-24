/* eslint-disable */

import axios from "axios";
import { API_BASE_URL, APT_DEAL_URL } from "@/config";
import store from "@/store/index.js";

// axios 객체 생성
function apiInstance() {
  axios.defaults.withCredentials = true;
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  instance.interceptors.response.use(function (response) {
    if (response.data.currentUserId) {
      store.commit(
        "memberStore/SET_CURRENT_USER_ID",
        response.data.currentUserId
      );
    } else {
      store.commit("memberStore/SET_CURRENT_USER_ID", "");
      store.commit("memberStore/SET_USER_INFO", null);
    }

    return response;
  });
  return instance;
}

function houseInstance() {
  const instance = axios.create({
    baseURL: APT_DEAL_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

export { apiInstance, houseInstance };
