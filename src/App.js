import CitySearch from './Components/CitySearch/CitySearch';
import Navbar from './Components/Navbar/Navbar';
import PreviousSearchList from './Components/PreviousSearchlist/PreviousSearchList';
import WeatherProvider from './contexts/WeatherContext';
import './styles/index.scss';

function App() {
  return (
    <WeatherProvider>
      <Navbar />
      <CitySearch />
      <PreviousSearchList />
    </WeatherProvider>
  );
}

export default App;
