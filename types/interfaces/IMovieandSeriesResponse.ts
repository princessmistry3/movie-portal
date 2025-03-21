import type { IMovieandSeries } from "./IMovieandSeries";

export interface IMovieandSeriesResponse {
    page: number;
    results: IMovieandSeries[];
    total_pages: number;
    total_results: number;
  }
  