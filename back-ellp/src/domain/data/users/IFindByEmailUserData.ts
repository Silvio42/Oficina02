import { UserEntity } from "@domain/entities/UserEntity";

export type Params = { email: string };
export type Response = UserEntity;

export interface IFindByEmailUserData {
  findByEmail(params: Params): Promise<Response>;
}
