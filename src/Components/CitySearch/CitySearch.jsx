import React, { useState, useEffect } from 'react';
import { useWeatherContext } from '../../contexts/WeatherContext';
import { capitalizeEachWord, onlyLettersAndSpacesRegex } from '../../utils';
import CityWeatherList from '../CityWeatherList/CityWeatherList';

import {
  input,
  container,
  form,
  title,
  inputError,
  errorText,
} from './city-search.module.scss';

function CitySearch() {
  const [searchValue, setSearchValue] = useState('');

  const { loading, error, searchForCity, currentSearch } = useWeatherContext();

  function handleSearchSubmit(event) {
    event.preventDefault();

    // filter out anything not alphabetical -> replace searchValue with it to display back to user
    const sanitizedSearch = capitalizeEachWord(
      searchValue.replace(onlyLettersAndSpacesRegex, '').trim()
    );

    if (sanitizedSearch !== searchValue) {
      setSearchValue(sanitizedSearch);
    }

    // do nothing if no valid search
    if (!sanitizedSearch) return null;

    searchForCity(sanitizedSearch);
  }

  function handleSearchChange({ target: { value } }) {
    setSearchValue(value);
  }

  return (
    <div className={container}>
      <h1 className={title}>Search for a city</h1>
      <form className={form} onSubmit={handleSearchSubmit}>
        <input
          disabled={loading}
          className={`${input} ${error ? inputError : ''}`}
          type="text"
          onChange={handleSearchChange}
          value={searchValue}
          placeholder="Search"
          required
        />
        {error ? <div className={errorText}>{error}</div> : null}
        {currentSearch.name && <CityWeatherList forecastData={currentSearch} />}
      </form>
    </div>
  );
}

export default CitySearch;
