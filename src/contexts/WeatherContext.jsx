import { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const WeatherContext = createContext();

export const useWeatherContext = () => useContext(WeatherContext);

const WeatherProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentSearch, setCurrentSearch] = useState({});
  // array format of previous searches to retain order
  const [previousSearches, setPreviousSearches] = useState([]);
  // stores history in object format so we can do a lookup e.g if London exists already just use the existing response
  const [searchCache, setSearchCache] = useState({});

  async function searchForCity(city) {
    try {
      setError('');

      // do nothing if already showing the data
      if (currentSearch.name === city) return;

      // no need to make API request again if we have the data already
      if (searchCache[city]) {
        return setCurrentSearch(searchCache[city]);
      }

      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},,GB&units=metric&appid=${apiKey}`;

      const { data } = await axios.get(url);
      const { list } = data;
      const { name } = data.city;

      // returns array of 40 length - 5 days = every 8 entries is 24 hours = we need 0, 7, 15
      const nextThreeDays = [list[0], list[7], list[15]];

      const newWeatherData = {
        name,
        forecast: nextThreeDays,
      };

      // add current search to previously searched when making a new search - ignore if don't have one yet on start
      if (currentSearch.name) {
        setPreviousSearches((prevSearches) => [currentSearch, ...prevSearches]);
      }

      setCurrentSearch(newWeatherData);
      setSearchCache((prevCache) => ({ ...prevCache, [name]: newWeatherData }));

      // enforces gb, e.g if searching Cambridge the UK one will come up, not the US one
    } catch (err) {
      setError('Invalid city, please try again');
    } finally {
      setLoading(false);
    }
  }

  // update the background any time the current search changes
  // - if it is over 15c show a warm image, otherwise show cold one
  useEffect(() => {
    if (!currentSearch.forecast) return;
    const baseImageUrl =
      'https://res.cloudinary.com/dmjolhdaq/image/upload/v1619024759/three-day-forecast';

    const cssRoot = document.querySelector(':root');

    const todaysWeather = currentSearch.forecast[0].main.temp;

    const isWarm = todaysWeather > 15;

    const currentImage = getComputedStyle(cssRoot).getPropertyValue(
      '--weather-image'
    );

    const imageHref = isWarm ? 'warm' : 'cold';

    // make sure we always toggle between the original or secondary image to make it slightly more fun
    // eslint-disable-next-line
    const isAltImage = currentImage.slice(-10).includes('2');
    const imageExtension = isAltImage ? '.jpg' : '-2.jpg';

    const newWeatherImageHref = `${baseImageUrl}/${imageHref}${imageExtension}`;

    cssRoot.style.setProperty('--weather-image', `url(${newWeatherImageHref})`);
  }, [currentSearch]);

  const value = {
    loading,
    error,
    searchForCity,
    currentSearch,
    previousSearches,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WeatherProvider;
