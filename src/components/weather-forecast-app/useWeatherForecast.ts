import type { LatLngExpression } from 'leaflet';
import type { ForecastData } from './WeatherForecastTypes';
import { useEffect, useState } from 'react';

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

        const [lat, lon] = Array.isArray(position)
          ? position
          : [position.lat, position.lng];

        // Step 1: Fetch grid metadata — the NWS API requires this to resolve the forecast URL.
        const metadataRes = await fetch(
          `https://api.weather.gov/points/${lat},${lon}`,
          { signal: abortController.signal },
        );
        if (!metadataRes.ok) {
          setError(
            metadataRes.status === 404
              ? 'No forecast is available for this location.'
              : 'Could not load the forecast. Please try again.'
          );
          return;
        }

        const metadata = await metadataRes.json();

        if (!metadata.properties.forecastHourly) {
          setError('Could not load the forecast. Please try again.');
          return;
        }

        // Step 2: Fetch the hourly forecast from the URL returned in the metadata.
        const forecastRes = await fetch(metadata.properties.forecastHourly, {
          signal: abortController.signal,
        });
        if (!forecastRes.ok) {
          setError('Could not load the forecast. Please try again.');
          return;
        }

        const forecastData: ForecastData = await forecastRes.json();

        setForecast(forecastData);
      } catch (err) {
        // Ignore aborted requests — a newer fetch or an unmount canceled this one.
        if ((err as Error).name === 'AbortError') {
          return;
        }
        console.error((err as Error).message);
        setError('Could not load the forecast. Please try again.');
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
  }, [position]);

  return { forecast, loading, error };
};
