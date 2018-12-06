import {
  getFieldOrderList,
  parseBuoyData,
  parseMeasurement,
  splitRows,
} from './parser';

const TEST_DATA = `
#YY  MM DD hh mm WDIR WSPD GST  WVHT   DPD   APD MWD   PRES  ATMP  WTMP  DEWP  VIS PTDY  TIDE\n
#yr  mo dy hr mn degT m/s  m/s     m   sec   sec degT   hPa  degC  degC  degC  nmi  hPa    ft\n
2018 12 04 06 00  MM   MM   MM   0.8    13   3.7 220     MM    MM  14.2    MM   MM   MM    MM\n
2018 12 04 05 30  MM   MM   MM   0.9    13   3.5 218     MM    MM  14.1    MM   MM   MM    MM`;

describe('parser', () => {
  describe(getFieldOrderList, () => {
    it('splits on more than whitespace', () => {
      expect(getFieldOrderList('APD ATMP  DPD      WVHT')).toEqual([
        'APD',
        'ATMP',
        'DPD',
        'WVHT',
      ]);
    });
  });

  describe(parseMeasurement, () => {
    it('returns null if a row does not have an expected number of fields', () => {
      expect(parseMeasurement('2018 12 04 05', [])).toEqual(null);
    });

    it('parses a measurement into the expected fields', () => {
      const rows = splitRows(TEST_DATA);
      const fieldOrder = getFieldOrderList(rows[0]);

      expect(parseMeasurement(rows[2], fieldOrder)).toMatchInlineSnapshot(`
Object {
  "airTemperature": NaN,
  "day": 4,
  "dewpointTemperature": NaN,
  "hour": 6,
  "minute": 0,
  "month": 12,
  "pressureTendancy": NaN,
  "seaLevelPressure": NaN,
  "stationVisibility": NaN,
  "water": Object {
    "averagePeriod": 3.7,
    "dominantDirection": 220,
    "dominantPeriod": 13,
    "significantHeight": 0.8,
    "surfaceTemperature": 14.2,
    "tide": NaN,
  },
  "wind": Object {
    "averageSpeed": NaN,
    "direction": NaN,
    "peekGustSpeed": NaN,
  },
  "year": 2018,
}
`);
    });
  });

  describe(parseBuoyData, () => {
    it('returns a buoy with two measurements for the test data', () => {
      const result = parseBuoyData('1234', TEST_DATA);

      // Make sure the first measurement is the first row
      expect(result.measurements).toHaveLength(2);
      expect(result.measurements[0].hour).toEqual(6);
      expect(result.measurements[0].minute).toEqual(0);
      expect(result).toMatchInlineSnapshot(`
Object {
  "id": "1234",
  "measurements": Array [
    Object {
      "airTemperature": NaN,
      "day": 4,
      "dewpointTemperature": NaN,
      "hour": 6,
      "minute": 0,
      "month": 12,
      "pressureTendancy": NaN,
      "seaLevelPressure": NaN,
      "stationVisibility": NaN,
      "water": Object {
        "averagePeriod": 3.7,
        "dominantDirection": 220,
        "dominantPeriod": 13,
        "significantHeight": 0.8,
        "surfaceTemperature": 14.2,
        "tide": NaN,
      },
      "wind": Object {
        "averageSpeed": NaN,
        "direction": NaN,
        "peekGustSpeed": NaN,
      },
      "year": 2018,
    },
    Object {
      "airTemperature": NaN,
      "day": 4,
      "dewpointTemperature": NaN,
      "hour": 5,
      "minute": 30,
      "month": 12,
      "pressureTendancy": NaN,
      "seaLevelPressure": NaN,
      "stationVisibility": NaN,
      "water": Object {
        "averagePeriod": 3.5,
        "dominantDirection": 218,
        "dominantPeriod": 13,
        "significantHeight": 0.9,
        "surfaceTemperature": 14.1,
        "tide": NaN,
      },
      "wind": Object {
        "averageSpeed": NaN,
        "direction": NaN,
        "peekGustSpeed": NaN,
      },
      "year": 2018,
    },
  ],
}
`);
    });
  });
});
