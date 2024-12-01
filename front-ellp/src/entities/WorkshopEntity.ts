import { UserEntity } from "./UserEntity";

export type WorkshopEntity = {
  id?: string;
  name: string;
  description: string;
  startAt: Date | string;
  manager: string | UserEntity;
  volunteers: Array<string | UserEntity>;
};
