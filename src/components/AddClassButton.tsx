import { Icon } from "./ui/Icon";

interface AddClassButtonProps {
  onClick: () => void;
}

export function AddClassButton({ onClick }: AddClassButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3.5 rounded-lg bg-card text-secondary font-bold text-sm flex items-center justify-center gap-2 clay-panel hover:-translate-y-0.5 active:translate-y-0 transition-transform"
    >
      <Icon name="add_circle" />
      <span>Tambah Kelas</span>
    </button>
  );
}
