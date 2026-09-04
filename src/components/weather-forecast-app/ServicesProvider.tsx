import {
  ServicesContext,
  defaultServices,
  ServicesProviderProps,
} from './useServices';

/**
 * Provide the location and weather services to the component tree. Defaults to
 * the production services; pass the `services` prop to override them, for
 * example with in-memory mocks in a test, without touching the components.
 */
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
