import type { PixabayHit } from "./pixabay";

export interface PreviewState {
  hits: PixabayHit[];
  selected: Set<number>;
  page: number;
  perPage: number;
  keyword: string;
  totalHits: number;
}

export interface ClassItem {
  id: number;
  label: string;
  keyword: string;
  count: number;
  preview: PreviewState | null;
  message: string;
  isLoading: boolean;
  isLoadingMore: boolean;
}
