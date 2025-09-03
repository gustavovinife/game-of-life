type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: InputProps) {
  const { type, placeholder, value, onChange } = props;

  return (
    <input
      className="border border-gray-300 rounded-md p-2"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
