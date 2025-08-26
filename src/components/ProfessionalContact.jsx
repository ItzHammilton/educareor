import React from 'react';
import ProfessionalCard from './ProfessionalCard';

const ProfessionalContact = ({ theme }) => {
  const professionals = [
    {
      name: "Dr. Aura Lopez",
      specialty: "Psicóloga clínica",
      bio: "Especialista en terapia cognitivo-conductual y manejo de la ansiedad.",
      photo: "https://placehold.co/200x200/526D82/FFFFFF?text=Aura",
      contact: {
        email: "auralopez@educare.com",
        phone: "+50584034552",
      },
    },
    {
      name: "Lic. Hammilton Pastran",
      specialty: "Terapeuta familiar",
      bio: "Enfocado en relaciones, comunicación y crecimiento personal.",
      photo: "https://placehold.co/200x200/526D82/FFFFFF?text=Hammilton",
      contact: {
        email: "hammiltonflo2001@gmail.com",
        phone: "+50578596987",
      },
    },
  ];

  const headingClasses = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';
  const descriptionClasses = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <section className="space-y-6">
      <h2 className={`text-3xl font-bold text-center ${headingClasses}`}>Conexión con Profesionales</h2>
      <p className={`text-center ${descriptionClasses}`}>
        Estos son perfiles de profesionales. Si necesitas apoyo, no dudes en contactar.
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