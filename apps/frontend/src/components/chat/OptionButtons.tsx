
'use client';

interface OptionButtonsProps {
  onOptionClick: (option: string) => void;
  disabled?: boolean;
}

const OptionButtons: React.FC<OptionButtonsProps> = ({ onOptionClick, disabled }) => {
  const options = ['Product Info', 'Get Support', 'Pricing'];
  
  return (
    <div className="p-4 border-t bg-gray-50">
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onOptionClick(opt)}
            disabled={disabled}
            className="flex-1 px-4 py-2 bg-white hover:bg-blue-50 border-2 border-blue-200 rounded-lg transition disabled:opacity-50 text-sm font-medium"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionButtons;
