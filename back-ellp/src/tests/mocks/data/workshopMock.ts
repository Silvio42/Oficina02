import { WorkshopEntity } from "@domain/entities/WorkshopEntity";

export const workshopMock: WorkshopEntity = {
  id: "123",
  name: "Workshop Name",
  description: "Workshop Description",
  manager: "Manager Id",
  startAt: new Date().toISOString(),
  volunteers: [],
};
