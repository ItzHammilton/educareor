import React from 'react';
import ProfessionalCard from './ProfessionalCard';

const ProfessionalContact = ({ theme }) => {
  const professionals = [
    {
      name: "Dr. Ana Gómez",
      specialty: "Psicóloga clínica",
      bio: "Especialista en terapia cognitivo-conductual y manejo de la ansiedad.",
      photo: "https://placehold.co/200x200/526D82/FFFFFF?text=Ana",
      contact: {
        email: "anagomez@educare.com",
        phone: "+1234567890",
      },
    },
    {
      name: "Lic. Juan Pérez",
      specialty: "Terapeuta familiar",
      bio: "Enfocado en relaciones, comunicación y crecimiento personal.",
      photo: "https://placehold.co/200x200/526D82/FFFFFF?text=Juan",
      contact: {
        email: "juanperez@educare.com",
        phone: "+1234567891",
      },
    },
  ];

  const headingClasses = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';
  const descriptionClasses = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <section className="space-y-6">
      <h2 className={`text-3xl font-bold text-center ${headingClasses}`}>Conexión con Profesionales</h2>
      <p className={`text-center ${descriptionClasses}`}>
        Estos son perfiles simbólicos de profesionales. Si necesitas apoyo, no dudes en contactar.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {professionals.map((pro, index) => (
          <ProfessionalCard key={index} pro={pro} theme={theme} />
        ))}
      </div>
    </section>
  );
};

export default ProfessionalContact;