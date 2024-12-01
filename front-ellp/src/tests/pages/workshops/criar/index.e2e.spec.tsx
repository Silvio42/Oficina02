import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vitest } from "vitest";

import WokshopsCreation from "@/app/workshops/criar/page";

vitest.mock(import("@/services/WorkshopService"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    create: vitest.fn().mockResolvedValue({}),
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

  it("Should be able to render the form elements", () => {
    render(<WokshopsCreation />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data início/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /voltar/i })).toBeInTheDocument();
  });

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

  it("Should be able to submit the form and calls WorkshopService creation endpoint", async () => {
    render(<WokshopsCreation />);

    const nameInput = screen.getByLabelText(/nome/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);
    const saveButton = screen.getByRole("button", { name: /salvar/i });

    fireEvent.change(nameInput, { target: { value: nameText } });
    fireEvent.change(descriptionInput, { target: { value: descriptionText } });

    const originalLocation = window.location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as unknown as any).location;
    window.location = { href: "" } as Location;

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(window.location.href).toBe("/workshops");
    });

    window.location = originalLocation;
  });

  it("Should be able to navigate back when clicking the 'VOLTAR' action", () => {
    render(<WokshopsCreation />);

    const backButton = screen.getByRole("link", { name: /voltar/i });
    expect(backButton).toHaveAttribute("href", "/workshops");
  });
});
