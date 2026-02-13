
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export default function Services() {
  const navigate = useNavigate();

  const safeNavigate = useCallback(
    (path: string) => {
      try {
        if (typeof path === 'string' && path.trim()) {
          navigate(path);
        }
      } catch (err) {
        console.error('Navigation error:', err);
      }
    },
    [navigate]
  );

  const services = [
    {
      icon: 'ri-file-text-line',
      title: 'Business Plan',
      description: 'Élaborez un business plan solide et convaincant qui séduit investisseurs et partenaires.',
      image: 'https://readdy.ai/api/search-image?query=professional%20business%20plan%20document%20with%20financial%20charts%20and%20strategic%20planning%20materials%20on%20modern%20desk%2C%20entrepreneur%20reviewing%20business%20strategy%2C%20clean%20white%20background%20with%20red%20accent%20elements%2C%20corporate%20professional%20atmosphere%2C%20minimalist%20business%20photography&width=600&height=400&seq=service-bp-001&orientation=landscape',
      link: '/services/business-plan'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Études de Marché',
      description: 'Comprenez votre marché en profondeur grâce à nos analyses rigoureuses et données fiables.',
      image: 'https://readdy.ai/api/search-image?query=market%20research%20analysis%20with%20data%20charts%20and%20statistics%20on%20laptop%20screen%2C%20business%20analyst%20reviewing%20market%20trends%2C%20clean%20white%20background%20with%20red%20data%20visualization%2C%20professional%20corporate%20setting%2C%20minimalist%20photography&width=600&height=400&seq=service-mr-001&orientation=landscape',
      link: '/services/etudes-de-marche'
    },
    {
      icon: 'ri-survey-line',
      title: 'Enquêtes Marketing',
      description: 'Collectez des insights précieux directement auprès de votre cible pour affiner votre stratégie.',
      image: 'https://readdy.ai/api/search-image?query=marketing%20survey%20and%20customer%20feedback%20collection%20with%20questionnaire%20forms%20and%20tablet%20device%2C%20professional%20conducting%20market%20survey%2C%20clean%20white%20background%20with%20red%20survey%20elements%2C%20business%20research%20atmosphere%2C%20minimalist%20photography&width=600&height=400&seq=service-survey-001&orientation=landscape',
      link: '/services/enquetes-marketing'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-black">
            Nos Services
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Des solutions marketing complètes et personnalisées pour répondre à tous vos besoins
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-48 sm:h-64 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-red-600 rounded-lg">
                  <i className={`${service.icon} text-2xl sm:text-3xl text-white`}></i>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-black group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
                <button
                  type="button"
                  onClick={() => safeNavigate(service.link)}
                  className="text-red-600 font-semibold hover:text-red-700 transition-colors whitespace-nowrap inline-flex items-center cursor-pointer text-sm sm:text-base"
                >
                  En savoir plus
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button
            type="button"
            onClick={() => safeNavigate('/nos-services')}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer text-sm sm:text-base"
          >
            Découvrir Tous Nos Services
          </button>
        </div>
      </div>
    </section>
  );
}
