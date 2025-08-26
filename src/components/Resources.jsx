import React from 'react';
import ResourceCard from './ResourceCard';

const Resources = ({ theme }) => {
  const headingClasses = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';

  return (
    <section className="space-y-6">
      <h2 className={`text-3xl font-bold text-center ${headingClasses}`}>Recursos de Autocuidado</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* videos de youtube */}
        <ResourceCard title="Meditación para la ansiedad" description="Un video guiado para calmar la mente y el cuerpo." theme={theme}>
          <iframe
            width="100%"
            height="200"
            className="rounded-xl"
            src="https://www.youtube.com/embed/O-6f5wQXSu8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </ResourceCard>

        <ResourceCard title="Técnicas de respiración" description="Aprende a respirar para reducir el estrés en tu día a día." theme={theme}>
          <iframe
            width="100%"
            height="200"
            className="rounded-xl"
            src="https://www.youtube.com/embed/n4p3L0s64iY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </ResourceCard>
      </div>

      {/* PDF descargables */}
      <div className="grid md:grid-cols-2 gap-6">
        <ResourceCard title="Guía de Meditación" description="Una guía paso a paso para empezar a meditar." theme={theme}>
          <div className="mt-4"> 
            <a href="https://example.com/meditation-guide.pdf" download className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-500 transition-colors duration-200 shadow-md">
              Descargar PDF
            </a>
          </div>
        </ResourceCard>

        <ResourceCard title="Ejercicios de Respiración" description="Ficha con ejercicios prácticos para la calma." theme={theme}>
          <div className="mt-4">
            <a href="https://example.com/breathing-exercises.pdf" download className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-500 transition-colors duration-200 shadow-md">
              Descargar PDF
            </a>
          </div>
        </ResourceCard>
      </div>
    </section>
  );
};

export default Resources;