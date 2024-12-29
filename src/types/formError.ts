import { IPromptAttributes } from "@/types/prompt";

export type TFormError = Partial<Record<keyof IPromptAttributes, string>>;