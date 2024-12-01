import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vitest } from "vitest";

import Workshops from "../../../app/workshops/page";

vitest.mock("@/services/WorkshopService", () => ({
  getAllWorkshop: vitest.fn().mockResolvedValue([
    {
      id: "1",
      name: "Test Workshop 1",
      description: "This is a test workshop description.",
      startAt: new Date("2024-12-10"),
      manager: "John Doe",
      volunteers: [],
    },
  ]),
  getByIdWorkshop: vitest.fn().mockResolvedValue({
    id: "1",
    name: "Test Workshop 1",
    description: "This is a test workshop description.",
    startAt: new Date("2024-12-10"),
    manager: "John Doe",
    volunteers: [],
  }),
  deleteWorkshop: vitest.fn().mockResolvedValue({
    id: "1",
    name: "Test Workshop 1",
    description: "This is a test workshop description.",
    startAt: new Date("2024-12-10"),
    manager: "John Doe",
    volunteers: [],
  }),
}));

describe("Workshops Page", () => {
  beforeEach(() => vitest.clearAllMocks());

  test("renders the create workshop button and redirects", async () => {
    render(<Workshops />);

    const createButton = screen.getByTestId("create-workshop-redirect");
    expect(createButton).toBeDefined();
    expect(createButton).toHaveAttribute("href", "/workshops/criar");
  });

  test("Shoud be able to load and display all workshops", async () => {
    render(<Workshops />);

    await waitFor(() => {
      expect(screen.getByText("Test Workshop 1")).toBeDefined();
    });

    vitest.clearAllMocks();
  });

  test("deletes a workshop and reloads the list", async () => {
    render(<Workshops />);

    await waitFor(() => {
      expect(screen.getByText("Test Workshop 1")).toBeDefined();
    });

    const deleteButtons = screen.getAllByText("", { selector: ".pi-trash" });
    fireEvent.click(deleteButtons[0]);
  });

  test("Should be able to search specific workshop", async () => {
    render(<Workshops />);

    const search = screen.getByTestId("table-search");
    fireEvent.change(search, { target: { value: "Test Workshop 1" } });

    await waitFor(() => {
      expect(screen.getByText("Test Workshop 1")).toBeDefined();
    });
  });

  test("Should not be able to search specific workshop", async () => {
    render(<Workshops />);

    const search = screen.getByTestId("table-search");
    fireEvent.change(search, { target: { value: "Test UTFPR" } });

    await waitFor(() => {
      expect(screen.getByText("Nenhum workshop encontrado.")).toBeDefined();
    });
  });
});
