import { countApproxTokens, countChars } from "@/modules/dashboard/lib/prompt-tokens";
import { PROMPT_MAX_LENGTH } from "@/modules/dashboard/schemas/prompt.schema";

interface CharAndTokenCounterProps {
  content: string;
}

export function CharAndTokenCounter({ content }: CharAndTokenCounterProps) {
  const chars = countChars(content);
  const tokens = countApproxTokens(content);

  return (
    <p className="text-muted-foreground text-right text-sm">
      {chars}/{PROMPT_MAX_LENGTH} characters · ~{tokens} tokens (approx)
    </p>
  );
}
