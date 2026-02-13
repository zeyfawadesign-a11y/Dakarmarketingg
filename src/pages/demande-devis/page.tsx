import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise: string;
  secteur: string;
  poste: string;
  typeService: string;
  budget: string;
  delai: string;
  description: string;
  commentConnu: string;
}

export default function DemandeDevisPage() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    secteur: '',
    poste: '',
    typeService: '',
    budget: '',
    delai: '',
    description: '',
    commentConnu: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Obtenir le token reCAPTCHA
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA non chargé. Veuillez réessayer.');
      }

      const recaptchaToken = await executeRecaptcha('submit_devis');

      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Configuration Supabase manquante');
      }

      console.log('Envoi du formulaire de devis...', {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        entreprise: formData.entreprise
      });

      // 2. Envoyer avec le token reCAPTCHA
      const edgeResponse = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          type: 'devis',
          data: {
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            telephone: formData.telephone,
            entreprise: formData.entreprise,
            secteur: formData.secteur,
            poste: formData.poste,
            typeService: formData.typeService,
            budget: formData.budget,
            delai: formData.delai,
            description: formData.description
          },
          recaptchaToken // ← Token reCAPTCHA pour validation serveur
        })
      });

      console.log('Réponse Edge Function:', {
        status: edgeResponse.status,
        statusText: edgeResponse.statusText,
        ok: edgeResponse.ok
      });

      // Lire la réponse une seule fois
      const responseText = await edgeResponse.text();
      console.log('Réponse brute:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Erreur de parsing JSON:', parseError);
        throw new Error('Réponse invalide du serveur');
      }

      if (!edgeResponse.ok) {
        console.error('Erreur Edge Function:', result);
        throw new Error(result.error || result.message || 'Erreur lors de l\'envoi du devis');
      }

      console.log('Devis envoyé avec succès:', result);

      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur complète lors de la soumission:', error);
      alert(error instanceof Error ? error.message : 'Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.nom && formData.prenom && formData.email && formData.telephone;
  const isStep2Valid = formData.entreprise && formData.secteur;
  const isStep3Valid = formData.typeService && formData.budget && formData.delai && formData.description;

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const secteurs = [
    'Agroalimentaire',
    'Commerce / Distribution',
    'Services financiers',
    'Technologie / IT',
    'Santé / Pharmaceutique',
    'Éducation / Formation',
    'Immobilier',
    'Transport / Logistique',
    'Tourisme / Hôtellerie',
    'Industrie / Manufacturing',
    'Télécommunications',
    'Autre'
  ];

  const services = [
    'Étude de marché complète',
    'Enquête marketing / Sondage',
    'Business Plan',
    'Analyse concurrentielle',
    'Étude de satisfaction client',
    'Stratégie marketing',
    'Autre (préciser dans la description)'
  ];

  const budgets = [
    'Moins de 500 000 FCFA',
    '500 000 - 1 000 000 FCFA',
    '1 000 000 - 2 500 000 FCFA',
    '2 500 000 - 5 000 000 FCFA',
    'Plus de 5 000 000 FCFA',
    'À définir ensemble'
  ];

  const delais = [
    'Urgent (moins de 2 semaines)',
    'Court terme (2-4 semaines)',
    'Moyen terme (1-2 mois)',
    'Long terme (plus de 2 mois)',
    'Flexible'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-20 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line text-4xl text-green-600"></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Demande envoyée avec succès !
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Merci <strong>{formData.prenom}</strong> pour votre demande de devis. Notre équipe l'analysera attentivement et vous contactera sous <strong>24 à 48 heures</strong> pour discuter de votre projet.
              </p>
              <div className="bg-red-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Prochaines étapes :</h3>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-start gap-3">
                    <i className="ri-mail-line text-red-600 mt-1"></i>
                    <span>Un email de confirmation a été envoyé à <strong>{formData.email}</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-phone-line text-red-600 mt-1"></i>
                    <span>Un consultant vous appellera pour un premier échange</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-file-text-line text-red-600 mt-1"></i>
                    <span>Vous recevrez une proposition détaillée et personnalisée</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/"
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all whitespace-nowrap cursor-pointer"
                >
                  Retour à l'accueil
                </Link>
                <Link 
                  to="/nos-services"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-red-600 hover:text-red-600 transition-all whitespace-nowrap cursor-pointer"
                >
                  Découvrir nos services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 bg-red-600/20 text-red-300 rounded-full text-sm font-medium mb-6"
            >
              Obtenez votre devis personnalisé
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Demande de Devis
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Décrivez votre projet et recevez une proposition sur mesure. Notre équipe d'experts vous accompagne dans la réussite de vos objectifs marketing.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <i className="ri-time-line text-xl text-red-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-900">Réponse sous 24h</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <i className="ri-shield-check-line text-xl text-red-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-900">Devis gratuit</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <i className="ri-user-star-line text-xl text-red-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-900">+50 clients satisfaits</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <i className="ri-award-line text-xl text-red-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-900">10 ans d'expertise</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-gray-50 px-8 py-6 border-b">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step ? <i className="ri-check-line"></i> : step}
                    </div>
                    <span className={`ml-3 text-sm font-medium hidden sm:block ${
                      currentStep >= step ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step === 1 && 'Vos coordonnées'}
                      {step === 2 && 'Votre entreprise'}
                      {step === 3 && 'Votre projet'}
                    </span>
                    {step < 3 && (
                      <div className={`w-12 sm:w-24 h-1 mx-4 rounded ${
                        currentStep > step ? 'bg-red-600' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form 
              id="devis-form"
              onSubmit={handleSubmit}
              className="p-8"
            >
              {/* Step 1: Contact Info */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Vos coordonnées
                    </h2>
                    <p className="text-gray-600">Permettez-nous de vous contacter pour discuter de votre projet.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email professionnel <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                        placeholder="+221 XX XXX XX XX"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStep1Valid}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        isStep1Valid 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continuer <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Company Info */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Votre entreprise
                    </h2>
                    <p className="text-gray-600">Ces informations nous aident à mieux comprendre votre contexte.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'entreprise <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="entreprise"
                        value={formData.entreprise}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Votre poste
                      </label>
                      <input
                        type="text"
                        name="poste"
                        value={formData.poste}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                        placeholder="Ex: Directeur Marketing"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secteur d'activité <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="secteur"
                      value={formData.secteur}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm cursor-pointer"
                    >
                      <option value="">Sélectionnez votre secteur</option>
                      {secteurs.map((secteur) => (
                        <option key={secteur} value={secteur}>{secteur}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment avez-vous connu Dakar Marketing ?
                    </label>
                    <select
                      name="commentConnu"
                      value={formData.commentConnu}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm cursor-pointer"
                    >
                      <option value="">Sélectionnez une option</option>
                      <option value="Recherche Google">Recherche Google</option>
                      <option value="Réseaux sociaux">Réseaux sociaux</option>
                      <option value="Recommandation">Recommandation</option>
                      <option value="BEM Dakar">BEM Dakar</option>
                      <option value="Événement">Événement</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-arrow-left-line mr-2"></i> Retour
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStep2Valid}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        isStep2Valid 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continuer <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Project Details */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Votre projet
                    </h2>
                    <p className="text-gray-600">Décrivez votre besoin pour recevoir une proposition adaptée.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de service souhaité <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="typeService"
                      value={formData.typeService}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm cursor-pointer"
                    >
                      <option value="">Sélectionnez un service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget estimatif <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm cursor-pointer"
                      >
                        <option value="">Sélectionnez une fourchette</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Délai souhaité <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="delai"
                        value={formData.delai}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm cursor-pointer"
                      >
                        <option value="">Sélectionnez un délai</option>
                        {delais.map((delai) => (
                          <option key={delai} value={delai}>{delai}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description de votre projet <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm resize-none"
                      placeholder="Décrivez votre projet, vos objectifs, votre cible, vos attentes... Plus vous êtes précis, plus notre proposition sera adaptée."
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 caractères</p>
                  </div>

                  <div className="bg-red-50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-information-line text-red-600"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Engagement qualité</h4>
                        <p className="text-sm text-gray-600">
                          Votre demande sera traitée par un consultant expert qui vous contactera sous 24h pour un premier échange gratuit et sans engagement.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-arrow-left-line mr-2"></i> Retour
                    </button>
                    <button
                      type="submit"
                      disabled={!isStep3Valid || isSubmitting}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        isStep3Valid && !isSubmitting
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-2"></i> Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer ma demande <i className="ri-send-plane-line ml-2"></i>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Side Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-customer-service-2-line text-2xl text-red-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Accompagnement personnalisé</h3>
              <p className="text-sm text-gray-600">Un consultant dédié vous accompagne tout au long de votre projet.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-price-tag-3-line text-2xl text-red-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Tarifs compétitifs</h3>
              <p className="text-sm text-gray-600">Des prix adaptés aux réalités du marché sénégalais et africain.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-medal-line text-2xl text-red-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Qualité garantie</h3>
              <p className="text-sm text-gray-600">Méthodologie rigoureuse et livrables professionnels.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
