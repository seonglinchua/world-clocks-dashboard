import React, { useState, useEffect } from 'react';

const AnalogClock = ({ timezone, city, offset, country, countryCode, lat, lon }) => {
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

  const formatDate = () => {
    const localTime = getTimeInTimezone();
    return localTime.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Generate static map URL using OpenStreetMap tiles
  const getMapUrl = () => {
    const zoom = 5;
    const width = 300;
    const height = 150;
    return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=${zoom}&size=${width}x${height}&maptype=mapnik`;
  };

  const localTime = getTimeInTimezone();
  const hours = localTime.getHours() % 12;
  const minutes = localTime.getMinutes();
  const seconds = localTime.getSeconds();

  // Calculate rotation angles
  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = ((minutes + seconds / 60) / 60) * 360;
  const hourAngle = ((hours + minutes / 60) / 12) * 360;

  return (
    <div className="clock-card analog-clock-card">
      <div className="analog-clock-header">
        <h2 className="clock-city">{city}</h2>
        <p className="clock-region">{timezone}</p>
        <p className="clock-country">{country}</p>
      </div>

      <div className="map-snapshot-container analog-map">
        <img
          src={getMapUrl()}
          alt={`Map of ${country}`}
          className="map-snapshot"
          loading="lazy"
        />
      </div>

      <div className="analog-clock-container">
        <svg className="analog-clock" viewBox="0 0 200 200">
          {/* Clock face */}
          <circle
            cx="100"
            cy="100"
            r="90"
            className="clock-face"
          />

          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 100 + 80 * Math.cos(angle);
            const y1 = 100 + 80 * Math.sin(angle);
            const x2 = 100 + 85 * Math.cos(angle);
            const y2 = 100 + 85 * Math.sin(angle);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="hour-marker"
                strokeWidth={i % 3 === 0 ? "2.5" : "1.5"}
              />
            );
          })}

          {/* Hour hand */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="55"
            className="hour-hand"
            transform={`rotate(${hourAngle} 100 100)`}
          />

          {/* Minute hand */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="40"
            className="minute-hand"
            transform={`rotate(${minuteAngle} 100 100)`}
          />

          {/* Second hand */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="35"
            className="second-hand"
            transform={`rotate(${secondAngle} 100 100)`}
          />

          {/* Center dot */}
          <circle
            cx="100"
            cy="100"
            r="5"
            className="center-dot"
          />
        </svg>
      </div>

      <p className="clock-date analog-date">{formatDate()}</p>
    </div>
  );
};

export default AnalogClock;
