import Vue from "vue";
import Vuex from "vuex";
//import http from "@/api/http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userId: "a",
      userPwd: "b",
      userName: "c",
      userEmail: "d",
      userPhoneNumber: "e",
    },
    session: false,
  },
  getters: {
    userId(state) {
      return state.user.userId;
    },
    userPwd(state) {
      return state.user.userPwd;
    },
    userName(state) {
      return state.user.userName;
    },
    userEmail(state) {
      return state.user.userEmail;
    },
    userPhoneNumber(state) {
      return state.user.userPhoneNumber;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user.userId = user.userId;
      state.user.userPwd = user.userPwd;
    },
    SET_SESSION(state) {
      state.session = true;
    },
    REMOVE_SESSION(state) {
      state.session = false;
    },
  },
  actions: {
    setUser({ commit }, user) {
      //axios call
      commit("SET_USER", user);
    },
    registUser({ commit }, user) {
      //axios call
      commit("SET_USER", user);
    },
    modifyUser({ commit }, user) {
      //axios call
      commit("SET_USER", user);
    },
    deleteUser() {
      //session check
      //axios call
    },
  },
  modules: {},
});
