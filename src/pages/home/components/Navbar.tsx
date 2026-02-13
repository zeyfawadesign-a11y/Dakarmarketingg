import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/e700a18cffcea58ea17368f452ebcf3d.png" 
              alt="Dakar Marketing" 
              className="h-12"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium transition-colors whitespace-nowrap ${
              isScrolled ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-red-400'
            }`}>
              Accueil
            </Link>
            <Link to="/a-propos" className={`font-medium transition-colors whitespace-nowrap ${
              isScrolled ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-red-400'
            }`}>
              À Propos
            </Link>
            <Link to="/nos-services" className={`font-medium transition-colors whitespace-nowrap ${
              isScrolled ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-red-400'
            }`}>
              Services
            </Link>
            <Link to="/etudes-realisees" className={`font-medium transition-colors whitespace-nowrap ${
              isScrolled ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-red-400'
            }`}>
              Études Réalisées
            </Link>
            <Link 
              to="/demande-devis" 
              className="bg-white text-red-600 px-6 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors whitespace-nowrap shadow-md"
            >
              Demander un Devis
            </Link>
          </div>

          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}></i>
          </button>
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-4 py-4 bg-white rounded-lg shadow-lg">
            <Link 
              to="/" 
              onClick={closeMobileMenu}
              className="px-6 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link 
              to="/a-propos" 
              onClick={closeMobileMenu}
              className="px-6 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors font-medium"
            >
              À Propos
            </Link>
            <Link 
              to="/nos-services" 
              onClick={closeMobileMenu}
              className="px-6 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors font-medium"
            >
              Services
            </Link>
            <Link 
              to="/etudes-realisees" 
              onClick={closeMobileMenu}
              className="px-6 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors font-medium"
            >
              Études Réalisées
            </Link>
            <Link 
              to="/demande-devis" 
              onClick={closeMobileMenu}
              className="mx-6 bg-red-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-red-700 transition-colors text-center whitespace-nowrap"
            >
              Demander un Devis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}