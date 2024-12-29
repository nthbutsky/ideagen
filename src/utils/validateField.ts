import { TFormError } from "@/types/formError";
import { IPromptAttributes } from "@/types/prompt";

export type TValidationRule = (
  value: string | number | boolean | undefined,
  key?: string,
) => string | null;

export const validateField = (
  key: keyof IPromptAttributes,
  value: string | number | boolean | undefined,
  rules: {
    [key: string]: TValidationRule;
  } = {},
  formErrors: TFormError = {},
): TFormError => {
  const errors: TFormError = { ...formErrors };
  delete errors[key];

  const defaultRule = rules.default;
  if (defaultRule) {
    const defaultError = defaultRule(value, key as string);
    if (defaultError) {
      errors[key] = defaultError;
    }
  }

  const customRule = rules[key];
  if (customRule) {
    const error = customRule(value);
    if (error) {
      errors[key] = error;
    }
  }

  return errors;
};
