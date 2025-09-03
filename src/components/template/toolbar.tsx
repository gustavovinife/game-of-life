import Sun from "../../assets/sun.svg";
import Moon from "../../assets/moon.svg";

interface ToolbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Toolbar({ isDarkMode, toggleDarkMode }: ToolbarProps) {
  return (
    <div
      data-testid="toolbar"
      className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm"
    >
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Conway's Game of Life
        </h1>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <img
              data-testid="sun-icon"
              src={Sun}
              alt="Sun"
              className="w-5 h-5"
            />
          ) : (
            <img
              data-testid="moon-icon"
              src={Moon}
              alt="Moon"
              className="w-5 h-5"
            />
          )}
        </button>
      </div>
    </div>
  );
}
