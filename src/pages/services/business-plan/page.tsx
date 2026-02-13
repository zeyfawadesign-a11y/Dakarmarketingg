import { usePageTracking } from '../../../hooks/usePageTracking';
import { trackCTAClick } from '../../../utils/analytics';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function BusinessPlanPage() {
  usePageTracking();
  const navigate = useNavigate();

  const handleContactClick = () => {
    trackCTAClick('Demander un Devis Gratuit', 'Business Plan Page');
    navigate('/demande-devis');
  };

  const handleEmailClick = () => {
    trackCTAClick('Nous Contacter Email', 'Business Plan Page');
  };

  const handlePrestationsClick = () => {
    trackCTAClick('Découvrir nos Prestations', 'Business Plan Hero');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=abstract%20business%20strategy%20planning%20network%20connections%20geometric%20patterns%20professional%20corporate%20background%20minimalist%20design%20red%20accents%20modern%20digital%20business%20concept&width=1920&height=1080&seq=bp-hero-bg-001&orientation=landscape)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <i className="ri-file-chart-line text-5xl text-white"></i>
              </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Conception de Business Plan
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
              Transformez votre vision entrepreneuriale en un document stratégique solide qui convainc investisseurs et partenaires
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={handleContactClick}
                className="px-10 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-lg"
              >
                Demander un Devis Gratuit
              </button>
              <a 
                href="#prestations"
                onClick={handlePrestationsClick}
                className="px-10 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-lg"
              >
                Découvrir nos Prestations
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explication du Service */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Qu'est-ce qu'un Business Plan ?
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Un business plan est bien plus qu'un simple document. C'est la feuille de route stratégique qui structure votre projet entrepreneurial, définit vos objectifs et démontre la viabilité économique de votre entreprise.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Chez Dakar Marketing, nous créons des business plans professionnels et personnalisés qui répondent aux exigences des investisseurs, banques et partenaires stratégiques. Notre approche combine analyse rigoureuse du marché, projections financières réalistes et stratégie commerciale innovante.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-red-50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-red-600 mb-2">95%</div>
                  <div className="text-sm text-gray-700">Taux de satisfaction client</div>
                </div>
                <div className="bg-red-50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-red-600 mb-2">150+</div>
                  <div className="text-sm text-gray-700">Business plans réalisés</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://readdy.ai/api/search-image?query=professional%20business%20consultant%20presenting%20strategic%20business%20plan%20document%20with%20financial%20charts%20graphs%20to%20entrepreneurs%20in%20modern%20office%20meeting%20room%2C%20clean%20minimalist%20white%20background%20with%20red%20accents%2C%20corporate%20professional%20atmosphere%2C%20high%20quality%20business%20photography&width=800&height=600&seq=bp-explain-001&orientation=landscape"
                alt="Business Plan Consultation"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problèmes Résolus */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Les Défis que Nous Résolvons
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous comprenons les obstacles auxquels font face les entrepreneurs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-funds-line',
                title: 'Difficulté à Lever des Fonds',
                description: 'Sans business plan solide, convaincre les investisseurs et obtenir des financements devient quasi impossible.',
                solution: 'Nous créons un document professionnel qui répond aux attentes des investisseurs et maximise vos chances de financement.'
              },
              {
                icon: 'ri-compass-3-line',
                title: 'Manque de Vision Stratégique',
                description: 'Beaucoup d\'entrepreneurs ont une idée mais peinent à structurer leur vision et définir une stratégie claire.',
                solution: 'Notre méthodologie vous aide à clarifier vos objectifs, identifier vos opportunités et tracer un chemin vers le succès.'
              },
              {
                icon: 'ri-line-chart-line',
                title: 'Projections Financières Complexes',
                description: 'Établir des prévisions financières réalistes et crédibles nécessite une expertise comptable et analytique pointue.',
                solution: 'Nos experts élaborent des projections financières détaillées sur 3 à 5 ans, validées par des données de marché.'
              },
              {
                icon: 'ri-shield-check-line',
                title: 'Évaluation des Risques',
                description: 'Identifier et anticiper les risques potentiels est crucial mais souvent négligé par les entrepreneurs.',
                solution: 'Nous analysons en profondeur les risques et proposons des stratégies de mitigation concrètes.'
              },
              {
                icon: 'ri-team-line',
                title: 'Positionnement Concurrentiel Flou',
                description: 'Se différencier dans un marché saturé sans analyse concurrentielle approfondie est un pari risqué.',
                solution: 'Notre étude de marché identifie votre avantage concurrentiel unique et votre positionnement optimal.'
              },
              {
                icon: 'ri-time-line',
                title: 'Manque de Temps et d\'Expertise',
                description: 'Rédiger un business plan de qualité demande du temps et des compétences que tous les entrepreneurs n\'ont pas.',
                solution: 'Nous prenons en charge l\'intégralité du processus, vous permettant de vous concentrer sur votre cœur de métier.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <i className={`${item.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-red-600 mb-2">Notre Solution :</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Détail des Prestations */}
      <section id="prestations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ce que Comprend Notre Prestation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un accompagnement complet de A à Z pour un business plan professionnel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Résumé Exécutif Percutant',
                description: 'Synthèse claire et convaincante de votre projet qui capte immédiatement l\'attention des investisseurs.',
                items: ['Présentation de l\'entreprise', 'Proposition de valeur unique', 'Opportunité de marché', 'Besoins de financement']
              },
              {
                title: 'Analyse de Marché Approfondie',
                description: 'Étude détaillée de votre environnement concurrentiel et des opportunités de croissance.',
                items: ['Taille et potentiel du marché', 'Analyse de la concurrence', 'Tendances et évolutions', 'Segments de clientèle cibles']
              },
              {
                title: 'Stratégie Marketing & Commerciale',
                description: 'Plan d\'action concret pour acquérir et fidéliser vos clients.',
                items: ['Positionnement et différenciation', 'Mix marketing (4P)', 'Stratégie de distribution', 'Plan de communication']
              },
              {
                title: 'Plan Opérationnel',
                description: 'Organisation détaillée de vos opérations et ressources nécessaires.',
                items: ['Processus de production/service', 'Ressources humaines', 'Infrastructures et équipements', 'Partenaires clés']
              },
              {
                title: 'Projections Financières Détaillées',
                description: 'Prévisions financières réalistes sur 3 à 5 ans avec tous les états financiers.',
                items: ['Compte de résultat prévisionnel', 'Plan de trésorerie', 'Bilan prévisionnel', 'Seuil de rentabilité et ROI']
              },
              {
                title: 'Analyse des Risques',
                description: 'Identification des risques potentiels et stratégies de mitigation.',
                items: ['Risques de marché', 'Risques opérationnels', 'Risques financiers', 'Plans de contingence']
              }
            ].map((prestation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{prestation.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{prestation.description}</p>
                <ul className="space-y-3">
                  {prestation.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-red-600 text-xl mr-3 flex-shrink-0 mt-0.5"></i>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="py-24 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Notre Méthodologie Éprouvée
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Un processus structuré en 6 étapes pour garantir votre succès
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation Initiale',
                description: 'Nous écoutons votre vision, analysons vos besoins et définissons ensemble les objectifs du business plan.',
                icon: 'ri-discuss-line'
              },
              {
                step: '02',
                title: 'Recherche & Analyse',
                description: 'Collecte de données, étude de marché approfondie et analyse concurrentielle détaillée.',
                icon: 'ri-search-line'
              },
              {
                step: '03',
                title: 'Élaboration Stratégique',
                description: 'Définition de votre stratégie marketing, commerciale et opérationnelle avec nos experts.',
                icon: 'ri-lightbulb-line'
              },
              {
                step: '04',
                title: 'Modélisation Financière',
                description: 'Création des projections financières détaillées et validation de la viabilité économique.',
                icon: 'ri-calculator-line'
              },
              {
                step: '05',
                title: 'Rédaction & Design',
                description: 'Rédaction professionnelle du document avec mise en page soignée et visuels impactants.',
                icon: 'ri-file-edit-line'
              },
              {
                step: '06',
                title: 'Révision & Livraison',
                description: 'Révisions selon vos retours et livraison du business plan finalisé prêt à présenter.',
                icon: 'ri-check-double-line'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all h-full">
                  <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                    <i className={`${item.icon} text-3xl text-white`}></i>
                  </div>
                  <div className="text-5xl font-bold text-red-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Résultats pour le Client */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://readdy.ai/api/search-image?query=successful%20business%20entrepreneur%20celebrating%20achievement%20with%20business%20plan%20document%20showing%20growth%20charts%20and%20positive%20results%2C%20modern%20office%20setting%20with%20clean%20white%20background%20and%20red%20accents%2C%20professional%20business%20success%20photography&width=800&height=600&seq=bp-results-001&orientation=landscape"
                alt="Résultats Business Plan"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Les Résultats Concrets pour Vous
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Un business plan professionnel de Dakar Marketing vous apporte des bénéfices tangibles et mesurables :
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: 'ri-money-dollar-circle-line',
                    title: 'Accès au Financement',
                    description: 'Augmentez vos chances d\'obtenir des prêts bancaires, subventions ou investissements de 75%'
                  },
                  {
                    icon: 'ri-focus-3-line',
                    title: 'Vision Claire',
                    description: 'Clarifiez votre stratégie et alignez toute votre équipe sur des objectifs communs et mesurables'
                  },
                  {
                    icon: 'ri-shield-check-line',
                    title: 'Réduction des Risques',
                    description: 'Anticipez les obstacles et préparez des solutions avant qu\'ils ne deviennent des problèmes'
                  },
                  {
                    icon: 'ri-rocket-line',
                    title: 'Croissance Accélérée',
                    description: 'Identifiez les opportunités de croissance et les leviers pour scaler votre activité rapidement'
                  },
                  {
                    icon: 'ri-star-line',
                    title: 'Crédibilité Renforcée',
                    description: 'Présentez une image professionnelle qui inspire confiance auprès de tous vos partenaires'
                  },
                  {
                    icon: 'ri-compass-3-line',
                    title: 'Feuille de Route',
                    description: 'Disposez d\'un guide stratégique pour piloter votre entreprise sur les 3 à 5 prochaines années'
                  }
                ].map((result, index) => (
                  <div key={index} className="flex items-start bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <i className={`${result.icon} text-2xl text-white`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{result.title}</h3>
                      <p className="text-gray-700">{result.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cas d'Usage */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Pour Qui Est Ce Service ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre expertise s'adapte à tous types de projets entrepreneuriaux
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: 'ri-rocket-2-line',
                title: 'Startups',
                description: 'Vous lancez une startup innovante et avez besoin de convaincre des investisseurs ou business angels',
                image: 'https://readdy.ai/api/search-image?query=young%20startup%20entrepreneurs%20working%20on%20innovative%20technology%20project%20in%20modern%20coworking%20space%2C%20clean%20minimalist%20white%20background%20with%20red%20accents%2C%20professional%20business%20photography&width=600&height=400&seq=bp-case-startup-001&orientation=landscape'
              },
              {
                icon: 'ri-store-2-line',
                title: 'PME',
                description: 'Vous développez votre PME et cherchez un financement bancaire pour votre expansion',
                image: 'https://readdy.ai/api/search-image?query=small%20business%20owner%20managing%20growing%20company%20operations%20in%20professional%20office%20environment%2C%20clean%20white%20background%20with%20red%20elements%2C%20business%20growth%20photography&width=600&height=400&seq=bp-case-pme-001&orientation=landscape'
              },
              {
                icon: 'ri-user-star-line',
                title: 'Entrepreneurs',
                description: 'Vous créez votre première entreprise et voulez structurer votre projet de manière professionnelle',
                image: 'https://readdy.ai/api/search-image?query=confident%20entrepreneur%20planning%20new%20business%20venture%20with%20documents%20and%20laptop%2C%20modern%20minimalist%20office%20with%20white%20background%20and%20red%20accents%2C%20professional%20business%20portrait&width=600&height=400&seq=bp-case-entrepreneur-001&orientation=landscape'
              },
              {
                icon: 'ri-building-line',
                title: 'Entreprises Établies',
                description: 'Vous pilotez un nouveau projet stratégique au sein de votre organisation existante',
                image: 'https://readdy.ai/api/search-image?query=corporate%20business%20executives%20reviewing%20strategic%20business%20plan%20in%20modern%20boardroom%2C%20professional%20office%20setting%20with%20clean%20white%20background%20and%20red%20corporate%20colors&width=600&height=400&seq=bp-case-corporate-001&orientation=landscape'
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center">
                    <i className={`${useCase.icon} text-2xl text-white`}></i>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{useCase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Prêt à Concrétiser Votre Projet ?
            </h2>
            <p className="text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Obtenez un business plan professionnel qui transforme votre vision en réalité et convainc vos investisseurs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={handleContactClick}
                className="px-12 py-5 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-lg"
              >
                Demander un Devis Gratuit
              </button>
              <a 
                href="mailto:juniorentreprise@bem.sn"
                onClick={handleEmailClick}
                className="px-12 py-5 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-lg inline-block"
              >
                Nous Contacter
              </a>
            </div>
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/90">
              <div className="flex items-center">
                <i className="ri-time-line text-2xl mr-2"></i>
                <span>Livraison sous 2-3 semaines</span>
              </div>
              <div className="flex items-center">
                <i className="ri-shield-check-line text-2xl mr-2"></i>
                <span>Satisfaction garantie</span>
              </div>
              <div className="flex items-center">
                <i className="ri-customer-service-2-line text-2xl mr-2"></i>
                <span>Support personnalisé</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
