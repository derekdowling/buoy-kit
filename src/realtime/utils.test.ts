import { getNDBCEndpoint } from './utils';

describe('noaa/utils', () => {
  describe(getNDBCEndpoint, () => {
    it('formats correctly', () => {
      expect(getNDBCEndpoint('/foo', { bar: 'baz' })).toMatchInlineSnapshot(
        `"http://www.ndbc.noaa.gov/data/foo?bar=baz"`,
      );
    });
  });
});
