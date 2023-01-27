import { getActualUser } from "../service/activeUsers";
import dbApi from "./dbApi";

export const getFiles = (path) => {
  return dbApi.get(`/files?path=${path}&userid=${getActualUser().userid}`);
};

export const putDir = (folderName, path) => {
  dbApi.post("directory", { name: folderName, path: path });
};

export const getDirectories = (path) => {
  return dbApi.get(
    `/directories?path=${path}&userid=${getActualUser().userid}`
  );
};

export default {
  getFiles,
  getDirectories,
  putDir,
};
