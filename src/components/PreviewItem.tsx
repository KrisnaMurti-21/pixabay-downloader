import type { PixabayHit } from "../types/pixabay";
import { Icon } from "./ui/Icon";

interface PreviewItemProps {
  hit: PixabayHit;
  selected: boolean;
  onToggle: () => void;
}

export function PreviewItem({ hit, selected, onToggle }: PreviewItemProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`relative rounded-md p-1 cursor-pointer transition-all duration-150 bg-card ${
        selected ? "ring-2 ring-secondary clay-panel" : "ring-1 ring-line"
      }`}
    >
      <img
        src={hit.previewURL}
        loading="lazy"
        alt=""
        className="w-full aspect-square object-cover rounded-md bg-background"
      />
      <div
        className={`absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] font-bold ${
          selected ? "bg-secondary text-white" : "bg-card text-muted clay-btn"
        }`}
      >
        <Icon name={selected ? "check" : "add"} className="text-[12px]" />
        <span>{selected ? "Terpilih" : "Pilih"}</span>
      </div>
    </button>
  );
}
