import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin/dashboard');
      }
    };
    checkAuth();

    // Gérer le verrouillage temporaire
    if (lockoutTime) {
      const timer = setInterval(() => {
        const remaining = lockoutTime - Date.now();
        if (remaining <= 0) {
          setLockoutTime(null);
          setAttempts(0);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [navigate, lockoutTime]);

  // Gestion de la déconnexion automatique après inactivité
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase.auth.signOut();
          navigate('/admin/login');
        }
      }, 30 * 60 * 1000); // 30 minutes d'inactivité
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Protection contre brute force
    if (lockoutTime) {
      const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
      setError(`Trop de tentatives. Réessayez dans ${remaining} secondes.`);
      return;
    }

    if (attempts >= 5) {
      const lockTime = Date.now() + 5 * 60 * 1000; // 5 minutes
      setLockoutTime(lockTime);
      setError('Trop de tentatives échouées. Compte verrouillé pendant 5 minutes.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Authentification avec Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (authError) {
        setAttempts(prev => prev + 1);
        
        if (authError.message.includes('Invalid login credentials')) {
          setError('Email ou mot de passe incorrect.');
        } else if (authError.message.includes('Email not confirmed')) {
          setError('Veuillez confirmer votre email avant de vous connecter.');
        } else {
          setError('Erreur de connexion. Veuillez réessayer.');
        }
        return;
      }

      if (data.session) {
        // Vérifier si l'utilisateur est admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('id, role')
          .eq('user_id', data.user.id)
          .maybeSingle();

        if (adminError || !adminData) {
          await supabase.auth.signOut();
          setError('Accès non autorisé. Compte administrateur requis.');
          setAttempts(prev => prev + 1);
          return;
        }

        // Mettre à jour la dernière connexion
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('user_id', data.user.id);

        // Réinitialiser les tentatives
        setAttempts(0);
        
        // Redirection vers le dashboard
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRemainingLockoutTime = () => {
    if (!lockoutTime) return 0;
    return Math.ceil((lockoutTime - Date.now()) / 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <i className="ri-shield-user-line text-3xl text-red-600"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Administration
            </h1>
            <p className="text-sm text-gray-600">
              Dakar Marketing - Espace sécurisé
            </p>
          </div>

          {/* Formulaire de connexion */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Message d'erreur */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start"
              >
                <i className="ri-error-warning-line text-red-600 text-lg mr-3 mt-0.5"></i>
                <p className="text-sm text-red-800">{error}</p>
              </motion.div>
            )}

            {/* Avertissement tentatives */}
            {attempts > 0 && attempts < 5 && !lockoutTime && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                <i className="ri-alert-line text-yellow-600 text-lg mr-3 mt-0.5"></i>
                <p className="text-sm text-yellow-800">
                  Tentative {attempts}/5. Le compte sera verrouillé après 5 tentatives échouées.
                </p>
              </div>
            )}

            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-mail-line text-gray-400 text-lg"></i>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || !!lockoutTime}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                  placeholder="admin@dakarmarketing.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-lock-line text-gray-400 text-lg"></i>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading || !!lockoutTime}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || !!lockoutTime}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer disabled:cursor-not-allowed"
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-400 text-lg hover:text-gray-600 transition-colors`}></i>
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading || !!lockoutTime}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap cursor-pointer"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line text-lg animate-spin mr-2"></i>
                  Connexion en cours...
                </>
              ) : lockoutTime ? (
                <>
                  <i className="ri-lock-line text-lg mr-2"></i>
                  Verrouillé ({getRemainingLockoutTime()}s)
                </>
              ) : (
                <>
                  <i className="ri-login-box-line text-lg mr-2"></i>
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Informations de sécurité */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-start space-x-3 text-xs text-gray-600">
              <i className="ri-shield-check-line text-green-600 text-base mt-0.5"></i>
              <div>
                <p className="font-medium text-gray-900 mb-1">Connexion sécurisée</p>
                <ul className="space-y-1">
                  <li>• Authentification JWT avec tokens sécurisés</li>
                  <li>• Protection contre les attaques par force brute</li>
                  <li>• Déconnexion automatique après 30 min d'inactivité</li>
                  <li>• Toutes les données sont chiffrées</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Lien retour */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-red-600 transition-colors inline-flex items-center cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Retour au site
          </a>
        </div>
      </motion.div>
    </div>
  );
}
