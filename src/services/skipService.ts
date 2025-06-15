import axios from 'axios';
import type { Skip } from '../types/skip';

const API_BASE_URL = 'https://app.wewantwaste.co.uk/api';

export const getSkipsByLocation = async (postcode: string, area: string): Promise<Skip[]> => {
  // Try to load from local file first
  try {
    // @ts-ignore
    const skipData: Skip[] = (await import('../data/skipData.json')).default;
    if (Array.isArray(skipData) && skipData.length > 0) {
      // Optionally filter by postcode/area if needed
      return skipData.filter(
        (skip) =>
          (!postcode || skip.postcode === postcode) &&
          (!area || !skip.area || skip.area === area)
      );
    }
  } catch (err) {
    // If import fails (file missing), fall back to API
    console.warn('Local skipData.json not found or failed to load, falling back to API.');
  }

  // Fallback: fetch from API
  try {
    const response = await axios.get(`${API_BASE_URL}/skips/by-location`, {
      params: {
        postcode,
        area,
      },
    });
    console.log('API response data:', response.data);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('API returned non-array data:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching skips:', error);
    return []; // Return an empty array on error
  }
}; 