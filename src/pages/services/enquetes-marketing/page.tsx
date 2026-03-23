import { usePageTracking } from '../../../hooks/usePageTracking';
import { trackCTAClick } from '../../../utils/analytics';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function EnquetesMarketingPage() {
  usePageTracking();
  const navigate = useNavigate();

  const scrollToContact = () => {
    trackCTAClick('Demander un Devis', 'Enquetes Marketing Page');
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  const handleServicesClick = () => {
    trackCTAClick('Tous Nos Services', 'Enquetes Marketing Hero');
    navigate('/nos-services');
  };

  const problems = [
    {
      icon: 'ri-question-line',
      title: 'Manque de données clients',
      description: 'Vous prenez des décisions sans vraiment connaître les besoins et attentes de vos clients'
    },
    {
      icon: 'ri-error-warning-line',
      title: 'Décisions non informées',
      description: 'Vos stratégies marketing reposent sur des intuitions plutôt que sur des données concrètes'
    },
    {
      icon: 'ri-user-unfollow-line',
      title: 'Satisfaction client floue',
      description: 'Vous ne mesurez pas précisément le niveau de satisfaction de votre clientèle'
    },
    {
      icon: 'ri-compass-line',
      title: 'Positionnement incertain',
      description: 'Vous ne savez pas comment votre marque est perçue par rapport à la concurrence'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Opportunités manquées',
      description: 'Des insights précieux restent cachés faute de collecte systématique de données'
    },
    {
      icon: 'ri-team-line',
      title: 'Cible mal définie',
      description: 'Vos personas et segments clients manquent de précision et de validation terrain'
    }
  ];

  const prestations = [
    {
      icon: 'ri-file-list-3-line',
      title: 'Conception de questionnaires',
      description: 'Élaboration de questionnaires structurés et validés scientifiquement pour collecter des données pertinentes'
    },
    {
      icon: 'ri-user-search-line',
      title: 'Échantillonnage ciblé',
      description: 'Définition et sélection d\'échantillons représentatifs de votre population cible'
    },
    {
      icon: 'ri-phone-line',
      title: 'Collecte multi-canal',
      description: 'Administration d\'enquêtes en ligne, téléphone, face-à-face selon vos besoins'
    },
    {
      icon: 'ri-bar-chart-box-line',
      title: 'Analyse statistique',
      description: 'Traitement et analyse des données avec outils statistiques professionnels (SPSS, R)'
    },
    {
      icon: 'ri-presentation-line',
      title: 'Rapport détaillé',
      description: 'Présentation des résultats avec graphiques, tableaux et recommandations actionnables'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Support post-enquête',
      description: 'Accompagnement dans l\'interprétation et l\'utilisation des résultats'
    }
  ];

  const methodology = [
    {
      number: '01',
      title: 'Cadrage',
      description: 'Définition des objectifs, cibles et méthodologie d\'enquête',
      icon: 'ri-focus-3-line'
    },
    {
      number: '02',
      title: 'Conception',
      description: 'Élaboration du questionnaire et test pilote',
      icon: 'ri-edit-box-line'
    },
    {
      number: '03',
      title: 'Collecte',
      description: 'Administration de l\'enquête auprès de l\'échantillon',
      icon: 'ri-database-2-line'
    },
    {
      number: '04',
      title: 'Traitement',
      description: 'Nettoyage et codification des données collectées',
      icon: 'ri-settings-3-line'
    },
    {
      number: '05',
      title: 'Analyse',
      description: 'Analyse statistique et identification des insights clés',
      icon: 'ri-line-chart-line'
    },
    {
      number: '06',
      title: 'Restitution',
      description: 'Présentation des résultats et recommandations stratégiques',
      icon: 'ri-slideshow-line'
    }
  ];

  const results = [
    {
      icon: 'ri-checkbox-circle-line',
      title: 'Données fiables et représentatives',
      description: 'Des insights basés sur des échantillons scientifiquement validés'
    },
    {
      icon: 'ri-lightbulb-flash-line',
      title: 'Insights actionnables',
      description: 'Des recommandations concrètes pour améliorer votre stratégie'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Meilleure connaissance client',
      description: 'Une compréhension approfondie des besoins et attentes de votre cible'
    },
    {
      icon: 'ri-trophy-line',
      title: 'Avantage concurrentiel',
      description: 'Des décisions marketing basées sur des données réelles plutôt que des intuitions'
    },
    {
      icon: 'ri-funds-line',
      title: 'ROI optimisé',
      description: 'Réduction du gaspillage marketing grâce à des actions ciblées et efficaces'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Risques minimisés',
      description: 'Validation de vos hypothèses avant d\'investir massivement'
    }
  ];

  const useCases = [
    {
      title: 'Satisfaction client',
      description: 'Mesurez la satisfaction de vos clients et identifiez les axes d\'amélioration de votre offre et service',
      image: 'https://readdy.ai/api/search-image?query=customer%20satisfaction%20survey%20with%20happy%20clients%20giving%20feedback%20on%20tablet%20device%2C%20professional%20service%20evaluation%2C%20clean%20white%20background%20with%20red%20satisfaction%20rating%20elements%2C%20business%20research%20atmosphere%2C%20minimalist%20photography%20style&width=600&height=400&seq=usecase-satisfaction-001&orientation=landscape',
      icon: 'ri-star-smile-line'
    },
    {
      title: 'Test de concept',
      description: 'Validez l\'intérêt pour un nouveau produit ou service avant son lancement sur le marché',
      image: 'https://readdy.ai/api/search-image?query=product%20concept%20testing%20with%20focus%20group%20reviewing%20new%20product%20prototype%2C%20market%20validation%20research%2C%20clean%20white%20background%20with%20red%20product%20testing%20elements%2C%20innovation%20research%20setting%2C%20minimalist%20photography&width=600&height=400&seq=usecase-concept-001&orientation=landscape',
      icon: 'ri-flask-line'
    },
    {
      title: 'Notoriété de marque',
      description: 'Évaluez la notoriété et l\'image de votre marque auprès de votre cible et du grand public',
      image: 'https://readdy.ai/api/search-image?query=brand%20awareness%20survey%20with%20marketing%20team%20analyzing%20brand%20recognition%20data%20on%20screens%2C%20brand%20perception%20research%2C%20clean%20white%20background%20with%20red%20brand%20elements%2C%20professional%20marketing%20setting%2C%20minimalist%20photography&width=600&height=400&seq=usecase-brand-001&orientation=landscape',
      icon: 'ri-award-line'
    },
    {
      title: 'Comportement d\'achat',
      description: 'Comprenez les motivations, freins et processus de décision d\'achat de vos clients',
      image: 'https://readdy.ai/api/search-image?query=consumer%20behavior%20research%20with%20shopping%20data%20analysis%20and%20customer%20journey%20mapping%2C%20purchase%20decision%20study%2C%20clean%20white%20background%20with%20red%20consumer%20insight%20elements%2C%20retail%20research%20atmosphere%2C%20minimalist%20photography&width=600&height=400&seq=usecase-behavior-001&orientation=landscape',
      icon: 'ri-shopping-cart-line'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=professional%20marketing%20survey%20research%20with%20questionnaire%20forms%20and%20data%20collection%20tools%20on%20modern%20desk%2C%20business%20analyst%20conducting%20customer%20survey%2C%20clean%20white%20background%20with%20red%20survey%20elements%20and%20statistical%20charts%2C%20corporate%20research%20atmosphere%2C%20minimalist%20business%20photography%20style&width=1920&height=1080&seq=hero-enquetes-001&orientation=landscape"
            alt="Enquêtes Marketing"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Enquêtes Marketing
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
            Collectez des données précieuses directement auprès de votre cible pour prendre des décisions marketing éclairées et performantes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              onClick={scrollToContact}
              className="px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg whitespace-nowrap cursor-pointer"
            >
              Demander un Devis
            </button>
            <button
              type="button"
              onClick={handleServicesClick}
              className="px-10 py-5 bg-white hover:bg-gray-100 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg whitespace-nowrap cursor-pointer"
            >
              Tous Nos Services
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-4xl font-bold text-red-500 mb-2">92%</div>
              <div className="text-sm">Des entreprises qui utilisent des enquêtes améliorent leur satisfaction client</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-4xl font-bold text-red-500 mb-2">5x</div>
              <div className="text-sm">ROI moyen des décisions basées sur des données d'enquêtes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-4xl font-bold text-red-500 mb-2">70%</div>
              <div className="text-sm">Des innovations réussies proviennent d'insights clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Explanation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                Pourquoi réaliser des enquêtes marketing ?
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Dans un environnement concurrentiel, <strong>comprendre votre client est la clé du succès</strong>. Les enquêtes marketing vous permettent de collecter des données primaires directement auprès de votre cible pour valider vos hypothèses, mesurer la satisfaction, tester des concepts et affiner votre stratégie.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Chez Dakar Marketing, nous concevons et administrons des <strong>enquêtes scientifiquement rigoureuses</strong> qui vous fournissent des insights actionnables pour optimiser votre offre, votre communication et votre positionnement.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nos enquêtes combinent <strong>méthodologie académique et pragmatisme business</strong> pour vous livrer des résultats fiables à un coût accessible.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=marketing%20research%20team%20analyzing%20survey%20results%20with%20data%20visualization%20on%20large%20screen%2C%20professional%20data%20analysis%20meeting%2C%20clean%20white%20background%20with%20red%20data%20charts%20and%20graphs%2C%20modern%20office%20setting%2C%20minimalist%20business%20photography&width=700&height=500&seq=explanation-enquetes-001&orientation=landscape"
                alt="Enquêtes Marketing"
                className="w-full h-full object-cover object-top rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problems Solved */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Les problèmes que nous résolvons
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nos enquêtes marketing vous aident à surmonter les défis majeurs de la connaissance client
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-lg mb-6">
                  <i className={`${problem.icon} text-3xl text-red-600`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Ce qui est inclus dans nos enquêtes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Un service complet de la conception à la restitution des résultats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prestations.map((prestation, _) => (
              <div
                key={prestation.title}
                className="bg-gray-50 rounded-lg p-8 hover:bg-red-50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <i className={`${prestation.icon} text-2xl text-white`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black group-hover:text-red-600 transition-colors">
                      {prestation.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{prestation.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Notre méthodologie d'enquête
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Un processus rigoureux en 6 étapes pour des résultats fiables
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methodology.map((step, _) => (
              <div
                key={step.title}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 text-8xl font-bold text-red-50 group-hover:text-red-100 transition-colors">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-lg mb-6">
                    <i className={`${step.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-black">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Les résultats que vous obtenez
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des bénéfices concrets et mesurables pour votre entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result) => (
              <div
                key={result.title}
                className="bg-gray-50 rounded-lg p-8 hover:bg-red-50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${result.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black group-hover:text-red-600 transition-colors">
                  {result.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Cas d'usage de nos enquêtes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des enquêtes adaptées à vos besoins spécifiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 flex items-center justify-center bg-red-600 rounded-lg">
                    <i className={`${useCase.icon} text-3xl text-white`}></i>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-red-600 transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à collecter des insights précieux ?
          </h2>
          <p className="text-xl mb-8 text-gray-300 leading-relaxed">
            Nos enquêtes marketing vous fournissent les données dont vous avez besoin pour prendre des décisions éclairées et performantes.
          </p>
          <button
            type="button"
            onClick={scrollToContact}
            className="px-12 py-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg whitespace-nowrap cursor-pointer"
          >
            Demander un Devis Gratuit
          </button>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="flex items-start gap-4">
              <i className="ri-checkbox-circle-fill text-3xl text-red-500 flex-shrink-0"></i>
              <div>
                <div className="font-bold mb-1">Méthodologie rigoureuse</div>
                <div className="text-sm text-gray-400">Approche scientifique validée</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <i className="ri-checkbox-circle-fill text-3xl text-red-500 flex-shrink-0"></i>
              <div>
                <div className="font-bold mb-1">Tarifs accessibles</div>
                <div className="text-sm text-gray-400">Qualité junior entreprise</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <i className="ri-checkbox-circle-fill text-3xl text-red-500 flex-shrink-0"></i>
              <div>
                <div className="font-bold mb-1">Résultats actionnables</div>
                <div className="text-sm text-gray-400">Recommandations concrètes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
