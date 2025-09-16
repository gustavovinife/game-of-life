import { type Grid, GRID_WIDTH } from "../../constants/game";

interface GameGridProps {
  grid: Grid;
  onCellClick: (row: number, col: number) => void;
}

export const GameGrid = ({ grid, onCellClick }: GameGridProps) => {
  return (
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
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};
