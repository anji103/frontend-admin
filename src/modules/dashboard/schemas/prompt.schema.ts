import { z } from "zod";

import { PROMPT_VARIABLE_TOKENS } from "@/modules/dashboard/constants/prompt-variables";

export const PROMPT_MIN_LENGTH = 20;
export const PROMPT_MAX_LENGTH = 4000;

const PLACEHOLDER_PATTERN = /\{([a-zA-Z0-9_]*)\}/g;

export const promptContentSchema = z
  .string()
  .trim()
  .min(PROMPT_MIN_LENGTH, `Prompt must be at least ${PROMPT_MIN_LENGTH} characters`)
  .max(PROMPT_MAX_LENGTH, `Prompt must be at most ${PROMPT_MAX_LENGTH} characters`)
  .superRefine((content, ctx) => {
    const unknownTokens = new Set<string>();

    for (const match of content.matchAll(PLACEHOLDER_PATTERN)) {
      const token = match[1];

      if (!PROMPT_VARIABLE_TOKENS.includes(token as (typeof PROMPT_VARIABLE_TOKENS)[number])) {
        unknownTokens.add(match[0]);
      }
    }

    if (unknownTokens.size > 0) {
      ctx.addIssue({
        code: "custom",
        message: `Unknown placeholder(s): ${[...unknownTokens].join(", ")}. Allowed: ${PROMPT_VARIABLE_TOKENS.map((token) => `{${token}}`).join(", ")}`,
      });
    }
  });

export const editPromptSchema = z.object({
  content: promptContentSchema,
});

export type EditPromptFormValues = z.infer<typeof editPromptSchema>;
