import { isAxiosError } from "axios";

import { api } from "@/services/api";

import type {
  ApiSuccessResponse,
  PromptApiRecord,
  PromptHistory,
  PromptRecord,
  SavePromptPayload,
} from "@/modules/dashboard/types/prompt.types";

const PROMPT_TYPE = "system";

function toPromptRecord(record: PromptApiRecord): PromptRecord {
  return {
    id: record.id,
    version: record.version,
    content: record.content,
    status: record.status,
    createdBy: record.created_by,
    createdAt: record.created_at,
    publishedAt: record.published_at,
  };
}

async function getPromptVersion(version: number): Promise<PromptRecord | null> {
  try {
    const response = await api.get<ApiSuccessResponse<PromptApiRecord>>(
      `/admin/prompts/versions/${version}`,
      { params: { prompt_type: PROMPT_TYPE } },
    );

    return toPromptRecord(response.data.data);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
}

export async function getCurrentPrompt(): Promise<PromptHistory> {
  try {
    const response = await api.get<ApiSuccessResponse<PromptApiRecord>>("/admin/prompts/current", {
      params: { prompt_type: PROMPT_TYPE },
    });
    const current = toPromptRecord(response.data.data);
    const previous = current.version > 1 ? await getPromptVersion(current.version - 1) : null;

    return { current, previous };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return { current: null, previous: null };
    }
    throw error;
  }
}

export async function savePrompt(payload: SavePromptPayload): Promise<PromptRecord> {
  const response = await api.post<ApiSuccessResponse<PromptApiRecord>>("/admin/prompts", {
    prompt_type: PROMPT_TYPE,
    content: payload.content,
  });

  return toPromptRecord(response.data.data);
}

export async function rollbackPrompt(): Promise<PromptRecord> {
  const response = await api.post<ApiSuccessResponse<PromptApiRecord>>("/admin/prompts/rollback", {
    prompt_type: PROMPT_TYPE,
  });

  return toPromptRecord(response.data.data);
}
