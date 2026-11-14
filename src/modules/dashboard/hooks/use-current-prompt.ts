import { useQuery } from "@tanstack/react-query";

import { getCurrentPrompt } from "@/modules/dashboard/api/prompt.api";

export const PROMPT_QUERY_KEY = ["prompt", "current"] as const;

export function useCurrentPrompt() {
  return useQuery({
    queryKey: PROMPT_QUERY_KEY,
    queryFn: getCurrentPrompt,
  });
}
