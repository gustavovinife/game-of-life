export const GameInstructions = ({
  gridWidth,
  gridHeight,
}: {
  gridWidth: number;
  gridHeight: number;
}) => {
  return (
    <div className="mt-6 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      <p className="text-sm mb-2">
        <strong>How to play:</strong> Click cells to toggle them alive
        (black/white) or dead (white/black), then press Start!
      </p>
      <div className="text-xs space-y-1">
        <p>
          <strong>Conway's Rules:</strong>
        </p>
        <p>• Live cell with 2-3 neighbors survives</p>
        <p>• Live cell with &lt;2 neighbors dies (loneliness)</p>
        <p>• Live cell with &gt;3 neighbors dies (overcrowding)</p>
        <p>• Dead cell with exactly 3 neighbors becomes alive</p>
      </div>
      <p className="text-xs mt-2">
        Grid size: {gridWidth} × {gridHeight} cells
      </p>
    </div>
  );
};
