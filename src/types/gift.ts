export type TGiftPreference = 'Practical' | 'Sentimental';

export type TGiftAttributes = {
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
  preference: TGiftPreference;
  lifestyle: string;
  closeness: string;
  lastMinuteGift: boolean;
  culturalAspect?: string;
  ecoConsciousness: boolean;
  giftPurpose: string;
};

export type TGiftIdea = {
  category: string;
  items: string[];
}
