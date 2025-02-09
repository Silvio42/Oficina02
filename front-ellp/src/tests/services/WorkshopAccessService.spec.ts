import { describe, it, expect, vitest, beforeEach, Mocked } from "vitest";
import axios from "axios";

import {
  createWorkshopAccess,
  getByIdWorkshopAccess,
} from "../../services/WorkshopAccessService";
import { WorkshopAccessEntity } from "@/entities/WorkshopAccessEntity";

vitest.mock("axios");

describe("Workshop Access Service", () => {
  const mockedAxios = axios as Mocked<typeof axios>;

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  describe("create", () => {
    it("Should be able to send a POST request with the correct payload including students", async () => {
      mockedAxios.post.mockResolvedValue({});
      const payload = { workshop: "123", user: "123" };

      await createWorkshopAccess(payload.user, payload.workshop);

      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });
  });

  describe("getById", () => {
    it("Should be able to send a GET request with the correct ID and return students", async () => {
      const mockResponse: WorkshopAccessEntity = {
        id: "123",
        workshop: {
          name: "",
          description: "",
          startAt: "",
          manager: "",
          volunteers: [],
          students: [],
        },
        user: {
          id: "",
          email: "",
          password: "",
          dateOfBirth: "",
        },
        role: "",
        createdAt: "",
        updatedAt: "",
      };

      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const workshopId = "123";
      const userId = "123";

      const result = await getByIdWorkshopAccess(workshopId, userId);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });
  });
});
