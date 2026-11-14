import { useMutation, useQueryClient } from "@tanstack/react-query";

import { rollbackPrompt } from "@/modules/dashboard/api/prompt.api";
import { PROMPT_QUERY_KEY } from "@/modules/dashboard/hooks/use-current-prompt";

export function useRollbackPrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => rollbackPrompt(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROMPT_QUERY_KEY });
    },
  });
}
