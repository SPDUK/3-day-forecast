import React from 'react';

import PropTypes from 'prop-types';
import DailyWeather from '../DailyWeather/DailyWeather';

import {
  container,
  listContainer,
  cityTitle,
} from './city-weather-list.module.scss';

/* eslint-disable camelcase  */

function CityWeatherList({ forecastData }) {
  return (
    <div className={container}>
      <h3 className={cityTitle}>{forecastData.name}</h3>
      <div className={listContainer}>
        {forecastData.forecast.map(({ main, weather, dt_txt }, index) => (
          <DailyWeather
            temp={main?.temp}
            weather={weather[0]}
            key={index}
            date={dt_txt}
          />
        ))}
      </div>
    </div>
  );
}

/* eslint-enable camelcase  */

CityWeatherList.propTypes = {
  forecastData: PropTypes.object.isRequired,
};

export default CityWeatherList;
