import React from 'react';

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

export default NavButton;