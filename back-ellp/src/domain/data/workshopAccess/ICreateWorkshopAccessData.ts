import { WorkshopAccessEntity } from "@domain/entities/WorkshopAccessEntity";

export type Params = Partial<WorkshopAccessEntity>;
export type Response = void;

export interface ICreateWorkshopAccessData {
  create(params: Params): Promise<Response>;
}
