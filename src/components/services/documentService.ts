import axios from "axios";
import { APIURL } from "../../utils/api";
import { Document } from "../../types";
import { token } from "../../utils/auth";

export type CreateDocumentDto = Partial<Document>;

export interface UpdateDocumentDto {
  // Define the structure of UpdateDocumentDto based on your NestJS DTO
  title?: string;
  content?: string;
  // Add other fields as needed
}

export const createDocument = async (
  data: CreateDocumentDto,
  projectID: string,
  filename: string
) => {
  const response = await axios.post(
    `${APIURL}/document?projectID=${projectID}&filename=${filename}`,
    data
  );
  return response.data;
};

export const getAllDocuments = async () => {
  const response = await axios.get(`${APIURL}/document`);
  return response.data;
};

export const getDocumentById = async (id: string) => {
  const response = await axios.get(`${APIURL}/document/${id}`);
  return response.data;
};

export const updateDocument = async (id: string, data: UpdateDocumentDto) => {
  const response = await axios.patch(`${APIURL}/document/${id}`, data);
  return response.data;
};

export const deleteDocument = async (id: string) => {
  const response = await axios.delete(`${APIURL}/document/${id}`);
  return response.data;
};
