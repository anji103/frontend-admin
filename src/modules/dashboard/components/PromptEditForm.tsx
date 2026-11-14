"use client";

import { Icon } from "@iconify/react";
import { useForm } from "@tanstack/react-form";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { CharAndTokenCounter } from "@/modules/dashboard/components/CharAndTokenCounter";
import { PromptVariablesToolbar } from "@/modules/dashboard/components/PromptVariablesToolbar";
import { editPromptSchema } from "@/modules/dashboard/schemas/prompt.schema";

interface PromptEditFormProps {
  initialContent: string;
  onCancel: () => void;
  onRequestConfirm: (content: string) => void;
}

const actionButtonClassName =
  "h-auto gap-2 rounded-2xl px-3 py-2 text-[1.25rem] font-normal text-brand-blue [&_svg:not([class*='size-'])]:size-6";

export function PromptEditForm({ initialContent, onCancel, onRequestConfirm }: PromptEditFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm({
    defaultValues: { content: initialContent },
    validators: { onChange: editPromptSchema },
    onSubmit: ({ value }) => {
      onRequestConfirm(value.content);
    },
  });

  return (
    <section className="mx-auto flex h-full min-h-0 w-full max-w-[90rem] flex-col gap-4 sm:gap-6 lg:gap-8">
      <h1 className="text-brand-tangerine text-[1.5rem] leading-normal font-semibold sm:text-[1.75rem] lg:text-[2rem]">
        Edit Prompt
      </h1>

      <form
        className="flex min-h-0 flex-1 flex-col gap-4"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="content">
          {(field) => {
            const insertVariable = (token: string) => {
              const textarea = textareaRef.current;
              const currentValue = field.state.value;
              const selectionStart = textarea?.selectionStart ?? currentValue.length;
              const selectionEnd = textarea?.selectionEnd ?? currentValue.length;
              const insertion = `{${token}}`;
              const nextValue =
                currentValue.slice(0, selectionStart) + insertion + currentValue.slice(selectionEnd);

              field.handleChange(nextValue);

              requestAnimationFrame(() => {
                const cursor = selectionStart + insertion.length;
                textarea?.focus();
                textarea?.setSelectionRange(cursor, cursor);
              });
            };

            return (
              <>
                <Card className="border-brand-blue flex min-h-[15rem] flex-1 flex-col gap-4 overflow-hidden rounded-2xl border p-4 shadow-none sm:p-6">
                  <PromptVariablesToolbar onInsert={insertVariable} />

                  <Textarea
                    ref={textareaRef}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={!field.state.meta.isValid}
                    className="text-brand-blue scrollbar-brand min-h-0 flex-1 resize-none overflow-y-auto border-none p-0 text-base leading-relaxed text-justify shadow-none focus-visible:ring-0 sm:text-lg lg:text-[1.25rem]"
                  />
                </Card>

                <div className="flex flex-col items-end gap-1">
                  <CharAndTokenCounter content={field.state.value} />
                  <FieldError errors={field.state.meta.errors} />
                </div>
              </>
            );
          }}
        </form.Field>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button type="button" variant="secondary" className={actionButtonClassName} onClick={onCancel}>
            <Icon icon="mynaui:arrow-left" />
            Back
          </Button>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="bg-brand-tangerine hover:bg-brand-tangerine-light text-brand-blue h-auto gap-2 rounded-2xl px-3 py-2 text-[1.25rem] font-normal [&_svg:not([class*='size-'])]:size-6"
              >
                <Icon icon="charm:tick" />
                Save
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </section>
  );
}
