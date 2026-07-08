import { useEffect, useState } from 'react';
import L, { LatLng } from 'leaflet';

const DEFAULT_POSITION = L.latLng(37.7749, -122.4194); // San Francisco

/**
 * Retrieve the device's geographic location via the browser Geolocation API
 * and return it as a Leaflet LatLng.
 *
 * Key behaviors:
 * - Return undefined on first render; update asynchronously once the
 *   browser resolves (or denies) the geolocation request.
 * - Fall back to San Francisco if geolocation is unsupported or if the
 *   user denies permission.
 * - Call getCurrentPosition only once on mount — avoid using this hook
 *   in multiple components; share the result through PositionContext instead.
 */
export function useCurrentPosition() {
  // Fall back immediately if the browser does not support geolocation;
  // otherwise start as undefined and set once geolocation resolves.
  const [currentPosition, setCurrentPosition] = useState<LatLng | undefined>(
    () => (navigator.geolocation ? undefined : DEFAULT_POSITION)
  );

  useEffect(() => {
    // The unsupported case is already handled by the initial state above.
    if (!navigator.geolocation) {
      return;
    }

    // Request the device's current position once on mount.
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Convert the raw GeolocationCoordinates to a Leaflet LatLng.
        setCurrentPosition(L.latLng(pos.coords.latitude, pos.coords.longitude));
      },
      () => {
        // Fall back to the default position if permission is denied or an error occurs.
        setCurrentPosition(DEFAULT_POSITION);
      }
    );
  }, []);

  return currentPosition;
}
