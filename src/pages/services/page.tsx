import { usePageTracking } from '../../hooks/usePageTracking';
import { trackCTAClick } from '../../utils/analytics';
import { motion } from 'framer-motion';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    icon: 'ri-file-text-line',
    title: 'Conception et Création de Business Plan',
    description: 'Élaborez un business plan solide et convaincant qui séduit investisseurs et partenaires. Nous structurons votre vision en un document professionnel avec analyses financières, études de marché et stratégies de croissance.',
    features: ['Analyse financière complète', 'Étude de marché approfondie', 'Stratégie de croissance', 'Présentation investisseurs'],
    link: '/services/business-plan'
  },
  {
    icon: 'ri-line-chart-line',
    title: 'Études de Marché',
    description: 'Comprenez votre marché en profondeur grâce à nos analyses rigoureuses. Nous identifions les opportunités, évaluons la concurrence et vous fournissons les données essentielles pour prendre des décisions éclairées.',
    features: ['Analyse de la concurrence', 'Segmentation clientèle', 'Tendances du marché', 'Recommandations stratégiques'],
    link: '/services/etudes-de-marche'
  },
  {
    icon: 'ri-survey-line',
    title: 'Enquêtes Marketing',
    description: 'Collectez des insights précieux directement auprès de votre cible. Nos enquêtes sur mesure vous révèlent les attentes, comportements et préférences de vos clients pour affiner votre stratégie marketing.',
    features: ['Conception de questionnaires', 'Collecte de données terrain', 'Analyse statistique', 'Rapports détaillés'],
    link: '/services/enquetes-marketing'
  }
];

export default function ServicesPage() {
  usePageTracking();
  const navigate = useNavigate();

  const handleServiceClick = (serviceName: string, link: string) => {
    trackCTAClick(`En Savoir Plus - ${serviceName}`, 'Services Page');
    navigate(link);
  };

  const handleContactClick = () => {
    trackCTAClick('Obtenir une Consultation Gratuite', 'Services Page CTA');
    navigate('/demande-devis');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Nos Services
            </h1>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des solutions de consultance marketing complètes pour propulser votre entreprise vers le succès
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className={`${service.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <i className="ri-check-line text-red-600 text-xl mr-3"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleServiceClick(service.title, service.link)}
                  className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-red-600 transition-all whitespace-nowrap cursor-pointer"
                >
                  En Savoir Plus
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Notre Processus de Travail
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour garantir votre succès
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Nous écoutons vos besoins et analysons votre situation', icon: 'ri-discuss-line' },
              { step: '02', title: 'Stratégie', desc: 'Nous élaborons une approche personnalisée et adaptée', icon: 'ri-lightbulb-line' },
              { step: '03', title: 'Exécution', desc: 'Nous mettons en œuvre les solutions avec rigueur', icon: 'ri-tools-line' },
              { step: '04', title: 'Suivi', desc: 'Nous assurons un accompagnement continu et des ajustements', icon: 'ri-line-chart-line' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${item.icon} text-4xl text-white`}></i>
                </div>
                <div className="text-5xl font-bold text-red-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Contactez-nous dès maintenant pour une consultation gratuite et découvrez comment nous pouvons vous aider.
            </p>
            <button 
              onClick={handleContactClick}
              className="inline-block px-10 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
            >
              Obtenir une Consultation Gratuite
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
