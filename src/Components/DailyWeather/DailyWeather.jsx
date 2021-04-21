import React from 'react';
import PropTypes from 'prop-types';
import {
  image,
  container,
  tempText,
  description,
} from './daily-weather.module.scss';

function DailyWeather({ temp, weather, date }) {
  const { icon, main } = weather;

  // gets day in easy to read format from the date, e.g Tue, Sat etc
  const day = new Date(date).toString().slice(0, 3);
  const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className={container}>
      <span className={tempText}>{temp}°</span>
      <img src={weatherIcon} alt={main} className={image} />
      <span className={description}>{main}</span>
      <span className={description}>{day}</span>
    </div>
  );
}

DailyWeather.propTypes = {
  temp: PropTypes.number.isRequired,
  weather: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};

export default DailyWeather;
