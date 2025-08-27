import React, { useState } from 'react';
import NavButton from './components/NavButton';
import WelcomeScreen from './components/WelcomeScreen';
import Chatbot from './components/Chatbot';
import Resources from './components/Resources';
import EmotionalTest from './components/EmotionalTest';
import ProfessionalContact from './components/ProfessionalContact';
import Notification from './components/Notification';
import Sidebar from './components/Sidebar';

// componente principal de la aplicacion
const App = () => {
  // estado para gestionar la vista actual
  const [view, setView] = useState('welcome');
  // estado para notificaciones temporales
  const [notification, setNotification] = useState('');
  // estado para tema: 'oscuro' o 'claro'
  const [theme, setTheme] = useState('light');
  // estado para la visibilidad de la barra lateral
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // funcion para notificaciones
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Funcion para alternar temas
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // funcion para alternar la barra lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // clases base para el contenedor de aplicaciones basadas en el tema
  const themeClasses = theme === 'dark' ?
    'bg-slate-900 text-slate-200' :
    'bg-slate-100 text-slate-800';

  // clases de contenedor para el area de contenido principal
  const contentClasses = theme === 'dark' ?
    'bg-slate-800 shadow-xl' :
    'bg-white shadow-xl';

  return (
    <div className={`min-h-screen font-inter flex transition-colors duration-500 ${themeClasses}`}>
      {/* componente notificacion */}
      <Notification notification={notification} />

      {/* navegacion lateral */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        theme={theme}
        toggleTheme={toggleTheme}
        setView={setView}
      />

      {/* area de contenido principal sin desplazamiento */}
      <div className={`flex-1 p-4 md:p-8 transition-all duration-300 ease-in-out`}>
        {/* boton alternar la barra lateral */}
        <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 rounded-full bg-slate-700 text-white shadow-lg transition-transform duration-300 transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <div className={`w-full p-4 md:p-8 rounded-3xl animate-fade-in-up transition-colors duration-500 flex flex-col min-h-full ${contentClasses}`}>
          <header className="py-2 flex flex-col items-center md:flex-row md:justify-between md:items-center border-b border-indigo-500 mb-8">
            <div className="flex justify-center md:justify-start w-full md:w-auto mb-4 md:mb-0">
              <img 
                src="logo.png" 
                alt="EduCare Logo" 
                className="h-20 w-auto" 
              />
            </div>
            {/* Se agregó un margen superior en móvil para separar el texto del logo */}
            <p className="mt-2 md:mt-0 text-xl font-medium text-indigo-400 text-center md:text-left">
             Tu bienestar es nuestra prioridad.
            </p>
          </header>
          <main className="flex-grow">
            {view === 'welcome' && <WelcomeScreen theme={theme} />}
            {view === 'chat' && <Chatbot showNotification={showNotification} theme={theme} />}
            {view === 'resources' && <Resources theme={theme} />}
            {view === 'test' && <EmotionalTest showNotification={showNotification} theme={theme} />}
            {view === 'professionals' && <ProfessionalContact theme={theme} />}
          </main>
          
          <footer className={`mt-8 py-4 text-center border-t border-indigo-500 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <p className="text-sm">© 2025 EduCare.</p>
            <p className="text-sm">EduCare no sustituye servicios de emergencia</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;