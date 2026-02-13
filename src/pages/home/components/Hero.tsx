
import { trackCTAClick } from '../../../utils/analytics';

export default function Hero() {

  const handleContactClick = () => {
    trackCTAClick('Nous Contacter', 'Hero Section');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChatbotClick = () => {
    trackCTAClick('Parler à un Conseiller', 'Hero Section');
    const chatButton = document.querySelector('[data-chatbot-toggle]') as HTMLElement;
    if (chatButton) {
      chatButton.click();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20professional%20marketing%20office%20workspace%20with%20red%20accents%20and%20clean%20minimalist%20design%20featuring%20contemporary%20furniture%20large%20windows%20natural%20lighting%20and%20sophisticated%20business%20atmosphere%20with%20subtle%20red%20white%20black%20color%20scheme%20creating%20premium%20corporate%20environment&width=1920&height=1080&seq=hero-bg-001&orientation=landscape"
          alt="Dakar Marketing Hero"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center text-white w-full">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
          Dakar Marketing
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl mb-4 sm:mb-8 font-light">
          Junior entreprise leader en consultance marketing au Sénégal
        </p>
        <p className="text-sm sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto opacity-90 px-2">
          Des solutions marketing innovantes, efficaces et à faible coût pour propulser votre entreprise vers le succès
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-16 px-4">
          <button
            onClick={handleContactClick}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer text-sm sm:text-base"
          >
            Nous Contacter
          </button>
          <button
            onClick={handleChatbotClick}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <i className="ri-customer-service-2-line text-lg sm:text-xl"></i>
            Parler à un Conseiller
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-8 max-w-4xl mx-auto px-2">
          <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-6 rounded-lg">
            <div className="text-2xl sm:text-4xl font-bold text-red-500 mb-1 sm:mb-2">10+</div>
            <div className="text-xs sm:text-sm uppercase tracking-wide">Années d'Expérience</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-6 rounded-lg">
            <div className="text-2xl sm:text-4xl font-bold text-red-500 mb-1 sm:mb-2">100+</div>
            <div className="text-xs sm:text-sm uppercase tracking-wide">Projets Réalisés</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-6 rounded-lg">
            <div className="text-2xl sm:text-4xl font-bold text-red-500 mb-1 sm:mb-2">50+</div>
            <div className="text-xs sm:text-sm uppercase tracking-wide">Clients Satisfaits</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <i className="ri-arrow-down-line text-white text-3xl"></i>
      </div>
    </section>
  );
}
