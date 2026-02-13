
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function MentionsLegalesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Mentions Légales
            </h1>
            <p className="text-lg text-gray-600">
              Informations légales et responsabilités
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-10">
            {/* Identification */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Identification
                </h2>
              </div>
              <div className="pl-13 space-y-3 text-gray-700 leading-relaxed">
                <p><strong>Nom :</strong> Dakar Marketing</p>
                <p><strong>Statut :</strong> Junior entreprise / Association</p>
                <p><strong>Établissement :</strong> BEM Dakar (Business et Management)</p>
                <p><strong>Spécialité :</strong> Consultance marketing et études de marché</p>
                <p className="text-gray-600 italic mt-4">
                  Dakar Marketing est la première junior entreprise commerciale du Sénégal, spécialisée dans la consultance marketing depuis 2014.
                </p>
              </div>
            </section>

            {/* Responsable de publication */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-star-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Responsable de Publication
                </h2>
              </div>
              <div className="pl-13 space-y-3 text-gray-700 leading-relaxed">
                <p><strong>Organisation :</strong> Dakar Marketing</p>
                <p><strong>Fonction :</strong> Président et Direction</p>
                <p><strong>Email :</strong> <a href="mailto:juniorentreprise@bem.sn" className="text-red-600 hover:text-red-700 underline cursor-pointer">juniorentreprise@bem.sn</a></p>
              </div>
            </section>

            {/* Adresse */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-map-pin-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Adresse
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed">
                <p>Sacré Coeur 2, Pyrotechnie</p>
                <p>Fann, Dakar</p>
                <p>Sénégal</p>
              </div>
            </section>

            {/* Hébergement */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-server-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Hébergement du Site
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed">
                <p>Le site est hébergé par <strong>Readdy.ai</strong></p>
                <p className="text-gray-600 mt-2">
                  Plateforme de création et d'hébergement de sites web professionnels.
                </p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-copyright-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Propriété Intellectuelle
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-3">
                <p>
                  L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes, vidéos, etc.) sont la propriété exclusive de <strong>Dakar Marketing</strong> sauf mention contraire.
                </p>
                <p>
                  Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l'accord écrit préalable de Dakar Marketing.
                </p>
                <p className="text-gray-600 italic">
                  Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée par les articles du Code de la propriété intellectuelle.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-shield-check-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Responsabilité
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Dakar Marketing s'efforce de fournir sur ce site des informations aussi précises et mises à jour que possible.
                </p>
                <p>
                  Toutefois, Dakar Marketing ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
                </p>
                <p>
                  En conséquence, Dakar Marketing décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-cookie-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Cookies
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Ce site peut utiliser des cookies afin d'améliorer l'expérience utilisateur et analyser la fréquentation.
                </p>
                <p>
                  Les cookies sont de petits fichiers texte stockés sur votre appareil lors de votre visite. Ils permettent de :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Mémoriser vos préférences de navigation</li>
                  <li>Analyser le trafic et l'utilisation du site</li>
                  <li>Améliorer les fonctionnalités du chatbot</li>
                  <li>Optimiser votre expérience utilisateur</li>
                </ul>
                <p className="text-gray-600 italic mt-4">
                  Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais certaines fonctionnalités du site pourraient être limitées.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gray-50 rounded-xl p-6 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <i className="ri-mail-line text-white text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Nous Contacter
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email :</strong> <a href="mailto:juniorentreprise@bem.sn" className="text-red-600 hover:text-red-700 underline cursor-pointer">juniorentreprise@bem.sn</a></p>
                <p><strong>Adresse :</strong> Sacré Coeur 2, Pyrotechnie, Fann, Dakar, Sénégal</p>
              </div>
            </section>
          </div>

          {/* Retour */}
          <div className="text-center mt-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line"></i>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
