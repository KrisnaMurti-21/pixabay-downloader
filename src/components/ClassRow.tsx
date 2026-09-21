import type { ClassItem } from "../types/class";
import { Icon } from "./ui/Icon";
import { PreviewArea } from "./PreviewArea";

interface ClassRowProps {
  item: ClassItem;
  onChange: (
    patch: Partial<Pick<ClassItem, "label" | "keyword" | "count">>,
  ) => void;
  onRemove: () => void;
  onLoadPreview: () => void;
  onLoadMore: () => void;
  onToggle: (hitId: number) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
}

export function ClassRow({
  item,
  onChange,
  onRemove,
  onLoadPreview,
  onLoadMore,
  onToggle,
  onSelectAll,
  onSelectNone,
}: ClassRowProps) {
  return (
    <div className="clay-panel bg-card rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2 bg-background rounded-full px-4 py-2 clay-input">
            <Icon name="folder" className="text-muted text-[16px]" />
            <input
              type="text"
              value={item.label}
              onChange={(e) => onChange({ label: e.target.value })}
              placeholder="Nama kelas (mis. kucing)"
              className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-title"
            />
          </div>
          <div className="flex items-center gap-2 bg-background rounded-full px-4 py-2 clay-input">
            <Icon name="search" className="text-primary text-[16px]" />
            <input
              type="text"
              value={item.keyword}
              onChange={(e) => onChange({ keyword: e.target.value })}
              placeholder="Kata kunci pencarian (mis. cat animal)"
              className="flex-1 bg-transparent border-none outline-none text-sm text-title"
            />
          </div>
        </div>
        <button
          type="button"
          title="Hapus kelas"
          onClick={onRemove}
          className="shrink-0 w-9 h-9 rounded-full bg-error-container text-error flex items-center justify-center clay-btn"
        >
          <Icon name="delete" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-background rounded-full px-3 py-1.5 clay-input">
          <span className="text-[11px] font-bold text-muted uppercase">
            Jumlah
          </span>
          <input
            type="number"
            min={3}
            max={80}
            value={item.count || ""}
            onChange={(e) => onChange({ count: Number(e.target.value) })}
            className="w-14 bg-transparent border-none outline-none text-sm font-bold text-title"
          />
        </div>
        <button
          type="button"
          onClick={onLoadPreview}
          disabled={item.isLoading}
          className="clay-btn px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold flex items-center gap-1 disabled:opacity-60"
        >
          <Icon name="photo_library" className="text-[16px]" />
          <span>Muat pratinjau</span>
        </button>
      </div>

      <div className="text-xs text-body">{item.message}</div>

      {item.preview && (
        <PreviewArea
          preview={item.preview}
          isLoadingMore={item.isLoadingMore}
          onToggle={onToggle}
          onSelectAll={onSelectAll}
          onSelectNone={onSelectNone}
          onLoadMore={onLoadMore}
        />
      )}
    </div>
  );
}
