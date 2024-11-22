export enum EGiftPreference {
  PRACTICAL = 'Practical',
  SENTIMENTAL = 'Sentimental',
}

export type TPromptAttributes = {
  relationship: string;
  age: string;
  gender?: string;
  hobbies: string;
  likes: string;
  dislikes: string;
  personality: string;
  occasion: string;
  budget: string;
  giftType: string;
  preference: EGiftPreference;
  lifestyle: string;
  closeness: string;
  lastMinuteGift: boolean;
  culturalAspect?: string;
  ecoConsciousness: boolean;
  giftPurpose: string;
};

export interface IIdea {
  category: string;
  ideas: string[];
}
