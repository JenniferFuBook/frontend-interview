import L from 'leaflet';

/**
 * Geocode a free-text search string to a Leaflet LatLng using the
 * OpenStreetMap Nominatim API.
 *
 * @param query - The place name or address the user typed.
 * @returns A Leaflet LatLng for the top result, or null if no match or on error.
 */
export async function locationService(query: string) {
  try {
    // Encode the query string so special characters don't break the URL.
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );

    if (!res.ok) {
      console.error('Failed to fetch location.');
      return null;
    }

    const results = await res.json();

    if (results.length > 0) {
      const { lat, lon } = results[0];
      return L.latLng(parseFloat(lat), parseFloat(lon));
    }
    return null;
  } catch (err) {
    console.error('Error during location search:', err);
    return null;
  }
}
