import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "../../components/common/button";

describe("Button", () => {
  it("renders the button", () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("renders the button with the correct text", () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveTextContent("Click me");
  });
});
