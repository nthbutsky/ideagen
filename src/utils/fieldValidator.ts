import { TPromptAttributes } from "@/types/idea";

export const validateField = (
  key: string,
  value: string | number | boolean | undefined,
  formErrors?: Record<string, string>
): Record<string, string> => {
  const errors: Record<string, string> = formErrors || {};
  delete errors[key];

  if (!value) {
    errors[key] = `Required field`;
  } else if (key === "age" && (isNaN(Number(value)) || Number(value) <= 0)) {
    errors.age = "Must be a number";
  } else if (key === "budget" && (isNaN(Number(value)) || Number(value) <= 0)) {
    errors.budget = "Must be a number";
  }

  return errors;
};

export const validateForm = (formData: TPromptAttributes): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (value === '') {
      errors[key] = `Required field`;
    }
  });

  return errors;
};