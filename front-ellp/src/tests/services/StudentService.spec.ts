import { describe, it, expect, vitest, beforeEach, Mocked } from "vitest";
import axios from "axios";

import {
    createStudent,
    deleteStudent,
    getAllStudent,
    getByIdStudent,
    updateStudent,
} from "../../services/StudentService";
import { StudentEntity } from "../../entities/StudentEntity";

vitest.mock("axios");

describe("Student Service", () => {
    const mockedAxios = axios as Mocked<typeof axios>;

    beforeEach(() => {
        vitest.clearAllMocks();
    });

    describe("getAll", () => {
        it("Should be able to send a GET request with the correct parameters", async () => {
            const mockResponse: StudentEntity[] = [
                {
                    id: "1",
                    name: "Student 1",
                },
            ];

            mockedAxios.get.mockResolvedValue({ data: mockResponse });

            const term = "Student";
            const filters = { class: "Math" };

            const result = await getAllStudent(term, filters);

            expect(mockedAxios.get).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockResponse);
        });
    });

    describe("create", () => {
        it("Should be able to send a POST request with the correct payload", async () => {
            mockedAxios.post.mockResolvedValue({});

            const payload = {
                name: "New Student",
            };

            await createStudent(payload.name);

            expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        });
    });

    describe("update", () => {
        it("Should be able to send a PUT request with the correct ID and data", async () => {
            mockedAxios.put.mockResolvedValue({ data: { success: true } });

            const id = "student-id";
            const data = { name: "Updated Student" };

            await updateStudent(id, data);

            expect(mockedAxios.put).toHaveBeenCalledTimes(1);
        });
    });

    describe("delete", () => {
        it("Should be able to send a DELETE request with the correct ID", async () => {
            mockedAxios.delete.mockResolvedValue({ data: { success: true } });

            const id = "student-id";

            await deleteStudent(id);

            expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
        });
    });

    describe("getById", () => {
        it("Should be able to send a GET request with the correct ID", async () => {
            const mockResponse: StudentEntity = {
                id: "1",
                name: "Student 1",
            };

            mockedAxios.get.mockResolvedValue({ data: mockResponse });

            const id = "1";

            const result = await getByIdStudent(id);

            expect(mockedAxios.get).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockResponse);
        });
    });
});