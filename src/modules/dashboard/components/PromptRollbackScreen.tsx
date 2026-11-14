"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SmallSelectionButton } from "@/modules/dashboard/components/SmallSelectionButton";

import type { PromptRecord } from "@/modules/dashboard/types/prompt.types";

interface PromptRollbackScreenProps {
  current: PromptRecord;
  previous: PromptRecord | null;
  onCancel: () => void;
  onRequestConfirm: (selected: "previous" | "current") => void;
}

const actionButtonClassName =
  "h-auto gap-2 rounded-2xl px-3 py-2 text-[1.25rem] font-normal text-brand-blue [&_svg:not([class*='size-'])]:size-6";

export function PromptRollbackScreen({
  current,
  previous,
  onCancel,
  onRequestConfirm,
}: PromptRollbackScreenProps) {
  const [selected, setSelected] = useState<"previous" | "current">("current");

  return (
    <section className="mx-auto flex h-full min-h-0 w-full max-w-[90rem] flex-col gap-4 sm:gap-6 lg:gap-8">
      <h1 className="text-brand-tangerine text-[1.5rem] leading-normal font-semibold sm:text-[1.75rem] lg:text-[2rem]">
        Roll Back
      </h1>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex min-h-0 flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-lg">Previous Prompt</p>
            <SmallSelectionButton
              selected={selected === "previous"}
              onSelect={() => setSelected("previous")}
              disabled={!previous}
            />
          </div>
          <div className="border-muted-foreground scrollbar-brand min-h-[15rem] flex-1 overflow-y-auto rounded-2xl border p-4 sm:p-6">
            <p className="text-muted-foreground text-base leading-relaxed text-justify whitespace-pre-wrap sm:text-lg">
              {previous?.content ?? "No previous version yet."}
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-brand-tangerine text-lg font-semibold">Current Prompt</p>
            <SmallSelectionButton selected={selected === "current"} onSelect={() => setSelected("current")} />
          </div>
          <div className="border-brand-tangerine scrollbar-brand min-h-[15rem] flex-1 overflow-y-auto rounded-2xl border-2 p-4 sm:p-6">
            <p className="text-brand-blue text-base leading-relaxed text-justify whitespace-pre-wrap sm:text-lg">
              {current.content}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="secondary" className={actionButtonClassName} onClick={onCancel}>
          <Icon icon="mynaui:arrow-left" />
          Back
        </Button>

        <Button
          type="button"
          className="bg-brand-tangerine hover:bg-brand-tangerine-light text-brand-blue h-auto gap-2 rounded-2xl px-3 py-2 text-[1.25rem] font-normal [&_svg:not([class*='size-'])]:size-6"
          onClick={() => onRequestConfirm(selected)}
        >
          <Icon icon="charm:tick" />
          Save
        </Button>
      </div>
    </section>
  );
}
