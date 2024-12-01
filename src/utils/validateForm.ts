import { TPromptAttributes } from "@/types/idea";

export const validateForm = (formData: TPromptAttributes): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (value === '') {
      errors[key] = `Required field`;
    }
  });

  return errors;
};