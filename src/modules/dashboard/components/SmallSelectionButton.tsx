import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

interface SmallSelectionButtonProps {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function SmallSelectionButton({ selected, onSelect, disabled }: SmallSelectionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl px-3 py-2 text-[1.25rem] font-normal transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        selected
          ? "bg-brand-blue text-white"
          : "text-brand-blue w-[8.75rem] bg-[color-mix(in_srgb,var(--brand-blue)_20%,transparent)]"
      )}
    >
      <Icon icon="charm:tick" className="size-6" />
      {selected ? "Selected" : "Select"}
    </button>
  );
}
