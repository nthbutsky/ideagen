export enum EGiftPreference {
  PRACTICAL = 'practical',
  SENTIMENTAL = 'sentimental',
}

export enum EPromptAttributes {
  RELATIONSHIP = 'relationship',
  GENDER = 'gender',
  OCCASION = 'occasion',
  AGE = 'age',
  BUDGET = 'budget',
  TYPE = 'type',
  CLOSENESS = 'closeness',
  HOBBIES = 'hobbies',
  PERSONALITY = 'personality',
  LIKES = 'likes',
  DISLIKES = 'dislikes',
  LIFESTYLE = 'lifestyle',
  CULTURAL_ASPECT = 'cultural-aspect',
  PURPOSE = 'purpose',
  LAST_MINUTE = 'last-minute',
  ECO = 'eco',
  PREFERENCE = 'preference',
}

export interface IPromptAttributes {
  relationship: string;
  gender?: string;
  occasion: string;
  age: string;
  budget: string;
  type: string;
  closeness: string;
  hobbies: string;
  personality: string;
  likes: string;
  dislikes: string;
  lifestyle: string;
  culturalAspect?: string;
  purpose: string;
  lastMinute: boolean;
  eco: boolean;
  preference: EGiftPreference;
};

export interface IIdea {
  category: string;
  ideas: string[];
}
