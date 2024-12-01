import { UserEntity } from "@domain/entities/UserEntity";

export type Params = {
  email: string;
  password: string;
};

export type Response = UserEntity | null;

export interface ILoginUserData {
  login(params: Params): Promise<Response>;
}