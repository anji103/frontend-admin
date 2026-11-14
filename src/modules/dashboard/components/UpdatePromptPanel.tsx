"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/lib/api-error";
import { PromptEditForm } from "@/modules/dashboard/components/PromptEditForm";
import { PromptRollbackScreen } from "@/modules/dashboard/components/PromptRollbackScreen";
import { SaveConfirmDialog } from "@/modules/dashboard/components/SaveConfirmDialog";
import { useCurrentPrompt } from "@/modules/dashboard/hooks/use-current-prompt";
import { useRollbackPrompt } from "@/modules/dashboard/hooks/use-rollback-prompt";
import { useSavePrompt } from "@/modules/dashboard/hooks/use-save-prompt";

type PanelMode = "view" | "edit" | "rollback";

type PendingConfirmation = { kind: "edit"; content: string } | { kind: "rollback"; selected: "previous" | "current" };

const actionButtonClassName =
  "h-auto gap-2 rounded-2xl px-3 py-2 text-[1.25rem] font-normal text-brand-blue [&_svg:not([class*='size-'])]:size-6";

export function UpdatePromptPanel() {
  const [mode, setMode] = useState<PanelMode>("view");
  const [pendingConfirmation, setPendingConfirmation] = useState<PendingConfirmation | null>(null);

  const { data, isLoading, isError, error } = useCurrentPrompt();
  const saveMutation = useSavePrompt();
  const rollbackMutation = useRollbackPrompt();

  const isSaving = saveMutation.isPending || rollbackMutation.isPending;

  async function handleConfirm() {
    if (!pendingConfirmation) return;

    try {
      if (pendingConfirmation.kind === "edit") {
        await saveMutation.mutateAsync(pendingConfirmation.content);
        toast.add({ title: "Prompt saved", type: "success" });
      } else if (pendingConfirmation.selected === "previous") {
        await rollbackMutation.mutateAsync();
        toast.add({ title: "Prompt rolled back", type: "success" });
      }

      setPendingConfirmation(null);
      setMode("view");
    } catch (error) {
      toast.add({ title: getApiErrorMessage(error), type: "error" });
    }
  }

  if (isLoading) {
    return (
      <section className="mx-auto flex h-full w-full max-w-[90rem] flex-col gap-4 sm:gap-6 lg:gap-8">
        <p className="text-muted-foreground">Loading prompt...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto flex h-full w-full max-w-[90rem] flex-col gap-4 sm:gap-6 lg:gap-8">
        <p className="text-destructive">{getApiErrorMessage(error, "Failed to load prompt.")}</p>
      </section>
    );
  }

  const current = data?.current ?? null;
  const previous = data?.previous ?? null;

  return (
    <>
      {mode === "edit" && (
        <PromptEditForm
          initialContent={current?.content ?? ""}
          onCancel={() => setMode("view")}
          onRequestConfirm={(content) => setPendingConfirmation({ kind: "edit", content })}
        />
      )}

      {mode === "rollback" && current && (
        <PromptRollbackScreen
          current={current}
          previous={previous}
          onCancel={() => setMode("view")}
          onRequestConfirm={(selected) => setPendingConfirmation({ kind: "rollback", selected })}
        />
      )}

      {mode === "view" && (
        <section className="mx-auto flex h-full min-h-0 w-full max-w-[90rem] flex-col gap-4 sm:gap-6 lg:gap-8">
          <h1 className="text-brand-tangerine text-[1.5rem] leading-normal font-semibold sm:text-[1.75rem] lg:text-[2rem]">
            Prompt
          </h1>

          <Card className="border-brand-blue scrollbar-brand min-h-[15rem] flex-1 overflow-y-auto rounded-2xl border p-4 shadow-none sm:p-6">
            <p className="text-muted-foreground text-base leading-relaxed text-justify whitespace-pre-wrap sm:text-lg lg:text-[1.25rem]">
              {current?.content ?? "No prompt has been configured yet."}
            </p>
          </Card>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button variant="secondary" className={actionButtonClassName} onClick={() => setMode("edit")}>
              <Icon icon="mynaui:edit" />
              {current ? "Edit" : "Create"}
            </Button>
            {current && (
              <Button variant="secondary" className={actionButtonClassName} onClick={() => setMode("rollback")}>
                <Icon icon="tabler:reload" />
                Roll Back
              </Button>
            )}
          </div>
        </section>
      )}

      <SaveConfirmDialog
        open={pendingConfirmation !== null}
        onOpenChange={(open) => {
          if (!open) setPendingConfirmation(null);
        }}
        onConfirm={handleConfirm}
        isPending={isSaving}
      />
    </>
  );
}
