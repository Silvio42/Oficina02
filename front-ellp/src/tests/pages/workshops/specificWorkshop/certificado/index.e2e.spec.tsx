import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import html2canvas from "html2canvas";
import { expect, vi } from "vitest";

import * as UserCookies from "@/actions/userCookies";
import * as WorkshopAccessService from "@/services/WorkshopAccessService";
import { WorkshopUserCertificate } from "@/components/pages/workshops/SpecificWorkshop/certificate";

vi.mock("html2canvas", () => ({
  default: vi.fn(() =>
    Promise.resolve({ toDataURL: () => "data:image/png;base64,fake" })
  ),
}));

vi.mock("@/services/WorkshopAccessService", () => ({
  getByIdWorkshopAccess: vi.fn(),
}));

vi.mock("@/actions/userCookies", () => ({
  getUserId: vi.fn(),
}));

describe("WorkshopUserCertificate", () => {
  const mockWorkshopAccess = {
    user: {
      email: "test.user@example.com",
    },
    role: "student",
    workshop: {
      name: "Workshop Test",
      startAt: new Date().toISOString(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(WorkshopAccessService, "getByIdWorkshopAccess").mockResolvedValue(
      mockWorkshopAccess
    );
    vi.spyOn(UserCookies, "getUserId").mockReturnValue("12345");
  });

  it("should render the component correctly", async () => {
    render(<WorkshopUserCertificate workshopId="workshop123" />);

    expect(screen.getByText("Certificação de Workshop")).toBeInTheDocument();
    expect(
      screen.getByText("Certificado de confirmação de participação do workshop")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Certificado de acesso e utilização vitalícia")
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(WorkshopAccessService.getByIdWorkshopAccess).toHaveBeenCalledWith(
        "workshop123",
        "12345"
      )
    );
  });

  it("should display user information after loading data", async () => {
    render(<WorkshopUserCertificate workshopId="workshop123" />);

    await waitFor(() => {
      expect(
        screen
          .getAllByText((_content, element) =>
            element?.textContent?.includes("test.user@example.com")
          )
          .at(0)
      ).toBeInTheDocument();
      expect(
        screen
          .getAllByText((_content, element) =>
            element?.textContent?.includes("Workshop Test")
          )
          .at(0)
      ).toBeInTheDocument();
    });
  });

  it("should generate a certificate image on click", async () => {
    render(<WorkshopUserCertificate workshopId="workshop123" />);

    await waitFor(() => {
      expect(
        screen
          .getAllByText((_content, element) =>
            element?.textContent?.includes("test.user@example.com")
          )
          .at(0)
      ).toBeInTheDocument();
    });

    const certificateDiv = screen.getByText("Certificação de Workshop");
    fireEvent.click(certificateDiv);

    await waitFor(() => {
      expect(html2canvas).toHaveBeenCalled();
    });
  });

  it("should handle no workshop data gracefully", async () => {
    vi.spyOn(WorkshopAccessService, "getByIdWorkshopAccess").mockResolvedValue(
      null
    );

    render(<WorkshopUserCertificate workshopId="workshop123" />);

    await waitFor(() => {
      expect(
        screen.queryByText("test.user@example.com")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Certificação de Workshop")).toBeInTheDocument();
    });
  });
});
