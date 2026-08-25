/**
 * Render the WeatherForecastApp by wrapping MapDisplay in the app providers.
 * - ServicesProvider injects the location and weather services (mockable in tests).
 * - PositionProvider supplies the shared position context to all map children.
 * - Delegate map rendering, location search, and weather display to MapDisplay.
 */
import { MapDisplay } from '../components/weather-forecast-app/MapDisplay';
import { PositionProvider } from '../components/weather-forecast-app/PositionContext';
import { ServicesProvider } from '../components/weather-forecast-app/useServices';
import 'leaflet/dist/leaflet.css';
import '../components/weather-forecast-app/index.css';

const WeatherForecastApp = () => {
  return (
    <ServicesProvider>
      <PositionProvider>
        <MapDisplay />
      </PositionProvider>
    </ServicesProvider>
  );
};

export default WeatherForecastApp;
