import { ForecastData } from './WeatherForecastTypes';

// Map NWS cardinal wind direction strings to rotation degrees for the arrow icon.
const directionToDegrees: Record<string, number> = {
  N: 0,
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5,
};

/**
 * Render a pivoted hourly weather table for the first 10 hours of a
 * National Weather Service forecast.
 *
 * Layout: time slots run as columns; weather attributes (icon, temperature,
 * wind direction, wind speed) run as rows. Rotate the wind direction arrow
 * using the directionToDegrees lookup; expose the raw cardinal string as a tooltip.
 */
type WeatherDisplayProps = {
  forecast: ForecastData;
};

export const WeatherForecastDisplay = ({ forecast }: WeatherDisplayProps) => {
  const periods = forecast.properties.periods.slice(0, 10); // Display 10 hours of forecast data.
  // Month + day only, e.g. "July 9" — omit the year.
  const displayDate = new Date(periods[0].startTime).toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric' },
  );

  return (
    <div className="weather-forecast-display">
      <h3>Weather Display ({displayDate})</h3>
      <h4>Hourly forecast</h4>
      {/* Pivoted table: time as columns, weather attributes as rows. */}
      <table className="weather-forecast-table">
        <thead>
          {/* Header row: one column per forecast hour. */}
          <tr>
            <th scope="col">Time</th>
            {periods.map((item) => {
              const time = new Date(item.startTime);
              const hour = `0${time.getHours()}`.slice(-2);
              const minute = `0${time.getMinutes()}`.slice(-2);
              return <th scope="col" key={item.startTime}>{`${hour}:${minute}`}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {/* Row 1: weather icon and short forecast description. */}
          <tr>
            <th scope="row" className="row-header">Weather</th>
            {periods.map((item) => (
              <td key={item.startTime} className="icon-row">
                <img
                  src={item.icon}
                  width="40"
                  height="40"
                  alt={item.shortForecast}
                />
                <div>{item.shortForecast}</div>
              </td>
            ))}
          </tr>
          {/* Row 2: temperature with unit. */}
          <tr>
            <th scope="row" className="row-header">Temperature</th>
            {periods.map((item) => (
              <td key={item.startTime} className="darker-row">
                {`${item.temperature}°${item.temperatureUnit}`}
              </td>
            ))}
          </tr>
          {/* Row 3: wind direction as a rotated arrow; title exposes the cardinal string as a tooltip. */}
          <tr>
            <th scope="row" className="row-header">Wind direction</th>
            {periods.map((item) => {
              // Convert the cardinal direction string to a CSS rotation angle.
              const deg = directionToDegrees[item.windDirection] ?? 0;

              return (
                <td
                  key={item.startTime}
                  className="wind-direction"
                  style={{
                    transform: `rotate(${deg}deg)`,
                  }}
                  title={item.windDirection}
                >
                  ↑
                </td>
              );
            })}
          </tr>
          {/* Row 4: wind speed string (e.g. "10 mph") from the API response. */}
          <tr>
            <th scope="row" className="row-header">Wind speed</th>
            {periods.map((item) => (
              <td key={item.startTime} className="lighter-row">
                {item.windSpeed}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
