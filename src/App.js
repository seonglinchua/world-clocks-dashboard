import React, { useState, useEffect } from 'react';
import Clock from './components/Clock';
import AnalogClock from './components/AnalogClock';
import DarkModeToggle from './components/DarkModeToggle';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('clockType');
    return savedTab || 'digital';
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

  useEffect(() => {
    localStorage.setItem('clockType', activeTab);
  }, [activeTab]);

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

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'digital' ? 'active' : ''}`}
          onClick={() => setActiveTab('digital')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <path d="M7 10h.01M11 10h.01M15 10h.01" strokeLinecap="round" />
          </svg>
          Digital
        </button>
        <button
          className={`tab-button ${activeTab === 'analog' ? 'active' : ''}`}
          onClick={() => setActiveTab('analog')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" strokeLinecap="round" />
          </svg>
          Analog
        </button>
      </div>

      <div className="clock-grid">
        {worldClocks.map((clock, index) => (
          activeTab === 'digital' ? (
            <Clock
              key={index}
              city={clock.city}
              timezone={clock.timezone}
              offset={clock.offset}
            />
          ) : (
            <AnalogClock
              key={index}
              city={clock.city}
              timezone={clock.timezone}
              offset={clock.offset}
            />
          )
        ))}
      </div>
    </div>
  );
}

export default App;
