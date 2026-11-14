import { useMutation, useQueryClient } from "@tanstack/react-query";

import { savePrompt } from "@/modules/dashboard/api/prompt.api";
import { PROMPT_QUERY_KEY } from "@/modules/dashboard/hooks/use-current-prompt";

export function useSavePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => savePrompt({ content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROMPT_QUERY_KEY });
    },
  });
}
