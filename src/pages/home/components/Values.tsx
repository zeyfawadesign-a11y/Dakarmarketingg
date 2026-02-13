
export default function Values() {
  const values = [
    {
      icon: 'ri-lightbulb-flash-line',
      title: 'Innovation',
      description:
        'Nous adoptons les dernières tendances et technologies marketing pour offrir des solutions créatives et avant-gardistes.',
    },
    {
      icon: 'ri-trophy-line',
      title: 'Excellence',
      description:
        'Nous visons la perfection dans chaque projet, en garantissant des résultats de haute qualité qui dépassent vos attentes.',
    },
    {
      icon: 'ri-time-line',
      title: 'Réactivité',
      description:
        'Notre équipe dynamique répond rapidement à vos besoins avec des délais de livraison respectés et une communication fluide.',
    },
    {
      icon: 'ri-check-double-line',
      title: 'Efficacité',
      description:
        'Nous optimisons chaque processus pour maximiser votre retour sur investissement avec des stratégies éprouvées et mesurables.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-black">
            Nos Valeurs
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Les principes qui guident notre travail et définissent notre engagement
            envers nos clients
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg p-4 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center bg-red-600 rounded-xl sm:rounded-2xl mx-auto mb-4 sm:mb-6 group-hover:bg-red-700 transition-colors duration-300">
                <i className={`${value.icon} text-2xl sm:text-4xl text-white`}></i>
              </div>
              <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 text-black group-hover:text-red-600 transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
