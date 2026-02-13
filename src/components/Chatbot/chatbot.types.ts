export type MessageType = 'bot' | 'user';

export type ConversationStep = 
  | 'welcome'
  | 'service_selection'
  | 'collect_name'
  | 'collect_email'
  | 'collect_phone'
  | 'collect_date'
  | 'collect_message'
  | 'free_question'
  | 'summary'
  | 'sending'
  | 'completed'
  | 'error';

export type ServiceType = 
  | 'business_plan'
  | 'market_research'
  | 'marketing_strategy'
  | 'website'
  | 'branding'
  | 'community_management'
  | 'other';

export type ActionType = 
  | 'quote'
  | 'appointment'
  | 'question'
  | 'learn_more';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface QuickReply {
  id: string;
  label: string;
  value?: string;
  icon?: string;
}

export interface ChatbotData {
  action?: ActionType;
  service?: ServiceType;
  name?: string;
  email?: string;
  phone?: string;
  preferred_date?: string;
  notes?: string;
  question?: string;
}

export interface ChatbotState {
  isOpen: boolean;
  isMinimized: boolean;
  currentStep: ConversationStep;
  messages: Message[];
  data: ChatbotData;
  isTyping: boolean;
  isSending: boolean;
  hasNewMessage: boolean;
}

export type StepType = ConversationStep;
