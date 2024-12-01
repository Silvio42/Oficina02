import { WorkshopEntity } from "@/entities/WorkshopEntity";
import axios from "axios";

export class WorkshopService {
  private readonly api = axios.create({
    baseURL: "http://localhost:3333/api/workshops/",
  });

  async create(
    name: string,
    description: string,
    startAt: Date,
    manager: string
  ) {
    return this.api.post("", {
      name,
      description,
      startAt,
      manager,
    });
  }

  async update(id: string, data: object) {
    return this.api.put(id, data);
  }

  async delete(id: string) {
    return this.api.delete(id);
  }

  async getAll(
    term?: string,
    filters?: object
  ): Promise<Array<WorkshopEntity>> {
    const { data } = await this.api.get("", { params: { term, filters } });
    return data;
  }

  async getById(id: string) {
    const { data } = await this.api.get(id);
    return data;
  }
}
