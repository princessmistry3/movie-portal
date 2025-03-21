import { API_BASE_URL, API_KEY } from "~/constants/api-constants";
import type { IMovieandSeriesResponse } from "~/types/interfaces/IMovieandSeriesResponse";

export function useMoviesAPI() {
  const fetchMovies = (page = 1) => {
    return $fetch<IMovieandSeriesResponse>(`${API_BASE_URL}`, {
      params: {
        apikey: API_KEY,
        s: 'movie',
        type: 'movie',
        page
      }
    });
  };

  // Search movies
  const searchMovies = (query: string, page = 1) => {
    return $fetch<IMovieandSeriesResponse>(`${API_BASE_URL}`, {
      params: {
        apikey: API_KEY,
        s: query,
        type: 'movie',
        page
      }
    });
  };
  
  return {
    fetchMovies,
    searchMovies
  };
}