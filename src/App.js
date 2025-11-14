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
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <header className="mb-16">
          <h1 className="text-4xl font-light text-gray-900 dark:text-gray-100 mb-3 tracking-tight transition-colors duration-300">
            World Clocks
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light transition-colors duration-300">
            Real-time monitoring across time zones
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
          {worldClocks.map((clock, index) => (
            <Clock
              key={index}
              city={clock.city}
              timezone={clock.timezone}
              offset={clock.offset}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
