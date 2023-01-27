import dbApi from "./dbApi";

export const getUser = (username, password) => {
  return dbApi.get(`/users?username=${username}&password=${password}`);
};

export default {
  getUser,
};
