import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Login from "../../app/login/page";
import { UserService } from "../../services/UserService";

vi.mock("../../services/UserService", () => ({
  UserService: vi.fn().mockImplementation(() => ({
    login: vi.fn(),
  })),
}));

describe("Login Component", () => {
  let mockLogin: jest.Mock;

  beforeEach(() => {
    mockLogin = vi.fn();
    (UserService as any).mockImplementation(() => ({
      login: mockLogin,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should render the login form and the login button", () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/senha/i);
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByRole("button", { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("Should call the login service with correct data when login button is clicked", async () => {
    mockLogin.mockResolvedValueOnce({ status: 200 });

    render(<Login />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith("user@test.com", "password123");
    });
  });

  it("Should redirect to workshops page when login succeeds", async () => {
    mockLogin.mockResolvedValueOnce({ status: 200 });
    delete window.location;
    window.location = { href: "" } as any;

    render(<Login />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(window.location.href).toBe("/workshops");
    });
  });
});