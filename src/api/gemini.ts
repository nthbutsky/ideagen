import { GoogleGenerativeAI } from "@google/generative-ai";
import { TGiftAttributes } from "@/types/gift";

const buildPrompt = (attributes: TGiftAttributes): string => {
  const {
    relationship,
    age,
    gender,
    hobbies,
    likes,
    dislikes,
    personality,
    occasion,
    budget,
    giftType,
    preference,
    lifestyle,
    closeness,
    lastMinuteGift,
    culturalAspect,
    ecoConsciousness,
    giftPurpose,
  } = attributes;

  return `
    Generate ideas for a gift for my ${relationship}, who is ${age} years old 
    ${gender ? `and is ${gender}` : ""}. 
    My ${relationship} has/is ${hobbies}. 
    My ${relationship} likes ${likes}, but dislikes ${dislikes}. 
    My ${relationship}'s personality is ${personality}. 
    The occasion is ${occasion}, and the budget is ${budget}. 
    My ${relationship} prefers ${giftType} gifts and is more inclined towards ${preference} ones. 
    My ${relationship}'s lifestyle is ${lifestyle}. 
    My ${relationship} is ${closeness}. 
    ${lastMinuteGift ? "I need the gift as soon as possible." : ""} 
    Additionally, it should respect ${culturalAspect}, and be ${ecoConsciousness}. 
    I want the gift to ${giftPurpose}. 
  `;
};

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

export const getGeminiResponse = async (attributesPrompt: TGiftAttributes) => {
  const model = initGenerativeModel();
  const structuredPrompt = buildPrompt(attributesPrompt);

  const result = await model.generateContent(structuredPrompt);
  const resultRaw = result.response.text();
  return resultRaw
    .replace(/^```json/, "") // Remove the starting part
    .replace(/```$/, "") // Remove the ending part
    .trim(); //Remove any extra whitespace
};
