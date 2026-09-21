export interface PixabayHit {
  id: number;
  previewURL: string;
  webformatURL: string;
}

export interface PixabayResponse {
  totalHits: number;
  hits: PixabayHit[];
}
