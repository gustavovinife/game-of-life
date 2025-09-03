import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../../App";

describe("App", () => {
  it("renders the game's title ", () => {
    render(<App />);

    const title = screen.getByText("Conway's Game of Life");
    expect(title).toBeInTheDocument();
  });
});
