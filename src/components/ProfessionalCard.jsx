import React from 'react';

const ProfessionalCard = ({ pro, theme }) => {
  const cardClasses = theme === 'dark' ? 'bg-slate-700 shadow-lg' : 'bg-white shadow-lg';
  const headingClasses = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';
  const specialtyClasses = theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600';
  const bioClasses = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`p-6 rounded-2xl flex flex-col items-center text-center space-y-4 ${cardClasses}`}>
      <img
        src={pro.photo}
        alt={`Foto de ${pro.name}`}
        className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md transition-transform duration-300 transform hover:scale-110"
      />
      <h3 className={`text-2xl font-bold ${headingClasses}`}>{pro.name}</h3>
      <p className={`font-semibold ${specialtyClasses}`}>{pro.specialty}</p>
      <p className={`text-sm italic ${bioClasses}`}>{pro.bio}</p>

      <div className="flex gap-4 mt-4">
        <a
          href={`mailto:${pro.contact.email}?subject=Consulta&body=Ayuda%20Psicoemocional`}
          
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-full hover:from-indigo-500 hover:to-indigo-600 transition-colors duration-200 shadow-md"
        >
          Correo
        </a>
        <a
          href={`https://wa.me/${pro.contact.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-full hover:from-purple-500 hover:to-purple-600 transition-colors duration-200 shadow-md"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProfessionalCard;