import { UserEntity } from "./UserEntity";

export type WorkshopEntity = {
  id?: string;
  name: string;
  description: string;
  startAt: string | Date;
  manager: string | UserEntity;
  volunteers: Array<string | UserEntity>;
};
