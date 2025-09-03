import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../../App";

describe("App Game Logic", () => {
  it("should create an empty grid with correct dimensions", () => {
    const { container } = render(<App />);

    // Check individual cells - should have 300 cells (20 * 15 grid)
    const cells = container.querySelectorAll('div[class*="w-6 h-6"]');
    expect(cells).toHaveLength(300);

    // All cells should be "dead" initially
    cells.forEach((cell) => {
      expect(cell.className).toContain("bg-white");
      expect(cell.className).not.toContain("bg-black");
    });
  });

  it("should toggle cell state when clicked", async () => {
    const { container } = render(<App />);
    const cells = container.querySelectorAll('div[class*="w-6 h-6"]');
    const testCell = cells[100] as HTMLElement;

    // Initially dead
    expect(testCell.className).toContain("bg-white");
    expect(testCell.className).not.toContain("bg-black");

    // Click to make alive
    testCell.click();
    await waitFor(() => {
      expect(testCell.className).toContain("bg-black");
    });

    // Click again to make dead
    testCell.click();
    await waitFor(() => {
      expect(testCell.className).toContain("bg-white");
      expect(testCell.className).not.toContain("bg-black");
    });
  });

  it("should handle cell death by underpopulation", async () => {
    const { container } = render(<App />);
    const stepButton = container.querySelector(
      "button:nth-of-type(2)"
    ) as HTMLButtonElement;
    const cells = container.querySelectorAll('div[class*="w-6 h-6"]');

    // Create a single cell with no neighbors
    const lonelyCell = 5 * 20 + 5; // Row 5, Col 5
    (cells[lonelyCell] as HTMLElement).click();

    await waitFor(() => {
      expect(cells[lonelyCell].className).toContain("bg-black");
    });

    // Step once - lonely cell should die (underpopulation)
    stepButton.click();

    await waitFor(() => {
      expect(cells[lonelyCell].className).toContain("bg-white");
      expect(cells[lonelyCell].className).not.toContain("bg-black");
    });
  });

  it("should evolve a blinker pattern correctly", async () => {
    const { container } = render(<App />);
    const stepButton = container.querySelector(
      "button:nth-of-type(2)"
    ) as HTMLButtonElement;
    const cells = container.querySelectorAll('div[class*="w-6 h-6"]');

    // Create horizontal blinker (3 cells in a row)
    const centerRow = 7;
    const centerCol = 10;
    [centerCol - 1, centerCol, centerCol + 1].forEach((col) => {
      const cellIndex = centerRow * 20 + col;
      (cells[cellIndex] as HTMLElement).click();
    });

    // Wait for cells to be alive
    await waitFor(() => {
      [centerCol - 1, centerCol, centerCol + 1].forEach((col) => {
        const cellIndex = centerRow * 20 + col;
        expect(cells[cellIndex].className).toContain("bg-black");
      });
    });

    // Step once - should become vertical
    stepButton.click();

    // After one step, should have 3 vertical cells
    await waitFor(() => {
      [centerRow - 1, centerRow, centerRow + 1].forEach((row) => {
        const cellIndex = row * 20 + centerCol;
        expect(cells[cellIndex].className).toContain("bg-black");
      });
    });
  });

  it("should clear all cells and reset generation", async () => {
    const { container } = render(<App />);
    const clearButton = container.querySelector(
      "button:nth-of-type(3)"
    ) as HTMLButtonElement;
    const cells = container.querySelectorAll('div[class*="w-6 h-6"]');

    // Set some cells alive
    [10, 50, 100].forEach((index) => {
      (cells[index] as HTMLElement).click();
    });

    // Wait for cells to be alive
    await waitFor(() => {
      expect(cells[10].className).toContain("bg-black");
      expect(cells[50].className).toContain("bg-black");
      expect(cells[100].className).toContain("bg-black");
    });

    // Clear the grid
    clearButton.click();

    // All cells should be dead
    await waitFor(() => {
      cells.forEach((cell) => {
        expect(cell.className).toContain("bg-white");
        expect(cell.className).not.toContain("bg-black");
      });
    });

    // Generation should be reset to 0
    const generationDisplay = container.querySelector('p[class*="text-lg"]');
    expect(generationDisplay?.textContent).toContain("Generation: 0");
  });

  it("should increment generation when stepping", async () => {
    const { container } = render(<App />);
    const stepButton = container.querySelector(
      "button:nth-of-type(2)"
    ) as HTMLButtonElement;
    const generationDisplay = container.querySelector('p[class*="text-lg"]');

    // Initial generation should be 0
    expect(generationDisplay?.textContent).toContain("Generation: 0");

    // Step twice and verify increment
    stepButton.click();
    await waitFor(() => {
      expect(generationDisplay?.textContent).toContain("Generation: 1");
    });

    stepButton.click();
    await waitFor(() => {
      expect(generationDisplay?.textContent).toContain("Generation: 2");
    });
  });
});
