import { useCallback, useRef, useState } from "react";
import type { ClassItem } from "../types/class";
import { fetchPixabayPage, PIXABAY_MAX_RESULTS } from "../lib/pixabay";
import { getErrorMessage } from "../lib/utils";

type Patch = Partial<ClassItem> | ((current: ClassItem) => Partial<ClassItem>);

const createClass = (
  id: number,
  label = "",
  keyword = "",
  count = 30,
): ClassItem => ({
  id,
  label,
  keyword,
  count,
  preview: null,
  message: "",
  isLoading: false,
  isLoadingMore: false,
});

export function useClasses() {
  const [classes, setClasses] = useState<ClassItem[]>(() => [
    createClass(1, "kucing", "cat animal"),
    createClass(2, "anjing", "dog animal"),
  ]);
  const nextId = useRef(3);

  const update = useCallback((id: number, patch: Patch) => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id !== id
          ? c
          : { ...c, ...(typeof patch === "function" ? patch(c) : patch) },
      ),
    );
  }, []);

  const addClass = () => {
    const id = nextId.current++;
    setClasses((prev) => [...prev, createClass(id)]);
  };

  const removeClass = (id: number) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleSelect = (id: number, hitId: number) => {
    update(id, (c) => {
      if (!c.preview) return {};
      const selected = new Set(c.preview.selected);
      if (selected.has(hitId)) selected.delete(hitId);
      else selected.add(hitId);
      return { preview: { ...c.preview, selected } };
    });
  };

  const selectAll = (id: number) => {
    update(id, (c) =>
      c.preview
        ? {
            preview: {
              ...c.preview,
              selected: new Set(c.preview.hits.map((h) => h.id)),
            },
          }
        : {},
    );
  };

  const selectNone = (id: number) => {
    update(id, (c) =>
      c.preview
        ? { preview: { ...c.preview, selected: new Set<number>() } }
        : {},
    );
  };

  const loadPreview = async (id: number) => {
    const item = classes.find((c) => c.id === id);
    if (!item) return;

    const keyword = item.keyword.trim();
    if (!keyword) {
      update(id, { message: "Isi kata kunci dulu." });
      return;
    }

    const targetCount = item.count || 30;
    update(id, { isLoading: true, message: "Memuat pratinjau..." });

    try {
      const perPage = Math.min(Math.max(targetCount * 3, 30), 200);
      const data = await fetchPixabayPage(keyword, 1, perPage);
      const capNote =
        data.totalHits > PIXABAY_MAX_RESULTS
          ? " (Pixabay hanya membuka 500 hasil pertama untuk kata kunci ini)"
          : "";

      update(id, {
        isLoading: false,
        message: `Ditemukan sekitar ${data.totalHits} hasil untuk "${keyword}"${capNote}. Menampilkan ${data.hits.length} untuk dipilih di bawah.`,
        preview: {
          hits: data.hits,
          selected: new Set(data.hits.slice(0, targetCount).map((h) => h.id)),
          page: 1,
          perPage,
          keyword,
          totalHits: data.totalHits,
        },
      });
    } catch (e) {
      update(id, {
        isLoading: false,
        message: "Gagal memuat: " + getErrorMessage(e),
      });
    }
  };

  const loadMore = async (id: number) => {
    const item = classes.find((c) => c.id === id);
    const preview = item?.preview;
    if (!item || !preview) {
      update(id, { message: "Muat pratinjau dulu sebelum menambah." });
      return;
    }

    const nextPage = preview.page + 1;
    if (nextPage * preview.perPage > PIXABAY_MAX_RESULTS) {
      update(id, {
        message:
          "Sudah mencapai batas maksimal akses Pixabay (±500 hasil) untuk kata kunci ini.",
      });
      return;
    }

    update(id, { isLoadingMore: true });

    try {
      const data = await fetchPixabayPage(
        preview.keyword,
        nextPage,
        preview.perPage,
      );
      const existingIds = new Set(preview.hits.map((h) => h.id));
      const newHits = data.hits.filter((h) => !existingIds.has(h.id));

      if (newHits.length === 0) {
        update(id, {
          isLoadingMore: false,
          message: `Tidak ada gambar baru — sepertinya hasil untuk "${preview.keyword}" sudah habis.`,
        });
        return;
      }

      update(id, (c) => ({
        isLoadingMore: false,
        message: `Ditambahkan ${newHits.length} gambar baru (tidak ada yang duplikat dari sebelumnya).`,
        preview: c.preview && {
          ...c.preview,
          hits: [...c.preview.hits, ...newHits],
          selected: new Set([
            ...c.preview.selected,
            ...newHits.map((h) => h.id),
          ]),
          page: nextPage,
        },
      }));
    } catch (e) {
      update(id, {
        isLoadingMore: false,
        message: "Gagal menambah: " + getErrorMessage(e),
      });
    }
  };

  return {
    classes,
    update,
    addClass,
    removeClass,
    toggleSelect,
    selectAll,
    selectNone,
    loadPreview,
    loadMore,
  };
}

export type ClassActions = Omit<ReturnType<typeof useClasses>, "classes">;
