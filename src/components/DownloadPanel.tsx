import { Icon } from "./ui/Icon";

interface DownloadPanelProps {
  status: string;
  isBusy: boolean;
  onStart: () => void;
}

export function DownloadPanel({ status, isBusy, onStart }: DownloadPanelProps) {
  return (
    <div className="clay-panel bg-card rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
      <button
        type="button"
        onClick={onStart}
        disabled={isBusy}
        className="clay-btn w-full sm:w-auto px-6 py-3 rounded-full bg-secondary text-white font-bold text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform disabled:opacity-60"
      >
        <Icon name="download_for_offline" />
        <span>Unduh Pilihan &amp; Buat ZIP</span>
      </button>
      <span className="text-sm text-body text-center sm:text-right">
        {status}
      </span>
    </div>
  );
}
