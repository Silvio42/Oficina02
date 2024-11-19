import { UserEntity } from "@domain/entities/UserEntity";

export type Params = { id: string };
export type Response = UserEntity;

export interface IFindByIdUserData {
  findById(params: Params): Promise<Response>;
}
