import { IPromptAttributes } from "@/types/idea";

export type TFormError = Partial<Record<keyof IPromptAttributes, string>>;