import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {string} path - The path to redirect to.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */

export const redirectEncoded = (
  path: string,
  type: "error" | "success",
  message: string,
): never => {
  return redirect(`${path}?type=${type}&message=${encodeURIComponent(message)}`);
}
