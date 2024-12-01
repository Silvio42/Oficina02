import { UserEntity } from "@domain/entities/UserEntity";

export type Params = {
  username: string;
  password: string;
};

export type Response = UserEntity | null;

export interface ILoginUserData {
  login(params: Params): Promise<Response>;
}