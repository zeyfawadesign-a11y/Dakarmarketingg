
interface ChatbotButtonProps {
  onClick: () => void;
  hasNewMessage: boolean;
  isOpen: boolean;
}

export default function ChatbotButton({ onClick, hasNewMessage, isOpen }: ChatbotButtonProps) {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      data-chatbot-toggle
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#E63946] to-[#C1121F] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 cursor-pointer group max-md:bottom-4 max-md:right-4 max-md:w-14 max-md:h-14"
      style={{
        animation: 'bounce 2s infinite'
      }}
      type="button"
      aria-label="Ouvrir le chatbot d'assistance"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <i className="ri-message-3-fill text-2xl group-hover:scale-110 transition-transform max-md:text-xl" aria-hidden="true"></i>
      
      {hasNewMessage && (
        <span 
          className="absolute -top-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center text-xs font-bold animate-pulse"
          aria-label="Nouveau message"
        >
          1
        </span>
      )}

      <div className="absolute -top-12 right-0 bg-black text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none max-md:hidden">
        Besoin d'aide ?
        <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-black"></div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </button>
  );
}
