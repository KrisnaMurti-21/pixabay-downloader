import { useState } from "react";
import type { ClassItem } from "../types/class";
import { buildDatasetZip, saveBlob } from "../lib/zip";
import { getErrorMessage } from "../lib/utils";

export function useDatasetDownload(classes: ClassItem[]) {
  const [status, setStatus] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const start = async () => {
    const jobs = classes.filter((c) => c.label.trim());

    if (jobs.length === 0) {
      setStatus("Isi minimal satu kelas dulu.");
      return;
    }

    const notReady = jobs.filter(
      (c) => !c.preview || c.preview.selected.size === 0,
    );
    if (notReady.length > 0) {
      setStatus(
        `Muat pratinjau dan pilih gambar dulu untuk kelas: ${notReady
          .map((c) => c.label.trim())
          .join(", ")}.`,
      );
      return;
    }

    setIsBusy(true);
    try {
      const { blob, total, success } = await buildDatasetZip(jobs, setStatus);
      saveBlob(blob, "dataset_gambar.zip");

      const failed = total - success;
      setStatus(
        failed === 0
          ? `Selesai — ${success} gambar masuk ke ZIP.`
          : `Selesai — ${success} dari ${total} gambar berhasil, ${failed} gagal (lihat Console untuk alasannya).`,
      );
    } catch (err) {
      setStatus("Terjadi kesalahan: " + getErrorMessage(err));
    } finally {
      setIsBusy(false);
    }
  };

  return { status, isBusy, start };
}
