import { buildURL, formatQueryParams, joinPathParts } from './index';

describe('utils/url', () => {
  describe(formatQueryParams, () => {
    it('returns a ? prefixed query string', () => {
      expect(formatQueryParams({ foo: 'bar' })).toEqual('?foo=bar');
    });

    it('returns multiple query values separated via &', () => {
      expect(formatQueryParams({ foo: 'bar', bing: 'baz' })).toEqual(
        '?foo=bar&bing=baz',
      );
    });

    it('returns an empty string if no params are provided', () => {
      expect(formatQueryParams({})).toEqual('');
    });
  });

  describe(joinPathParts, () => {
    it('joins an origin and a path with a single /', () => {
      expect(joinPathParts('www.foo.com', 'bar')).toEqual('www.foo.com/bar');
      expect(joinPathParts('www.foo.com/', '/bar')).toEqual('www.foo.com/bar');
    });
  });

  describe(buildURL, () => {
    it('returns a full formatted URL', () => {
      expect(
        buildURL('www.foo.com', 'bar', { baz: 'boop' }),
      ).toMatchInlineSnapshot(`"www.foo.com/bar?baz=boop"`);
    });
  });
});
