import { getGeminiResponse } from "@/api/gemini";
import { TIdeaAttributes } from "@/types/idea";

export const getResponse = async (prompt: TIdeaAttributes) => {
  try {
    const jsonResponse = await getGeminiResponse(prompt);
    console.log(jsonResponse);

    const parsedData = JSON.parse(jsonResponse);
    console.log(parsedData);
    return parsedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

enum EAmazonTags {
  AFFILIATE = "ideagenid-20",
  GET_IT_TOMORROW = "p_90:8308922011",
  MALE = "p_n_gender_browse-bin:301386",
  FEMALE = "p_n_gender_browse-bin:301387",
}

export const handleAmazonSearch = (
  idea: string,
  lastMinuteGift: boolean,
  budget: string,
) => {
  const amazonUrl = `https://www.amazon.ca/s?k=${encodeURIComponent(idea)}${
    lastMinuteGift ? `&rh=${EAmazonTags.GET_IT_TOMORROW}` : ""
  }&low-price=&high-price=${budget}&tag=${EAmazonTags.AFFILIATE}`;

  // Redirect to the Amazon search URL
  window.open(amazonUrl, "_blank");
};