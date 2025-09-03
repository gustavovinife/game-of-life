import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Toolbar from "../../components/template/toolbar";
import Sun from "../../assets/sun.svg";
import Moon from "../../assets/moon.svg";

describe("Toolbar", () => {
  it("renders the toolbar", () => {
    render(<Toolbar isDarkMode={false} toggleDarkMode={() => {}} />);

    const toolbar = screen.getByTestId("toolbar");
    expect(toolbar).toBeInTheDocument();
  });

  it("renders the toolbar with sun icon when theme is light ", () => {
    render(<Toolbar isDarkMode={true} toggleDarkMode={() => {}} />);

    const sunIcon = screen.getByTestId("sun-icon");
    expect(sunIcon).toBeInTheDocument();
    expect(sunIcon).toHaveAttribute("src", Sun);
  });

  it("renders the toolbar with moon icon when theme is dark", () => {
    render(<Toolbar isDarkMode={false} toggleDarkMode={() => {}} />);

    const moonIcon = screen.getByTestId("moon-icon");
    expect(moonIcon).toBeInTheDocument();
    expect(moonIcon).toHaveAttribute("src", Moon);
  });
});
