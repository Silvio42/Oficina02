import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Footer } from "../../components/core/footer";

test("Should be able to render footer component", () => {
  render(<Footer />);
  const element = screen.getByTestId("footer");
  expect(element).toBeInTheDocument();
});
