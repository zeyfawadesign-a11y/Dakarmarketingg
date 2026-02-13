
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Logo et Description */}
          <div className="text-center sm:text-left">
            <img 
              src="https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/0e789853a84899bd777f9f2b0f6da08d.png" 
              alt="Dakar Marketing" 
              className="h-10 sm:h-12 mb-4 mx-auto sm:mx-0"
            />
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Junior entreprise de BEM Dakar, spécialisée en études de marché et consultance marketing stratégique.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-6 justify-center sm:justify-start">
              <a 
                href="https://www.linkedin.com/company/dakar-marketing/" 
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
              >
                <i className="ri-linkedin-fill text-base sm:text-lg"></i>
              </a>
              <a 
                href="https://www.instagram.com/dakar_marketing?igsh=b3RmZG5yb2I0aW83" 
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
              >
                <i className="ri-instagram-line text-base sm:text-lg"></i>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Navigation</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/nos-services" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/etudes-realisees" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  Études Réalisées
                </Link>
              </li>
            </ul>
          </div>

          {/* Services et Légal */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <li>
                <Link to="/services/etudes-de-marche" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  Études de Marché
                </Link>
              </li>
              <li>
                <Link to="/services/business-plan" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  Business Plan
                </Link>
              </li>
              <li>
                <Link to="/services/enquetes-marketing" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  Enquêtes Marketing
                </Link>
              </li>
            </ul>
            
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Légal</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/mentions-legales" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  Politique de Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © 2025 Dakar Marketing. Tous droits réservés.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Powered by zeyfawadesign
          </p>
        </div>
      </div>
    </footer>
  );
}
