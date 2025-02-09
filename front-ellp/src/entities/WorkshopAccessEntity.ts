import { UserEntity } from "./UserEntity";
import { WorkshopEntity } from "./WorkshopEntity";

export type WorkshopAccessEntity = {
  id?: string;
  workshop: WorkshopEntity;
  user: UserEntity;
  role: string;
  createdAt: string;
  updatedAt: string;
};
