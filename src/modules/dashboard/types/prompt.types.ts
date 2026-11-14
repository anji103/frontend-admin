export type PromptStatus = "active" | "archived";

export type PromptApiRecord = {
  id: string;
  prompt_type: "system";
  version: number;
  content: string;
  status: PromptStatus;
  change_note: string | null;
  created_by: string;
  created_at: string;
  published_at: string;
};

export type PromptRecord = {
  id: string;
  version: number;
  content: string;
  status: PromptStatus;
  createdBy: string;
  createdAt: string;
  publishedAt: string;
};

export type PromptHistory = {
  current: PromptRecord | null;
  previous: PromptRecord | null;
};

export type SavePromptPayload = {
  content: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};
