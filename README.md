# Buoy Kit 🌊 🏄 🤙 

Fetch data about buoys in the ocean using JavaScript (or TypeScript) using NOAA data sources.

- Wave information via [NDBC APIs](https://www.ndbc.noaa.gov/docs/ndbc_web_data_guide.pdf).
- (coming soon) Tide information via [NOAA Tide API](https://tidesandcurrents.noaa.gov/api/)
- TypeScript support

```sh
yarn add buoy-kit
```

## Usage

`fetchBuoyRealTimeData` fetches, parses, and returns realtime2 station data (.txt extension):

```
import { fetchBuoyRealTimeData, BuoyData } from 'buoy-kit';

export function getBuoy(buoyID: string): BuoyData {
  let buoyData: BuoyData;
  
  try {
    buoyData = fetchBuoyRealTimeData(buoyID: string);
  } catch (e) {
    console.log(e);
  }
  
  return buoyData;
}
```

### On The Server

This library uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to manage
HTTP requests. You'll want to import [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) if
you're using this library in a Node environment. 

```
yarn add isomorphic-fetch
```

Then in your server's initialization file, polyfill Fetch via:
```
require('isomorphic-fetch');
```
