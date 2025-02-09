import { WorkshopEntity } from "@domain/entities/WorkshopEntity";

export const workshopMock: WorkshopEntity = {
  id: "123",
  name: "Workshop Name",
  description: "Workshop Description",
  manager: "Manager Id",
  startAt: new Date().toISOString(),
  volunteers: [],
  students: [{
    id: "321",
    name: "Estudante 1"
  },
  {
    id: "213",
    name: "Estudante 2"
  },
  {
    id: "432",
    name: "Estudante 3"
  }]
};
