import { usePageTracking } from '../../../hooks/usePageTracking';
import { trackCTAClick } from '../../../utils/analytics';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function MarketResearchPage() {
  usePageTracking();
  const navigate = useNavigate();

  const handleCTAClick = (ctaName: string) => {
    trackCTAClick(ctaName, 'Market Research Page');
    navigate('/demande-devis');
  };

  const handleChatbotClick = () => {
    trackCTAClick('Discuter de Mon Projet', 'Market Research Page');
    const chatButton = document.querySelector('[data-chatbot-toggle]') as HTMLElement;
    if (chatButton) {
      chatButton.click();
    }
  };

  const problems = [
    {
      icon: 'ri-question-line',
      title: 'Méconnaissance du marché',
      description: 'Vous ne connaissez pas précisément la taille de votre marché, ses tendances et son potentiel de croissance.'
    },
    {
      icon: 'ri-error-warning-line',
      title: 'Risques de lancement',
      description: 'Lancer un produit sans données fiables expose votre entreprise à des échecs coûteux et évitables.'
    },
    {
      icon: 'ri-team-line',
      title: 'Clients mal ciblés',
      description: 'Vous investissez dans le marketing sans savoir précisément qui sont vos clients idéaux et ce qu\'ils attendent.'
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Concurrence floue',
      description: 'Vous manquez de visibilité sur vos concurrents, leurs forces, faiblesses et stratégies de positionnement.'
    },
    {
      icon: 'ri-compass-line',
      title: 'Décisions non éclairées',
      description: 'Vos choix stratégiques reposent sur des intuitions plutôt que sur des données concrètes et vérifiables.'
    },
    {
      icon: 'ri-funds-line',
      title: 'Opportunités manquées',
      description: 'Sans analyse approfondie, vous passez à côté de niches rentables et de segments de marché porteurs.'
    }
  ];

  const services = [
    {
      icon: 'ri-pie-chart-line',
      title: 'Analyse de la taille du marché',
      description: 'Évaluation précise du volume, de la valeur et du potentiel de croissance de votre marché cible avec projections sur 3 à 5 ans.'
    },
    {
      icon: 'ri-sword-line',
      title: 'Étude de la concurrence',
      description: 'Analyse détaillée de vos concurrents directs et indirects : positionnement, offres, prix, forces et faiblesses.'
    },
    {
      icon: 'ri-user-search-line',
      title: 'Segmentation clientèle',
      description: 'Identification et profilage des segments de clients les plus rentables avec leurs comportements d\'achat et attentes.'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Analyse des tendances',
      description: 'Étude des évolutions du secteur, innovations, réglementations et facteurs qui impacteront votre activité.'
    },
    {
      icon: 'ri-shopping-cart-line',
      title: 'Évaluation de la demande',
      description: 'Mesure de l\'appétence du marché pour votre offre, analyse des freins et motivations d\'achat des consommateurs.'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Recommandations stratégiques',
      description: 'Plan d\'action concret et priorisé basé sur les insights découverts pour maximiser vos chances de succès.'
    }
  ];

  const methodology = [
    {
      step: '01',
      title: 'Cadrage',
      description: 'Définition précise de vos objectifs, périmètre de l\'étude et questions clés à résoudre.',
      icon: 'ri-focus-line'
    },
    {
      step: '02',
      title: 'Recherche documentaire',
      description: 'Collecte et analyse de données secondaires : rapports sectoriels, études existantes, statistiques officielles.',
      icon: 'ri-file-search-line'
    },
    {
      step: '03',
      title: 'Collecte de données',
      description: 'Enquêtes terrain, interviews d\'experts, observation des comportements et analyse de la concurrence.',
      icon: 'ri-database-line'
    },
    {
      step: '04',
      title: 'Analyse approfondie',
      description: 'Traitement statistique des données, identification des patterns et extraction des insights clés.',
      icon: 'ri-search-eye-line'
    },
    {
      step: '05',
      title: 'Synthèse stratégique',
      description: 'Élaboration de recommandations actionnables alignées avec vos objectifs business.',
      icon: 'ri-lightbulb-flash-line'
    },
    {
      step: '06',
      title: 'Présentation',
      description: 'Restitution complète avec rapport détaillé, visualisations de données et session de questions-réponses.',
      icon: 'ri-presentation-line'
    }
  ];

  const results = [
    {
      icon: 'ri-checkbox-circle-line',
      title: 'Vision claire du marché',
      description: 'Compréhension complète de votre environnement concurrentiel et des opportunités à saisir.'
    },
    {
      icon: 'ri-target-line',
      title: 'Ciblage précis',
      description: 'Identification exacte de vos segments de clients prioritaires et de leurs attentes spécifiques.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Réduction des risques',
      description: 'Décisions basées sur des données fiables qui minimisent les risques d\'échec commercial.'
    },
    {
      icon: 'ri-rocket-line',
      title: 'Avantage concurrentiel',
      description: 'Positionnement différenciant qui vous distingue de vos concurrents sur le marché.'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'ROI optimisé',
      description: 'Allocation efficace de vos ressources marketing vers les segments les plus rentables.'
    },
    {
      icon: 'ri-roadmap-line',
      title: 'Stratégie éclairée',
      description: 'Plan d\'action concret et priorisé pour conquérir votre marché avec confiance.'
    }
  ];

  const useCases = [
    {
      title: 'Lancement de nouveau produit',
      description: 'Validez la viabilité de votre innovation avant d\'investir massivement dans le développement et la commercialisation.',
      image: 'https://readdy.ai/api/search-image?query=product%20launch%20planning%20with%20innovative%20new%20product%20prototype%20on%20modern%20desk%2C%20market%20validation%20research%20materials%2C%20clean%20white%20background%20with%20red%20strategic%20elements%2C%20professional%20business%20development%20scene%2C%20minimalist%20corporate%20photography&width=800&height=600&seq=market-research-launch-001&orientation=landscape',
      benefits: ['Validation du concept', 'Estimation du potentiel', 'Identification des early adopters']
    },
    {
      title: 'Expansion géographique',
      description: 'Évaluez les opportunités et risques avant d\'étendre votre activité vers de nouveaux territoires ou marchés.',
      image: 'https://readdy.ai/api/search-image?query=geographic%20expansion%20strategy%20with%20world%20map%20and%20market%20analysis%20charts%2C%20international%20business%20growth%20planning%2C%20clean%20white%20background%20with%20red%20location%20markers%2C%20professional%20corporate%20setting%2C%20minimalist%20business%20photography&width=800&height=600&seq=market-research-expansion-001&orientation=landscape',
      benefits: ['Analyse des marchés cibles', 'Adaptation de l\'offre', 'Stratégie d\'entrée optimale']
    },
    {
      title: 'Repositionnement stratégique',
      description: 'Redéfinissez votre positionnement pour mieux répondre aux attentes du marché et vous différencier de la concurrence.',
      image: 'https://readdy.ai/api/search-image?query=strategic%20repositioning%20with%20brand%20strategy%20documents%20and%20competitive%20analysis%20charts%20on%20desk%2C%20business%20transformation%20planning%2C%20clean%20white%20background%20with%20red%20strategic%20elements%2C%20professional%20consulting%20scene%2C%20minimalist%20photography&width=800&height=600&seq=market-research-reposition-001&orientation=landscape',
      benefits: ['Analyse de perception', 'Opportunités de différenciation', 'Nouvelle proposition de valeur']
    },
    {
      title: 'Veille concurrentielle',
      description: 'Surveillez en continu vos concurrents et les évolutions du marché pour anticiper les menaces et opportunités.',
      image: 'https://readdy.ai/api/search-image?query=competitive%20intelligence%20monitoring%20with%20multiple%20screens%20showing%20competitor%20analysis%20and%20market%20trends%2C%20business%20surveillance%20workspace%2C%20clean%20white%20background%20with%20red%20data%20visualization%2C%20professional%20analytics%20environment%2C%20minimalist%20design&width=800&height=600&seq=market-research-intelligence-001&orientation=landscape',
      benefits: ['Surveillance continue', 'Alertes stratégiques', 'Benchmark régulier']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-gray-50"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-6">
              <i className="ri-line-chart-line mr-2"></i>
              Études de Marché Professionnelles
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Prenez des Décisions Éclairées Grâce à des Données Fiables
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Nos études de marché approfondies vous donnent la vision claire dont vous avez besoin pour conquérir votre marché, minimiser les risques et maximiser vos opportunités de croissance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => handleCTAClick('Demander un Devis Gratuit')}
                className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                Demander un Devis Gratuit
              </button>
              <button 
                onClick={handleChatbotClick}
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-2 border-gray-200 whitespace-nowrap cursor-pointer"
              >
                Discuter de Mon Projet
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Pourquoi une Étude de Marché est Essentielle ?
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Dans un environnement économique en constante évolution, comprendre votre marché n'est plus une option, c'est une nécessité stratégique.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Une étude de marché professionnelle vous permet de valider vos hypothèses, d'identifier les opportunités cachées et de prendre des décisions basées sur des faits plutôt que sur des intuitions.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-red-50 rounded-xl">
                  <div className="text-4xl font-bold text-red-600 mb-2">85%</div>
                  <div className="text-sm text-gray-700">des échecs évitables avec une étude</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-4xl font-bold text-gray-900 mb-2">3x</div>
                  <div className="text-sm text-gray-700">ROI moyen sur les investissements</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://readdy.ai/api/search-image?query=professional%20market%20research%20analysis%20with%20data%20charts%20statistics%20and%20business%20intelligence%20reports%20on%20modern%20desk%2C%20analyst%20reviewing%20market%20trends%20on%20laptop%2C%20clean%20white%20background%20with%20red%20data%20visualization%20elements%2C%20corporate%20professional%20atmosphere%2C%20high%20quality%20business%20photography&width=800&height=600&seq=market-research-hero-001&orientation=landscape"
                alt="Étude de marché professionnelle"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Les Problèmes que Nous Résolvons
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sans données fiables, votre entreprise navigue à l'aveugle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <i className={`${problem.icon} text-3xl text-red-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ce que Comprend Notre Étude de Marché
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une analyse complète et approfondie pour éclairer vos décisions stratégiques
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className={`${service.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Un processus rigoureux en 6 étapes pour des résultats fiables et actionnables
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methodology.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                  <div className="flex items-center mb-6">
                    <div className="text-5xl font-bold text-red-600 mr-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {step.step}
                    </div>
                    <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center">
                      <i className={`${step.icon} text-2xl text-white`}></i>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Les Résultats Concrets pour Votre Entreprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des insights actionnables qui transforment votre stratégie
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-red-50 p-8 rounded-xl"
              >
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mb-6">
                  <i className={`${result.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{result.title}</h3>
                <p className="text-gray-700 leading-relaxed">{result.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Cas d'Usage de Nos Études de Marché
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions adaptées à chaque situation stratégique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{useCase.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{useCase.description}</p>
                  <div className="space-y-2">
                    {useCase.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center">
                        <i className="ri-check-line text-red-600 text-xl mr-3"></i>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Prêt à Comprendre Votre Marché ?
            </h2>
            <p className="text-xl mb-10 leading-relaxed opacity-90">
              Obtenez les données et insights dont vous avez besoin pour prendre des décisions stratégiques éclairées et conquérir votre marché avec confiance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <button 
                onClick={() => handleCTAClick('Demander un Devis Gratuit - Final CTA')}
                className="px-10 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                Demander un Devis Gratuit
              </button>
              <button 
                onClick={handleChatbotClick}
                className="px-10 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                Discuter de Mon Projet
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <i className="ri-time-line text-3xl mb-3"></i>
                <div className="font-semibold">Livraison rapide</div>
                <div className="text-sm opacity-80">2 à 4 semaines</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <i className="ri-shield-check-line text-3xl mb-3"></i>
                <div className="font-semibold">Données fiables</div>
                <div className="text-sm opacity-80">Méthodologie rigoureuse</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <i className="ri-customer-service-line text-3xl mb-3"></i>
                <div className="font-semibold">Support continu</div>
                <div className="text-sm opacity-80">Accompagnement personnalisé</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
