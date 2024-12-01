import { getGeminiResponse } from "@/api/gemini";
import { IIdea, TPromptAttributes } from "@/types/idea";
import { IErrorResponse, IResponse } from "@/types/response";

export const fetchGeminiResponse = async (prompt: TPromptAttributes) => {
  try {
    const jsonResponse = await getGeminiResponse(prompt);
    try {
      const parsedResponse: IIdea[] = JSON.parse(jsonResponse);
      return {
        status: "success",
        response: {
          data: parsedResponse,
          details: null,
        },
      } as IResponse;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      return {
        status: "error",
        response: {
          data: null,
          details: {
            code: "PARSE_ERROR",
            message: "Failed to parse Gemini response",
          },
        },
      } as IResponse;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const statusCode = error?.response?.status || 500;

    let errorResponse: IErrorResponse;

    switch (statusCode) {
      case 400:
        errorResponse = {
          code: "INVALID_ARGUMENT",
          message:
            "The request body is malformed or there is a typo/missing field. Check the API documentation.",
        };
        break;
      case 400:
        errorResponse = {
          code: "FAILED_PRECONDITION",
          message:
            "The free tier Gemini API is not supported in your region. Enable billing on your Google AI Studio project.",
        };
        break;
      case 403:
        errorResponse = {
          code: "PERMISSION_DENIED",
          message:
            "Your API key lacks the required permissions. Verify your API key and authentication process.",
        };
        break;
      case 404:
        errorResponse = {
          code: "NOT_FOUND",
          message:
            "The requested resource wasn't found. Check your request parameters and API version.",
        };
        break;
      case 429:
        errorResponse = {
          code: "RESOURCE_EXHAUSTED",
          message:
            "Rate limit exceeded. Reduce request frequency or request a quota increase.",
        };
        break;
      case 500:
        errorResponse = {
          code: "INTERNAL",
          message:
            "Unexpected error on the server. Retry with reduced input or switch models. Report if the issue persists.",
        };
        break;
      case 503:
        errorResponse = {
          code: "UNAVAILABLE",
          message:
            "The service is temporarily overloaded. Retry later or switch to a different model.",
        };
        break;
      case 504:
        errorResponse = {
          code: "DEADLINE_EXCEEDED",
          message:
            "The service timed out. Increase the client request timeout or simplify your prompt.",
        };
        break;
      default:
        errorResponse = {
          code: "UNKNOWN_ERROR",
          message: "An unknown error occurred. Please try again later.",
        };
    }

    console.error("Error fetching Gemini response:", errorResponse);
    return {
      status: "error",
      response: errorResponse,
    };
  }
};