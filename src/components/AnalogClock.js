import React, { useState, useEffect } from 'react';

const AnalogClock = ({ timezone, city, offset, country, countryCode, lat, lon }) => {
  const [time, setTime] = useState(new Date());
  const [mapError, setMapError] = useState(false);

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

  // Generate static map URL - using a tile-based approach for better compatibility
  const getMapUrl = () => {
    const zoom = 5;
    // Use OpenStreetMap tile server with better CORS support
    const tileX = Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
    const tileY = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
    return `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`;
  };

  // SVG fallback map
  const renderMapFallback = () => (
    <svg className="map-snapshot" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="150" fill="#e8f4f8"/>
      <circle cx="150" cy="75" r="40" fill="#4a90e2" opacity="0.2"/>
      <circle cx="150" cy="75" r="25" fill="#4a90e2" opacity="0.3"/>
      <circle cx="150" cy="75" r="10" fill="#2e5c8a"/>
      <path d="M 150 65 L 150 85 M 140 75 L 160 75" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round"/>
      <text x="150" y="125" textAnchor="middle" fill="#2e5c8a" fontSize="12" fontFamily="system-ui">
        {lat.toFixed(2)}°, {lon.toFixed(2)}°
      </text>
    </svg>
  );

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
        {!mapError ? (
          <img
            src={getMapUrl()}
            alt={`Map of ${country}`}
            className="map-snapshot"
            loading="lazy"
            onError={() => setMapError(true)}
            crossOrigin="anonymous"
          />
        ) : (
          renderMapFallback()
        )}
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
