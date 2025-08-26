import React, { useState } from 'react';

const Chatbot = ({ showNotification, theme }) => {
  const [messages, setMessages] = useState([
    { text: '¡Hola! Estoy aquí para escucharte. ¿Cómo te sientes hoy?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // clases para las burbujas de chat
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

  // nuevo mensaje para el chatbot, tal y como lo ha solicitado el usuario
  const CHATBOT_PROMPT = `Eres un chatbot de apoyo emocional para estudiantes universitarios. Responde de manera empática, comprensiva y tranquilizadora. No des consejos médicos ni diagnósticos. Mantén la respuesta breve y conversacional. Usa expresiones juveniles (18-24 años).`;

  // funcion para realizar una llamada API real a OpenRouter.
  const fetchBotResponse = async (userMessageText) => {
    setIsLoading(true);

    const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    const YOUR_SITE_URL = "http://localhost:5173";
    const YOUR_SITE_NAME = "EduCare App";

    const messagesToSend = [
      {
        "role": "system",
        "content": CHATBOT_PROMPT
      },
      {
        "role": "user",
        "content": userMessageText
      }
    ];

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "EduCare App",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemma-3-27b-it:free",
          "messages": messagesToSend,
          "stream": false 
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();
      const botText = result.choices?.[0]?.message?.content || "Lo siento, no pude generar una respuesta. Por favor, intenta de nuevo.";
      
      const botResponse = { text: botText, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
      showNotification("Nuevo mensaje del bot");
    } catch (error) {
      console.error("Failed to fetch from API:", error);
      const errorMessage = { text: "Hubo un error al conectar con el servidor. Por favor, inténtalo más tarde.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (input.trim() !== '' && !isLoading) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
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

export default Chatbot;