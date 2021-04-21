import React from 'react';
import { useWeatherContext } from '../../contexts/WeatherContext';
import CityWeatherList from '../CityWeatherList/CityWeatherList';

import {
  container,
  previousSearchContainer,
  title,
} from './previous-search-list.module.scss';

function PreviousSearchList() {
  const { previousSearches } = useWeatherContext();
  return (
    <div className={container}>
      <h3 className={title}>Previous Searches</h3>
      <div className={previousSearchContainer}>
        {previousSearches.map((forecastData, index) => (
          <CityWeatherList key={index} forecastData={forecastData} />
        ))}
      </div>
    </div>
  );
}

export default PreviousSearchList;
