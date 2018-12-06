import { BuoyData } from './buoyData';
import { parseBuoyData } from './parser';
import { getNDBCEndpoint, getNOAARequestConfig } from './utils';

export interface BuoyRealTimeDataOptions {
  buoyID: string;
}

/**
 * https://www.ndbc.noaa.gov/docs/ndbc_web_data_guide.pdf
 */
export async function fetchBuoyRealTimeData(
  options: BuoyRealTimeDataOptions,
): Promise<BuoyData> {
  const endpoint = getNDBCEndpoint(`realtime2/${options.buoyID}.txt`);

  const result = await fetch(endpoint, getNOAARequestConfig());
  if (!result.ok) {
    const errorMessage = 'Error fetching buoy data';
    console.error(errorMessage, result);
    throw new Error(errorMessage);
  }

  const buoyDataText = await result.text();
  return parseBuoyData(options.buoyID, buoyDataText);
}
