import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vitest } from "vitest";

import WokshopsCreation from "../../../../app/workshops/criar/page";

vitest.mock(import("../../../../services/WorkshopService"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    createWorkshop: vitest.fn().mockResolvedValue({}),
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
  };
});

describe("WokshopsCreation Page", () => {
  const descriptionText = "Workshop Description";
  const nameText = "Workshop Name";

  it("Should be able to handle form input changes", () => {
    render(<WokshopsCreation />);

    const nameInput = screen.getByLabelText(/nome/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);

    fireEvent.change(nameInput, { target: { value: nameText } });
    fireEvent.change(descriptionInput, {
      target: { value: descriptionText },
    });

    expect(nameInput).toHaveValue(nameText);
    expect(descriptionInput).toHaveValue(descriptionText);
  });

  it("Should be able to navigate back when clicking the 'VOLTAR' action", () => {
    render(<WokshopsCreation />);

    const backButton = screen.getByRole("link", { name: /voltar/i });
    expect(backButton).toHaveAttribute("href", "/workshops");
  });
});
