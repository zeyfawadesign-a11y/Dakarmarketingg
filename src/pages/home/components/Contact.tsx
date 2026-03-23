
import { useState } from 'react';
import { motion } from 'framer-motion';
import { trackFormSubmission } from '../../../utils/analytics';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function Contact() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // 1. Obtenir le token reCAPTCHA
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA non chargé. Veuillez réessayer.');
      }

      const recaptchaToken = await executeRecaptcha('submit_contact');

      const edgeResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'contact',
          data: {
            nom: formData.nom,
            prenom: '',
            name: `${formData.nom}`,
            email: formData.email,
            entreprise: formData.entreprise,
            company: formData.entreprise,
            message: formData.message
          },
          recaptchaToken
        })
      });

      if (!edgeResponse.ok) {
        const errorText = await edgeResponse.text();
        console.error('Erreur Edge Function:', errorText);
        throw new Error('Erreur lors de l\'envoi du message');
      }

      const result = await edgeResponse.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

      setSubmitStatus('success');
      trackFormSubmission('contact', 'contact-form');
      setFormData({ nom: '', email: '', entreprise: '', message: '' });
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-black p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12" 
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Parlons de Votre Projet
              </motion.h2>

              <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start space-x-3 sm:space-x-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-white text-lg sm:text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Email</h3>
                    <a href="mailto:juniorentreprise@bem.sn" className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer text-sm sm:text-base break-all">
                      juniorentreprise@bem.sn
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start space-x-3 sm:space-x-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-white text-lg sm:text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Adresse</h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Sacré Coeur 2, Pyrotechnie<br />
                      Fann, Dakar, Sénégal
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Suivez-nous</h3>
                <div className="flex space-x-3 sm:space-x-4">
                  <a 
                    href="https://www.linkedin.com/company/dakar-marketing/" 
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-linkedin-fill text-white text-sm sm:text-base"></i>
                  </a>
                  <a 
                    href="https://www.instagram.com/dakar_marketing?igsh=b3RmZG5yb2I0aW83" 
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-instagram-line text-white text-sm sm:text-base"></i>
                  </a>
                  <a 
                    href="mailto:juniorentreprise@bem.sn" 
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-mail-line text-white text-sm sm:text-base"></i>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-12 lg:p-16">
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-5 sm:space-y-7">
              <div className="relative">
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full border-b-2 border-gray-300 focus:border-red-600 outline-none py-2 sm:py-3 text-gray-900 transition-colors peer placeholder-transparent text-sm sm:text-base"
                  placeholder="Nom complet"
                />
                <label className="absolute left-0 -top-3.5 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 sm:peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-red-600">
                  Nom complet
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-b-2 border-gray-300 focus:border-red-600 outline-none py-2 sm:py-3 text-gray-900 transition-colors peer placeholder-transparent text-sm sm:text-base"
                  placeholder="Email"
                />
                <label className="absolute left-0 -top-3.5 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 sm:peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-red-600">
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 focus:border-red-600 outline-none py-2 sm:py-3 text-gray-900 transition-colors peer placeholder-transparent text-sm sm:text-base"
                  placeholder="Entreprise"
                />
                <label className="absolute left-0 -top-3.5 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 sm:peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-red-600">
                  Entreprise
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  rows={4}
                  className="w-full border-b-2 border-gray-300 focus:border-red-600 outline-none py-2 sm:py-3 text-gray-900 transition-colors peer placeholder-transparent resize-none text-sm sm:text-base"
                  placeholder="Message"
                ></textarea>
                <label className="absolute left-0 -top-3.5 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 sm:peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-red-600">
                  Message (max 500 caractères)
                </label>
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {formData.message.length}/500
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 sm:h-14 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer text-sm sm:text-base"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-mail-check-line text-green-600 text-sm sm:text-base"></i>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Message envoyé avec succès !</p>
                      <p>Un email de confirmation a été envoyé à votre adresse. Notre équipe vous répondra sous 24h.</p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-error-warning-line text-red-600 text-sm sm:text-base"></i>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Erreur d'envoi</p>
                      <p>{errorMessage || 'Une erreur s\'est produite. Veuillez réessayer ou nous contacter directement par email.'}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center">
                En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
