import { MapContainer, TileLayer } from 'react-leaflet';
import { usePosition } from './usePosition';
import { LocationSearch } from './LocationSearch';
import { LocationMarker } from './LocationMarker';

/**
 * Compose the Leaflet map, the location search bar, and the marker with its weather popup.
 * - Read the current position from PositionContext to set the initial map center.
 * - Render a TileLayer sourced from OpenStreetMap for the base map tiles.
 * - Overlay LocationSearch so the user can fly to a named location.
 * - Add LocationMarker to display the selected position and its weather forecast.
 */
export const MapDisplay = () => {
  // Read the current map center from context — set by geolocation on first load.
  const { position } = usePosition();
  return (
    // Set the map center from context, not a static prop.
    <MapContainer className="map-container" center={position} zoom={5}>
      {/* Render the search bar as a Leaflet overlay, not in the normal DOM flow. */}
      <LocationSearch />

      {/* Base tile layer from OpenStreetMap. */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Track the selected position and show a weather popup. */}
      <LocationMarker />
    </MapContainer>
  );
};
