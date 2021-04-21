import React, { useState, createRef } from 'react';
import debounce from 'lodash.debounce';
import { useWeatherContext } from '../../contexts/WeatherContext';
import { capitalizeEachWord, onlyLettersAndSpacesRegex } from '../../utils';
import CityWeatherList from '../CityWeatherList/CityWeatherList';

import cities from '../../utils/cities';

import {
  input,
  container,
  form,
  title,
  inputError,
  errorText,
  suggestionButton,
  suggestionContainer,
} from './city-search.module.scss';

function CitySearch() {
  const inputRef = createRef();
  const [searchValue, setSearchValue] = useState('');

  // this would be very slow for every city in the world - ideally in that case it would just use an API instead
  const [suggestions, setSuggestions] = useState([]);

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

  const getSuggestions = debounce((value) => {
    const newSuggestions = [];

    for (const city of cities) {
      // stop at 3 suggestions
      if (suggestions.length === 3) break;

      const query = value.toLowerCase();
      if (city.startsWith(query)) {
        newSuggestions.push(city);
      }
    }

    setSuggestions(newSuggestions);
  }, 400);

  function handleSearchChange({ target: { value } }) {
    setSearchValue(value);

    if (value && value.length > 1) {
      getSuggestions(value);
    }
  }

  function selectSuggestion(suggestion) {
    const capitalizedSuggestion = capitalizeEachWord(suggestion);
    setSearchValue(capitalizedSuggestion);

    inputRef.current.focus();
  }

  return (
    <div className={container}>
      <h1 className={title}>Search for a city</h1>
      <form className={form} onSubmit={handleSearchSubmit}>
        <input
          id="citySearchInput"
          disabled={loading}
          ref={inputRef}
          className={`${input} ${error ? inputError : ''}`}
          type="text"
          onChange={handleSearchChange}
          value={searchValue}
          placeholder="Search"
          required
        />
        {error ? <div className={errorText}>{error}</div> : null}

        <div className={suggestionContainer}>
          {suggestions.map((suggestion) => (
            <button
              name={suggestion}
              type="button"
              className={suggestionButton}
              onClick={() => selectSuggestion(suggestion)}
              key={suggestion}
            >
              {capitalizeEachWord(suggestion)}
            </button>
          ))}
        </div>

        {currentSearch.name && <CityWeatherList forecastData={currentSearch} />}
      </form>
    </div>
  );
}

export default CitySearch;
