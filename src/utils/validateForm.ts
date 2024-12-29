import { IPromptAttributes } from "@/types/idea";

export const validateForm = (formData: IPromptAttributes): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (!value && typeof value !== "boolean" && key !== "gender") {
      errors[key] = `Required field`;
    }
  });

  return errors;
};