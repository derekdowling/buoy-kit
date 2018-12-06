import { BuoyData, Measurement } from './buoyData';

/**
 * Raw fields as defined in NBDC data sets. We use this for validation to ensure
 * we don't encounter any unexpected values that we don't know how to map.
 */
enum RawRealtimeField {
  '#YY' = '#YY',
  APD = 'APD',
  ATMP = 'ATMP',
  DD = 'DD',
  DEWP = 'DEWP',
  DPD = 'DPD',
  GST = 'GST',
  hh = 'hh',
  mm = 'mm',
  MM = 'MM',
  MWD = 'MWD',
  PRES = 'PRES',
  PTDY = 'PTDY',
  TIDE = 'TIDE',
  VIS = 'VIS',
  WDIR = 'WDIR',
  WSPD = 'WSPD',
  WTMP = 'WTMP',
  WVHT = 'WVHT',
  /**
   * Special value we add to handle fields we might encounter that  we don't yet
   * support.
   */
  UNKNOWN = 'unknown',
}

/**
 * Parses the first row of a NDBC realtime file to determine the order
 * of fields in the column.
 */
export function getFieldOrderList(rawFieldOrder: string): RawRealtimeField[] {
  // there are an arbitrary number of spaces between measurements which is why
  // we split on one or more white-spaces
  const splitFields = rawFieldOrder.split(/\s+/);

  return splitFields.map(field => {
    switch (field) {
      case '#YY':
        return RawRealtimeField['#YY'];
      case RawRealtimeField.APD:
        return RawRealtimeField.APD;
      case RawRealtimeField.ATMP:
        return RawRealtimeField.ATMP;
      case RawRealtimeField.DD:
        return RawRealtimeField.DD;
      case RawRealtimeField.DEWP:
        return RawRealtimeField.DEWP;
      case RawRealtimeField.DPD:
        return RawRealtimeField.DPD;
      case RawRealtimeField.GST:
        return RawRealtimeField.GST;
      case RawRealtimeField.hh:
        return RawRealtimeField.hh;
      case RawRealtimeField.mm:
        return RawRealtimeField.mm;
      case RawRealtimeField.MM:
        return RawRealtimeField.MM;
      case RawRealtimeField.MWD:
        return RawRealtimeField.MWD;
      case RawRealtimeField.PRES:
        return RawRealtimeField.PRES;
      case RawRealtimeField.PTDY:
        return RawRealtimeField.PTDY;
      case RawRealtimeField.TIDE:
        return RawRealtimeField.TIDE;
      case RawRealtimeField.VIS:
        return RawRealtimeField.VIS;
      case RawRealtimeField.WDIR:
        return RawRealtimeField.WDIR;
      case RawRealtimeField.WSPD:
        return RawRealtimeField.WSPD;
      case RawRealtimeField.WTMP:
        return RawRealtimeField.WTMP;
      case RawRealtimeField.WVHT:
        return RawRealtimeField.WVHT;
      default: {
        console.error(`Encountered unexpected NDBC real-time data field: ${field}`);
        return RawRealtimeField.UNKNOWN;
      }
    }
  });
}

/**
 * Creates a new measurement object with uninitialized values.
 */
export function createMeasurement(): Measurement {
  return {
    airTemperature: Number.NaN,
    day: Number.NaN,
    dewpointTemperature: Number.NaN,
    hour: Number.NaN,
    minute: Number.NaN,
    month: Number.NaN,
    pressureTendancy: Number.NaN,
    seaLevelPressure: Number.NaN,
    stationVisibility: Number.NaN,
    water: {
      averagePeriod: Number.NaN,
      dominantDirection: Number.NaN,
      dominantPeriod: Number.NaN,
      significantHeight: Number.NaN,
      surfaceTemperature: Number.NaN,
      tide: Number.NaN,
    },
    wind: {
      averageSpeed: Number.NaN,
      direction: Number.NaN,
      peekGustSpeed: Number.NaN,
    },
    year: Number.NaN,
  };
}

/**
 * Parses a measurement for a white-space separated measurement string and an
 * expected ordering of field.
 */
export function parseMeasurement(
  rawMeasurement: string,
  fieldOrderList: RawRealtimeField[],
): Measurement | null {
  // there are an arbitrary number of spaces between measurements which is why
  // we split on one or more white-spaces
  const fields = rawMeasurement.split(/\s+/);
  const measurement = createMeasurement();

  // Ensure that the row we are parsing has the same number of fields as we
  // expect based on the file's column labelling
  if (fields.length !== fieldOrderList.length) {
    console.error('Row has unexpected number of fields', {
      fieldOrderList,
      rowFields: fields,
    });
    return null;
  }

  fields.forEach((value, index) => {
    const field = fieldOrderList[index];

    switch (field) {
      case RawRealtimeField['#YY']:
        measurement.year = +value;
        break;
      case RawRealtimeField.APD:
        measurement.water.averagePeriod = +value;
        break;
      case RawRealtimeField.ATMP:
        measurement.airTemperature = +value;
        break;
      case RawRealtimeField.DD:
        measurement.day = +value;
        break;
      case RawRealtimeField.DEWP:
        measurement.dewpointTemperature = +value;
        break;
      case RawRealtimeField.DPD:
        measurement.water.dominantPeriod = +value;
        break;
      case RawRealtimeField.GST:
        measurement.wind.peekGustSpeed = +value;
        break;
      case RawRealtimeField.hh:
        measurement.hour = +value;
        break;
      case RawRealtimeField.mm:
        measurement.minute = +value;
        break;
      case RawRealtimeField.MM:
        measurement.month = +value;
        break;
      case RawRealtimeField.MWD:
        measurement.water.dominantDirection = +value;
        break;
      case RawRealtimeField.PRES:
        measurement.seaLevelPressure = +value;
        break;
      case RawRealtimeField.PTDY:
        measurement.pressureTendancy = +value;
        break;
      case RawRealtimeField.TIDE:
        measurement.water.tide = +value;
        break;
      case RawRealtimeField.VIS:
        measurement.stationVisibility = +value;
        break;
      case RawRealtimeField.WDIR:
        measurement.wind.direction = +value;
        break;
      case RawRealtimeField.WSPD:
        measurement.wind.averageSpeed = +value;
        break;
      case RawRealtimeField.WTMP:
        measurement.water.surfaceTemperature = +value;
        break;
      case RawRealtimeField.WVHT:
        measurement.water.significantHeight = +value;
        break;
      default: {
        // we don't know what this field is, skip it
      }
    }
  });

  return measurement;
}

/**
 * Splits a buoy data file into individual rows.
 */
export function splitRows(rawData: string): string[] {
  return rawData.split('\n').filter(row => row !== '');
}

/**
 * Parses a NDBC real-time buoy file and returns formatted data.
 */
export function parseBuoyData(buoyID: string, rawData: string): BuoyData {
  const rawDataRows = splitRows(rawData);
  const fieldOrderList = getFieldOrderList(rawDataRows[0]);

  const data: BuoyData = {
    id: buoyID,
    measurements: [],
  };

  // iterate over data rows, skip row 0 (labels) and 1 (measurement unit for labels).
  for (let r = 2; r < rawDataRows.length; r++) {
    const row = rawDataRows[r];
    const measurement = parseMeasurement(row, fieldOrderList);

    // If nothing went wrong with parsing, push it into the set
    if (measurement) {
      data.measurements.push(measurement);
    }
  }

  return data;
}
