import { API_BASE_URL, API_KEY } from "~/constants/api-constants";
import type { IMovie } from "~/types/interfaces/IMovie";
import type { IMovieResponse } from "~/types/interfaces/IMovieResponse";

export function useMoviesAPI() {
  // Fetch popular movies (Note: OMDb doesn't have a "popular" endpoint, so we search for common terms)
  const fetchMovies = (page = 1) => {
    return $fetch<IMovieResponse>(`${API_BASE_URL}`, {
      params: {
        apikey: API_KEY,
        s: 'movie', // Search term, you can change this
        type: 'movie',
        page
      }
    });
  };
  
  // Fetch movie by ID
  const fetchMovieDetails = (id: string) => {
    return $fetch<IMovie>(`${API_BASE_URL}`, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: 'full'
      }
    });
  };
  
  // Search movies
  const searchMovies = (query: string, page = 1) => {
    return $fetch<IMovieResponse>(`${API_BASE_URL}`, {
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
    fetchMovieDetails,
    searchMovies
  };
}