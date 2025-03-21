import { API_BASE_URL, API_KEY } from "~/constants/api-constants";
import type { IMovieandSeries } from "~/types/interfaces/IMovieandSeries";
import type { IMovieandSeriesResponse } from "~/types/interfaces/IMovieandSeriesResponse";

export function useSeriesAPI() {
  // Fetch popular series
  const fetchSeries = (page = 1) => {
    return $fetch<IMovieandSeriesResponse>(`${API_BASE_URL}`, {
      params: {
        apikey: API_KEY,
        s: 'series', // Search term, you can change this
        type: 'series',
        page
      }
    });
  };
  
  // Fetch series details
  const fetchSeriesDetails = (id: string) => {
    return $fetch<IMovieandSeries>(`${API_BASE_URL}`, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: 'full'
      }
    });
  };
  
  // Search series
  const searchSeries = (query: string, page = 1) => {
    return $fetch<IMovieandSeriesResponse>(`${API_BASE_URL}`, {
      params: {
        apikey: API_KEY,
        s: query,
        type: 'series',
        page
      }
    });
  };
  
  return {
    fetchSeries,
    fetchSeriesDetails,
    searchSeries
  };
}