import { ServiceType, ActionType } from './chatbot.types';

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Format sénégalais : +221 ou 77/78/76/70
  const phoneRegex = /^(\+221|00221)?[7][0678]\d{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.startsWith('+221')) {
    return cleaned;
  }
  if (cleaned.startsWith('00221')) {
    return `+${cleaned.slice(2)}`;
  }
  if (cleaned.startsWith('221')) {
    return `+${cleaned}`;
  }
  return `+221${cleaned}`;
};

export const getServiceLabel = (service: ServiceType): string => {
  const labels: Record<ServiceType, string> = {
    business_plan: 'Business Plan',
    market_research: 'Étude de marché',
    marketing_strategy: 'Stratégie marketing',
    website: 'Création de site web',
    branding: 'Identité visuelle',
    community_management: 'Community management',
    other: 'Autre'
  };
  return labels[service];
};

export const getActionLabel = (action: ActionType): string => {
  const labels: Record<ActionType, string> = {
    quote: 'Demander un devis',
    appointment: 'Prendre rendez-vous',
    question: 'Poser une question',
    learn_more: 'En savoir plus'
  };
  return labels[action];
};

export const getJuniorEnterprisePresentation = (): string => {
  return `Bonjour

Nous sommes une Junior Entreprise spécialisée en conseil et études marketing.

Nous accompagnons les entreprises, entrepreneurs et porteurs de projets dans leurs décisions stratégiques grâce à :

• Business plans
• Études de marché
• Enquêtes marketing
• Analyses stratégiques

Notre objectif : vous aider à lancer, structurer et développer des projets viables et rentables.`;
};

export const getTimeSlots = (): string[] => {
  return [
    '09h00 - 10h00',
    '10h00 - 11h00',
    '11h00 - 12h00',
    '14h00 - 15h00',
    '15h00 - 16h00',
    '16h00 - 17h00'
  ];
};

export const isWeekday = (date: Date): boolean => {
  const day = date.getDay();
  return day !== 0 && day !== 6; // 0 = Dimanche, 6 = Samedi
};

export const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// LocalStorage functions
export const saveChatToLocalStorage = (data: any): void => {
  try {
    localStorage.setItem('dakar_marketing_chat', JSON.stringify(data));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du chat:', error);
  }
};

export const loadChatFromLocalStorage = (): any | null => {
  try {
    const data = localStorage.getItem('dakar_marketing_chat');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lors du chargement du chat:', error);
    return null;
  }
};

export const clearChatFromLocalStorage = (): void => {
  try {
    localStorage.removeItem('dakar_marketing_chat');
  } catch (error) {
    console.error('Erreur lors de la suppression du chat:', error);
  }
};
