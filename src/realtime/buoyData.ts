// Schema: https://www.ndbc.noaa.gov/mods.shtml

/**
 * Real-time water measurement data.
 */
export interface WaterMeasurement {
  /**
   * Average wave period (seconds) of all waves during the 20-minute period.
   */
  averagePeriod: number;
  /**
   * The direction from which the waves at the dominant period (DPD) are coming.
   * The units are degrees from true North, increasing clockwise, with North as 0 (zero) degrees and East as 90 degrees.
   */
  dominantDirection: number;
  /**
   * Dominant wave period (seconds) is the period with the maximum wave energy.
   */
  dominantPeriod: number;
  /**
   * Significant wave height (meters) is calculated as the average of the highest one-third of all of the wave heights
   * during the 20-minute sampling period.
   */
  significantHeight: number;
  /**
   * Sea surface temperature (Celsius).
   */
  surfaceTemperature: number;
  /**
   * The water level in feet above or below Mean Lower Low Water (MLLW).
   * https://tidesandcurrents.noaa.gov/datum_options.html#MLLW
   */
  tide: number;
}

/**
 * Real-time wind measurement data.
 */
export interface WindMeasurement {
  /**
   * Wind direction (the direction the wind is coming from in degrees clockwise
   * from true N) during the same period used for WSPD.
   */
  direction: number;
  /**
   * WSPD	Wind speed (m/s) averaged over an eight-minute period for buoys and a
   * two-minute period for land stations. Reported Hourly.
   */
  averageSpeed: number;
  /**
   * Peak 5 or 8 second gust speed (m/s) measured during the eight-minute or two-minute period.
   * The 5 or 8 second period can be determined by payload,
   */
  peekGustSpeed: number;
}

/**
 * A single real-time buoy data measurement.
 */
export interface Measurement {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  /**
   * Air temperature (Celsius).
   */
  airTemperature: number;
  /**
   * Dewpoint temperature taken at the same height as the air temperature measurement.
   */
  dewpointTemperature: number;
  /**
   * Pressure Tendency is the direction (plus or minus) and the amount of pressure change (hPa)for a three hour period
   * ending at the time of observation. (not in Historical files)
   */
  pressureTendancy: number;
  /**
   * Sea level pressure (hPa).
   */
  seaLevelPressure: number;
  /**
   * Station visibility (nautical miles). Note that buoy stations are limited to
   * reports from 0 to 1.6 nmi.
   */
  stationVisibility: number;
  water: WaterMeasurement;
  wind: WindMeasurement;
}

export interface BuoyData {
  id: string;
  /**
   * 30 minute slices of Buoy data from latest to oldest.
   */
  measurements: Measurement[];
}
