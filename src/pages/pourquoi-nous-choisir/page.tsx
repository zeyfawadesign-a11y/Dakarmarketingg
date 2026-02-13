import { Link } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import { useEffect } from 'react';
import { trackPageView } from '../../utils/analytics';

export default function WhyChooseUsPage() {
  useEffect(() => {
    trackPageView();
  }, []);

  const advantages = [
    {
      icon: 'ri-medal-line',
      title: 'Expertise Académique',
      description: 'Étudiants formés aux dernières méthodologies marketing et recherche',
      stat: '10+ ans',
      statLabel: "d'expérience"
    },
    {
      icon: 'ri-price-tag-3-line',
      title: 'Tarifs Accessibles',
      description: 'Qualité professionnelle à des prix adaptés aux PME et startups',
      stat: '-60%',
      statLabel: 'vs cabinets classiques'
    },
    {
      icon: 'ri-time-line',
      title: 'Réactivité',
      description: 'Équipe disponible et délais de livraison respectés',
      stat: '48h',
      statLabel: 'délai de réponse'
    },
    {
      icon: 'ri-bar-chart-box-line',
      title: 'Résultats Mesurables',
      description: 'Données concrètes et recommandations actionnables',
      stat: '95%',
      statLabel: 'clients satisfaits'
    },
    {
      icon: 'ri-team-line',
      title: 'Accompagnement Personnalisé',
      description: 'Un chef de projet dédié pour chaque mission',
      stat: '100%',
      statLabel: 'suivi personnalisé'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Confidentialité Garantie',
      description: 'Protection totale de vos données et projets stratégiques',
      stat: 'NDA',
      statLabel: 'systématique'
    }
  ];

  const differentiators = [
    {
      title: 'Méthodologie Rigoureuse',
      description: 'Nous appliquons les standards académiques les plus élevés à chaque projet',
      points: [
        'Protocoles de recherche validés scientifiquement',
        'Échantillonnage représentatif et statistiquement significatif',
        'Analyses quantitatives et qualitatives approfondies',
        'Rapports détaillés avec recommandations stratégiques'
      ]
    },
    {
      title: 'Innovation & Créativité',
      description: 'Une approche fraîche et innovante portée par de jeunes talents',
      points: [
        'Veille constante des tendances marketing',
        'Outils digitaux de dernière génération',
        'Perspectives nouvelles sur votre marché',
        'Solutions créatives adaptées au contexte sénégalais'
      ]
    },
    {
      title: 'Connaissance du Marché Local',
      description: 'Une expertise unique du marché sénégalais et ouest-africain',
      points: [
        'Compréhension profonde des comportements consommateurs locaux',
        'Réseau étendu pour collecte de données terrain',
        'Adaptation culturelle des méthodologies',
        'Insights spécifiques au contexte africain'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Amadou Diop',
      company: 'Startup Tech Dakar',
      text: "Grâce à l'étude de marché réalisée par Dakar Marketing, nous avons pu valider notre concept et lever 50M FCFA. Leur professionnalisme et leur réactivité ont fait toute la différence.",
      rating: 5
    },
    {
      name: 'Fatou Sall',
      company: 'Boutique Mode & Style',
      text: "L'enquête de satisfaction client nous a permis d'identifier précisément les attentes de notre clientèle. Nos ventes ont augmenté de 40% en 6 mois !",
      rating: 5
    },
    {
      name: 'Moussa Kane',
      company: 'Restaurant Le Palmier',
      text: "Le business plan élaboré par l'équipe était complet et convaincant. Nous avons obtenu notre financement bancaire sans difficulté. Je recommande vivement !",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-red-600 via-red-700 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Pourquoi Choisir <span className="text-white">Dakar Marketing</span> ?
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              La première junior entreprise commerciale du Sénégal qui combine excellence académique, 
              innovation et tarifs accessibles pour propulser votre business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#contact"
                className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap cursor-pointer"
              >
                Demander un Devis
              </a>
              <Link 
                to="/nos-services"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-all whitespace-nowrap"
              >
                Découvrir Nos Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nos Avantages Compétitifs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ce qui fait de Dakar Marketing le partenaire idéal pour vos projets marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                  <i className={`${advantage.icon} text-3xl text-red-600 group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{advantage.description}</p>
                <div className="pt-6 border-t border-gray-200">
                  <div className="text-3xl font-bold text-red-600 mb-1">{advantage.stat}</div>
                  <div className="text-sm text-gray-500">{advantage.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ce Qui Nous Différencie
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre approche unique combine rigueur académique et pragmatisme business
            </p>
          </div>

          <div className="space-y-12">
            {differentiators.map((diff, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 lg:p-12 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{diff.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{diff.description}</p>
                  </div>
                  <div>
                    <ul className="space-y-4">
                      {diff.points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <i className="ri-checkbox-circle-fill text-red-600 text-xl mr-3 mt-1"></i>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ils Nous Font Confiance
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-xl animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400 text-xl"></i>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="pt-6 border-t border-gray-700">
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Prêt à Propulser Votre Business ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Rejoignez les dizaines d'entreprises qui nous font confiance pour leurs projets marketing
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#contact"
                className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap cursor-pointer"
              >
                Demander un Devis Gratuit
              </a>
              <button
                onClick={() => document.querySelector('#vapi-widget-floating-button')?.dispatchEvent(new Event('click'))}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-all whitespace-nowrap cursor-pointer"
              >
                <i className="ri-phone-line mr-2"></i>
                Parler à un Conseiller
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
