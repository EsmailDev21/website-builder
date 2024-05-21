// services/folderService.ts

import axios from "axios";
import { APIURL } from "../../utils/api";

export const createFolder = async (data: any) => {
  const response = await axios.post(`${APIURL}/folder/byParent`, data);
  return response.data;
};

export const getFoldersByProjectId = async (projectId: string) => {
  const response = await axios.get(`${APIURL}/folder/byProject/${projectId}`);
  return response.data;
};

export const getChildFolders = async (parentId: string) => {
  const response = await axios.get(`${APIURL}/folder/subFolders/${parentId}`);
  return response.data.folders;
};
