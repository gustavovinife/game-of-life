import { useState, useCallback, useEffect, useRef } from "react";
import { type Grid, GAME_SPEED } from "../constants/game";
import {
  createEmptyGrid,
  evolveGrid,
  toggleGridCell,
} from "../utils/gameLogic";

export const useGameOfLife = () => {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid);
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  const intervalRef = useRef<number | null>(null);

  const stepGeneration = useCallback(() => {
    setGrid((currentGrid) => evolveGrid(currentGrid));
    setGeneration((prev) => prev + 1);
  }, []);

  const toggleCell = useCallback((row: number, col: number) => {
    setGrid((prevGrid) => toggleGridCell(prevGrid, row, col));
  }, []);

  const clearGrid = useCallback(() => {
    setGrid(createEmptyGrid());
    setIsRunning(false);
    setGeneration(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const toggleRunning = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        stepGeneration();
      }, GAME_SPEED);
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

  return {
    grid,
    isRunning,
    generation,
    toggleCell,
    stepGeneration,
    clearGrid,
    toggleRunning,
  };
};
