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
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
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
    <div className="world-clock-app">
      <div className="header">
        <div className="header-titles">
          <h1 className="header-title">World Clocks</h1>
          <p className="header-subtitle">Real-time monitoring across time zones</p>
        </div>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <div className="clock-grid">
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
  );
}

export default App;
