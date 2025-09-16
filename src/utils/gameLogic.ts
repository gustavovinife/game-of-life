import {
  GRID_WIDTH,
  GRID_HEIGHT,
  NEIGHBOR_DIRECTIONS,
  type Grid,
} from "../constants/game";

export const createEmptyGrid = (): Grid => {
  const grid = new Array(GRID_HEIGHT);

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(GRID_WIDTH).fill(false);
  }

  return grid;
};

export const countNeighbors = (
  grid: Grid,
  row: number,
  col: number
): number => {
  let count = 0;

  // Check all 8 neighboring cells
  for (const [deltaRow, deltaCol] of NEIGHBOR_DIRECTIONS) {
    const newRow = row + deltaRow;
    const newCol = col + deltaCol;

    // Check if the neighbor is within grid bounds
    if (
      newRow >= 0 &&
      newRow < GRID_HEIGHT &&
      newCol >= 0 &&
      newCol < GRID_WIDTH
    ) {
      if (grid[newRow][newCol]) {
        count++;
      }
    }
  }

  return count;
};

export const evolveGrid = (currentGrid: Grid): Grid => {
  const newGrid: Grid = Array(GRID_HEIGHT)
    .fill(null)
    .map(() => Array(GRID_WIDTH).fill(false));

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const neighbors = countNeighbors(currentGrid, row, col);
      const isCurrentlyAlive = currentGrid[row][col];

      // Conway's rules:
      if (isCurrentlyAlive) {
        // Rule 1: Survival - Live cell with 2 or 3 neighbors stays alive
        if (neighbors === 2 || neighbors === 3) {
          newGrid[row][col] = true;
        }
        // Rule 2 & 3: Death by loneliness (<2) or overcrowding (>3)
        // Cell stays false (dead) by default
      } else {
        // Rule 4: Birth - Dead cell with exactly 3 neighbors becomes alive
        if (neighbors === 3) {
          newGrid[row][col] = true;
        }
      }
    }
  }

  return newGrid;
};

export const toggleGridCell = (grid: Grid, row: number, col: number): Grid => {
  const newGrid = grid.map((row) => [...row]);
  newGrid[row][col] = !newGrid[row][col];
  return newGrid;
};
