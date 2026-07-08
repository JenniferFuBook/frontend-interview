import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { usePosition } from './usePosition';
import { locationService } from './locationService';

/**
 * Render a search form overlaid on the Leaflet map. Accept a place name,
 * geocode it via the Nominatim API, and update the shared PositionContext
 * so the map flies to the result.
 *
 * Key behaviors:
 * - Disable Leaflet's built-in click and scroll capture on the form element
 *   so typing and scrolling inside the input do not interact with the map.
 * - Clear the input field immediately on submit, before the async fetch resolves.
 * - Silently ignore submissions of blank or whitespace-only queries.
 */
export const LocationSearch = () => {
  // Controlled input value for the search field.
  const [query, setQuery] = useState('');

  // Call setPosition from context to move the map center when a location is found.
  const { setPosition } = usePosition();

  // Hold a ref to the form DOM node to disable Leaflet event propagation.
  const formRef = useRef<HTMLFormElement>(null);

  // Disable Leaflet's pointer and scroll capture on the form so the input remains usable while the map is active.
  useEffect(() => {
    const container = formRef.current;
    if (container) {
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);
    }
  }, []);

  // Geocode the query and update the map position on a valid result.
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit.
    setQuery(''); // Clear the input immediately, before the fetch resolves.
    if (query.trim().length === 0) {
      return;
    }

    // Delegate geocoding to locationService, which calls the Nominatim API.
    const queriedPosition = await locationService(query);
    if (queriedPosition) {
      setPosition(queriedPosition);
    }

  };

  return (
    // Render the form inside the Leaflet map DOM, isolated from map events.
    <form className="location-search" ref={formRef} onSubmit={handleSearch}>
      <input
        id="search-bar"
        type="text"
        aria-label="Search location"
        value={query}
        placeholder="Search location..."
        // Keep query state in sync with user input on every keystroke.
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Go</button>
    </form>
  );
};
