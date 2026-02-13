
import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackFormSubmission, trackNewsletterSignup } from '../../utils/analytics';

interface NewsletterProps {
  variant?: 'default' | 'compact' | 'dark' | 'light';
  showTitle?: boolean;
}

export default function Newsletter({ variant = 'default', showTitle = true }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Veuillez entrer votre adresse email');
      setStatus('error');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Veuillez entrer une adresse email valide');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Configuration Supabase manquante');
      }

      const edgeResponse = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          type: 'newsletter',
          data: {
            email: email,
            source: 'newsletter'
          }
        })
      });

      console.log('Newsletter edge function response:', edgeResponse.status);

      if (!edgeResponse.ok) {
        const errorData = await edgeResponse.json().catch(() => ({}));
        console.error('Edge function error:', errorData);
        throw new Error(errorData.error || 'Erreur lors de l\'inscription');
      }

      const result = await edgeResponse.json();
      console.log('Newsletter edge function result:', result);

      setStatus('success');
      trackNewsletterSignup(email);
      trackFormSubmission('newsletter', 'newsletter-form');
      setEmail('');
    } catch {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      setStatus('error');
    }
  };

  const isDark = variant === 'dark';
  const isLight = variant === 'light';
  const isCompact = variant === 'compact';

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl p-8 text-center ${isDark || isLight ? 'bg-white/10' : 'bg-green-50 border border-green-200'}`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark || isLight ? 'bg-green-500' : 'bg-green-100'}`}>
          <i className={`ri-check-line text-3xl ${isDark || isLight ? 'text-white' : 'text-green-600'}`}></i>
        </div>
        <h4 className={`text-2xl font-bold mb-3 ${isDark || isLight ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
          Inscription Réussie !
        </h4>
        <p className={`mb-4 ${isDark || isLight ? 'text-gray-300' : 'text-gray-600'}`}>
          Merci de rejoindre la communauté Dakar Marketing !
        </p>
        <div className={`text-sm ${isDark || isLight ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="mb-2">✓ Vous recevrez nos actualités et conseils marketing</p>
          <p className="mb-2">✓ Accès exclusif à nos études de cas</p>
          <p>✓ Offres spéciales réservées aux abonnés</p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className={`mt-6 text-sm underline cursor-pointer ${isDark || isLight ? 'text-white hover:text-gray-200' : 'text-red-600 hover:text-red-700'}`}
        >
          Inscrire une autre adresse
        </button>
      </motion.div>
    );
  }

  return (
    <div className={isCompact ? '' : 'w-full'}>
      {showTitle && !isCompact && (
        <div className="text-center mb-8">
          <h3 className={`text-3xl font-bold mb-4 ${isDark || isLight ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
            Restez Informé
          </h3>
          <p className={`text-lg ${isDark || isLight ? 'text-gray-300' : 'text-gray-600'}`}>
            Inscrivez-vous à notre newsletter pour recevoir nos actualités, conseils marketing et offres exclusives.
          </p>
        </div>
      )}

      <form
        id="newsletter-form"
        onSubmit={handleSubmit}
        className={`${isCompact ? 'flex flex-col sm:flex-row gap-3' : 'max-w-xl mx-auto'}`}
      >
        <div className={`relative ${isCompact ? 'flex-1' : 'mb-4'}`}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i className={`ri-mail-line text-lg ${isDark || isLight ? 'text-gray-400' : 'text-gray-500'}`}></i>
          </div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="Votre adresse email"
            className={`w-full pl-12 pr-4 py-4 rounded-xl text-base transition-all focus:outline-none focus:ring-2 focus:ring-red-500 ${
              isDark || isLight
                ? 'bg-white/10 text-white placeholder-gray-400 border border-white/20' 
                : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200 shadow-sm'
            } ${status === 'error' ? 'border-red-500 ring-1 ring-red-500' : ''}`}
            disabled={status === 'loading'}
          />
        </div>

        <AnimatePresence>
          {status === 'error' && errorMessage && !isCompact && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-sm mb-4 flex items-center gap-2"
            >
              <i className="ri-error-warning-line"></i>
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`${isCompact ? 'px-6' : 'w-full'} py-4 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
            isLight 
              ? 'bg-white text-red-600 hover:bg-gray-100' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {status === 'loading' ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i>
              Inscription...
            </>
          ) : (
            <>
              <i className="ri-send-plane-line"></i>
              S'inscrire
            </>
          )}
        </button>

        {isCompact && status === 'error' && errorMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm flex items-center gap-2 sm:col-span-2"
          >
            <i className="ri-error-warning-line"></i>
            {errorMessage}
          </motion.p>
        )}
      </form>

      {!isCompact && (
        <p className={`text-center text-sm mt-4 ${isDark || isLight ? 'text-gray-300' : 'text-gray-500'}`}>
          <i className="ri-shield-check-line mr-1"></i>
          Vos données sont protégées. Désabonnement possible à tout moment.
        </p>
      )}
    </div>
  );
}
