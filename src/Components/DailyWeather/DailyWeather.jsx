import React from 'react';
import PropTypes from 'prop-types';
import {
  image,
  container,
  tempText,
  description,
} from './daily-weather.module.scss';

function DailyWeather({ temp, weather }) {
  const { icon, main } = weather;

  const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className={container}>
      <span className={tempText}>{temp}°</span>
      <img src={weatherIcon} alt={main} className={image} />
      <span className={description}>{main}</span>
    </div>
  );
}

DailyWeather.propTypes = {
  temp: PropTypes.number.isRequired,
  weather: PropTypes.objectOf({
    icon: PropTypes.string,
    main: PropTypes.string,
  }).isRequired,
};

export default DailyWeather;
