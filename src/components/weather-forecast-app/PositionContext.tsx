import type { LatLngExpression } from 'leaflet';
import { useState, ReactNode } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { PositionContext } from './usePosition';
import { useCurrentPosition } from './useCurrentPosition';

/**
 * Store the user's active map position and expose a setter so any descendant
 * can update the map center without prop drilling.
 *
 * Key behaviors:
 * - Derive the active position: the user's explicit choice wins; the
 *   geolocation result from useCurrentPosition is the default.
 * - Store only the user's choice in state — the geolocation default is
 *   derived, not synchronized, so no effect is needed.
 * - Render nothing until a valid position is available, preventing a flash
 *   of a map centered on [0, 0].
 */
type PositionProviderProps = {
  children: ReactNode;
};

export const PositionProvider = ({ children }: PositionProviderProps) => {
  // Retrieve the device's geolocation asynchronously — result arrives after mount.
  const currentPosition = useCurrentPosition();

  // Track the user's explicit choice; null until the user selects a position.
  const [selectedPosition, setSelectedPosition] =
    useState<LatLngExpression | null>(null);

  // Derive the active position instead of syncing it in an effect.
  const position = selectedPosition ?? currentPosition ?? null;

  if (!position) { // Block rendering until a valid position is available.
    return null;
  }

  // Cast the setter to the non-null LatLngExpression type expected by consumers.
  return (
    <PositionContext.Provider
      value={{
        position,
        setPosition: setSelectedPosition as Dispatch<
          SetStateAction<LatLngExpression>
        >,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};
