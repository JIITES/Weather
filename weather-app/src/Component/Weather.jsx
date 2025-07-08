import React from 'react'
import  { useState } from 'react'
import axios from 'axios'

const WeatherApp = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const apiKey = '8142fdbecbe059c832bfdd4beeed2061' // your actual key

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      setWeather(res.data)
      setError('')
    } catch (err) {
      setWeather(null)
      setError('City not found or API error')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-800 to-blue-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">🌤️ Weather App</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-2 rounded text-black w-full max-w-xs mb-4"
      />

      <button
        onClick={fetchWeather}
        className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
      >
        Get Weather
      </button>

      {error && <p className="mt-4 text-red-400">{error}</p>}

      {weather && (
        <div className="mt-8 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-md text-center space-y-2">
          <h2 className="text-2xl font-semibold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-3xl">{weather.main.temp}°C</p>
          <p className="capitalize text-lg">{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default WeatherApp
