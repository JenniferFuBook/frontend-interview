import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { LatLngExpression } from 'leaflet';

export type PositionContextType = {
  position: LatLngExpression;
  setPosition: Dispatch<SetStateAction<LatLngExpression>>;
};

// Default to undefined so usePosition throws a clear error if accessed outside the provider.
// The context lives here, outside the provider's component file, so that editing
// the provider keeps React Fast Refresh working.
export const PositionContext = createContext<PositionContextType | undefined>(
  undefined
);

/**
 * Provide access to the PositionContext value.
 * Throw a descriptive error if called outside of PositionProvider
 * to make misconfigured component trees easier to diagnose.
 */
export const usePosition = () => {
  const context = useContext(PositionContext);
  if (!context) {
    throw new Error('usePosition must be used within a PositionProvider');
  }
  return context;
};
