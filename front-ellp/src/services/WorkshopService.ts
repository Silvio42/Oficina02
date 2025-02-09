import { WorkshopEntity } from "@/entities/WorkshopEntity";
import axios from "axios";

export const baseURL = "http://localhost:3333/api/workshops/";


export const createWorkshop = async (
  name: string,
  description: string,
  startAt: Date,
  manager: string,
  students: Array<string>
) =>
  axios.post(baseURL, {
    name,
    description,
    startAt,
    manager,
    students
  });

export const updateWorkshop = async (id: string, data: object) =>
  axios.put(baseURL + id, data);

export const deleteWorkshop = async (id: string) => axios.delete(baseURL + id);

export const getAllWorkshop = async (
  term?: string,
  filters?: object
): Promise<Array<WorkshopEntity>> => {
  const { data } = await axios.get(baseURL, { params: { term, filters } });
  return data;
};

export const getByIdWorkshop = async (
  id: string
): Promise<WorkshopEntity> => {
  const { data } = await axios.get(baseURL + id);
  return data;
};
