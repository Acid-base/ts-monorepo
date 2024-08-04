// my-medusa-store/frontend/src/api/utils.ts
import { AxiosResponse } from 'axios';
import axios from 'axios';

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
