import { WorkshopEntity } from "@domain/entities/WorkshopEntity";

export type Params = { filters: object; term?: string };
export type Response = Array<WorkshopEntity>;

export interface IFindAllWorkshopsData {
  findAll(params: Params): Promise<Response>;
}
