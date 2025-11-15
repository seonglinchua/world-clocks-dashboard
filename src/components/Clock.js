import React, { useState, useEffect } from 'react';

const Clock = ({ timezone, city, offset, country, countryCode, lat, lon }) => {
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

  // Generate static map URL using OpenStreetMap tiles
  const getMapUrl = () => {
    const zoom = 5;
    const width = 300;
    const height = 150;
    return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=${zoom}&size=${width}x${height}&maptype=mapnik`;
  };

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
            <img
              src={getMapUrl()}
              alt={`Map of ${country}`}
              className="map-snapshot"
              loading="lazy"
            />
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
