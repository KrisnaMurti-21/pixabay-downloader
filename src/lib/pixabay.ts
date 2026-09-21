import type { PixabayResponse } from "../types/pixabay";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export const hasApiKey = Boolean(API_KEY);
export const PIXABAY_MAX_RESULTS = 500;

export async function fetchPixabayPage(
  keyword: string,
  page: number,
  perPage: number,
): Promise<PixabayResponse> {
  if (!API_KEY) {
    throw new Error("VITE_PIXABAY_API_KEY belum diisi di file .env.local");
  }

  const params = new URLSearchParams({
    key: API_KEY,
    q: keyword,
    image_type: "photo",
    safesearch: "true",
    page: String(page),
    per_page: String(perPage),
  });

  const res = await fetch(`https://pixabay.com/api/?${params}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pixabay API error (${res.status}): ${text}`);
  }
  return res.json();
}
