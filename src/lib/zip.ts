import JSZip from "jszip";
import type { ClassItem } from "../types/class";

export function sanitizeFolderName(name: string): string {
  return (
    name
      .trim()
      .replace(/[^a-z0-9-_ ]/gi, "")
      .replace(/\s+/g, "_") || "kelas"
  );
}

async function downloadAsBlob(url: string): Promise<Blob> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal mengunduh gambar: " + url);
  return res.blob();
}

export async function buildDatasetZip(
  classes: ClassItem[],
  onProgress: (message: string) => void,
): Promise<Blob> {
  const zip = new JSZip();

  for (const item of classes) {
    if (!item.preview) continue;

    const label = item.label.trim();
    const folder = sanitizeFolderName(label);
    const zipFolder = zip.folder(folder);
    if (!zipFolder) continue;

    const { hits, selected } = item.preview;
    const selectedHits = hits.filter((h) => selected.has(h.id));
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
      } catch (e) {
        console.warn("Lewati satu gambar (gagal unduh):", e);
      }
    }
  }

  onProgress("Menyusun file ZIP...");
  return zip.generateAsync({ type: "blob" });
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
