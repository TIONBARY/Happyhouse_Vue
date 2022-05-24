/* eslint-disable */

//import jwt_decode from "jwt-decode";
import {
  login,
  findById,
  logout,
  deleteUser,
  modifyUser,
  registerUser,
} from "@/api/member.js";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: { userid: "", userpwd: "", username: "", email: "" },
    currentUserId: "",
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkUserId: function (state) {
      return state.currentUserId;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_CURRENT_USER_ID: (state, currentUserId) => {
      state.currentUserId = currentUserId;
    },
    SIGN_OUT: (state) => {
      state.isLogin = false;
      state.userInfo = null;
      state.currentUserId = "";
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            //let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            // sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getUserInfo({ commit }, userid) {
      // let decode_token = jwt_decode(token);
      await findById(
        //decode_token.userid,
        userid,
        (response) => {
          console.log(response);
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async signOut({ commit }) {
      await logout(
        (response) => {
          console.log(response);
          if (response.data.message === "success") {
            commit("SIGN_OUT");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async deleteCurrentUser({ commit }, userid) {
      await deleteUser(
        userid,
        (response) => {
          if (response.data.message === "success") {
            commit("SIGN_OUT");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async modifyCurrentUser({ commit }, user) {
      await modifyUser(
        user,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("modify failed");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async registerUser(_, user) {
      return await registerUser(
        user,
        (response) => {
          return response.data.message;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default memberStore;
