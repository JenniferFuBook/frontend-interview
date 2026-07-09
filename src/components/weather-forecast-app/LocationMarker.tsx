import { useEffect, useRef } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import { usePosition } from './usePosition';
import { useWeatherForecast } from './useWeatherForecast';
import { WeatherForecastDisplay } from './WeatherForecastDisplay';

/**
 * Place a marker at the active position and show a popup with the hourly
 * weather forecast for that location.
 *
 * Key behaviors:
 * - Listen for map click events and update the shared PositionContext on each click.
 * - Fetch a fresh weather forecast whenever the position changes.
 * - Smoothly pan the map to the new position and auto-open the popup after panning.
 * - Show a loading spinner, an error message, or the forecast table inside the popup.
 */
export const LocationMarker = () => {
  // Pull position and setter from context to keep the marker and map center in sync.
  const { position, setPosition } = usePosition();

  // Hold a ref to the Leaflet marker instance to call openPopup() programmatically.
  const markerRef = useRef<L.Marker>(null);

  // Register a map-level click handler to update position when the user clicks the map.
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  // Fetch the hourly forecast for the current position; re-fetch on every position change.
  const { forecast, loading, error } = useWeatherForecast(position);

  useEffect(() => {
    if (!position) {
      return;
    }

    // Open the popup only after Leaflet finishes the flyTo animation.
    const openPopup = () => markerRef.current?.openPopup();
    map.once('moveend', openPopup);

    // Animate the map to the new position while keeping the current zoom level.
    map.flyTo(position, map.getZoom());

    // Remove the listener if the position changes again before the animation ends.
    return () => {
      map.off('moveend', openPopup);
    };
  }, [position, map]);

  return (
    <Marker position={position} ref={markerRef}>
      <Popup
        autoPan={true} // Pan the map if the popup would render outside the viewport.
        autoPanPadding={[50, 50]} // Keep 50px of map visible on each side of the popup.
      >
        {/* Render loading, error, or forecast content depending on fetch state. */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Unable to retrieve weather forecasts outside the United States.</div>
        ) : (
          forecast && <WeatherForecastDisplay forecast={forecast} />
        )}
      </Popup>
    </Marker>
  );
};
