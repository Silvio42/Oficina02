import { WorkshopEntity } from "@domain/entities/WorkshopEntity";

export const workshopMock: WorkshopEntity = {
  id: "123",
  name: "Workshop Name",
  description: "Workshop Description",
  manager: "Manager Id",
  startAt: new Date().toISOString(),
  volunteers: [],
  students: [
    "321321321321321321321321",
    "213213213213213213213213",
    "423423423423423423423423"
  ]
};
