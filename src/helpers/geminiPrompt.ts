import { TPromptAttributes } from "@/types/idea";

export const buildPrompt = (attributes: TPromptAttributes): string => {
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
    Generate ideas for a gift for my ${relationship}, who is ${age} years old ${gender ? `and is ${gender}` : ""}. My ${relationship}'s hobbies are ${hobbies}. My ${relationship} likes ${likes}, and dislikes ${dislikes}. My ${relationship}'s personality is ${personality}. The occasion is ${occasion}, and the budget is ${budget}$. My ${relationship} prefers ${giftType} gifts, and is more inclined towards ${preference} ones. My ${relationship}'s lifestyle is ${lifestyle}. My ${relationship} is ${closeness}. ${lastMinuteGift ? "I need the gift as soon as possible." : ""} Additionally, it should respect the following cultural aspect: ${culturalAspect}${ecoConsciousness ? `, and be eco-friendly or have minimal environmental impact.` : "."} I want the gift to ${giftPurpose}. 
  `;
};
