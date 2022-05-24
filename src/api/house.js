import { apiInstance } from "./index.js";

const api = apiInstance();

async function getDongList(code) {
  return await api.get(`/search/dongList/${code}`).then((response) => {
    return response;
  });
}

async function getSiguList(code) {
  return await api.get(`/search/siguList/${code}`).then((response) => {
    return response;
  });
}

export { getDongList, getSiguList };
