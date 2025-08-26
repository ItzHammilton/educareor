import React from 'react';

const WelcomeScreen = ({ theme }) => {
  const cardClasses = theme === 'dark' ?
    'bg-slate-700 border-l-4 border-indigo-500 shadow-inner' :
    'bg-white border-l-4 border-indigo-500 shadow-lg';

  return (
    <section className="text-center space-y-6">
      <h2 className="text-4xl font-bold text-indigo-500 mb-4 animate-slide-in">Bienvenido a EduCare</h2>
      <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
        Un espacio seguro y anónimo dedicado a tu bienestar emocional. Aquí encontrarás herramientas, recursos y apoyo para navegar tus emociones.
      </p>
      <div className={`p-6 rounded-2xl ${cardClasses}`}>
        <h3 className={`text-2xl font-semibold mb-2 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`}>Tu privacidad es nuestra prioridad</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          Esta aplicación no requiere ningún tipo de registro. Toda la información que introduzcas en el test se guarda únicamente en tu navegador y de forma anónima.
        </p>
      </div>
    </section>
  );
};

export default WelcomeScreen;