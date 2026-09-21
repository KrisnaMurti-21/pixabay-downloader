import type { PreviewState } from "../types/class";
import { Icon } from "./ui/Icon";
import { PreviewItem } from "./PreviewItem";

interface PreviewAreaProps {
  preview: PreviewState;
  isLoadingMore: boolean;
  onToggle: (hitId: number) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
  onLoadMore: () => void;
}

export function PreviewArea({
  preview,
  isLoadingMore,
  onToggle,
  onSelectAll,
  onSelectNone,
  onLoadMore,
}: PreviewAreaProps) {
  const total = preview.hits.length;
  const selectedCount = preview.selected.size;
  const allSelected = selectedCount === total;
  const noneSelected = selectedCount === 0;

  return (
    <div className="flex flex-col gap-3 pt-1 border-t border-line">
      <div className="flex items-center justify-between flex-wrap gap-2 pt-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
          <Icon name="check_circle" className="text-[14px]" />
          <span>
            {selectedCount} dari {total} dipilih
          </span>
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSelectAll}
            disabled={allSelected}
            className="clay-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold transition-all enabled:hover:-translate-y-0.5 enabled:hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="select_all" className="text-[16px]" />
            <span>Pilih semua</span>
          </button>

          <button
            type="button"
            onClick={onSelectNone}
            disabled={noneSelected}
            className="clay-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-soft text-body ring-1 ring-line text-xs font-bold transition-all enabled:hover:-translate-y-0.5 enabled:hover:bg-error-container enabled:hover:text-on-error-container enabled:hover:ring-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="deselect" className="text-[16px]" />
            <span>Kosongkan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {preview.hits.map((hit) => (
          <PreviewItem
            key={hit.id}
            hit={hit}
            selected={preview.selected.has(hit.id)}
            onToggle={() => onToggle(hit.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onLoadMore}
        disabled={isLoadingMore}
        className="clay-btn w-full py-2 rounded-full bg-background text-secondary text-xs font-bold transition-all enabled:hover:-translate-y-0.5 disabled:opacity-60"
      >
        {isLoadingMore
          ? "Memuat tambahan..."
          : "+ Tambah lebih banyak (tidak akan duplikat)"}
      </button>
    </div>
  );
}
