import * as CreateWorkshopData from "../../../../domain/data/workshopAccess/ICreateWorkshopAccessData";
import * as FindByIdWorkshopData from "../../../../domain/data/workshopAccess/IFindByIdWorkshopAccessData";
import { WorkshopAccessMappers } from "./WorkshopAccessMappers";
import { WorkshopAccessModel } from "./WorkshopAccessModel";
import { IUserModel } from "../users/UserModel";
import { IWorkshopModel } from "../workshop/WorkshopModel";

export class WorkshopAccessRepository
  implements
    CreateWorkshopData.ICreateWorkshopAccessData,
    FindByIdWorkshopData.IFindByIdWorkshopAccessData
{
  async findById({
    filters,
  }: FindByIdWorkshopData.Params): Promise<FindByIdWorkshopData.Response> {
    const objectData = await WorkshopAccessModel.findOne(filters)
      .populate("user")
      .populate("workshop")
      .lean();

    const workshop = objectData?.workshop as unknown as IWorkshopModel;
    const user = objectData?.user as unknown as IUserModel;

    return {
      ...WorkshopAccessMappers.toEntity(objectData),
      role: workshop?.volunteers?.some(
        (volunteer) => String(volunteer) === String(user?._id)
      )
        ? "volunteer"
        : "student",
    };
  }

  async create(
    params: CreateWorkshopData.Params
  ): Promise<CreateWorkshopData.Response> {
    await WorkshopAccessModel.updateOne(
      { workshop: params.workshop, user: params.user },
      params,
      { upsert: true }
    );

    return;
  }
}
