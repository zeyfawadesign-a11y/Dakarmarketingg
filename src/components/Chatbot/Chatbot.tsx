import { useState, useEffect, useRef } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ChatbotButton from './ChatbotButton';
import ChatbotWindow from './ChatbotWindow';
import Message from './Message';
import QuickReplies from './QuickReplies';
import InputField from './InputField';
import DateTimePicker from './DateTimePicker';
import { ChatbotState, ServiceType, ActionType } from './chatbot.types';
import {
  generateId,
  validateEmail,
  validatePhone,
  validateName,
  formatPhoneNumber,
  getServiceLabel,
  saveChatToLocalStorage,
  loadChatFromLocalStorage,
  clearChatFromLocalStorage,
  getJuniorEnterprisePresentation
} from './chatbot.utils';

export default function Chatbot() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    isMinimized: false,
    currentStep: 'welcome',
    messages: [],
    data: {},
    isTyping: false,
    isSending: false,
    hasNewMessage: false
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Charger la conversation depuis localStorage au montage
  useEffect(() => {
    const savedChat = loadChatFromLocalStorage();
    if (savedChat) {
      setState(prev => ({
        ...prev,
        messages: savedChat.messages || [],
        // Fixed syntax error: provide a fallback empty object
        data: savedChat.data || {},
        currentStep: savedChat.currentStep || 'welcome'
      }));
    } else {
      // Message de bienvenue initial
      setTimeout(() => {
        addBotMessage('Bonjour ! Je suis l\'assistant de Dakar Marketing.\nComment puis-je vous aider aujourd\'hui ?');
      }, 500);
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    if (state.messages.length > 0) {
      saveChatToLocalStorage({
        messages: state.messages,
        data: state.data,
        currentStep: state.currentStep
      });
    }
  }, [state.messages, state.data, state.currentStep]);

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const addBotMessage = (content: string, delay = 800) => {
    setState(prev => ({ ...prev, isTyping: true }));

    setTimeout(() => {
      const message = {
        id: generateId(),
        type: 'bot' as const,
        content,
        timestamp: new Date()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, message],
        isTyping: false,
        hasNewMessage: !prev.isOpen
      }));
    }, delay);
  };

  const addUserMessage = (content: string) => {
    const message = {
      id: generateId(),
      type: 'user' as const,
      content,
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  };

  const handleActionSelect = (action: ActionType) => {
    const labels: Record<ActionType, string> = {
      quote: 'Demander un devis',
      appointment: 'Prendre rendez-vous',
      question: 'Poser une question',
      learn_more: 'En savoir plus sur vos services'
    };

    addUserMessage(labels[action]);

    setState(prev => ({ ...prev, data: { ...prev.data, action } }));

    if (action === 'learn_more') {
      addBotMessage(
        getJuniorEnterprisePresentation() + '\n\nQue souhaitez-vous faire maintenant ?'
      );
      setState(prev => ({ ...prev, currentStep: 'welcome' }));
    } else if (action === 'question') {
      addBotMessage('Je vous écoute ! Tapez votre question ci-dessous.');
      setState(prev => ({ ...prev, currentStep: 'free_question' }));
    } else {
      const message = action === 'quote'
        ? 'Super ! Pour quel type de projet ?'
        : 'Parfait ! C\'est pour discuter de quel sujet ?';
      addBotMessage(message);
      setState(prev => ({ ...prev, currentStep: 'service_selection' }));
    }
  };

  const handleServiceSelect = (service: ServiceType) => {
    addUserMessage(getServiceLabel(service));
    setState(prev => ({
      ...prev,
      data: { ...prev.data, service },
      currentStep: 'collect_name'
    }));
    addBotMessage('Merci ! Pour bien vous accompagner, j\'ai besoin de quelques infos :\n\nVotre nom complet ?');
  };

  const handleNameSubmit = (name: string) => {
    if (!validateName(name)) {
      return { valid: false, error: 'Le nom doit contenir au moins 2 caractères' };
    }

    addUserMessage(name);
    setState(prev => ({
      ...prev,
      data: { ...prev.data, name },
      currentStep: 'collect_email'
    }));
    addBotMessage('Parfait ! Votre adresse email ?');
    return { valid: true };
  };

  const handleEmailSubmit = (email: string) => {
    if (!validateEmail(email)) {
      return { valid: false, error: 'Veuillez entrer une adresse email valide' };
    }

    addUserMessage(email);
    setState(prev => ({
      ...prev,
      data: { ...prev.data, email },
      currentStep: 'collect_phone'
    }));
    addBotMessage('Super ! Votre numéro de téléphone ?');
    return { valid: true };
  };

  const handlePhoneSubmit = (phone: string) => {
    if (!validatePhone(phone)) {
      return { valid: false, error: 'Format invalide. Exemple : +221 77 123 45 67' };
    }

    const formattedPhone = formatPhoneNumber(phone);
    addUserMessage(formattedPhone);
    setState(prev => ({
      ...prev,
      data: { ...prev.data, phone: formattedPhone }
    }));

    // Si c'est un rendez-vous, demander la date
    if (state.data.action === 'appointment') {
      setState(prev => ({ ...prev, currentStep: 'collect_date' }));
      addBotMessage('Quand êtes-vous disponible ?');
    } else {
      setState(prev => ({ ...prev, currentStep: 'collect_message' }));
      addBotMessage('Parlez-moi un peu de votre projet ?\n(Budget estimé, délais, objectifs...)');
    }

    return { valid: true };
  };

  const handleDateSelect = (date: string, time: string) => {
    const dateTimeStr = `${date} à ${time}`;
    addUserMessage(dateTimeStr);
    setState(prev => ({
      ...prev,
      data: { ...prev.data, preferred_date: dateTimeStr },
      currentStep: 'collect_message'
    }));
    addBotMessage('Parfait ! Parlez-moi un peu de votre projet ?\n(Budget estimé, délais, objectifs...)');
  };

  const handleMessageSubmit = (message: string) => {
    if (message.trim().length < 10) {
      return { valid: false, error: 'Veuillez fournir plus de détails (minimum 10 caractères)' };
    }

    addUserMessage(message);
    setState(prev => ({
      ...prev,
      data: { ...prev.data, notes: message },
      currentStep: 'summary'
    }));

    // Afficher le récapitulatif
    const { name, email, phone, service, preferred_date, action } = state.data;
    let summary = 'Récapitulatif de votre demande :\n\n';
    summary += `Nom : ${name}\n`;
    summary += `Email : ${email}\n`;
    summary += `Téléphone : ${phone}\n`;
    if (preferred_date) {
      summary += `Rendez-vous : ${preferred_date}\n`;
    }
    summary += `${action === 'appointment' ? 'Sujet' : 'Projet'} : ${getServiceLabel(service!)}\n`;
    summary += `Détails : ${message}\n\n`;
    summary += 'Tout est correct ?';

    addBotMessage(summary);
    return { valid: true };
  };

  const handleFreeQuestionSubmit = (question: string) => {
    if (question.trim().length < 5) {
      return { valid: false, error: 'Veuillez poser une question plus détaillée' };
    }

    addUserMessage(question);
    setState(prev => ({
      ...prev,
      data: { ...prev.data, question },
      currentStep: 'collect_name'
    }));
    addBotMessage('Merci pour votre question ! Pour que notre équipe puisse vous répondre :\n\nVotre nom complet ?');
    return { valid: true };
  };

  const sendToSupabase = async () => {
    setState(prev => ({ ...prev, isSending: true }));

    try {
      // 1. Obtenir le token reCAPTCHA
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA non chargé. Veuillez réessayer.');
      }

      const recaptchaToken = await executeRecaptcha('submit_chatbot');

      // 2. Envoyer avec le token
      const payload = {
        type: 'chatbot_lead',
        data: {
          name: state.data.name,
          email: state.data.email,
          phone: state.data.phone,
          service: getServiceLabel(state.data.service!),
          preferred_date: state.data.preferred_date || null,
          notes: state.data.notes || state.data.question || null
        },
        recaptchaToken // ← IMPORTANT : Ajouter le token
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...payload,
          type: 'chatbot_lead',
          data: {
            name: payload.data.name,
            email: payload.data.email,
            phone: payload.data.phone,
            service: payload.data.service,
            date: payload.data.preferred_date,
            message: payload.data.notes
          }
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

      setState(prev => ({ ...prev, isSending: false, currentStep: 'completed' }));

      addBotMessage(
        'Parfait ! Votre demande a été envoyée avec succès.\n\n' +
        'Notre équipe vous contactera dans les 24h.\n\n' +
        `Vous recevrez également un email de confirmation à : ${state.data.email}\n\n` +
        'Besoin d\'autre chose ?'
      );
    } catch (error) {
      console.error('Erreur d\'envoi:', error);
      setState(prev => ({ ...prev, isSending: false }));

      const errorMessage = error instanceof Error ? error.message : 'Une erreur s\'est produite';

      addBotMessage(
        `Une erreur s'est produite : ${errorMessage}\n\n` +
        'Veuillez réessayer ou nous contacter directement à :\n' +
        'Email : juniorentreprise@bem.sn\n' +
        'Tél : +221 77 123 45 67'
      );

      setState(prev => ({ ...prev, currentStep: 'error' }));
    }
  };

  const handleConfirm = () => {
    addUserMessage('Confirmer et envoyer');
    setState(prev => ({ ...prev, currentStep: 'sending' }));
    addBotMessage('Envoi en cours...', 300);

    // Envoyer vers API Vercel
    setTimeout(() => {
      sendToSupabase();
    }, 1000);
  };

  const handleModify = () => {
    addUserMessage('Modifier');
    setState(prev => ({ ...prev, currentStep: 'collect_name' }));
    addBotMessage('Pas de problème ! Recommençons.\n\nVotre nom complet ?');
  };

  const handleRestart = () => {
    addUserMessage('Nouvelle demande');
    clearChatFromLocalStorage();
    setState({
      isOpen: true,
      isMinimized: false,
      currentStep: 'welcome',
      messages: [],
      data: {},
      isTyping: false,
      isSending: false,
      hasNewMessage: false
    });
    addBotMessage('Bonjour ! Je suis l\'assistant de Dakar Marketing.\nComment puis-je vous aider aujourd\'hui ?');
  };

  const handleRetry = () => {
    addUserMessage('Réessayer');
    setState(prev => ({ ...prev, currentStep: 'summary' }));

    const { name, email, phone, service, preferred_date, action } = state.data;
    let summary = 'Récapitulatif de votre demande :\n\n';
    summary += `Nom : ${name}\n`;
    summary += `Email : ${email}\n`;
    summary += `Téléphone : ${phone}\n`;
    if (preferred_date) {
      summary += `Rendez-vous : ${preferred_date}\n`;
    }
    summary += `${action === 'appointment' ? 'Sujet' : 'Projet'} : ${getServiceLabel(service!)}\n`;
    summary += `Détails : ${state.data.notes || state.data.question}\n\n`;
    summary += 'Tout est correct ?';

    addBotMessage(summary);
  };

  const toggleChat = () => {
    setState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
      hasNewMessage: false,
      isMinimized: false
    }));
  };

  const toggleMinimize = () => {
    setState(prev => ({
      ...prev,
      isMinimized: !prev.isMinimized
    }));
  };

  const handleClearHistory = () => {
    if (window.confirm('Êtes-vous sûr de vouloir effacer l\'historique de la conversation ?')) {
      clearChatFromLocalStorage();
      setState({
        isOpen: true,
        isMinimized: false,
        currentStep: 'welcome',
        messages: [],
        data: {},
        isTyping: false,
        isSending: false,
        hasNewMessage: false
      });

      setTimeout(() => {
        addBotMessage('Bonjour ! Je suis l\'assistant de Dakar Marketing.\nComment puis-je vous aider aujourd\'hui ?');
      }, 100);
    }
  };

  const renderInteraction = () => {
    // Pendant l'envoi, ne rien afficher
    if (state.currentStep === 'sending' || state.isSending) {
      return null;
    }

    switch (state.currentStep) {
      case 'welcome':
        return (
          <QuickReplies
            options={[
              { id: 'quote', label: 'Demander un devis' },
              { id: 'appointment', label: 'Prendre rendez-vous' },
              { id: 'question', label: 'Poser une question' },
              { id: 'learn_more', label: 'En savoir plus' }
            ]}
            onSelect={(id) => handleActionSelect(id as ActionType)}
          />
        );

      case 'service_selection':
        return (
          <QuickReplies
            options={[
              { id: 'business_plan', label: 'Business Plan' },
              { id: 'market_research', label: 'Étude de marché' },
              { id: 'marketing_strategy', label: 'Stratégie marketing' },
              { id: 'other', label: 'Autre' }
            ]}
            onSelect={(id) => handleServiceSelect(id as ServiceType)}
          />
        );

      case 'free_question':
        return (
          <InputField
            type="textarea"
            placeholder="Tapez votre question..."
            onSubmit={handleFreeQuestionSubmit}
            maxLength={500}
          />
        );

      case 'collect_name':
        return (
          <InputField
            type="text"
            placeholder="Votre nom complet"
            onSubmit={handleNameSubmit}
          />
        );

      case 'collect_email':
        return (
          <InputField
            type="email"
            placeholder="votre@email.com"
            onSubmit={handleEmailSubmit}
          />
        );

      case 'collect_phone':
        return (
          <InputField
            type="tel"
            placeholder="+221 77 123 45 67"
            onSubmit={handlePhoneSubmit}
          />
        );

      case 'collect_date':
        return (
          <DateTimePicker
            onSelect={handleDateSelect}
          />
        );

      case 'collect_message':
        return (
          <InputField
            type="textarea"
            placeholder="Budget estimé, délais, objectifs..."
            onSubmit={handleMessageSubmit}
            maxLength={500}
          />
        );

      case 'summary':
        return (
          <QuickReplies
            options={[
              { id: 'confirm', label: 'Confirmer et envoyer' },
              { id: 'modify', label: 'Modifier' }
            ]}
            onSelect={(id) => id === 'confirm' ? handleConfirm() : handleModify()}
          />
        );

      case 'completed':
        return (
          <QuickReplies
            options={[
              { id: 'restart', label: 'Nouvelle demande' },
              { id: 'close', label: 'Fermer' }
            ]}
            onSelect={(id) => id === 'restart' ? handleRestart() : toggleChat()}
          />
        );

      case 'error':
        return (
          <QuickReplies
            options={[
              { id: 'retry', label: 'Réessayer' },
              { id: 'restart', label: 'Nouvelle demande' },
              { id: 'close', label: 'Fermer' }
            ]}
            onSelect={(id) => {
              if (id === 'retry') handleRetry();
              else if (id === 'restart') handleRestart();
              else toggleChat();
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <ChatbotButton
        onClick={toggleChat}
        hasNewMessage={state.hasNewMessage}
        isOpen={state.isOpen}
      />

      <ChatbotWindow
        isOpen={state.isOpen}
        isMinimized={state.isMinimized}
        messages={state.messages}
        onClose={toggleChat}
        onMinimize={toggleMinimize}
        onClearHistory={handleClearHistory}
      >
        {state.messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}

        {state.isTyping && (
          <Message
            message={{
              id: 'typing',
              type: 'bot',
              content: '',
              timestamp: new Date(),
              isTyping: true
            }}
          />
        )}

        <div ref={messagesEndRef} />

        {!state.isTyping && renderInteraction()}
      </ChatbotWindow>
    </>
  );
}
