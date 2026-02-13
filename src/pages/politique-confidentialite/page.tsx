
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function PolitiqueConfidentialitePage() {
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
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-gray-600">
              Protection et utilisation de vos données personnelles
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-10">
            {/* Introduction */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-shield-user-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Notre Engagement
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-3">
                <p>
                  <strong>Dakar Marketing</strong> attache une grande importance à la protection des données personnelles de ses utilisateurs et clients.
                </p>
                <p>
                  Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons, et quels sont vos droits concernant vos données personnelles.
                </p>
                <p className="text-gray-600 italic">
                  En utilisant notre site web, vous acceptez les pratiques décrites dans cette politique.
                </p>
              </div>
            </section>

            {/* Données collectées */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-database-2-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Données Collectées
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-4">
                <p>Nous pouvons collecter les informations suivantes :</p>
                
                <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <i className="ri-user-line text-red-600 mt-1"></i>
                    <div>
                      <strong>Informations d'identité</strong>
                      <p className="text-gray-600">Nom, prénom, fonction</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <i className="ri-mail-line text-red-600 mt-1"></i>
                    <div>
                      <strong>Coordonnées</strong>
                      <p className="text-gray-600">Adresse email, numéro de téléphone</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <i className="ri-building-line text-red-600 mt-1"></i>
                    <div>
                      <strong>Informations professionnelles</strong>
                      <p className="text-gray-600">Nom de l'entreprise, secteur d'activité</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <i className="ri-message-3-line text-red-600 mt-1"></i>
                    <div>
                      <strong>Demandes et besoins</strong>
                      <p className="text-gray-600">Informations liées aux demandes de services, messages de contact</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <i className="ri-line-chart-line text-red-600 mt-1"></i>
                    <div>
                      <strong>Données de navigation</strong>
                      <p className="text-gray-600">Pages visitées, durée de visite, source de trafic</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Utilisation des données */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-settings-3-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Utilisation des Données
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-3">
                <p>Les données collectées sont utilisées pour :</p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-red-600 mt-1 flex-shrink-0"></i>
                    <span><strong>Répondre à vos demandes</strong> — traiter vos demandes de devis, questions et demandes de contact</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-red-600 mt-1 flex-shrink-0"></i>
                    <span><strong>Envoyer des informations</strong> — vous tenir informé de nos actualités, conseils marketing et offres via notre newsletter</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-red-600 mt-1 flex-shrink-0"></i>
                    <span><strong>Améliorer nos services</strong> — analyser l'utilisation du site pour optimiser l'expérience utilisateur</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-red-600 mt-1 flex-shrink-0"></i>
                    <span><strong>Gérer la relation client</strong> — assurer le suivi des projets et maintenir une communication efficace</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-red-600 mt-1 flex-shrink-0"></i>
                    <span><strong>Personnaliser votre expérience</strong> — adapter nos contenus et recommandations à vos besoins</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Protection des données */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-lock-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Protection des Données
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Les informations personnelles que vous nous communiquez sont stockées de manière sécurisée et protégées contre tout accès non autorisé.
                </p>
                <p>
                  <strong>Nous nous engageons à :</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Ne jamais vendre vos données à des tiers</li>
                  <li>Ne pas transmettre vos informations sans votre consentement</li>
                  <li>Utiliser des protocoles de sécurité pour protéger vos données</li>
                  <li>Limiter l'accès aux données aux seules personnes autorisées</li>
                  <li>Respecter la confidentialité de vos échanges avec nous</li>
                </ul>
              </div>
            </section>

            {/* Durée de conservation */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-time-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Durée de Conservation
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Les données personnelles sont conservées uniquement le temps nécessaire pour :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Le traitement de vos demandes et projets en cours</li>
                  <li>Le suivi de la relation client</li>
                  <li>L'envoi de communications si vous y avez consenti</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                </ul>
                <p className="text-gray-600 italic mt-4">
                  Au-delà de cette période, vos données sont supprimées ou anonymisées.
                </p>
              </div>
            </section>

            {/* Droits des utilisateurs */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-settings-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Vos Droits
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-4">
                <p>
                  Conformément à la réglementation en vigueur, vous disposez des droits suivants :
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <i className="ri-eye-line text-red-600"></i>
                      Droit d'accès
                    </h3>
                    <p className="text-gray-600">Vous pouvez demander à consulter les données que nous détenons sur vous</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <i className="ri-edit-line text-red-600"></i>
                      Droit de rectification
                    </h3>
                    <p className="text-gray-600">Vous pouvez demander la correction de données inexactes ou incomplètes</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <i className="ri-delete-bin-line text-red-600"></i>
                      Droit à l'effacement
                    </h3>
                    <p className="text-gray-600">Vous pouvez demander la suppression de vos données personnelles</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <i className="ri-hand-line text-red-600"></i>
                      Droit d'opposition
                    </h3>
                    <p className="text-gray-600">Vous pouvez vous opposer au traitement de vos données à des fins marketing</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <i className="ri-download-line text-red-600"></i>
                      Droit à la portabilité
                    </h3>
                    <p className="text-gray-600">Vous pouvez récupérer vos données dans un format structuré</p>
                  </div>
                </div>
                
                <p className="mt-6">
                  Pour exercer ces droits, contactez-nous à : <a href="mailto:juniorentreprise@bem.sn" className="text-red-600 hover:text-red-700 underline font-semibold cursor-pointer">juniorentreprise@bem.sn</a>
                </p>
              </div>
            </section>

            {/* Cookies et tracking */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-cookie-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Cookies et Technologies de Suivi
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Notre site utilise des cookies et technologies similaires pour améliorer votre expérience et analyser l'utilisation du site.
                </p>
                <p><strong>Types de cookies utilisés :</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Cookies essentiels</strong> — nécessaires au fonctionnement du site</li>
                  <li><strong>Cookies analytiques</strong> — pour comprendre comment vous utilisez le site</li>
                  <li><strong>Cookies fonctionnels</strong> — pour mémoriser vos préférences</li>
                  <li><strong>Cookies du chatbot</strong> — pour améliorer l'assistance automatisée</li>
                </ul>
                <p className="text-gray-600 italic mt-4">
                  Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter certaines fonctionnalités du site.
                </p>
              </div>
            </section>

            {/* Modifications */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-refresh-line text-red-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Modifications de la Politique
                </h2>
              </div>
              <div className="pl-13 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Dakar Marketing se réserve le droit de modifier cette politique de confidentialité à tout moment.
                </p>
                <p>
                  Toute modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette page.
                </p>
                <p className="text-gray-600 italic">
                  <strong>Dernière mise à jour :</strong> Janvier 2025
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-red-50 rounded-xl p-6 mt-8 border border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <i className="ri-customer-service-2-line text-white text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Questions ou Préoccupations ?
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si vous avez des questions concernant cette politique de confidentialité ou le traitement de vos données personnelles, n'hésitez pas à nous contacter :
              </p>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <i className="ri-mail-line text-red-600"></i>
                  <strong>Email :</strong> <a href="mailto:juniorentreprise@bem.sn" className="text-red-600 hover:text-red-700 underline cursor-pointer">juniorentreprise@bem.sn</a>
                </p>
                <p className="flex items-center gap-2">
                  <i className="ri-map-pin-line text-red-600"></i>
                  <strong>Adresse :</strong> Sacré Coeur 2, Pyrotechnie, Fann, Dakar, Sénégal
                </p>
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
