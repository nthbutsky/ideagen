import { TIdeaAttributes } from "@/types/idea";

export const buildPrompt = (attributes: TIdeaAttributes): string => {
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
    The occasion is ${occasion}, and the budget is ${budget}$. 
    My ${relationship} prefers ${giftType} gifts and is more inclined towards ${preference} ones. 
    My ${relationship}'s lifestyle is ${lifestyle}. 
    My ${relationship} is ${closeness}. 
    ${lastMinuteGift ? "I need the gift as soon as possible." : ""} 
    Additionally, it should respect ${culturalAspect}, and be ${ecoConsciousness}. 
    I want the gift to ${giftPurpose}. 
  `;
};