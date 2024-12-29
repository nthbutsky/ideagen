import { IPromptAttributes } from "@/types/idea";

export const buildPrompt = (attributes: IPromptAttributes): string => {
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
    type,
    preference,
    lifestyle,
    closeness,
    lastMinute,
    culturalAspect,
    eco,
    purpose,
  } = attributes;

  return `
    Generate ideas for a gift for my ${relationship}, who is ${age} years old ${gender ? `and is ${gender}` : ""}. My ${relationship}'s hobbies are ${hobbies}. My ${relationship} likes ${likes}, and dislikes ${dislikes}. My ${relationship}'s personality is ${personality}. The occasion is ${occasion}, and the budget is ${budget}$. My ${relationship} prefers ${type} gifts, and is more inclined towards ${preference} ones. My ${relationship}'s lifestyle is ${lifestyle}. My ${relationship} is ${closeness}. ${lastMinute ? "I need the gift as soon as possible." : ""} Additionally, it should respect the following cultural aspect: ${culturalAspect}${eco ? `, and be eco-friendly or have minimal environmental impact.` : "."} I want the gift to ${purpose}. 
  `;
};
