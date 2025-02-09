import { WorkshopAccessEntity } from "@/entities/WorkshopAccessEntity";
import axios from "axios";

export const baseURL = "http://localhost:3333/api/workshops-access/";

export const createWorkshopAccess = async (
  workshop?: string,
  user?: string | null
) => axios.post(baseURL, { workshop, user });

export const getByIdWorkshopAccess = async (
  workshop: string,
  user?: string | null
): Promise<WorkshopAccessEntity> => {
  const response = await axios.get(baseURL, { params: { workshop, user } });
  return response?.data;
};
