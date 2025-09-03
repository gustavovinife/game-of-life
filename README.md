# Conway's Game of Life

A React implementation of Conway's Game of Life with a clean, modern interface.

## 🎮 Live Demo

**[Try it now →](https://game-of-life-seven-omega.vercel.app/)**

## About

Conway's Game of Life is a cellular automaton where cells evolve based on simple rules:

- **Survival**: Live cells with 2-3 neighbors stay alive
- **Death**: Live cells with <2 or >3 neighbors die
- **Birth**: Dead cells with exactly 3 neighbors become alive

## Features

- ✨ Interactive grid - click cells to toggle alive/dead
- ⏯️ Play/Pause simulation with automatic stepping
- 👆 Manual step-by-step evolution
- 🧹 Clear grid to start over
- 🌙 Dark/light mode toggle
- 📊 Generation counter

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Run tests

```bash
npm test
```

### Build for production

```bash
npm run build
```

## How to Play

1. **Set up patterns**: Click cells to create your initial pattern
2. **Watch evolution**: Click "Start" to see the simulation run automatically
3. **Step manually**: Use "Step" to advance one generation at a time
4. **Reset**: Click "Clear" to start with an empty grid

## Technology Stack

- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Vitest** for testing
- **React Testing Library** for component tests

Enjoy exploring the fascinating patterns that emerge from these simple rules!
