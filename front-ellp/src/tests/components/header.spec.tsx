import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../../components/core/header";

test("Should be able to render header component", () => {
  render(<Header />);
  const element = screen.getByTestId("header");
  expect(element).toBeInTheDocument();
});