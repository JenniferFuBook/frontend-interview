/**
 * Render the WeatherForecastApp by wrapping MapDisplay in PositionProvider.
 * - Supply the shared position context to all map child components.
 * - Delegate map rendering, location search, and weather display to MapDisplay.
 */
import { MapDisplay } from '../components/weather-forecast-app/MapDisplay';
import { PositionProvider } from '../components/weather-forecast-app/PositionContext';
import 'leaflet/dist/leaflet.css';
import '../components/weather-forecast-app/index.css';

const WeatherForecastApp = () => {
  return (
    <PositionProvider>
      <MapDisplay />
    </PositionProvider>
  );
};

export default WeatherForecastApp;
