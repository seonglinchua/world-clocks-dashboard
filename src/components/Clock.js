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
    <div className="bg-white dark:bg-gray-950 p-8 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-900">
      <div className="mb-8">
        <h2 className="text-lg font-normal text-gray-900 dark:text-gray-100 mb-1 transition-colors duration-300">{city}</h2>
        <p className="text-xs text-gray-400 dark:text-gray-600 font-light transition-colors duration-300">{timezone}</p>
      </div>
      <div className="text-3xl font-light tabular-nums text-gray-900 dark:text-gray-100 mb-3 tracking-tight transition-colors duration-300">
        {formatTime()}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-500 font-light transition-colors duration-300">{formatDate()}</p>
    </div>
  );
};

export default Clock;
