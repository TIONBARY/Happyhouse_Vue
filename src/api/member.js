import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  //api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function logout(success, fail) {
  await api.post(`/user/logout/`).then(success).catch(fail);
}

async function deleteUser(userid, success, fail) {
  await api.post(`/user/delete/${userid}`).then(success).catch(fail);
}

async function modifyUser(user, success, fail) {
  await api
    .post(`/user/modify`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function registerUser(user, success, fail) {
  return await api
    .post(`/user/register`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function signOutKakaoUser(token, success, fail) {
  await api.post(`user/signout/kakao`, token).then(success).catch(fail);
}

export {
  login,
  findById,
  logout,
  deleteUser,
  modifyUser,
  registerUser,
  signOutKakaoUser,
};
