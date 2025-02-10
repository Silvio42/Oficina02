import * as CreateVolunteersData from "../../../../domain/data/volunteers/ICreateVolunteersData";
import * as FindAllVolunteersData from "../../../../domain/data/volunteers/IFindAllVolunteersData";
import { Volunteer } from "./VolunteersModel";

export class VolunteersRepository
  implements
    CreateVolunteersData.ICreateVolunteersData,
    FindAllVolunteersData.IFindAllVolunteersData
{
  async create(
    params: CreateVolunteersData.Params
  ): Promise<CreateVolunteersData.Response> {
    await Volunteer.create(params);
  }

  async findAll({
    filters,
  }: FindAllVolunteersData.Params): Promise<FindAllVolunteersData.Response> {
    return Volunteer.find(filters);
  }
}
