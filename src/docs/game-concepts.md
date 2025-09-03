# What is Conway’s Game of Life?

Conway’s Game of Life is a zero-player game, meaning its evolution is determined by its initial state and a set of simple rules, not by ongoing player input. It’s played on an infinite grid of square cells, each of which can be in one of two states: alive (often represented as 1 or filled) or dead (0 or empty). Each cell has eight neighboring cells, and the grid evolves in discrete time steps called generations.

# Core Rules

The game’s behavior is governed by four simple rules that determine whether a cell lives, dies, or is born in the next generation based on its current state and the number of alive neighbors:

- Survival: A live cell with 2 or 3 live neighbors stays alive.
- Death by loneliness: A live cell with fewer than 2 live neighbors dies (underpopulation).
- Death by overcrowding: A live cell with more than 3 live neighbors dies (overpopulation).
- Birth: A dead cell with exactly 3 live neighbors becomes alive (reproduction).

These rules are applied simultaneously to every cell in the grid to compute the next generation.
