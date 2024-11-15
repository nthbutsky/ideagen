"use client";

import { useState } from "react";
import clsx from "clsx";

import { getGeminiResponse } from "@/api/gemini";

import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Toggle } from "@/components/Toggle";
import { Button } from "@/components/Button";

import { EGiftPreference, TGiftIdea, TGiftPreference } from "@/types/gift";

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
  const [preference, setPreference] = useState<TGiftPreference>(
    EGiftPreference.SENTIMENTAL,
  );
  const [lifestyle, setLifestyle] = useState("");
  const [closeness, setCloseness] = useState("");
  const [lastMinuteGift, setLastMinuteGift] = useState(false);
  const [culturalAspect, setCulturalAspect] = useState("");
  const [ecoConsciousness, setEcoConsciousness] = useState(false);
  const [giftPurpose, setGiftPurpose] = useState("");

  const [preferenceToggle, setPreferenceToggle] = useState(false); // false = sentimental, true = practical

  const [response, setResponse] = useState<TGiftIdea[] | null>(null);

  const amazonAffiliateTag = "ideagenid-20";
  const getItTomorrow = "p_90:8308922011";
  const male = "p_n_gender_browse-bin:301386";
  const female = "p_n_gender_browse-bin:301387";

  const getResponse = async () => {
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

    try {
      const jsonResponse = await getGeminiResponse(prompt);
      console.log(jsonResponse);

      const parsedData = JSON.parse(jsonResponse);
      console.log(parsedData);
      setResponse(parsedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIdea = (idea: string) => {
    console.log(idea);
    const amazonUrl = `https://www.amazon.ca/s?k=${encodeURIComponent(idea)}${
      lastMinuteGift ? `&rh=${getItTomorrow}` : ""
    }&low-price=&high-price=${budget}&tag=${amazonAffiliateTag}`;

    // Redirect to the Amazon search URL
    window.open(amazonUrl, "_blank");
  };

  const handlePrompt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
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
    });
    getResponse();
  };

  const handlePreference = (value: boolean) => {
    setPreferenceToggle(value);
    setPreference(
      value ? EGiftPreference.PRACTICAL : EGiftPreference.SENTIMENTAL,
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
          placeholder="Brother, Sister, Uncle, Aunt, etc."
          className="col-span-2 md:col-span-1"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        />

        <Input
          label="Gender"
          name="gender"
          type="text"
          placeholder="Male, Female, Non-binary, etc."
          className="col-span-2 md:col-span-1"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <Input
          label="Occasion"
          name="occasion"
          type="text"
          placeholder="Wedding, Birthday, Christmas, etc."
          className="col-span-2 md:col-span-1"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        />

        <div className="col-span-2 contents gap-4 md:col-span-1 md:flex">
          <Input
            label="Age"
            name="age"
            type="number"
            placeholder="25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={1}
          />

          <Input
            label="Budget $"
            name="budget"
            type="number"
            placeholder="100"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min={1}
          />
        </div>

        <Input
          label="Gift type"
          name="gift-type"
          type="text"
          placeholder="Clothing, Jewelry, Electronics, etc."
          className="col-span-2 md:col-span-1"
          value={giftType}
          onChange={(e) => setGiftType(e.target.value)}
        />

        <Input
          label="Closeness"
          name="closeness"
          type="text"
          placeholder="New acquaintance, close friend, long-term partner, casual colleague, etc."
          className="col-span-2 md:col-span-1"
          value={closeness}
          onChange={(e) => setCloseness(e.target.value)}
        />

        <Input
          label="Hobbies"
          name="hobbies"
          type="text"
          placeholder="Reading, Hiking, Traveling, etc."
          className="col-span-2"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
        />

        <Input
          label="Personality"
          name="personality"
          type="text"
          placeholder="Friendly, Sociable, Intelligent, etc."
          className="col-span-2"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
        />

        <Input
          label="Likes"
          name="likes"
          type="text"
          placeholder="Sunny days, Beaches, Cats, etc."
          className="col-span-2"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />

        <Input
          label="Dislikes"
          name="dislikes"
          type="text"
          placeholder="Rainy days, Cold weather, Dogs, etc."
          className="col-span-2"
          value={dislikes}
          onChange={(e) => setDislikes(e.target.value)}
        />

        <Input
          label="Lifestyle"
          name="lifestyle"
          type="text"
          placeholder="Active, homebody, tech-savvy, nature-loving, eco-conscious, etc."
          className="col-span-2"
          value={lifestyle}
          onChange={(e) => setLifestyle(e.target.value)}
        />

        <Input
          label="Cultural aspect"
          name="cultural-aspect"
          type="text"
          placeholder="Avoid alcohol, align with religious or cultural values, etc."
          className="col-span-2"
          value={culturalAspect}
          onChange={(e) => setCulturalAspect(e.target.value)}
        />

        <Input
          label="Gift purpose"
          name="gift-purpose"
          type="text"
          placeholder="To make them laugh, help them relax, challenge them, help them learn, or just to show appreciation, etc."
          className="col-span-2"
          value={giftPurpose}
          onChange={(e) => setGiftPurpose(e.target.value)}
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
                "-translate-y-6": preference === EGiftPreference.PRACTICAL,
              })}
            >
              <div>{EGiftPreference.SENTIMENTAL}</div>
              <div>{EGiftPreference.PRACTICAL}</div>
            </div>
          </div>
        </Toggle>

        <div className="flex h-full items-center justify-center">
          <Button primary type="submit" text="Let's find ideas" size="xl" />
        </div>
      </form>

      {response && (
        <div className="mt-4">
          <ul role="list" className="divide-y divide-gray-50">
            {response.map((idea) => (
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
                            onClick={() => handleIdea(item)}
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
