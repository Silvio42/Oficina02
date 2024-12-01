import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Login from "../../app/login/page";

describe("Login Component", () => {
  it("Should render the login form and the login button", () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/senha/i);
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByRole("button", { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
  });
});
