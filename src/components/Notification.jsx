import React from 'react';

const Notification = ({ notification }) => {
  return (
    <>
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg z-50 transition-all duration-300 ease-in-out animate-fade-in-down">
          {notification}
        </div>
      )}
    </>
  );
};

export default Notification;