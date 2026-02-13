
import { ReactNode, useEffect } from 'react';

interface ChatbotWindowProps {
  isOpen: boolean;
  isMinimized: boolean;
  messages: any[];
  onClose: () => void;
  onMinimize: () => void;
  onClearHistory: () => void;
  children: ReactNode;
}

export default function ChatbotWindow({
  isOpen,
  isMinimized,
  messages,
  onClose,
  onMinimize,
  onClearHistory,
  children
}: ChatbotWindowProps) {
  // Gestion de la touche Escape pour fermer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Empêcher le scroll du body quand le chat est ouvert sur mobile
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay pour mobile */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed bottom-24 right-6 w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        } max-md:bottom-0 max-md:right-0 max-md:left-0 max-md:top-0 max-md:w-full max-md:h-full max-md:rounded-none`}
        style={{
          animation: isOpen ? 'slideUp 0.3s ease-out' : 'none'
        }}
        role="dialog"
        aria-label="Fenêtre de chat"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
              <i className="ri-customer-service-2-fill text-[#E63946] text-xl" aria-hidden="true"></i>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-base truncate">Assistant Dakar Marketing</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#E63946] rounded-full animate-pulse" aria-hidden="true"></span>
                <span className="text-xs opacity-90">En ligne</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            {messages.length > 0 && (
              <button
                onClick={onClearHistory}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                title="Effacer l'historique"
                type="button"
                aria-label="Effacer l'historique de la conversation"
                tabIndex={0}
              >
                <i className="ri-delete-bin-line text-lg" aria-hidden="true"></i>
              </button>
            )}
            <button
              onClick={onMinimize}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer max-md:hidden"
              title={isMinimized ? 'Agrandir' : 'Réduire'}
              type="button"
              aria-label={isMinimized ? 'Agrandir la fenêtre' : 'Réduire la fenêtre'}
              tabIndex={0}
            >
              <i className={`ri-${isMinimized ? 'arrow-up' : 'subtract'}-line text-lg`} aria-hidden="true"></i>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              title="Fermer"
              type="button"
              aria-label="Fermer le chatbot"
              tabIndex={0}
            >
              <i className="ri-close-line text-xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        {!isMinimized && (
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            role="log"
            aria-live="polite"
            aria-label="Messages de conversation"
          >
            {children}
          </div>
        )}

        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
}
