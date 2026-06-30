// src/components/chat/OptionButtons.tsx
interface OptionButtonsProps {
  options: string[];
  onOptionSelect: (option: string) => void;
  disabled?: boolean;
}

export default function OptionButtons({ options, onOptionSelect, disabled = false }: OptionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2 justify-center">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onOptionSelect(option)}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all
            ${disabled 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 hover:scale-105 active:scale-95'
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}