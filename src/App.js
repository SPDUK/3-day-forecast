import CitySearch from './Components/CitySearch/CitySearch';
import Navbar from './Components/Navbar/Navbar';
import WeatherProvider from './contexts/WeatherContext';
import './styles/index.scss';

function App() {
  return (
    <WeatherProvider>
      <Navbar />
      <CitySearch />
    </WeatherProvider>
  );
}

export default App;
