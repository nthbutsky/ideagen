import { GoogleGenerativeAI } from "@google/generative-ai";

import { buildPrompt } from "@/utils/promptBuilder";

import { TIdeaAttributes } from "@/types/idea";

const initGenerativeModel = () => {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY as string,
  );
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You only come up with ideas for gifts/presents. The response must be in JSON format. The schema must be the following: {[{'category': 'categoryName','items': ['item1','item2','item3']}]}. Always suggest at least 3 ideas for each category.",
  });
};

export const getGeminiResponse = async (attributesPrompt: TIdeaAttributes) => {
  const model = initGenerativeModel();
  const structuredPrompt = buildPrompt(attributesPrompt);

  const result = await model.generateContent(structuredPrompt);
  const resultRaw = result.response.text();
  return resultRaw
    .replace(/^```json/, "") // Remove the starting part
    .replace(/```$/, "") // Remove the ending part
    .trim(); //Remove any extra whitespace
};
