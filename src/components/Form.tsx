"use client";

import { useState } from "react";
import clsx from "clsx";

import { getResponse, handleAmazonSearch } from "@/utils/ideaHelpers";

import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Toggle } from "@/components/Toggle";
import { Button } from "@/components/Button";

import { EIdeaPreference, TIdea, TIdeaPreference } from "@/types/idea";

export const Form = () => {
  const [relationship, setRelationship] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [personality, setPersonality] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [giftType, setGiftType] = useState("");
  const [preference, setPreference] = useState<TIdeaPreference>(
    EIdeaPreference.SENTIMENTAL,
  );
  const [lifestyle, setLifestyle] = useState("");
  const [closeness, setCloseness] = useState("");
  const [lastMinuteGift, setLastMinuteGift] = useState(false);
  const [culturalAspect, setCulturalAspect] = useState("");
  const [ecoConsciousness, setEcoConsciousness] = useState(false);
  const [giftPurpose, setGiftPurpose] = useState("");

  const [preferenceToggle, setPreferenceToggle] = useState(false); 
  // false = sentimental, true = practical

  const [ideas, setIdeas] = useState<TIdea[] | null>(null);
  
  const handlePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prompt = {
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
    };

    console.log(prompt);

    const ideas = await getResponse(prompt);
    setIdeas(ideas);
  };

  const handlePreference = (value: boolean) => {
    setPreferenceToggle(value);
    setPreference(
      value ? EIdeaPreference.PRACTICAL : EIdeaPreference.SENTIMENTAL,
    );
  };

  return (
    <>
      <form
        onSubmit={handlePrompt}
        className="grid max-w-[1280px] grid-cols-2 items-start gap-4 md:grid-cols-4"
      >
        <Input
          label="Relationship"
          name="relationship"
          type="text"
          className="col-span-2 md:col-span-1"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          tooltipText="Parents, father, mother, brother, sister, uncle, aunt, etc."
        />

        <Input
          label="Gender"
          name="gender"
          type="text"
          className="col-span-2 md:col-span-1"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          tooltipText="Male, Female, Non-binary, etc."
        />

        <Input
          label="Occasion"
          name="occasion"
          type="text"
          className="col-span-2 md:col-span-1"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          tooltipText="Wedding, Birthday, Christmas, etc."
        />

        <div className="col-span-2 contents gap-4 md:col-span-1 md:flex">
          <Input
            label="Age"
            name="age"
            type="text"
            placeholder="25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={1}
          />

          <Input
            label="Budget"
            name="price"
            type="text"
            placeholder="100"
            value={budget}
            price
            onChange={(e) => setBudget(e.target.value)}
            min={1}
          />
        </div>

        <Input
          label="Gift type"
          name="gift-type"
          type="text"
          className="col-span-2 md:col-span-1"
          value={giftType}
          onChange={(e) => setGiftType(e.target.value)}
          tooltipText="Clothing, Jewelry, Electronics, etc."
        />

        <Input
          label="Closeness"
          name="closeness"
          type="text"
          className="col-span-2 md:col-span-1"
          value={closeness}
          onChange={(e) => setCloseness(e.target.value)}
          tooltipText="New acquaintance, close friend, long-term partner, casual colleague, etc."
        />

        <Input
          label="Hobbies"
          name="hobbies"
          type="text"
          className="col-span-2"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
          tooltipText="Reading, hiking, traveling, etc."
        />

        <Input
          label="Personality"
          name="personality"
          type="text"
          className="col-span-2"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          tooltipText="Friendly, sociable, intelligent, etc."
        />

        <Input
          label="Likes"
          name="likes"
          type="text"
          className="col-span-2"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
          tooltipText="Sunny days, beaches, animals, etc."
        />

        <Input
          label="Dislikes"
          name="dislikes"
          type="text"
          className="col-span-2"
          value={dislikes}
          onChange={(e) => setDislikes(e.target.value)}
          tooltipText="Rainy days, cold weather, dogs, etc."
        />

        <Input
          label="Lifestyle"
          name="lifestyle"
          type="text"
          className="col-span-2"
          value={lifestyle}
          onChange={(e) => setLifestyle(e.target.value)}
          tooltipText="Active, homebody, tech-savvy, nature-loving, eco-conscious, etc."
        />

        <Input
          label="Cultural aspect"
          name="cultural-aspect"
          type="text"
          className="col-span-2"
          value={culturalAspect}
          onChange={(e) => setCulturalAspect(e.target.value)}
          tooltipText="Avoid alcohol, align with religious or cultural values like ..., etc."
        />

        <Input
          label="Gift purpose"
          name="gift-purpose"
          type="text"
          className="col-span-2"
          value={giftPurpose}
          onChange={(e) => setGiftPurpose(e.target.value)}
          tooltipText="To make them laugh, help them relax, challenge them, help them learn, or just to show appreciation, etc."
        />

        <div className="col-span-2">
          <Checkbox
            label="Last minute gift"
            name="last-minute-gift"
            type="checkbox"
            checked={lastMinuteGift}
            onChange={(e) => setLastMinuteGift(e.target.checked)}
          />

          <Checkbox
            label="Eco-friendly / minimal environmental impact"
            name="eco-consciousness"
            type="checkbox"
            checked={ecoConsciousness}
            onChange={(e) => setEcoConsciousness(e.target.checked)}
          />
        </div>

        <Toggle
          label="Preference"
          name="preference"
          onChange={(value) => handlePreference(value)}
          checked={preferenceToggle}
        >
          <div className="h-6 overflow-hidden">
            <div
              className={clsx("duration-300 ease-in-out", {
                "-translate-y-6": preference === EIdeaPreference.PRACTICAL,
              })}
            >
              <div>{EIdeaPreference.SENTIMENTAL}</div>
              <div>{EIdeaPreference.PRACTICAL}</div>
            </div>
          </div>
        </Toggle>

        <div className="flex h-full items-center justify-end">
          <Button primary type="submit" text="Let's find ideas" size="xl" />
        </div>
      </form>

      {ideas && (
        <div className="mt-4">
          <ul role="list" className="divide-y divide-gray-50">
            {ideas.map((idea) => (
              <li
                key={idea.category}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {idea.category}
                    </p>
                    <ol className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {idea.items.map((item) => (
                        <li key={item}>
                          <button
                            type="button"
                            onClick={() =>
                              handleAmazonSearch(
                                item,
                                lastMinuteGift,
                                budget,
                              )
                            }
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};