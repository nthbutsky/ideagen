export enum EIdeaPreference {
  PRACTICAL = 'Practical',
  SENTIMENTAL = 'Sentimental',
}

export type TIdeaPreference = EIdeaPreference;

export type TIdeaAttributes = {
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
  preference: TIdeaPreference;
  lifestyle: string;
  closeness: string;
  lastMinuteGift: boolean;
  culturalAspect?: string;
  ecoConsciousness: boolean;
  giftPurpose: string;
};

export type TIdea = {
  category: string;
  items: string[];
}
