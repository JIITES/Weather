import React, { useState } from 'react'
import axios from 'axios'

const Apps = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchWeather = async () => {
    if (!city) return
    setLoading(true)
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      setWeather(res.data)
      setError('')
    } catch (err) {
      setWeather(null)
      if (err.response?.status === 404) {
        setError('City not found.')
      } else {
        setError('Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-purple-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🌤️ Weather App</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city"
          className="px-4 py-2 rounded text-black"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button
          onClick={fetchWeather}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Get Weather
        </button>
      </div>

      {loading && <p className="text-yellow-300">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {weather && (
        <div className="bg-white text-black p-6 rounded-lg shadow-md mt-4 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="mx-auto"
          />
          <p className="text-lg capitalize">{weather.weather[0].description}</p>
          <p className="text-xl font-semibold">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default Apps
