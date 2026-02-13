
import React from 'react';

export default function Clients() {
  const clients = [
    {
      name: 'BEM Dakar',
      logo: 'https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/ca5471d6f6bf83b4cd628cac42521051.png',
    },
    {
      name: 'BEM Tech',
      logo: 'https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/c4ce49eef8263e852834bbe83f03f371.png',
    },
    {
      name: "L'Oréal",
      logo: 'https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/6a351b6d77533f738067a8b1d7309ed7.jpeg',
    },
    {
      name: 'Samsung',
      logo: 'https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/8568e499dc3bd070d50cfa6b54eebd86.png',
    },
    {
      name: 'ESTP',
      logo: 'https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/1add66d750725bbb373df79d7e45862d.png',
    },
    {
      name: 'Kirène',
      logo: 'https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/1234bfc03e256bad0daedd05009267c2.png',
    },
    {
      name: 'Supeco',
      logo: 'https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/d08c722bcbf6e7eac0f4ca9cd9a25b64.jpeg',
    },
    {
      name: 'Advention Business Partners',
      logo: 'https://static.readdy.ai/image/9dd4df12e8d1f4ffea2e475d924c9b14/3fbcd1f9c41e296b887e1f4a18b42ded.jpeg',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-black">
            Nos Clients
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Ils nous font confiance pour développer leur stratégie marketing
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {clients.map((client) => (
            <div
              key={client.name}
              className="bg-white p-4 sm:p-6 rounded-xl flex items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 aspect-square"
            >
              <div className="w-full h-full flex items-center justify-center p-2">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-[85%] max-h-[85%] object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/200x100?text=Image+Not+Found';
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-600 text-sm sm:text-lg px-4">
            Et bien d'autres entreprises qui ont choisi l'excellence
          </p>
        </div>
      </div>
    </section>
  );
}
