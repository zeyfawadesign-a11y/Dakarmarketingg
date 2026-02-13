
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  isTyping?: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  motif: string;
}

type Step = 'welcome' | 'name' | 'email' | 'phone' | 'date' | 'motif' | 'confirm' | 'success';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    motif: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Bonjour ! Je suis là pour vous aider à prendre rendez-vous avec notre équipe 👋");
      setTimeout(() => {
        addBotMessage("Comment vous appelez-vous ?");
        setCurrentStep('name');
      }, 1500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current && currentStep !== 'date' && currentStep !== 'confirm' && currentStep !== 'success') {
      inputRef.current.focus();
    }
  }, [isOpen, currentStep, messages]);

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        content
      }]);
    }, 800 + Math.random() * 500);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content
    }]);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s+()-]{8,}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && currentStep !== 'date' && currentStep !== 'confirm') return;
    setError('');

    switch (currentStep) {
      case 'name':
        if (inputValue.trim().length < 2) {
          setError('Veuillez entrer un nom valide');
          return;
        }
        setFormData(prev => ({ ...prev, name: inputValue }));
        addUserMessage(inputValue);
        setInputValue('');
        setTimeout(() => {
          addBotMessage(`Enchanté ${inputValue} ! Quel est votre email ?`);
          setCurrentStep('email');
        }, 300);
        break;

      case 'email':
        if (!validateEmail(inputValue)) {
          setError('Veuillez entrer un email valide');
          return;
        }
        setFormData(prev => ({ ...prev, email: inputValue }));
        addUserMessage(inputValue);
        setInputValue('');
        setTimeout(() => {
          addBotMessage("Parfait ! Et votre numéro de téléphone ?");
          setCurrentStep('phone');
        }, 300);
        break;

      case 'phone':
        if (!validatePhone(inputValue)) {
          setError('Veuillez entrer un numéro valide');
          return;
        }
        setFormData(prev => ({ ...prev, phone: inputValue }));
        addUserMessage(inputValue);
        setInputValue('');
        setTimeout(() => {
          addBotMessage("Quand souhaitez-vous prendre rendez-vous ?");
          setCurrentStep('date');
        }, 300);
        break;

      case 'motif':
        if (inputValue.trim().length < 5) {
          setError('Veuillez décrire brièvement le motif');
          return;
        }
        setFormData(prev => ({ ...prev, motif: inputValue }));
        addUserMessage(inputValue);
        setInputValue('');
        setTimeout(() => {
          addBotMessage("Parfait ! Voici le récapitulatif de votre demande :");
          setCurrentStep('confirm');
        }, 300);
        break;
    }
  };

  const handleDateSelect = (date: string, time: string) => {
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setFormData(prev => ({ ...prev, date, time }));
    addUserMessage(`${formattedDate} à ${time}`);
    setTimeout(() => {
      addBotMessage("Quel est le motif de votre rendez-vous ?");
      setCurrentStep('motif');
    }, 300);
  };

  const handleConfirm = async () => {
    setIsSending(true);
    
    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Configuration manquante');
      }

      const formattedDate = new Date(formData.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          type: 'chatbot',
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: `${formattedDate} à ${formData.time}`,
            message: `Motif: ${formData.motif}`
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      addBotMessage("✅ Votre demande de rendez-vous a été envoyée avec succès ! Notre équipe vous contactera très bientôt pour confirmer.");
      setCurrentStep('success');
    } catch (err) {
      console.error('Erreur:', err);
      addBotMessage("❌ Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par email.");
    } finally {
      setIsSending(false);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setFormData({ name: '', email: '', phone: '', date: '', time: '', motif: '' });
    setCurrentStep('welcome');
    setInputValue('');
    setError('');
    setTimeout(() => {
      addBotMessage("Bonjour ! Je suis là pour vous aider à prendre rendez-vous avec notre équipe 👋");
      setTimeout(() => {
        addBotMessage("Comment vous appelez-vous ?");
        setCurrentStep('name');
      }, 1500);
    }, 300);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-red-600 rounded-full shadow-2xl flex items-center justify-center z-50 cursor-pointer hover:bg-red-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.i
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="ri-close-line text-white text-3xl"
            />
          ) : (
            <motion.i
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="ri-chat-3-line text-white text-3xl"
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-28 right-6 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col"
            style={{ maxHeight: 'calc(100vh - 160px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-calendar-check-line text-white text-2xl"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">Prise de Rendez-vous</h3>
                <p className="text-white/80 text-sm">Dakar Marketing</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ minHeight: '300px', maxHeight: '400px' }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-red-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Date Picker */}
              {currentStep === 'date' && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choisissez une date
                  </label>
                  <input
                    type="date"
                    min={getMinDate()}
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer"
                  />
                  
                  {formData.date && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Choisissez un créneau
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleDateSelect(formData.date, time)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Confirmation */}
              {currentStep === 'confirm' && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <i className="ri-user-line text-red-600"></i>
                      <span className="text-gray-600">Nom:</span>
                      <span className="font-medium text-gray-900">{formData.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-mail-line text-red-600"></i>
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">{formData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-phone-line text-red-600"></i>
                      <span className="text-gray-600">Téléphone:</span>
                      <span className="font-medium text-gray-900">{formData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-calendar-line text-red-600"></i>
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(formData.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })} à {formData.time}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <i className="ri-chat-1-line text-red-600 mt-0.5"></i>
                      <span className="text-gray-600">Motif:</span>
                      <span className="font-medium text-gray-900">{formData.motif}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleRestart}
                      disabled={isSending}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={handleConfirm}
                      disabled={isSending}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSending ? (
                        <>
                          <i className="ri-loader-4-line animate-spin"></i>
                          Envoi...
                        </>
                      ) : (
                        <>
                          <i className="ri-send-plane-line"></i>
                          Confirmer
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Success - Restart Button */}
              {currentStep === 'success' && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={handleRestart}
                    className="px-6 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <i className="ri-refresh-line"></i>
                    Nouveau rendez-vous
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {(currentStep === 'name' || currentStep === 'email' || currentStep === 'phone' || currentStep === 'motif') && (
              <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mb-2 flex items-center gap-1"
                  >
                    <i className="ri-error-warning-line"></i>
                    {error}
                  </motion.p>
                )}
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type={currentStep === 'email' ? 'email' : 'text'}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setError('');
                    }}
                    placeholder={
                      currentStep === 'name' ? 'Votre nom...' :
                      currentStep === 'email' ? 'votre@email.com' :
                      currentStep === 'phone' ? '+221 XX XXX XX XX' :
                      'Décrivez le motif...'
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-send-plane-fill text-lg"></i>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
