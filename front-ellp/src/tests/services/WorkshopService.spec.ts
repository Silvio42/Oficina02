import { describe, it, expect, vitest, beforeEach, Mocked } from "vitest";
import axios from "axios";

import {
  createWorkshop,
  deleteWorkshop,
  getAllWorkshop,
  getByIdWorkshop,
  updateWorkshop,
} from "../../services/WorkshopService";
import { WorkshopEntity } from "../../entities/WorkshopEntity";

vitest.mock("axios");

describe("Workshop Service", () => {
  const mockedAxios = axios as Mocked<typeof axios>;

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  describe("getAll", () => {
    it("Should be able to send a GET request with the correct parameters", async () => {
      const mockResponse: WorkshopEntity[] = [
        {
          id: "1",
          name: "Workshop 1",
          description: "Description 1",
          startAt: "2024-12-01T00:00:00Z",
          manager: "Manager1",
          volunteers: [],
          students: [],
        },
      ];

      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const term = "Workshop";
      const filters = { manager: "Manager1" };

      const result = await getAllWorkshop(term, filters);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("create", () => {
    it("Should be able to send a POST request with the correct payload including students", async () => {
      mockedAxios.post.mockResolvedValue({});

      const payload = {
        name: "Workshop Name",
        description: "Workshop Description",
        startAt: new Date(),
        manager: "manager-id",
        students: ["student-1", "student-2"],
      };

      await createWorkshop(
        payload.name,
        payload.description,
        payload.startAt,
        payload.manager,
        payload.students
      );

      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ students: payload.students })
      );
    });
  });

  describe("update", () => {
    it("Should be able to send a PUT request with the correct ID and data", async () => {
      mockedAxios.put.mockResolvedValue({ data: { success: true } });

      const id = "workshop-id";
      const data = { name: "Updated Workshop", students: ["student-3"] };

      await updateWorkshop(id, data);

      expect(mockedAxios.put).toHaveBeenCalledTimes(1);
      expect(mockedAxios.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ students: data.students })
      );
    });
  });

  describe("delete", () => {
    it("Should be able to send a DELETE request with the correct ID", async () => {
      mockedAxios.delete.mockResolvedValue({ data: { success: true } });

      const id = "workshop-id";

      await deleteWorkshop(id);

      expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe("getById", () => {
    it("Should be able to send a GET request with the correct ID and return students", async () => {
      const mockResponse: WorkshopEntity = {
        id: "1",
        name: "Workshop 1",
        description: "Description 1",
        startAt: "2024-12-01T00:00:00Z",
        manager: "Manager1",
        volunteers: [],
        students: ["student-1", "student-2"],
      };

      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const id = "1";

      const result = await getByIdWorkshop(id);
      
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
      expect(result.students).toHaveLength(2);
    });
  });
});