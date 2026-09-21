import type { ClassItem } from "../types/class";
import type { ClassActions } from "../hooks/useClasses";
import { ClassRow } from "./ClassRow";

interface ClassListProps {
  classes: ClassItem[];
  actions: ClassActions;
}

export function ClassList({ classes, actions }: ClassListProps) {
  return (
    <div id="classes" className="flex flex-col gap-4 scroll-mt-6">
      {classes.map((item) => (
        <ClassRow
          key={item.id}
          item={item}
          onChange={(patch) => actions.update(item.id, patch)}
          onRemove={() => actions.removeClass(item.id)}
          onLoadPreview={() => actions.loadPreview(item.id)}
          onLoadMore={() => actions.loadMore(item.id)}
          onToggle={(hitId) => actions.toggleSelect(item.id, hitId)}
          onSelectAll={() => actions.selectAll(item.id)}
          onSelectNone={() => actions.selectNone(item.id)}
        />
      ))}
    </div>
  );
}
