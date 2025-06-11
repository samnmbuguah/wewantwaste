import axios from 'axios';
import type { Skip } from '../types/skip';

const API_BASE_URL = 'https://app.wewantwaste.co.uk/api';

export const getSkipsByLocation = async (postcode: string, area: string): Promise<Skip[]> => {
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