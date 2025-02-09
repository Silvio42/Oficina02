import { WorkshopAccessEntity } from "@/entities/WorkshopAccessEntity";
import { WorkshopEntity } from "@/entities/WorkshopEntity";
import axios from "axios";

export const baseURL = "http://localhost:3333/api/workshops-access/";

export const createWorkshopAccess = async (
  workshop?: string,
  user?: string | null
) => axios.post(baseURL, { workshop, user });

export const getAllWorkshopAccess = async (
  term?: string,
  filters?: object
): Promise<Array<WorkshopEntity>> => {
  const { data } = await axios.get(baseURL, { params: { term, filters } });
  return data;
};

export const getByIdWorkshopAccess = async (
  workshop: string,
  user?: string | null
): Promise<WorkshopAccessEntity> => {
  const { data } = await axios.get(baseURL, { params: { workshop, user } });
  return data;
};
