
import { usePageTracking } from '../../hooks/usePageTracking';
import { trackCTAClick } from '../../utils/analytics';
import { motion } from 'framer-motion';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import Newsletter from '../../components/feature/Newsletter';
import Testimonials from '../home/components/Testimonials';

export default function AboutPage() {
  usePageTracking();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              À Propos de Dakar Marketing
            </h1>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Première junior entreprise commerciale du Sénégal, pionnière en consultance marketing depuis 2014
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src="https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/2bb1690b5a94f339e4b69b4f9e74b603.jpeg"
                alt="BEM Dakar"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Notre Histoire
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  <strong className="text-red-600">Dakar Marketing</strong> a été créée en <strong>2014</strong> par les étudiants de <strong>BEM Dakar</strong> (Business et Management), l'une des écoles de commerce les plus prestigieuses du Sénégal.
                </p>
                <p>
                  En tant que <strong>première junior entreprise commerciale du Sénégal</strong>, nous avons ouvert la voie à une nouvelle génération de consultants marketing, combinant excellence académique et expertise pratique.
                </p>
                <p>
                  Nous fonctionnons comme un véritable <strong>cabinet de conseil marketing</strong>, offrant à nos clients des services professionnels tout en permettant aux étudiants de développer leurs compétences dans un environnement réel.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-12 text-white shadow-2xl"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <i className="ri-target-line text-4xl text-white"></i>
              </div>
              <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Notre Mission
              </h3>
              <p className="text-lg leading-relaxed text-white/95">
                Offrir des services de consultance marketing <strong>innovants, efficaces et à faible coût</strong> aux entreprises sénégalaises et internationales, tout en formant la prochaine génération de leaders marketing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-12 text-white shadow-2xl"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <i className="ri-eye-line text-4xl text-white"></i>
              </div>
              <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Notre Vision
              </h3>
              <p className="text-lg leading-relaxed text-white/95">
                Devenir le <strong>leader des juniors entreprises en consultance marketing au Sénégal</strong> et un acteur incontournable du développement économique de la région.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-12 lg:p-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              Pourquoi Choisir Dakar Marketing ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-medal-line text-3xl text-white"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Expertise Reconnue</h4>
                <p className="text-gray-600">
                  Plus de 10 ans d'expérience et des dizaines de projets réussis
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-price-tag-3-line text-3xl text-white"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Tarifs Compétitifs</h4>
                <p className="text-gray-600">
                  Des services de qualité à des prix accessibles pour toutes les entreprises
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-team-line text-3xl text-white"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Équipe Dynamique</h4>
                <p className="text-gray-600">
                  Des consultants jeunes, créatifs et formés aux dernières tendances
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-lightbulb-flash-line text-3xl text-white"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Approche Innovante</h4>
                <p className="text-gray-600">
                  Des solutions créatives adaptées aux réalités du marché sénégalais
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-time-line text-3xl text-white"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Réactivité</h4>
                <p className="text-gray-600">
                  Des délais respectés et une disponibilité constante pour nos clients
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-check-line text-3xl text-white"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Qualité Garantie</h4>
                <p className="text-gray-600">
                  Un engagement total envers l'excellence et la satisfaction client
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Newsletter variant="light" showTitle={true} />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
