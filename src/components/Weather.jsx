import React, { useEffect, useState, useRef } from 'react';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

import './Weather.css';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": drizzle_icon
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fd0f05191498cc35b52368e3407ec290`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon];

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.ceil(data.main.temp),
        location: data.name,
        pcon: icon,
      });

      console.log(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search(inputRef.current.value);
    }
  };

  useEffect(() => {
    search('Mumbai');
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input 
          ref={inputRef} 
          type='text' 
          placeholder='Search' 
          onKeyDown={handleKeyDown} 
        />
        <img 
          src={search_icon} 
          alt="Search Icon" 
          onClick={() => { search(inputRef.current.value); }} 
        />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.pcon} alt="Weather Icon" className="weather-icon" />
          <p className='temperature'>{weatherData.temperature}°c</p>
          <p className='location'>{weatherData.location}</p>

          <div className="weather-data">
            <div className="data">
              <img src={humidity_icon} alt="Humidity Icon" className="humidity-icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="data">
              <img src={wind_icon} alt="Wind Icon" className="wind-icon" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
