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
    <div className="clock-card">
      <div>
        <div className="clock-top-row">
          <h2 className="clock-city">{city}</h2>
        </div>
        <p className="clock-region">{timezone}</p>
      </div>
      <div>
        <div className="clock-time">{formatTime()}</div>
        <p className="clock-date">{formatDate()}</p>
      </div>
    </div>
  );
};

export default Clock;
