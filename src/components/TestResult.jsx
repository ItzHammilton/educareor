import React from 'react';

const TestResult = ({ score, date, onReset, theme }) => {
  let feedback = '';
  let color = 'bg-slate-400';
  let message = 'Tu puntuación ha sido calculada. Un puntaje bajo indica un buen estado emocional, mientras que uno alto sugiere áreas de mejora.';

  // 🚨 Lógica de feedback actualizada para un puntaje máximo de 32
  if (score <= 10) {
    feedback = "¡Excelente! Parece que tienes una buena gestión emocional.";
    color = "bg-green-500";
  } else if (score <= 20) {
    feedback = "Buen manejo. Puede que haya áreas que necesiten un poco más de atención.";
    color = "bg-yellow-500";
  } else {
    feedback = "Ánimo. Tu puntuación sugiere que podrías beneficiarte de explorar nuestros recursos o hablar con un profesional.";
    color = "bg-red-500";
  }

  const cardClasses = theme === 'dark' ? 'bg-slate-700 shadow-inner' : 'bg-white shadow-lg';

  return (
    <div className="space-y-6 text-center">
      <h3 className="text-3xl font-bold text-indigo-400">Tus Resultados</h3>
      <p className={`text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{message}</p>

      <div className={`p-6 rounded-2xl ${cardClasses}`}>
        <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Fecha del Test: {date}</p>
        {/* 🚨 Actualizar el total de la puntuación de 12 a 32 */}
        <p className={`text-2xl font-bold mt-2 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>Puntuación Total: <span className="text-indigo-400">{score}</span> / 32</p>

        {/* Gráfico de barras simple */}
        <div className={`mt-4 w-full h-8 rounded-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'} overflow-hidden`}>
          <div
            className={`h-full ${color} transition-all duration-700 ease-in-out`}
            // 🚨 Actualizar el divisor de la anchura de 12 a 32
            style={{ width: `${(score / 32) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl ${cardClasses}`}>
        <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>{feedback}</p>
      </div>

      <button
        onClick={onReset}
        className="bg-slate-600 text-white px-8 py-3 rounded-full hover:bg-slate-500 transition-colors duration-200 font-semibold mt-4 shadow-md"
      >
        Volver a hacer el test
      </button>
    </div>
  );
};

export default TestResult;