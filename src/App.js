import React from 'react';
import Clock from './components/Clock';
import './App.css';

function App() {
  const worldClocks = [
    { city: 'New York', timezone: 'America/New_York', offset: -5 },
    { city: 'London', timezone: 'Europe/London', offset: 0 },
    { city: 'Tokyo', timezone: 'Asia/Tokyo', offset: 9 },
    { city: 'Sydney', timezone: 'Australia/Sydney', offset: 11 },
    { city: 'Dubai', timezone: 'Asia/Dubai', offset: 4 },
    { city: 'Los Angeles', timezone: 'America/Los_Angeles', offset: -8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🌍 World Clocks Dashboard
          </h1>
          <p className="text-xl text-gray-600">
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

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with React.js and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;
