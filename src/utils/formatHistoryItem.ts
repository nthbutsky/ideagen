import { IDatabaseHistoryItem, IHistoryItem } from "@/types/historyItem";
import { IPromptAttributes } from "@/types/idea";
import { IResponse } from "@/types/response";

export function formatHistoryItem(item: IDatabaseHistoryItem): IHistoryItem {
  return {
    created_at: item.created_at,
    generated_response: item.generated_response
      ? (item.generated_response as IResponse)
      : null,
    id: item.id,
    prompt_attributes: item.prompt_attributes
      ? (item.prompt_attributes as IPromptAttributes)
      : null,
  };
}
