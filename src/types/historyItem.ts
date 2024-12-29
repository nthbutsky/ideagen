import { IResponse } from "@/types/response";
import { IPromptAttributes } from "@/types/idea";

export interface IHistoryItem {
  created_at: string;
  generated_response: IResponse | null;
  id: string;
  prompt_attributes: IPromptAttributes | null;
};

export interface IDatabaseHistoryItem {
  created_at: string;
  generated_response: unknown | null;
  id: string;
  prompt_attributes: unknown | null;
}

