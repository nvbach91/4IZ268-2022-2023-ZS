import dbApi from "./dbApi";

export const getUser = (userName, userPassword) => {
  // return dbApi.get(`/users?username=${username}&password=${password}`);
  const requestParams ={
    username: userName
    ,password: userPassword
  }
  return dbApi.post(`/users?username=boiedRice`);
};

export default {
  getUser,
};
