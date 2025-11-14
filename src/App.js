import React, { useState, useEffect } from 'react';
import Clock from './components/Clock';
import DarkModeToggle from './components/DarkModeToggle';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const worldClocks = [
    { city: 'New York', timezone: 'America/New_York', offset: -5 },
    { city: 'London', timezone: 'Europe/London', offset: 0 },
    { city: 'Tokyo', timezone: 'Asia/Tokyo', offset: 9 },
    { city: 'Sydney', timezone: 'Australia/Sydney', offset: 11 },
    { city: 'Dubai', timezone: 'Asia/Dubai', offset: 4 },
    { city: 'Los Angeles', timezone: 'America/Los_Angeles', offset: -8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            🌍 World Clocks Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Monitor time across different time zones in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worldClocks.map((clock, index) => (
            <Clock
              key={index}
              city={clock.city}
              timezone={clock.timezone}
              offset={clock.offset}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
          <p>Built with React.js and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;
