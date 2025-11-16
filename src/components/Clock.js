import React, { useState, useEffect } from 'react';

const Clock = ({ timezone, city, offset, country, countryCode, lat, lon }) => {
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

  return (
    <div className="clock-card">
      <div className="clock-card-content">
        <div className="clock-header-section">
          <div>
            <div className="clock-top-row">
              <h2 className="clock-city">{city}</h2>
            </div>
            <p className="clock-region">{timezone}</p>
            <p className="clock-country">{country}</p>
          </div>
          <div className="map-snapshot-container">
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
        </div>
        <div>
          <div className="clock-time">{formatTime()}</div>
          <p className="clock-date">{formatDate()}</p>
        </div>
      </div>
    </div>
  );
};

export default Clock;
