import React from 'react';
import NavButton from './NavButton';

const Sidebar = ({ isSidebarOpen, toggleSidebar, theme, toggleTheme, setView }) => {
  return (
    <>
      {/* navegacion lateral */}
      <nav className={`fixed left-0 top-0 h-full w-64 p-6 flex flex-col items-center space-y-8 transform transition-all duration-300 ease-in-out z-50
        ${theme === 'dark' ? 'bg-slate-950 text-slate-300' : 'bg-white text-slate-700'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="pt-16 space-y-8 w-full flex flex-col items-center">
          <NavButton onClick={() => { setView('welcome'); }} text="Inicio" theme={theme} />
          <NavButton onClick={() => { setView('chat'); }} text="Chat de Apoyo" theme={theme} />
          <NavButton onClick={() => { setView('resources'); }} text="Recursos" theme={theme} />
          <NavButton onClick={() => { setView('test'); }} text="Test Emocional" theme={theme} />
          <NavButton onClick={() => { setView('professionals'); }} text="Profesionales" theme={theme} />
        </div>
        
        {/* alternar el tema dentro de la barra lateral */}
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

      {/* superposicion cuando la barra lateral este abierta */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;