import { UserEntity } from "@domain/entities/UserEntity";

export type Params = {
  email: string;
  password: string;
  dateOfBirth: string;
};
export type Response = UserEntity;

export interface ICreateUserData {
  create(params: Params): Promise<Response>;
}
