import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
  // State to manage the current view
  const [view, setView] = useState('welcome');
  // State for temporary notifications
  const [notification, setNotification] = useState('');
  // State for theme: 'dark' or 'light'
  const [theme, setTheme] = useState('dark');
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Changed default state to false

  // Function to show a temporary notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Function to toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Base classes for the application container based on the theme
  const themeClasses = theme === 'dark' ?
    'bg-slate-900 text-slate-200' :
    'bg-slate-100 text-slate-800';

  // Container classes for the main content area
  const contentClasses = theme === 'dark' ?
    'bg-slate-800 shadow-xl' :
    'bg-white shadow-xl';

  return (
    <div className={`min-h-screen font-inter flex transition-colors duration-500 ${themeClasses}`}>
      {/* Notification component */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg z-50 transition-all duration-300 ease-in-out animate-fade-in-down">
          {notification}
        </div>
      )}

      {/* Sidebar Navigation */}
      <nav className={`fixed left-0 top-0 h-full w-64 p-6 flex flex-col items-center space-y-8 transform transition-all duration-300 ease-in-out z-50
        ${theme === 'dark' ? 'bg-slate-950 text-slate-300' : 'bg-white text-slate-700'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Adjusted padding top for better button alignment */}
        <div className="pt-16 space-y-8 w-full flex flex-col items-center">
          {/* Removed setIsSidebarOpen(false) from onClick handlers */}
          <NavButton onClick={() => { setView('welcome'); }} text="Inicio" theme={theme} />
          <NavButton onClick={() => { setView('chat'); }} text="Chat de Apoyo" theme={theme} />
          <NavButton onClick={() => { setView('resources'); }} text="Recursos" theme={theme} />
          <NavButton onClick={() => { setView('test'); }} text="Test Emocional" theme={theme} />
          <NavButton onClick={() => { setView('professionals'); }} text="Profesionales" theme={theme} />
        </div>
        
        {/* Theme toggle button inside the sidebar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-300">
                {theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12H5.25m-.386-6.364l1.591 1.591M12 12a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0110.5 20.25c-2.238 0-4.38-1.026-5.746-2.834a5.973 5.973 0 01-1.258-4.481l.363-1.09a.584.584 0 01.996-.328l1.455 1.059c.731.534 1.764.717 2.658.469a.584.584 0 01.355-.402L13.5 12.39c.277-.076.435-.34.402-.638l-.738-2.215a.584.584 0 01.402-.638l2.215-.738a.584.584 0 01.638.402l.738 2.215a.584.584 0 01.402.638l-2.215.738a.584.584 0 01-.638.402l-.738 2.215a.584.584 0 01-.402.638z" />
                    </svg>
                )}
            </button>
        </div>
      </nav>

      {/* Overlay for when the sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area without offset */}
      <div className={`flex-1 p-4 md:p-8 transition-all duration-300 ease-in-out`}>
        {/* Toggle button for the sidebar */}
        <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 rounded-full bg-slate-700 text-white shadow-lg transition-transform duration-300 transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Content wrapper with correct margins */}
        <div className={`w-full p-4 md:p-8 rounded-3xl animate-fade-in-up transition-colors duration-500 flex flex-col min-h-full ${contentClasses}`}>
          <header className="py-4 flex justify-between items-center border-b border-indigo-500 mb-8">
            <h1 className="text-4xl font-extrabold text-indigo-500">EduCare</h1>
            <p className="text-xl font-medium text-indigo-400">"Tu bienestar es nuestra prioridad."</p>
          </header>

          <main className="flex-grow">
            {view === 'welcome' && <WelcomeScreen theme={theme} />}
            {view === 'chat' && <Chatbot showNotification={showNotification} theme={theme} />}
            {view === 'resources' && <Resources theme={theme} />}
            {view === 'test' && <EmotionalTest showNotification={showNotification} theme={theme} />}
            {view === 'professionals' && <ProfessionalContact theme={theme} />}
          </main>
          
          <footer className={`mt-8 py-4 text-center border-t border-indigo-500 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <p className="text-sm">© 2024 EduCare. Todos los derechos reservados.</p>
            <p className="text-sm">Contacto: contacto@educare.com</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

// Reusable navigation button component
const NavButton = ({ onClick, text, theme }) => {
  const buttonClasses = theme === 'dark' ?
    'bg-slate-800 text-indigo-400 hover:bg-indigo-600 hover:text-white' :
    'bg-slate-200 text-indigo-600 hover:bg-indigo-400 hover:text-white';

  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-3 rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${buttonClasses}`}
    >
      {text}
    </button>
  );
};

// Welcome screen component
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

// Chatbot component with real API integration
const Chatbot = ({ showNotification, theme }) => {
  const [messages, setMessages] = useState([
    { text: '¡Hola! Estoy aquí para escucharte. ¿Cómo te sientes hoy?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Class for the chat bubbles
  const bubbleClasses = (sender) => {
    if (sender === 'user') {
      return theme === 'dark' ?
        'bg-purple-600 text-white rounded-br-none' :
        'bg-indigo-500 text-white rounded-br-none';
    } else {
      return theme === 'dark' ?
        'bg-slate-600 text-slate-100 rounded-bl-none' :
        'bg-slate-200 text-slate-800 rounded-bl-none';
    }
  };

  // The new prompt for the chatbot, as requested by the user.
  const CHATBOT_PROMPT = `Eres un chatbot de apoyo emocional para estudiantes universitarios. Responde de manera empática, comprensiva y tranquilizadora. No des consejos médicos ni diagnósticos. Mantén la respuesta breve y conversacional. Usa expresiones juveniles (18-24 años).`;

  // Function to make a real API call to Gemini
  const fetchBotResponse = async (userMessageText) => {
    setIsLoading(true);
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // Prepend the new prompt to the user's message to set the persona for each turn.
    const fullPromptedMessage = `${CHATBOT_PROMPT}\n\n${userMessageText}`;

    // Construct the chat history for the API call. We only send the last user message with the prompt.
    // This is the most effective way to prime the model for its persona in this setup.
    const chatHistory = [{ role: "user", parts: [{ text: fullPromptedMessage }] }];
    const payload = { contents: chatHistory };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();
      const botText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no pude generar una respuesta. Por favor, intenta de nuevo.";

      const botResponse = { text: botText, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
      showNotification("Nuevo mensaje del bot");
    } catch (error) {
      console.error("Failed to fetch from API:", error);
      const errorMessage = { text: "Hubo un error al conectar. Por favor, inténtalo más tarde.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (input.trim() !== '' && !isLoading) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      fetchBotResponse(input);
      setInput('');
    }
  };

  const chatContainerClasses = theme === 'dark' ?
    'bg-slate-700 shadow-inner scrollbar-thumb-indigo-500 scrollbar-track-slate-800' :
    'bg-slate-200 shadow-inner scrollbar-thumb-indigo-500 scrollbar-track-slate-300';

  const inputClasses = theme === 'dark' ?
    'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400' :
    'bg-white border-slate-300 text-slate-800 placeholder-slate-500';

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold text-slate-100 text-center">Chat de Apoyo</h2>
      <div className={`h-96 overflow-y-auto p-4 rounded-2xl scrollbar-thin ${chatContainerClasses}`}>
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs p-4 rounded-2xl shadow-md transition-all duration-300 ease-in-out ${bubbleClasses(msg.sender)}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className={`max-w-xs p-4 rounded-2xl shadow-md ${theme === 'dark' ? 'bg-slate-600 text-slate-100' : 'bg-slate-200 text-slate-800'} rounded-bl-none`}>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu mensaje..."
          disabled={isLoading}
          className={`flex-grow p-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${inputClasses}`}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enviar
        </button>
      </div>
    </section>
  );
};

// Resources component
const Resources = ({ theme }) => {
  const cardClasses = theme === 'dark' ? 'bg-slate-700 shadow-lg' : 'bg-white shadow-lg';
  const headingClasses = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';
  const descriptionClasses = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <section className="space-y-6">
      <h2 className={`text-3xl font-bold text-center ${headingClasses}`}>Recursos de Autocuidado</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* YouTube Video Embeds */}
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

      {/* Downloadable PDFs */}
      <div className="grid md:grid-cols-2 gap-6">
        <ResourceCard title="Guía de Meditación" description="Una guía paso a paso para empezar a meditar." theme={theme}>
          <a href="https://example.com/meditation-guide.pdf" download className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-500 transition-colors duration-200 shadow-md">
            Descargar PDF
          </a>
        </ResourceCard>

        <ResourceCard title="Ejercicios de Respiración" description="Ficha con ejercicios prácticos para la calma." theme={theme}>
          <a href="https://example.com/breathing-exercises.pdf" download className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-500 transition-colors duration-200 shadow-md">
            Descargar PDF
          </a>
        </ResourceCard>
      </div>
    </section>
  );
};

// Reusable resource card component
const ResourceCard = ({ title, description, children, theme }) => {
  const cardClasses = theme === 'dark' ? 'bg-slate-700 shadow-lg' : 'bg-white shadow-lg';
  const headingClasses = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';
  const descriptionClasses = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`p-6 rounded-2xl space-y-4 transition-colors duration-500 ${cardClasses}`}>
      <h3 className={`text-2xl font-bold ${headingClasses}`}>{title}</h3>
      <p className={`${descriptionClasses}`}>{description}</p>
      {children}
    </div>
  );
};

// Emotional Test component with multi-page functionality
const EmotionalTest = ({ showNotification, theme }) => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Test questions
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

  // Load previous results from localStorage on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('emotionalTestResults');
    if (savedResults) {
      setResult(JSON.parse(savedResults));
    }
  }, []);

  // Handle input change
  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };
  
  // Handle moving to the next question
  const handleNext = () => {
    if (answers[questions[currentQuestionIndex].id]) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      showNotification("Por favor, selecciona una opción antes de continuar.");
    }
  };

  // Handle going back to the previous question
  const handlePrev = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  // Calculate and show results
  const handleSubmit = () => {
    const score = Object.values(answers).reduce((sum, current) => sum + parseInt(current, 10), 0);
    const newResult = { date: new Date().toLocaleDateString(), score };

    // Save new result to local storage
    localStorage.setItem('emotionalTestResults', JSON.stringify(newResult));
    setResult(newResult);
    showNotification("Resultados guardados de forma anónima.");
  };

  // Reset the test
  const handleReset = () => {
    setResult(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const formClasses = theme === 'dark' ? 'bg-slate-700 shadow-inner' : 'bg-white shadow-lg';
  const labelClasses = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';
  // New variable for the heading color
  const headingClasses = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';

  return (
    <section className="space-y-6">
      {/* Updated heading with conditional text color */}
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
                // Determine if the current option is selected.
                // NOTE: The previous code was comparing a number with a string,
                // causing the visual feedback to fail. This fix ensures the types match.
                const isChecked = answers[currentQuestion.id] === option.value;

                // Now we apply conditional classes to provide a more prominent visual feedback.
                // The selected state now includes a pop effect and a visible ring.
                const radioCircleClasses = `
                  h-5 w-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                  ${isChecked
                    ? 'bg-indigo-500 border-indigo-500 transform scale-110 ring-2 ring-indigo-500' // Classes for selected state
                    : (theme === 'dark' ? 'border-slate-500' : 'border-slate-400') // Classes for unselected state
                  }
                `;

                return (
                  <label key={option.value} className={`flex items-center space-x-3 cursor-pointer ${labelClasses}`}>
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option.value}
                      onChange={() => handleChange(currentQuestion.id, option.value)}
                      className="hidden" // Hiding the default radio button
                      checked={isChecked}
                      required
                    />
                    {/* Custom styled radio button using a span */}
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

// Test result component
const TestResult = ({ score, date, onReset, theme }) => {
  let feedback = '';
  let color = 'bg-slate-400';
  let message = 'Tu puntuación ha sido calculada. Un puntaje bajo indica un buen estado emocional, mientras que uno alto sugiere áreas de mejora.';

  if (score <= 4) {
    feedback = "¡Excelente! Parece que tienes una buena gestión emocional.";
    color = "bg-green-500";
  } else if (score <= 8) {
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
        <p className={`text-2xl font-bold mt-2 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>Puntuación Total: <span className="text-indigo-400">{score}</span> / 12</p>

        {/* Simple bar chart for visualization */}
        <div className={`mt-4 w-full h-8 rounded-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'} overflow-hidden`}>
          <div
            className={`h-full ${color} transition-all duration-700 ease-in-out`}
            style={{ width: `${(score / 12) * 100}%` }}
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

// Professional Contact component
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

// Reusable professional card component
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
          href={`mailto:${pro.contact.email}`}
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

export default App;
