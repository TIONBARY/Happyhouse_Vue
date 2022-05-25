import { apiInstance } from "./index.js";

const api = apiInstance();

async function checkSession() {
  return await api.get(`user/session`);
}

export { checkSession };
