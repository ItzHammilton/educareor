import React from 'react';

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

export default ResourceCard;