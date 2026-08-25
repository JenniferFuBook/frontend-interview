import type { LatLngExpression } from 'leaflet';
import type { ForecastData } from './WeatherForecastTypes';
import { useEffect, useState } from 'react';
import { useServices } from './useServices';
import { ForecastUnavailableError } from './weatherServices';

/**
 * Fetch hourly weather forecast data for a given geographic position using
 * the two-step National Weather Service API: first fetch grid metadata for
 * the coordinates, then fetch the hourly forecast URL from that metadata.
 *
 * Key behaviors:
 * - Return forecast data, a loading flag, and an error string.
 * - Re-fetch automatically whenever position changes.
 * - Abort in-flight requests when position changes or the component unmounts,
 *   preventing stale responses from overwriting newer state.
 * - Points the service cannot forecast (abroad or over the ocean) return a 404
 *   at the metadata step; surface a friendly error state for display in the UI.
 */
export const useWeatherForecast = (position: LatLngExpression | null) => {
  // Hold the parsed forecast response once the two-step fetch completes.
  const [forecast, setForecast] = useState<ForecastData | null>(null);

  // True while any fetch is in progress.
  const [loading, setLoading] = useState(false);

  // Non-null when either fetch step fails or the API returns a non-OK status.
  const [error, setError] = useState<string | null>(null);

  // Code against the injected WeatherService; production calls the NWS API.
  const { weather } = useServices();

  useEffect(() => {
    if (!position) {
      return;
    }

    // Cancel in-progress requests when position changes or the component unmounts.
    const abortController = new AbortController();

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Delegate the two-step fetch to the injected WeatherService.
        const forecastData = await weather.getForecast(
          position,
          abortController.signal
        );
        setForecast(forecastData);
      } catch (err) {
        // Ignore aborted requests — a newer fetch or an unmount canceled this one.
        if ((err as Error).name === 'AbortError') {
          return;
        }
        // The service throws a typed error when the location has no forecast;
        // surface its message and fall back to a generic message otherwise.
        setError(
          err instanceof ForecastUnavailableError
            ? err.message
            : 'Could not load the forecast. Please try again.'
        );
      } finally {
        // Skip the loading reset for aborted requests so a newer fetch keeps its own loading state.
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    // Abort any pending fetch when the effect re-runs or the component unmounts.
    return () => {
      abortController.abort();
    };
  }, [position, weather]);

  return { forecast, loading, error };
};
