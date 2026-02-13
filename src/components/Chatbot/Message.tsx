
import { Message as MessageType } from './chatbot.types';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isBot = message.type === 'bot';

  // Convertir timestamp en Date si c'est une string
  const timestamp = typeof message.timestamp === 'string' 
    ? new Date(message.timestamp) 
    : message.timestamp;

  if (message.isTyping) {
    return (
      <div className="flex items-start gap-3 animate-fadeIn">
        <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center shrink-0">
          <i className="ri-customer-service-2-fill text-white text-sm" aria-hidden="true"></i>
        </div>
        <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
          <div className="flex gap-1" role="status" aria-label="Le bot est en train d'écrire">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`flex items-start gap-3 animate-fadeIn ${!isBot ? 'flex-row-reverse' : ''}`}
      role="article"
      aria-label={`Message de ${isBot ? 'l\'assistant' : 'vous'}`}
    >
      {isBot && (
        <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center shrink-0">
          <i className="ri-customer-service-2-fill text-white text-sm" aria-hidden="true"></i>
        </div>
      )}
      
      <div 
        className={`px-4 py-3 rounded-2xl shadow-sm max-w-[85%] break-words ${
          isBot 
            ? 'bg-white text-gray-800 rounded-tl-none' 
            : 'bg-[#E63946] text-white rounded-tr-none'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block" aria-label={`Envoyé à ${timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}>
          {timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {!isBot && (
        <div className="w-8 h-8 bg-[#e9ecef] rounded-full flex items-center justify-center shrink-0">
          <i className="ri-user-3-fill text-gray-600 text-sm" aria-hidden="true"></i>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
