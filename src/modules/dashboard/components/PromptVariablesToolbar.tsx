import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { PROMPT_VARIABLES } from "@/modules/dashboard/constants/prompt-variables";

interface PromptVariablesToolbarProps {
  onInsert: (token: string) => void;
}

export function PromptVariablesToolbar({ onInsert }: PromptVariablesToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {PROMPT_VARIABLES.map((variable) => (
        <Button
          key={variable.token}
          type="button"
          variant="secondary"
          size="sm"
          title={variable.description}
          className="text-brand-blue h-auto gap-1.5 rounded-xl px-2.5 py-1.5 font-normal"
          onClick={() => onInsert(variable.token)}
        >
          <Icon icon="mynaui:plus" />
          {variable.label}
        </Button>
      ))}
    </div>
  );
}
