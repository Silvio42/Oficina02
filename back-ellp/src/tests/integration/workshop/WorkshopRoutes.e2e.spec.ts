import "reflect-metadata";
import { expect, test, describe } from "vitest";
import supertest from "supertest";
import { container } from "tsyringe";

import { app } from "../../../app";
import { workshopMock } from "../../mocks/data/workshopMock";
import { WorkshopRepositorySingletonMock } from "../../mocks/repositories/WorkshopRepositoryMock";

describe("Workshop Endpoint", () => {
  test("Should be able to create a workshop", async () => {
    const mockedData = { ...workshopMock };
    delete mockedData.id;
    delete mockedData.volunteers;
    delete mockedData.students;

    const response = await supertest(app)
      .post("/api/workshops")
      .send(mockedData);

    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual(mockedData);
  });

  test("Should not be able to create a workshop when it's missing body attr", async () => {
    const mockedData = { ...workshopMock };
    delete mockedData.name;

    const response = await supertest(app)
      .post("/api/workshops")
      .send(mockedData);

    expect(response.status).toBe(400);
    expect(response.text).toContain("Bad Request");
  });

  test("Should be able to delete a workshop", async () => {
    const response = await supertest(app).delete(
      `/api/workshops/${workshopMock.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(workshopMock);
  });

  test("Should be able to list all workshops", async () => {
    const response = await supertest(app).get("/api/workshops");

    const workshopRepositorySingletonMock = container.resolve(
      WorkshopRepositorySingletonMock
    );

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(
      workshopRepositorySingletonMock.workshopRepositoryMock.workshopList
    );
  });

  test("Should be able to get a specific workshop mockedData", async () => {
    const response = await supertest(app).get(
      `/api/workshops/${workshopMock.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(workshopMock);
  });

  test("Should be able to get a specific workshop when id is not found", async () => {
    const response = await supertest(app).get(`/api/workshops/0`);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});
  });

  test("Should be able to update a workshop", async () => {
    const mockedData = { ...workshopMock, name: "Test" };

    const response = await supertest(app)
      .put(`/api/workshops/${workshopMock.id}`)
      .send(mockedData);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mockedData);
  });
});
