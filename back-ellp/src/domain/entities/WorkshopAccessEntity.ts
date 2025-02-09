import { UserEntity } from "./UserEntity";
import { WorkshopEntity } from "./WorkshopEntity";

export type WorkshopAccessEntity = {
  id?: string;
  workshop: string | WorkshopEntity;
  user: string | UserEntity;
  role?: string;
  createdAt: string;
  updatedAt: string;
};
