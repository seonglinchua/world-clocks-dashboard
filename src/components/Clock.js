import React, { useState, useEffect } from 'react';

const Clock = ({ timezone, city, offset }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = () => {
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (3600000 * offset));
    return localTime;
  };

  const formatTime = () => {
    const localTime = getTimeInTimezone();
    return localTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = () => {
    const localTime = getTimeInTimezone();
    return localTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/30 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-900/50">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">{city}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-300">{timezone}</p>
      <div className="text-4xl font-mono font-bold text-blue-600 dark:text-blue-400 mb-2 transition-colors duration-300">
        {formatTime()}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">{formatDate()}</p>
    </div>
  );
};

export default Clock;
