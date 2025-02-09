import "reflect-metadata";
import { expect, test, describe } from "vitest";
import supertest from "supertest";
import { container } from "tsyringe";

import { app } from "../../../app";
import { studentMock } from "../../mocks/data/studentMock";
import { StudentRepositorySingletonMock } from "../../mocks/repositories/StudentRepositoryMock";

describe("Student Endpoint", () => {
    test("Should be able to create a student", async () => {
        const mockedData = { name: studentMock.name };

        const response = await supertest(app)
            .post("/api/students")
            .send(mockedData);
        
        expect(response.status).toBe(201);
        expect(response.body).toStrictEqual(mockedData);
    });

    test("Should not be able to create a student when it's missing body attr", async () => {
        const mockedData = { ...studentMock };
        delete mockedData.name;

        const response = await supertest(app)
            .post("/api/students")
            .send(mockedData);

        expect(response.status).toBe(400);
        expect(response.text).toContain("Bad Request");
    });

    test("Should be able to delete a student", async () => {
        const response = await supertest(app).delete(
            `/api/students/${studentMock.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(studentMock);
    });

    test("Should be able to list all student", async () => {
        const response = await supertest(app).get("/api/students");

        const studentRepositorySingletonMock = container.resolve(
            StudentRepositorySingletonMock
        );

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(
            studentRepositorySingletonMock.studentRepositoryMock.studentList
        );
    });

    test("Should be able to get a specific student mockedData", async () => {
        const response = await supertest(app).get(
            `/api/students/${studentMock.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(studentMock);
    });

    test("Should be able to get a specific student when id is not found", async () => {
        const response = await supertest(app).get(`/api/students/0`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    test("Should be able to update a student", async () => {
        const mockedData = { ...studentMock, name: "Test" };

        const response = await supertest(app)
            .put(`/api/students/${studentMock.id}`)
            .send(mockedData);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(mockedData);
    });
});