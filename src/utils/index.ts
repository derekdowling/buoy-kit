/**
 * Represents key/values that can be turned into a URL query string.
 */
export interface QueryParams {
  [key: string]: string | number;
}

/**
 * Returns a formatted query string for a query param set, or an empty string
 * if the set is empty.
 */
export function formatQueryParams(params: QueryParams): string {
  const queryKeys = Object.keys(params);
  if (queryKeys.length === 0) {
    return '';
  }

  return '?' + queryKeys.map(key => `${key}=${params[key]}`).join('&');
}

/**
 * Utility for joining an origin (www.foo.com) with a path (/bar/baz) and ensuring
 * that there isn't an accidental double slash.
 */
export function joinPathParts(origin: string, path: string): string {
  return origin.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}

/**
 * Assembles a full URL given an origin, path, and params.
 */
export function buildURL(
  origin: string,
  path: string,
  params: QueryParams,
): string {
  const fullPath = joinPathParts(origin, path);
  const queryParams = formatQueryParams(params);

  return fullPath + queryParams;
}
