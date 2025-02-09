import "reflect-metadata";
import { expect, test, describe } from "vitest";
import supertest from "supertest";

import { app } from "../../../app";
import { workshopAccessMock } from "../../mocks/data/workshopAccessMock";

describe("Workshop Access Endpoint", () => {
  test("Should be able to create a workshop access", async () => {
    const mockedData = { ...workshopAccessMock };
    delete mockedData.id;
    delete mockedData.role;
    delete mockedData.createdAt;
    delete mockedData.updatedAt;

    const response = await supertest(app)
      .post("/api/workshops-access")
      .send(mockedData);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual("");
  });

  test("Should not be able to create a workshop when it's missing body attr", async () => {
    const mockedData = { ...workshopAccessMock };
    delete mockedData.id;
    delete mockedData.role;
    delete mockedData.createdAt;
    delete mockedData.updatedAt;
    delete mockedData.workshop;

    const response = await supertest(app)
      .post("/api/workshops-access")
      .send(mockedData);

    expect(response.status).toBe(400);
    expect(response.text).toContain("Bad Request");
  });

  test("Should be able to get a specific workshop access mockedData", async () => {
    const response = await supertest(app).get(
      "/api/workshops-access?workshop=123&user=123"
    );

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(workshopAccessMock);
  });

  test("Should be able to get a specific workshop when id is not found", async () => {
    const response = await supertest(app).get(`/api/workshops/0`);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});
  });
});
