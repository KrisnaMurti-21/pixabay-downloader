import JSZip from "jszip";
import type { ClassItem } from "../types/class";

export interface ZipResult {
  blob: Blob;
  total: number;
  success: number;
}

const DOWNLOAD_DELAY_MS = 150; // jeda antar unduhan; kecilkan/hapus kalau tidak perlu
const MAX_RETRIES = 2;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function sanitizeFolderName(name: string): string {
  return (
    name
      .trim()
      .replace(/[^a-z0-9-_ ]/gi, "")
      .replace(/\s+/g, "_") || "kelas"
  );
}

async function downloadAsBlob(url: string): Promise<Blob> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    // Error jaringan/CORS (TypeError) langsung dilempar, tidak di-retry
    const res = await fetch(url);
    if (res.ok) return res.blob();

    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt === MAX_RETRIES) {
      throw new Error(`HTTP ${res.status}`);
    }
    await sleep(1000 * (attempt + 1));
  }
  throw new Error("Gagal mengunduh gambar");
}

export async function buildDatasetZip(
  classes: ClassItem[],
  onProgress: (message: string) => void,
): Promise<ZipResult> {
  const zip = new JSZip();
  let total = 0;
  let success = 0;

  for (const item of classes) {
    if (!item.preview) continue;

    const label = item.label.trim();
    const folder = sanitizeFolderName(label);
    const zipFolder = zip.folder(folder);
    if (!zipFolder) continue;

    const { hits, selected } = item.preview;
    const selectedHits = hits.filter((h) => selected.has(h.id));
    total += selectedHits.length;
    let done = 0;

    for (const hit of selectedHits) {
      onProgress(
        `Mengunduh "${label}" (${done + 1}/${selectedHits.length})...`,
      );
      try {
        const blob = await downloadAsBlob(hit.webformatURL);
        const ext = hit.webformatURL.split(".").pop()?.split("?")[0] || "jpg";
        zipFolder.file(`${folder}_${done + 1}.${ext}`, blob);
        done++;
        success++;
      } catch (e) {
        console.warn(`[${label}] gagal unduh ${hit.webformatURL}:`, e);
      }
      await sleep(DOWNLOAD_DELAY_MS);
    }
  }

  onProgress("Menyusun file ZIP...");
  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, total, success };
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
