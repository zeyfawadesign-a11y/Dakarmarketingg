import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Amadou Diallo',
    role: 'Fondateur',
    company: 'TechSen Solutions',
    image: 'https://readdy.ai/api/search-image?query=professional%20african%20businessman%20portrait%20headshot%20in%20formal%20attire%20confident%20smile%20clean%20white%20background%20corporate%20photography%20high%20quality&width=200&height=200&seq=testimonial-001&orientation=squarish',
    content: 'Dakar Marketing a transformé notre vision en un business plan solide qui nous a permis de lever 50 millions FCFA. Leur expertise et leur professionnalisme sont remarquables.',
    rating: 5
  },
  {
    name: 'Fatou Sow',
    role: 'Directrice Générale',
    company: 'Sow Import-Export',
    image: 'https://readdy.ai/api/search-image?query=professional%20african%20businesswoman%20portrait%20headshot%20elegant%20attire%20confident%20expression%20clean%20white%20background%20corporate%20photography%20high%20quality&width=200&height=200&seq=testimonial-002&orientation=squarish',
    content: 'L\'étude de marché réalisée par Dakar Marketing nous a ouvert les yeux sur des opportunités que nous n\'avions pas identifiées. Un travail rigoureux et des recommandations actionnables.',
    rating: 5
  },
  {
    name: 'Moussa Ndiaye',
    role: 'CEO',
    company: 'Ndiaye Agro',
    image: 'https://readdy.ai/api/search-image?query=professional%20african%20male%20entrepreneur%20portrait%20headshot%20business%20casual%20confident%20smile%20clean%20white%20background%20corporate%20photography%20high%20quality&width=200&height=200&seq=testimonial-003&orientation=squarish',
    content: 'Grâce à leur enquête marketing, nous avons pu repositionner notre offre et augmenter nos ventes de 40% en 6 mois. Je recommande vivement leurs services.',
    rating: 5
  },
  {
    name: 'Aissatou Ba',
    role: 'Fondatrice',
    company: 'Ba Cosmetics',
    image: 'https://readdy.ai/api/search-image?query=professional%20african%20woman%20entrepreneur%20portrait%20headshot%20modern%20style%20confident%20expression%20clean%20white%20background%20corporate%20photography%20high%20quality&width=200&height=200&seq=testimonial-004&orientation=squarish',
    content: 'Une équipe jeune, dynamique et très professionnelle. Leur business plan m\'a permis de convaincre ma banque pour un prêt de démarrage. Merci Dakar Marketing !',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ce que Disent Nos Clients
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de ceux qui nous ont fait confiance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400 text-xl"></i>
                ))}
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-8 bg-white rounded-2xl px-6 sm:px-10 py-6 shadow-lg">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-red-600">150+</div>
              <div className="text-xs sm:text-sm text-gray-600">Projets Réalisés</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
            <div className="w-24 h-px sm:hidden bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-red-600">95%</div>
              <div className="text-xs sm:text-sm text-gray-600">Clients Satisfaits</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
            <div className="w-24 h-px sm:hidden bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-red-600">10+</div>
              <div className="text-xs sm:text-sm text-gray-600">Années d'Expérience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
