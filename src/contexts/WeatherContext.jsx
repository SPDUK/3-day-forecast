import { useState, createContext, useContext, createRef } from 'react';
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

      // add current search to previously searched when making a new search - ignore if don't have one yet on start
      if (currentSearch.name) {
        setPreviousSearches((prevSearches) => [
          currentSearch,
          ...previousSearches,
        ]);
      }

      // no need to make API request again if we have the data already
      if (searchCache[city]) {
        return setCurrentSearch(searchCache[city]);
      }

      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},,GB&units=metric&appid=${apiKey}`;

      const { data } = await axios.get(url);
      const { list } = data;
      const { name } = data.city;

      console.log(data);
      // returns array of 40 length - 5 days = every 8 entries is 24 hours = we need 0, 7, 15
      const nextThreeDays = [list[0], list[7], list[15]];
      console.log({ nextThreeDays });

      const newWeatherData = {
        name,
        forecast: nextThreeDays,
      };

      setCurrentSearch(newWeatherData);
      setSearchCache((prevCache) => ({ ...prevCache, [name]: newWeatherData }));

      // enforces gb, e.g if searching Cambridge the UK one will come up, not the US one
    } catch (err) {
      setError('Invalid city, please try again');
    } finally {
      setLoading(false);
    }
  }

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
