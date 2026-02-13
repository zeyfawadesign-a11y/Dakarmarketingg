
interface QuickReplyOption {
  id: string;
  label: string;
}

interface QuickRepliesProps {
  options: QuickReplyOption[];
  onSelect: (id: string) => void;
}

export default function QuickReplies({ options, onSelect }: QuickRepliesProps) {
  return (
    <div 
      className="flex flex-wrap gap-2 mt-2 px-2"
      role="group"
      aria-label="Options de réponse rapide"
    >
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className="px-5 py-2.5 bg-[#E63946] text-white rounded-lg text-sm font-medium hover:bg-[#C1121F] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:ring-offset-2"
          type="button"
          aria-label={option.label}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(option.id);
            }
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
