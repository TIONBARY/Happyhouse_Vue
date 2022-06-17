import { apiInstance } from "./index.js";

const api = apiInstance();

async function getDongList(code) {
  console.log("test");
  return await api.get(`/search/dongList/${code}`);
}

async function getSiguList(code) {
  return await api.get(`/search/siguList/${code}`);
}

export { getDongList, getSiguList };
