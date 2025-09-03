type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

export default function Button(props: ButtonProps) {
  const { children, onClick, className, disabled } = props;
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded-md ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
