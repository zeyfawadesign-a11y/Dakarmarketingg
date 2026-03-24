import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import { useEffect, useState } from 'react';
import { trackPageView } from '../../utils/analytics';
// Supabase removed - using mock data instead

interface CaseStudy {
  id: string;
  title: string;
  client_name: string;
  industry: string;
  service_type: string;
  challenge: string;
  solution: string;
  results: string;
  image_url: string;
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView();
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      // TODO: Replace with MongoDB API call if needed for dynamic case studies
      // For now, using static mock data
      setCaseStudies(mockCaseStudies);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Tous', 'Étude de Marché', 'Business Plan', 'Enquête Marketing', 'Satisfaction Client'];

  const mockCaseStudies = [
    {
      id: '1',
      title: 'Lancement Réussi d\'une Application de Livraison',
      client_name: 'QuickDeliver',
      industry: 'Tech & Logistique',
      service_type: 'Étude de Marché',
      challenge: 'Une startup souhaitait lancer une application de livraison à Dakar mais ne connaissait pas précisément les attentes des consommateurs locaux ni la concurrence existante.',
      solution: 'Nous avons réalisé une étude de marché complète incluant 500 interviews consommateurs, une analyse concurrentielle détaillée et une étude de faisabilité économique.',
      results: 'Validation du concept avec 78% d\'intention d\'utilisation, identification de 3 segments clients prioritaires, recommandations stratégiques ayant permis une levée de fonds de 75M FCFA.',
      image_url: 'https://readdy.ai/api/search-image?query=modern%20african%20delivery%20app%20interface%20with%20smartphone%20showing%20food%20delivery%20application%20in%20urban%20dakar%20setting%2C%20professional%20business%20photography%2C%20clean%20minimalist%20design%20with%20red%20and%20black%20accents%2C%20high%20quality%20commercial%20photo&width=800&height=600&seq=casestudy1&orientation=landscape'
    },
    {
      id: '2',
      title: 'Repositionnement d\'une Chaîne de Restaurants',
      client_name: 'Les Saveurs d\'Afrique',
      industry: 'Restauration',
      service_type: 'Enquête Marketing',
      challenge: 'Une chaîne de 5 restaurants constatait une baisse de fréquentation de 30% et ne comprenait pas les raisons de cette désaffection.',
      solution: 'Enquête de satisfaction auprès de 300 clients actuels et anciens clients, mystery shopping dans les 5 établissements, analyse des avis en ligne et benchmark concurrentiel.',
      results: 'Identification de 7 points d\'amélioration prioritaires, mise en place d\'un plan d\'action, augmentation de 45% de la satisfaction client et retour à la croissance avec +25% de fréquentation en 6 mois.',
      image_url: 'https://readdy.ai/api/search-image?query=elegant%20african%20restaurant%20interior%20with%20modern%20design%2C%20customers%20dining%20in%20upscale%20setting%2C%20warm%20lighting%20and%20contemporary%20african%20decor%2C%20professional%20hospitality%20photography%2C%20sophisticated%20ambiance&width=800&height=600&seq=casestudy2&orientation=landscape'
    },
    {
      id: '3',
      title: 'Financement Bancaire pour une Entreprise Agricole',
      client_name: 'AgroTech Sénégal',
      industry: 'Agriculture',
      service_type: 'Business Plan',
      challenge: 'Un entrepreneur agricole avait besoin d\'un financement de 150M FCFA pour développer une unité de transformation mais sa demande était systématiquement refusée par les banques.',
      solution: 'Élaboration d\'un business plan complet et professionnel incluant étude de marché, plan opérationnel détaillé, projections financières sur 5 ans et analyse de rentabilité.',
      results: 'Obtention du financement bancaire de 150M FCFA, création de 25 emplois, démarrage de l\'activité dans les délais prévus et rentabilité atteinte dès la 2ème année.',
      image_url: 'https://readdy.ai/api/search-image?query=modern%20agricultural%20facility%20in%20senegal%20with%20processing%20equipment%2C%20professional%20workers%20in%20clean%20environment%2C%20high-tech%20farming%20operation%2C%20bright%20natural%20lighting%2C%20business%20success%20photography&width=800&height=600&seq=casestudy3&orientation=landscape'
    },
    {
      id: '4',
      title: 'Expansion Régionale d\'une Marque de Cosmétiques',
      client_name: 'BeautyNature',
      industry: 'Cosmétiques',
      service_type: 'Étude de Marché',
      challenge: 'Une marque de cosmétiques naturels sénégalaise voulait s\'étendre dans 3 pays de la sous-région mais manquait de données sur ces marchés.',
      solution: 'Étude de marché multi-pays (Mali, Côte d\'Ivoire, Guinée) incluant analyse de la demande, étude de la distribution, benchmark prix et identification des partenaires potentiels.',
      results: 'Stratégie d\'expansion validée, identification de 12 distributeurs qualifiés, lancement réussi dans les 3 pays avec 2000 points de vente en 18 mois et CA export de 180M FCFA.',
      image_url: 'https://readdy.ai/api/search-image?query=luxury%20african%20natural%20cosmetics%20products%20display%2C%20elegant%20packaging%20with%20natural%20ingredients%2C%20professional%20product%20photography%2C%20clean%20white%20background%20with%20green%20botanical%20elements%2C%20premium%20beauty%20brand%20aesthetic&width=800&height=600&seq=casestudy4&orientation=landscape'
    },
    {
      id: '5',
      title: 'Optimisation de l\'Expérience Client d\'une Banque',
      client_name: 'Banque Digitale Plus',
      industry: 'Services Financiers',
      service_type: 'Satisfaction Client',
      challenge: 'Une banque digitale recevait de nombreuses plaintes clients mais ne parvenait pas à identifier les problèmes structurels de son service.',
      solution: 'Enquête de satisfaction multi-canal (app, web, agences) auprès de 1000 clients, analyse du parcours client, identification des points de friction et recommandations d\'amélioration.',
      results: 'Score de satisfaction passé de 62% à 89%, réduction de 70% des plaintes, amélioration du NPS de 35 points, distinction "Meilleure Banque Digitale" obtenue.',
      image_url: 'https://readdy.ai/api/search-image?query=modern%20african%20bank%20branch%20with%20digital%20banking%20interface%2C%20happy%20customers%20using%20mobile%20banking%20app%2C%20contemporary%20financial%20services%2C%20professional%20banking%20environment%2C%20technology%20and%20finance&width=800&height=600&seq=casestudy5&orientation=landscape'
    },
    {
      id: '6',
      title: 'Validation de Concept pour une Plateforme E-learning',
      client_name: 'EduConnect',
      industry: 'EdTech',
      service_type: 'Étude de Marché',
      challenge: 'Des entrepreneurs voulaient lancer une plateforme de formation en ligne mais doutaient de la viabilité du modèle économique au Sénégal.',
      solution: 'Étude de marché approfondie incluant 400 interviews étudiants et professionnels, test de concept, analyse de la disposition à payer et étude de la concurrence.',
      results: 'Validation du concept avec 82% d\'intérêt, identification du pricing optimal (15 000 FCFA/mois), recommandations ayant permis 5000 inscriptions en 6 mois.',
      image_url: 'https://readdy.ai/api/search-image?query=african%20students%20using%20e-learning%20platform%20on%20laptops%20and%20tablets%2C%20modern%20educational%20technology%2C%20bright%20classroom%20setting%2C%20engaged%20learners%20with%20digital%20devices%2C%20professional%20education%20photography&width=800&height=600&seq=casestudy6&orientation=landscape'
    }
  ];

  const displayStudies = caseStudies.length > 0 ? caseStudies : mockCaseStudies;
  
  const filteredStudies = selectedCategory === 'Tous' 
    ? displayStudies 
    : displayStudies.filter(study => study.service_type === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-black to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nos <span className="text-red-500">Études Réalisées</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Découvrez comment nous avons aidé des dizaines d'entreprises à atteindre leurs objectifs 
              grâce à nos études marketing et business plans professionnels.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-red-500 mb-2">150+</div>
                <div className="text-gray-400">Études Réalisées</div>
              </div>
              <div className="w-px bg-gray-700"></div>
              <div>
                <div className="text-4xl font-bold text-red-500 mb-2">95%</div>
                <div className="text-gray-400">Clients Satisfaits</div>
              </div>
              <div className="w-px bg-gray-700"></div>
              <div>
                <div className="text-4xl font-bold text-red-500 mb-2">12</div>
                <div className="text-gray-400">Secteurs d'Activité</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-12 bg-gray-50 sticky top-20 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <i className="ri-loader-4-line text-4xl text-red-600 animate-spin"></i>
              <p className="text-gray-600 mt-4">Chargement des études...</p>
            </div>
          ) : filteredStudies.length === 0 ? (
            <div className="text-center py-20">
              <i className="ri-folder-open-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">Aucune étude trouvée dans cette catégorie</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={study.image_url} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                      {study.service_type}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <i className="ri-building-line mr-2"></i>
                        {study.client_name}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-pie-chart-line mr-2"></i>
                        {study.industry}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{study.title}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-red-600 mb-2 flex items-center">
                          <i className="ri-error-warning-line mr-2"></i>
                          Défi
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-red-600 mb-2 flex items-center">
                          <i className="ri-lightbulb-line mr-2"></i>
                          Solution
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                      </div>
                      
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-bold text-red-600 mb-2 flex items-center">
                          <i className="ri-trophy-line mr-2"></i>
                          Résultats
                        </h4>
                        <p className="text-gray-700 leading-relaxed font-medium">{study.results}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Votre Projet Sera Notre Prochaine Success Story
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Discutons de vos besoins et créons ensemble votre réussite
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/demande-devis"
                className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap"
              >
                Demander un Devis
              </Link>
              <Link 
                to="/nos-services"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-all whitespace-nowrap"
              >
                Voir Nos Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
