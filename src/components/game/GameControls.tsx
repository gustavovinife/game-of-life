import { Button } from "../common";

interface GameControlsProps {
  isRunning: boolean;
  generation: number;
  onToggleRunning: () => void;
  onStep: () => void;
  onClear: () => void;
}

export const GameControls = ({
  isRunning,
  generation,
  onToggleRunning,
  onStep,
  onClear,
}: GameControlsProps) => {
  return (
    <>
      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Generation: {generation}
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <Button
          onClick={onToggleRunning}
          className={`px-6 py-2 rounded font-semibold ${
            isRunning
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={onStep}
          disabled={isRunning}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Step
        </Button>
        <Button
          onClick={onClear}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-semibold"
        >
          Clear
        </Button>
      </div>
    </>
  );
};
