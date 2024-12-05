export type TValidationRule = (value: string | number | boolean | undefined, key?: string) => string | null;

export const validateField = (
  key: string,
  value: string | number | boolean | undefined,
  rules: {
    [key: string]: TValidationRule;
  } = {},
  formErrors: Record<string, string> = {},
): Record<string, string> => {
  const errors: Record<string, string> = formErrors || {};
  delete errors[key];

  const defaultRule = rules.default;
  if (defaultRule) {
    const defaultError = defaultRule(value, key);
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
