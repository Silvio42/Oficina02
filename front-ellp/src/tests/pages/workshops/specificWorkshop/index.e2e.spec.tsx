import { render, screen, waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import dayjs from "dayjs";

import {
  getByIdWorkshop,
  getByIdWorkshopAccess,
} from "@/services/WorkshopService";
import { SpecificWorkshop } from "@/components/pages/workshops/SpecificWorkshop";

vi.mock("@/services/WorkshopService", () => ({
  getByIdWorkshop: vi.fn(),
  getByIdWorkshopAccess: vi.fn(),
  createWorkshopAccess: vi.fn().mockResolvedValue({ status: 200 }),
}));

vi.mock("axios");

describe("SpecificWorkshop", () => {
  const mockWorkshop = {
    id: "1",
    name: "Test Workshop",
    description: "Test Description",
    startAt: dayjs().subtract(1, "hour").toISOString(),
    volunteers: [{ id: "1" }, { id: "2" }],
  };

  const mockWorkshopAccess = {
    id: "1",
    createdAt: dayjs().subtract(1, "hour").toISOString(),
    updatedAt: dayjs().subtract(30, "minutes").toISOString(),
    user: { id: "user1", email: "test@test.com" },
    workshop: { id: "workshop1" },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display workshop details", async () => {
    getByIdWorkshop.mockResolvedValue(mockWorkshop);
    getByIdWorkshopAccess.mockResolvedValue(mockWorkshopAccess);

    render(<SpecificWorkshop workshopId="1" />);

    await waitFor(() => {
      expect(screen.getByText(/Nome do Workshop/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Workshop/i)).toBeInTheDocument();
      expect(screen.getByText(/Descrição/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Data de início \(2h de evento\)/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(dayjs(mockWorkshop.startAt).format("DD/MM/YYYY HH:mm"))
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Quantidade de voluntários/i)
      ).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("should allow accessing certificate if workshop finished and user has access", async () => {
    getByIdWorkshop.mockResolvedValue({
      ...mockWorkshop,
      startAt: dayjs().subtract(3, "hours").toISOString(),
    });
    getByIdWorkshopAccess.mockResolvedValue(mockWorkshopAccess);

    render(<SpecificWorkshop workshopId="1" />);

    await waitFor(() => {
      const button = screen.getByTestId("redirect-action-button");
      expect(button).toHaveClass("certificate-nondisabled");
      expect(button).not.toBeDisabled();
    });
  });
});
