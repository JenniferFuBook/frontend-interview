/**
 * Represent the National Weather Service forecast data for a single hour-long period.
 *
 * Key fields:
 * - startTime: ISO 8601 string marking the start of the forecast period.
 * - temperature / temperatureUnit: numeric value and its unit ("F" or "C").
 * - shortForecast: brief prose description (e.g. "Mostly Sunny").
 * - icon: URL to the NWS icon image for this period's weather condition.
 * - windDirection: cardinal or intercardinal string (e.g. "N", "SSW").
 * - windSpeed: formatted string from the API (e.g. "10 mph").
 */
export type ForecastPeriod = {
  startTime: string;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  icon: string;
  windDirection: string;
  windSpeed: string;
};

export type ForecastData = {
  properties: {
    periods: ForecastPeriod[];
  };
};
