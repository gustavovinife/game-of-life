import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Input from "../../components/common/input";

describe("Input", () => {
  it("renders the input field", () => {
    render(
      <Input
        type="text"
        placeholder="Enter a number"
        value="0"
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText("Enter a number");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("0");
  });

  it("renders the input field with the correct type", () => {
    render(
      <Input
        type="text"
        placeholder="Enter a number"
        value="0"
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText("Enter a number");
    expect(input).toHaveAttribute("type", "text");
  });
});
