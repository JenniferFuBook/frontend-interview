import { createContext, useContext, ReactNode } from 'react';
import {
  WeatherAppServices,
  nominatimLocationService,
  nwsWeatherService,
} from './weatherServices';

/**
 * Inject the app's location and weather services through context, so components
 * code against the service interfaces instead of importing concrete fetches.
 * Defaults to the production services; a test or preview can supply mocks via
 * the `services` prop on ServicesProvider without touching the components.
 */
const defaultServices: WeatherAppServices = {
  location: nominatimLocationService,
  weather: nwsWeatherService,
};

const ServicesContext = createContext<WeatherAppServices>(defaultServices);

type ServicesProviderProps = {
  children: ReactNode;
  // Override the production services, e.g. with in-memory mocks in tests.
  services?: WeatherAppServices;
};

export const ServicesProvider = ({
  children,
  services = defaultServices,
}: ServicesProviderProps) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

// Access the injected location and weather services.
export const useServices = () => useContext(ServicesContext);
