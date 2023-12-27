import React, { useEffect, useState } from "react";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

const WEATHER_API_KEY = "06eefc69d9f0281c978df3f8ee5d3e50";

function Weather() {
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Fetch weather data based on user's location
          const currentWeatherResponse = await fetch(
            `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
          );
          const currentWeatherData = await currentWeatherResponse.json();
          setWeather(currentWeatherData.main);

          const forecastResponse = await fetch(
            `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
          );
          const forecastData = await forecastResponse.json();
          setForecast(forecastData);
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  console.log({ userLocation });

  return userLocation ? (
    <div className="flex flex-col p-10 justify-center items-center gap-5">
      <p>City name: {forecast?.city?.name} Deg</p>
      <p>Currrent Temp: {weather?.temp} Deg</p>
      <p>Max Temp: {weather?.temp_max} Deg</p>
      <p>Min Temp: {weather?.temp_min} Deg</p>
    </div>
  ) : (
    <div className="flex flex-col p-10 justify-center items-center gap-5">
      "loading..."
    </div>
  );
}

export default Weather;
