interface CheckboxProps {
  accepted: boolean;
  setAccepted: (value: boolean) => void;
  label: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  accepted,
  setAccepted,
  label,
  className,
}) => {
  return (
    <div className="flex items-center justify-start">
      <input
        type="checkbox"
        checked={accepted}
        onChange={(e) => setAccepted(e.target.checked)}
        className="h-4 w-[30px] rounded-3xl border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label className={`ml-2 block text-start text-sm ${className}`}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
