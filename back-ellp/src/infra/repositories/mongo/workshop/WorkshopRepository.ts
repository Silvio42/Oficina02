import * as CreateWorkshopData from "@domain/data/workshop/ICreateWorkshopData";
import * as DeleteWorkshopData from "@domain/data/workshop/IDeleteWorkshopData ";
import * as FindByIdWorkshopData from "@domain/data/workshop/IFindByIdWorkshopData";
import * as FindAllWorkshopsData from "@domain/data/workshop/IFindAllWorkshopsData";
import * as UpdateWorkshopData from "@domain/data/workshop/IUpdateWorkshopData";
import { WorkshopMappers } from "./WorkshopMappers";
import { WorkshopModel } from "./WorkshopModel";

export class WorkshopRepository
  implements
    CreateWorkshopData.ICreateWorkshopData,
    DeleteWorkshopData.IDeleteWorkshopData,
    FindByIdWorkshopData.IFindByIdWorkshopData,
    FindAllWorkshopsData.IFindAllWorkshopsData,
    UpdateWorkshopData.IUpdateWorkshopData
{
  async update({
    id,
    data,
  }: UpdateWorkshopData.Params): Promise<UpdateWorkshopData.Response> {
    await WorkshopModel.updateOne({ _id: id }, data);
    return this.findById({ id });
  }

  async findAll({
    filters,
  }: FindAllWorkshopsData.Params): Promise<FindAllWorkshopsData.Response> {
    const arrayData = await WorkshopModel.find(filters)
      .populate("manager")
      .populate("volunteers")
      .populate("students")
      .sort({ startAt: -1 })
      .lean();
    return WorkshopMappers.toEntities(arrayData);
  }

  async findById({
    id,
  }: FindByIdWorkshopData.Params): Promise<FindByIdWorkshopData.Response> {
    const objectData = await WorkshopModel.findOne({ _id: id })
      .populate("manager")
      .populate("volunteers")
      .populate("students")
      .lean();
    return WorkshopMappers.toEntity(objectData);
  }

  async create(
    params: CreateWorkshopData.Params
  ): Promise<CreateWorkshopData.Response> {
    const workshop = await WorkshopModel.create(params);
    return this.findById({ id: workshop._id });
  }

  async delete({
    id,
  }: DeleteWorkshopData.Params): Promise<DeleteWorkshopData.Response> {
    const objectData = await WorkshopModel.findOneAndDelete({ _id: id }).lean();
    return WorkshopMappers.toEntity(objectData);
  }
}
