import type { ISeries } from "./ISeries";

export interface ISeriesResponse {
      page: number;
      results: ISeries[];
      total_pages: number;
      total_results: number;
  }