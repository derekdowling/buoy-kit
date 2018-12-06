import { buildURL, QueryParams } from '../utils';
import { Measurement } from './buoyData';

export const NDBC_WS_API = 'http://www.ndbc.noaa.gov/data/';

/**
 * Returns the necessary request configuration for making NOAA API calls.
 */
export function getNOAARequestConfig(): RequestInit {
  return {};
}

export function getNDBCEndpoint(
  apiResourcePath: string,
  queryParams: QueryParams = {},
): string {
  return buildURL(NDBC_WS_API, apiResourcePath, queryParams);
}

/**
 * Convenience function that returns the corresponding date object for a
 * buoy measurement.
 */
export function getMeasurementDate(measurement: Measurement): Date {
  const { year, month, day, hour, minute } = measurement;
  return new Date(year, month, day, hour, minute);
}
