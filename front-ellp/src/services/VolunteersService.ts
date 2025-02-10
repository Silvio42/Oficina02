import { VolunteerEntity } from "@/entities/VolunteerEntity";
import axios from "axios";

export const baseURL = "http://localhost:3333/api/volunteers/";

export const createVolunteers = async (
  name: string,
  email: string,
  workshop: string
) => axios.post(baseURL, { name, email, workshop });

export const getAllVolunteers = async (
  workshop: string
): Promise<Array<VolunteerEntity>> => {
  const response = await axios.get(baseURL, { params: { workshop } });
  return response?.data;
};
