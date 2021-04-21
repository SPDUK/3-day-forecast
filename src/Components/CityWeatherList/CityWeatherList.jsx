import React from 'react';

import PropTypes from 'prop-types';
import DailyWeather from '../DailyWeather/DailyWeather';

import {
  container,
  listContainer,
  cityTitle,
} from './city-weather-list.module.scss';

function CityWeatherList({ forecastData }) {
  return (
    <div className={container}>
      <h3 className={cityTitle}>{forecastData.name}</h3>
      <div className={listContainer}>
        {forecastData.forecast.map(({ main, weather }, index) => (
          <DailyWeather temp={main?.temp} weather={weather[0]} key={index} />
        ))}
      </div>
    </div>
  );
}

CityWeatherList.propTypes = {
  forecastData: PropTypes.object.isRequired,
};

export default CityWeatherList;
