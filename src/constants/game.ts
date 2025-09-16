export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 15;
export const GAME_SPEED = 500;

export const NEIGHBOR_DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1], // Top row
  [0, -1],
  [0, 1], // Middle row (excluding center)
  [1, -1],
  [1, 0],
  [1, 1], // Bottom row
] as const;

export type Grid = boolean[][];
