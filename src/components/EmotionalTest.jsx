import React, { useState, useEffect } from 'react';
import TestResult from './TestResult';

const EmotionalTest = ({ showNotification, theme }) => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // preguntas del test
  const questions = [
    {
      id: 1,
      text: "¿Con qué frecuencia te sientes abrumado/a por tus emociones?",
      options: [
        { value: 1, label: "Casi nunca" },
        { value: 2, label: "A veces" },
        { value: 3, label: "Con frecuencia" },
        { value: 4, label: "Casi siempre" },
      ],
    },
    {
      id: 2,
      text: "¿Qué tan bien manejas el estrés en tu vida diaria?",
      options: [
        { value: 4, label: "Muy mal" },
        { value: 3, label: "Mal" },
        { value: 2, label: "Bien" },
        { value: 1, label: "Muy bien" },
      ],
    },
    {
      id: 3,
      text: "¿Sientes que tienes a alguien con quien hablar de tus problemas?",
      options: [
        { value: 1, label: "Sí, siempre" },
        { value: 2, label: "Sí, a veces" },
        { value: 3, label: "No, casi nunca" },
        { value: 4, label: "No, nunca" },
      ],
    },
  ];

  // carga resultados anteriores desde localStorage
  useEffect(() => {
    const savedResults = localStorage.getItem('emotionalTestResults');
    if (savedResults) {
      setResult(JSON.parse(savedResults));
    }
  }, []);

  // cambio de entrada
  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };
  
  // siguiente pregunta
  const handleNext = () => {
    if (answers[questions[currentQuestionIndex].id]) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      showNotification("Por favor, selecciona una opción antes de continuar.");
    }
  };

  // pregunta anterior
  const handlePrev = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  // calcula y muestra el resultado
  const handleSubmit = () => {
    const score = Object.values(answers).reduce((sum, current) => sum + parseInt(current, 10), 0);
    const newResult = { date: new Date().toLocaleDateString(), score };

    // guarda el nuevo resultado en localStorage
    localStorage.setItem('emotionalTestResults', JSON.stringify(newResult));
    setResult(newResult);
    showNotification("Resultados guardados de forma anónima.");
  };

  // reset del test
  const handleReset = () => {
    setResult(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const formClasses = theme === 'dark' ? 'bg-slate-700 shadow-inner' : 'bg-white shadow-lg';
  const labelClasses = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';
  const headingClasses = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';

  return (
    <section className="space-y-6">
      <h2 className={`text-3xl font-bold text-center ${headingClasses}`}>Autoevaluación Emocional</h2>
      <p className={`text-center ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
        Responde a las siguientes preguntas para tener una idea de tu bienestar emocional. Tus respuestas son anónimas y privadas.
      </p>

      {!result ? (
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl ${formClasses}`}>
            <p className={`font-semibold mb-4 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
              Pregunta {currentQuestionIndex + 1} de {questions.length}: {currentQuestion.text}
            </p>
            <div className="flex flex-col space-y-3">
              {currentQuestion.options.map((option) => {
                const isChecked = answers[currentQuestion.id] === option.value;
                const radioCircleClasses = `
                  h-5 w-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                  ${isChecked
                    ? 'bg-indigo-500 border-indigo-500 transform scale-110 ring-2 ring-indigo-500'
                    : (theme === 'dark' ? 'border-slate-500' : 'border-slate-400')
                  }
                `;

                return (
                  <label key={option.value} className={`flex items-center space-x-3 cursor-pointer ${labelClasses}`}>
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option.value}
                      onChange={() => handleChange(currentQuestion.id, option.value)}
                      className="hidden"
                      checked={isChecked}
                      required
                    />
                    <span className={radioCircleClasses}>
                      {isChecked && (
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                        </svg>
                      )}
                    </span>
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrev}
                className="bg-slate-600 text-white px-6 py-2 rounded-full hover:bg-slate-500 transition-colors duration-200 font-semibold shadow-md"
              >
                Anterior
              </button>
            )}
            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-indigo-400 hover:to-indigo-500 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
              >
                Ver mis resultados
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-400 transition-all duration-200 font-semibold shadow-md ml-auto"
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      ) : (
        <TestResult score={result.score} date={result.date} onReset={handleReset} theme={theme} />
      )}
    </section>
  );
};

export default EmotionalTest;