import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import WokshopsCreation from "../../../app/workshops/criar/page";

vi.mock("../../../services/WorkshopService", () => ({
  createWorkshop: vi.fn().mockResolvedValue({ status: 201 }),
}));

vi.mock("../../../services/StudentService", () => ({
  createStudent: vi.fn().mockResolvedValue({
    data: { _doc: { _id: "123", name: "Aluno Teste" } },
  }),
  deleteStudent: vi.fn().mockResolvedValue({}),
}));

describe("Workshop Creation Page", () => {
  test("adds a student when clicking the add button", async () => {
    render(<WokshopsCreation />);

    const input = screen.getByPlaceholderText(/Nome do aluno/i);
    const addButton = screen.getByText(/Adicionar Aluno/i);

    fireEvent.change(input, { target: { value: "Aluno Teste" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Aluno Teste")).toBeInTheDocument();
    });
  });
});