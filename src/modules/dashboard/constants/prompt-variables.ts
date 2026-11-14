export const PROMPT_VARIABLES = [
  { token: "user_name", label: "{user_name}", description: "The user's display name." },
  { token: "user_mood", label: "{user_mood}", description: "Detected mood/sentiment of the user." },
  {
    token: "conversation_history",
    label: "{conversation_history}",
    description: "Prior turns of the conversation.",
  },
] as const satisfies readonly { token: string; label: string; description: string }[];

export type PromptVariableToken = (typeof PROMPT_VARIABLES)[number]["token"];

export const PROMPT_VARIABLE_TOKENS: PromptVariableToken[] = PROMPT_VARIABLES.map((variable) => variable.token);
