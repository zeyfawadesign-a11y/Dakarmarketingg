
import { motion } from 'framer-motion';

type TeamMember = {
  name: string;
  role: string;
  level: number;
};

const president: TeamMember = {
  name: 'Mouhamadou Makhtar Cissé',
  role: 'Président',
  level: 0,
};

const vicePresidents: TeamMember[] = [
  {
    name: 'Mariam Fall',
    role: 'Secrétaire Générale',
    level: 1,
  },
  {
    name: 'Maimouna Thiam',
    role: 'Vice-présidente',
    level: 1,
  },
];

const directors: TeamMember[] = [
  {
    name: 'Khady Sène',
    role: 'Responsable RH',
    level: 2,
  },
  {
    name: 'Demba Sène',
    role: 'Responsable Communication',
    level: 2,
  },
  {
    name: 'Clément Kodiouakou',
    role: 'Responsable Commercial',
    level: 2,
  },
  {
    name: 'Safiétou Mounkaïla',
    role: 'Responsable F.C.C.',
    level: 2,
  },
  {
    name: 'Léna Diop',
    role: 'Responsable Projet',
    level: 2,
  },
  {
    name: 'Emmanuella Sena Hodomit',
    role: 'Responsable Qualité & Audit',
    level: 2,
  },
];

const managers: TeamMember[] = [
  {
    name: 'Mame Diarra Bousso Sy',
    role: 'Community Manager',
    level: 3,
  },
  {
    name: 'Amadou Barro',
    role: "Chargé D'affaires",
    level: 3,
  },
  {
    name: 'Anna Sophie Ndione',
    role: 'Trésorière',
    level: 3,
  },
  {
    name: 'Aïssatou Dia',
    role: 'Chargée Projet',
    level: 3,
  },
];

const associates: TeamMember[] = [
  {
    name: 'Salimata Diop',
    role: 'Community Manager',
    level: 4,
  },
  {
    name: 'Ibrahima Ciss',
    role: "Chargé D'affaires",
    level: 4,
  },
  {
    name: 'Chérif A. Salam Aidara',
    role: 'Chargé De Projet',
    level: 4,
  },
];

function MemberCard({ member, size = 'md', highlight = false }: { member: TeamMember; size?: 'lg' | 'md' | 'sm'; highlight?: boolean }) {
  const sizeClasses = {
    lg: 'px-4 sm:px-8 py-3 sm:py-5',
    md: 'px-3 sm:px-6 py-2 sm:py-4',
    sm: 'px-2 sm:px-4 py-2 sm:py-3',
  };

  const textSizeClasses = {
    lg: 'text-sm sm:text-base md:text-lg',
    md: 'text-xs sm:text-sm md:text-base',
    sm: 'text-[10px] sm:text-xs md:text-sm',
  };

  const borderClasses = highlight
    ? 'border-2 border-red-600 shadow-lg shadow-red-600/20 bg-white'
    : 'border border-gray-200 bg-white hover:border-red-600 hover:shadow-md';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group flex flex-col items-center text-center rounded-lg sm:rounded-xl ${sizeClasses[size]} ${borderClasses} transition-all duration-300`}
    >
      <h4 className={`font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight ${textSizeClasses[size]}`}>
        {member.name}
      </h4>
      <p className={`text-red-600 font-medium mt-0.5 sm:mt-1 ${size === 'lg' ? 'text-xs sm:text-sm' : 'text-[9px] sm:text-xs'}`}>
        {member.role}
      </p>
    </motion.div>
  );
}

function ConnectorLine({ className = '' }: { className?: string }) {
  return <div className={`bg-red-300 ${className}`} />;
}

export default function Team() {
  return (
    <section id="team" className="py-12 sm:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-red-600 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-3"
          >
            Organigramme
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Notre Équipe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto px-4"
          >
            Une équipe jeune, dynamique et passionnée au service de votre réussite
          </motion.p>
        </div>

        {/* Organigramme */}
        <div className="flex flex-col items-center">

          {/* Niveau 0 - Président */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl sm:rounded-2xl p-0.5 sm:p-1 shadow-xl shadow-red-600/20">
              <div className="bg-white rounded-lg sm:rounded-xl px-4 sm:px-10 py-3 sm:py-6 flex flex-col items-center">
                <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-gray-900 text-center leading-tight">{president.name}</h3>
                <span className="text-red-600 font-semibold text-xs sm:text-base mt-1 sm:mt-2">{president.role}</span>
              </div>
            </div>
          </div>

          {/* Connecteur vertical */}
          <ConnectorLine className="w-0.5 h-6 sm:h-10" />

          {/* Niveau 1 - Vice-présidents */}
          <div className="relative flex flex-col items-center w-full max-w-lg">
            {/* Ligne horizontale */}
            <ConnectorLine className="h-0.5 w-40 sm:w-64 md:w-80" />
            <div className="flex justify-between w-40 sm:w-64 md:w-80">
              <ConnectorLine className="w-0.5 h-4 sm:h-8" />
              <ConnectorLine className="w-0.5 h-4 sm:h-8" />
            </div>
            <div className="flex justify-between w-40 sm:w-64 md:w-80 gap-2 sm:gap-4">
              {vicePresidents.map((member) => (
                <div key={member.name} className="flex-1 flex justify-center">
                  <MemberCard member={member} size="md" />
                </div>
              ))}
            </div>
          </div>

          {/* Connecteur vertical */}
          <ConnectorLine className="w-0.5 h-6 sm:h-10" />

          {/* Niveau 2 - Responsables */}
          <div className="relative flex flex-col items-center w-full">
            {/* Ligne horizontale large */}
            <ConnectorLine className="h-0.5 w-full max-w-5xl" />
            <div className="flex justify-between w-full max-w-5xl px-2 sm:px-4">
              {directors.map((_, i) => (
                <ConnectorLine key={i} className="w-0.5 h-4 sm:h-8" />
              ))}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-3 md:gap-4 w-full max-w-5xl">
              {directors.map((member) => (
                <div key={member.name} className="flex justify-center">
                  <MemberCard member={member} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Connecteur vertical */}
          <ConnectorLine className="w-0.5 h-6 sm:h-10" />

          {/* Niveau 3 - Managers */}
          <div className="relative flex flex-col items-center w-full">
            <ConnectorLine className="h-0.5 w-full max-w-3xl" />
            <div className="flex justify-between w-full max-w-3xl px-4 sm:px-8">
              {managers.map((_, i) => (
                <ConnectorLine key={i} className="w-0.5 h-4 sm:h-8" />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 w-full max-w-3xl">
              {managers.map((member) => (
                <div key={member.name} className="flex justify-center">
                  <MemberCard member={member} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Connecteur vertical */}
          <ConnectorLine className="w-0.5 h-6 sm:h-10" />

          {/* Niveau 4 - Associés */}
          <div className="relative flex flex-col items-center w-full">
            <ConnectorLine className="h-0.5 w-full max-w-2xl" />
            <div className="flex justify-between w-full max-w-2xl px-6 sm:px-12">
              {associates.map((_, i) => (
                <ConnectorLine key={i} className="w-0.5 h-4 sm:h-8" />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 w-full max-w-2xl">
              {associates.map((member) => (
                <div key={member.name} className="flex justify-center">
                  <MemberCard member={member} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
