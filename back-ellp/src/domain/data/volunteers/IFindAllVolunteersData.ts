import { VolunteerEntity } from "@domain/entities/VolunteerEntity";

export type Params = { filters?: { workshop: string }; term?: string };
export type Response = Array<VolunteerEntity>;

export interface IFindAllVolunteersData {
  findAll(params: Params): Promise<Response>;
}
