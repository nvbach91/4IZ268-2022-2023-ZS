import dbApi from "./dbApi";

export const getUser = (userName, userPassword) => {
  return dbApi.get(`/users?username=${username}&password=${password}`);
};

export default {
  getUser,
};
