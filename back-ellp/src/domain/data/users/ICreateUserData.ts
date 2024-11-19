import { UserEntity } from "@domain/entities/UserEntity";

export type Params = {
  username: string;
  password: string;
  dateOfBirth: string;
  role: string;
};
export type Response = UserEntity;

export interface ICreateUserData {
  create(params: Params): Promise<Response>;
}
