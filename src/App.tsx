import Toolbar from "./components/template/toolbar";
import { GameInstructions } from "./components/game/game-instructions";
import { GameGrid, GameControls } from "./components/game";
import { useGameOfLife } from "./hooks/useGameOfLife";
import { useTheme } from "./hooks/useTheme";
import { GRID_WIDTH, GRID_HEIGHT } from "./constants/game";

function App() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const {
    grid,
    isRunning,
    generation,
    toggleCell,
    stepGeneration,
    clearGrid,
    toggleRunning,
  } = useGameOfLife();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toolbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="max-w-4xl mx-auto p-4">
        <GameControls
          isRunning={isRunning}
          generation={generation}
          onToggleRunning={toggleRunning}
          onStep={stepGeneration}
          onClear={clearGrid}
        />

        <GameGrid grid={grid} onCellClick={toggleCell} />

        <GameInstructions gridWidth={GRID_WIDTH} gridHeight={GRID_HEIGHT} />
      </div>
    </div>
  );
}

export default App;
