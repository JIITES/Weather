import React, { useState, useRef } from 'react';
import axios from 'axios';

import cloud1 from '../assets/cloud1.png';
import cloud2 from '../assets/cloud2.png';
import cloud3 from '../assets/cloud3.png';
import sun1 from '../assets/sun1.png';

const Weatherapp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const weatherRef = useRef(null); // ⬅️ Ref to scroll to

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
      setError('');
      // Scroll down to weather section smoothly
      setTimeout(() => {
        weatherRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setWeather(null);
      if (err.response?.status === 404) {
        setError('City not found.');
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-400 to-blue-200 text-white px-4 py-10">

      {/* Top Weather Scene */}
      <div className="relative w-full max-w-6xl h-72 mb-20  gap">
        {/* Sun */}
        <img
          src={sun1}
          alt="Sun"
          className="absolute w-44 h-44 top-4 left-1/2 transform -translate-x-1/2"
        />

        {/* Clouds */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center ">
          <img src={cloud1} alt="Cloud1" className="w-150 h-70" />
          <img src={cloud2} alt="Cloud2" className="w-150 h-70 " />
          <img src={cloud3} alt="Cloud3" className="w-150 h-70 " />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">🌤️ Weather App</h1>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name"
          className="w-full px-4 py-3 rounded-md text-black text-lg bg-white shadow-md"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button
          onClick={fetchWeather}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md text-lg w-full sm:w-auto"
        >
          Get Weather
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-yellow-100 text-lg mb-4">Loading...</p>}
      {error && <p className="text-red-200 text-lg mb-4">{error}</p>}

      {/* Weather Info */}
      <div ref={weatherRef}>
        {weather && (
          <div className="bg-white text-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md text-center space-y-4">
            <h2 className="text-3xl font-bold">{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto"
            />
            <p className="capitalize text-xl">{weather.weather[0].description}</p>
            <p className="text-2xl font-semibold">{weather.main.temp}°C</p>
            <div className="flex justify-between text-sm px-4">
              <span>Humidity: {weather.main.humidity}%</span>
              <span>Wind: {weather.wind.speed} m/s</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weatherapp;
