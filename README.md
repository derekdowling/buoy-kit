# Buoy Kit 🌊 🏄 🤙 

Fetch data about buoys in the ocean with JavaScript (or TypeScript) using NOAA data sources.

- Wave information via [NDBC APIs](https://www.ndbc.noaa.gov/docs/ndbc_web_data_guide.pdf).
- ([coming soon](https://github.com/derekdowling/buoy-kit/issues/2)) Tide information via [NOAA Tide API](https://tidesandcurrents.noaa.gov/api/)
- TypeScript support

```sh
yarn add buoy-kit
```

## Usage

`fetchBuoyRealTimeData` fetches, parses, and returns realtime2 station data (.txt extension):

```
import { fetchBuoyRealTimeData, BuoyData } from 'buoy-kit';

export async function getBuoy(buoyID: string): Promise<BuoyData> {
  let buoyData: BuoyData;
  
  try {
    buoyData = await fetchBuoyRealTimeData(buoyID: string);
  } catch (e) {
    console.log(e);
  }
  
  return buoyData;
}
```

## Finding A Buoy

There are plans to make it [easy](https://github.com/derekdowling/buoy-kit/issues/3) to find the closest buoy(s) to a nearby location. In the mean time, you can explore the world-wide buoy map on the [NDBC](https://www.ndbc.noaa.gov/) site and clicking on one of the squares. The number of the "Station" is the Buoy ID you would use. 

### On The Server (Node.js)

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
