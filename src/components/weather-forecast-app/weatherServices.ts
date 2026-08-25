import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import type { ForecastData } from './WeatherForecastTypes';

/**
 * The two external integrations the weather app depends on, expressed as
 * interfaces so the UI codes against a contract rather than a concrete fetch.
 * Production implementations live below; tests inject mocks through the same
 * shape (see useServices).
 */
export interface LocationService {
  // Geocode a free-text query to coordinates, or null when there is no match.
  geocode(query: string): Promise<LatLngExpression | null>;
}

export interface WeatherService {
  // Fetch the hourly forecast for a position. Throws on failure so the caller
  // maps errors to UI state; pass an AbortSignal to cancel in-flight requests.
  getForecast(
    position: LatLngExpression,
    signal?: AbortSignal
  ): Promise<ForecastData>;
}

export interface WeatherAppServices {
  location: LocationService;
  weather: WeatherService;
}

// Thrown when the NWS API has no forecast for a point (abroad or over the ocean).
export class ForecastUnavailableError extends Error {
  constructor(message = 'No forecast is available for this location.') {
    super(message);
    this.name = 'ForecastUnavailableError';
  }
}

// Production geocoder backed by the OpenStreetMap Nominatim API.
export const nominatimLocationService: LocationService = {
  async geocode(query: string) {
    // Encode the query so special characters do not break the URL.
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );
    if (!res.ok) {
      throw new Error('Could not look up that location. Please try again.');
    }
    const results = await res.json();
    if (results.length > 0) {
      const { lat, lon } = results[0];
      return L.latLng(parseFloat(lat), parseFloat(lon));
    }
    return null;
  },
};

// Production forecast service backed by the two-step National Weather Service API.
export const nwsWeatherService: WeatherService = {
  async getForecast(position, signal) {
    const [lat, lon] = Array.isArray(position)
      ? position
      : [position.lat, position.lng];

    // Step 1: fetch grid metadata for the coordinates to resolve the forecast URL.
    const metadataRes = await fetch(
      `https://api.weather.gov/points/${lat},${lon}`,
      { signal }
    );
    if (!metadataRes.ok) {
      // A 404 means the service cannot forecast this point (abroad or marine).
      if (metadataRes.status === 404) {
        throw new ForecastUnavailableError();
      }
      throw new Error('Could not load the forecast. Please try again.');
    }

    const metadata = await metadataRes.json();
    if (!metadata.properties?.forecastHourly) {
      throw new Error('Could not load the forecast. Please try again.');
    }

    // Step 2: fetch the hourly forecast from the URL returned in the metadata.
    const forecastRes = await fetch(metadata.properties.forecastHourly, {
      signal,
    });
    if (!forecastRes.ok) {
      throw new Error('Could not load the forecast. Please try again.');
    }

    return (await forecastRes.json()) as ForecastData;
  },
};
