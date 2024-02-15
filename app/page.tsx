"use client";

import React, { useState, useEffect } from "react";
import Weather from "../components/weather/Weather";
import HourlyForecast from "../components/hourlyForecast/HourlyForecast";
import DaylyForecast from "../components/daylyForecast/DailyForecast";
import {
  getWeatherData,
  getLocalWeather,
  getHourlyForecastData,
  getDaylyForecastData,
} from "./api/fetches/route";
import useGeolocation from "./useGeoHook";
import style from "./page.module.scss";
import { WeatherDataType } from "@/types/weatherDataType";

const Home = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [initCity, setInitCity] = useState<string>("");
  const [hourlyForecastWeatherData, setHourlyForecastWeatherData] =
    useState(null);
  const [daylyForecastData, setDaylyForecastData] = useState(null);
  const location = useGeolocation();

  let lat: string | null = "";
  let lng: string | null = "";
  if (typeof window !== "undefined") {
    lat = localStorage.getItem("lat");
    lng = localStorage.getItem("lng");
  }

  const handleSearch = async () => {
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (error) {}
    try {
      const hourlyForecastData = await getHourlyForecastData(city);
      setHourlyForecastWeatherData(hourlyForecastData);
    } catch (error) {}
  };

  const getInitData = async () => {
    try {
      const data = await getLocalWeather(lat, lng);
      setWeatherData(data);
    } catch (error) {}
  };

  const getInitForecast = async () => {
    try {
      const hourlyForecastData = await getHourlyForecastData(initCity);
      setHourlyForecastWeatherData(hourlyForecastData);
    } catch (error) {}
    try {
      const daylyForecastData = await getDaylyForecastData(initCity);
      setDaylyForecastData(daylyForecastData);
    } catch (error) {}
  };

  useEffect(() => {
    if (lat && lng) {
      getInitData();
    }
  }, [lng, lat]);

  useEffect(() => {
    if (weatherData && weatherData.name) {
      setInitCity(weatherData.name);
    }
  }, [weatherData]);

  useEffect(() => {
    if (initCity) {
      getInitForecast();
    }
  }, [initCity]);

  return (
    <div className={style.main}>
      <div className="bg-amber-300 p-2 flex justify-between gap-2 rounded-md">
        <input
          type="text"
          placeholder="Zadajte mesto"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button  onClick={handleSearch}>Hľadať</button>
      </div>

      {weatherData && <Weather weatherData={weatherData} />}
      <div>
        {location.loaded
          ? JSON.stringify(location)
          : "Location data not available yet."}
      </div>
      <HourlyForecast hourlyForecastWeatherData={hourlyForecastWeatherData} />
      <DaylyForecast daylyForecastWeatherData={daylyForecastData} />
    </div>
  );
};

export default Home;
