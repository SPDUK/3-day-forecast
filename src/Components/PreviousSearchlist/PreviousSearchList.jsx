import React from 'react';
import { useWeatherContext } from '../../contexts/WeatherContext';
import CityWeatherList from '../CityWeatherList/CityWeatherList';

function PreviousSearchList() {
  const { previousSearches } = useWeatherContext();
  return (
    <div>
      <h3>Previous Searches</h3>
      {previousSearches.map((forecastData, index) => (
        <CityWeatherList key={index} forecastData={forecastData} />
      ))}
    </div>
  );
}

export default PreviousSearchList;
