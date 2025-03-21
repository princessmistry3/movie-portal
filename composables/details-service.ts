import { API_BASE_URL, API_KEY } from "~/constants/api-constants";
import type { IMovieandSeries } from "~/types/interfaces/IMovieandSeries";

export function useMoviesandSeriesDetailsAPI() {
  
    const fetchMovieDetails = (id: string) => {
        return $fetch<IMovieandSeries>(`${API_BASE_URL}`, {
          params: {
            apikey: API_KEY,
            i: id,
            plot: 'full'
          }
        });
      };  
  
  return {
    fetchMovieDetails
  };
}