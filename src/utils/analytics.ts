import { supabase } from './supabase';

interface AnalyticsEvent {
  event_type: string;
  event_name: string;
  page_url?: string;
  page_title?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  user_agent?: string;
  session_id?: string;
  metadata?: Record<string, any>;
}

// Generer un ID de session unique
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Extraire les parametres UTM de l'URL
const getUTMParameters = (): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
} => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  };
};

// Fonction principale pour enregistrer un evenement
export const trackEvent = async (
  eventType: string,
  eventName: string,
  metadata?: Record<string, any>
): Promise<void> => {
  try {
    const utmParams = getUTMParameters();
    const sessionId = getSessionId();

    const event: AnalyticsEvent = {
      event_type: eventType,
      event_name: eventName,
      page_url: window.location.href,
      page_title: document.title,
      ...utmParams,
      referrer: document.referrer || undefined,
      user_agent: navigator.userAgent,
      session_id: sessionId,
      metadata: metadata || undefined,
    };

    const { error } = await supabase
      .from('analytics_events')
      .insert([event]);

    if (error) {
      console.error('Analytics event error:', error);
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Tracking automatique des pages vues
export const trackPageView = (): void => {
  trackEvent('page_view', 'Page visitee');
};

// Tracking des clics sur CTA
export const trackCTAClick = (ctaName: string, ctaLocation: string): void => {
  trackEvent('cta_click', ctaName, { location: ctaLocation });
};

// Tracking des soumissions de formulaires
export const trackFormSubmission = (formType: string, formId: string): void => {
  trackEvent('form_submission', formType, { form_id: formId });
};

// Tracking des inscriptions newsletter
export const trackNewsletterSignup = (email: string): void => {
  const emailDomain = email.split('@')[1];
  trackEvent('newsletter_signup', 'Inscription newsletter', { email_domain: emailDomain });
};

// Hook pour initialiser le tracking automatique
export const initializeAnalytics = (): void => {
  // Tracking de la page vue initiale
  trackPageView();

  // Sauvegarder les parametres UTM dans le sessionStorage pour les utiliser plus tard
  const utmParams = getUTMParameters();
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
  }
};
