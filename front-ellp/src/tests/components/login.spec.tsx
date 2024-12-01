import Login from "@/app/login/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Login Component", () => {
  it("Should render the login form and the login button", () => {
    render(<Login />);

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });
});