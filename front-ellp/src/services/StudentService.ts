import { StudentEntity } from "@/entities/StudentEntity";
import axios from "axios";

export const baseURL = "http://localhost:3333/api/students/";

export const createStudent = async (
  name: string
) =>
  axios.post(baseURL, {
    name
  });

export const updateStudent = async (id: string, data: object) =>
  axios.put(baseURL + id, data);

export const deleteStudent = async (id: string) => axios.delete(baseURL + id);

export const getAllStudent = async (
  term?: string,
  filters?: object
): Promise<Array<StudentEntity>> => {
  const { data } = await axios.get(baseURL, { params: { term, filters } });
  return data;
};

export const getByIdStudent = async (
  id: string
): Promise<StudentEntity> => {
  const { data } = await axios.get(baseURL + id);
  return data;
};
