import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "./components/common";
import Toolbar from "./components/template/toolbar";
import { GameInstructions } from "./components/template/game-instructions";

const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;
const SPEED = 500;

type Grid = boolean[][];

const NEIGHBOR_DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1], // Top row
  [0, -1],
  [0, 1], // Middle row (excluding center)
  [1, -1],
  [1, 0],
  [1, 1], // Bottom row
];

function App() {
  const createEmptyGrid = useCallback((): Grid => {
    let grid = new Array(GRID_HEIGHT);

    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(GRID_WIDTH).fill(false);
    }

    return grid;
  }, []);

  const [grid, setGrid] = useState<Grid>(createEmptyGrid);
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const countNeighbors = useCallback(
    (grid: Grid, row: number, col: number): number => {
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
    },
    []
  );

  const evolveGrid = useCallback(
    (currentGrid: Grid): Grid => {
      const newGrid: Grid = Array(GRID_HEIGHT)
        .fill(null)
        .map(() => Array(GRID_WIDTH).fill(false));

      for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
          const neighbors = countNeighbors(currentGrid, row, col);
          const isCurrentlyAlive = currentGrid[row][col];

          // Apply Conway's rules:
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
    },
    [countNeighbors]
  );

  const stepGeneration = useCallback(() => {
    setGrid((currentGrid) => evolveGrid(currentGrid));
    setGeneration((prev) => prev + 1);
  }, [evolveGrid]);

  const toggleCell = useCallback((row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[row][col] = !newGrid[row][col]; // Toggle the cell
      return newGrid;
    });
  }, []);

  const clearGrid = useCallback(() => {
    setGrid(createEmptyGrid());
    setIsRunning(false);
    setGeneration(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [createEmptyGrid]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        stepGeneration();
      }, SPEED);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, stepGeneration]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toolbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Generation: {generation}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2 rounded font-semibold ${
              isRunning
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            onClick={stepGeneration}
            disabled={isRunning}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Step
          </Button>
          <Button
            onClick={clearGrid}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-semibold"
          >
            Clear
          </Button>
        </div>

        <div className="flex justify-center">
          <div
            className="inline-grid border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800"
            style={{
              gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
              gap: "1px",
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-6 h-6 border border-gray-200 dark:border-gray-700 cursor-pointer transition-colors duration-150 ${
                    cell
                      ? "bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </div>

        <GameInstructions gridWidth={GRID_WIDTH} gridHeight={GRID_HEIGHT} />
      </div>
    </div>
  );
}

export default App;
