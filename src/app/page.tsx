"use client";

import { useState } from "react";
import { TGiftIdea, TGiftPreference } from "@/types/gift";
import { getGeminiResponse } from "@/api/gemini";
import { Input } from "@/components/Input";

export default function Home() {
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
  const [preference, setPreference] = useState<TGiftPreference>("Practical");
  const [lifestyle, setLifestyle] = useState("");
  const [closeness, setCloseness] = useState("");
  const [lastMinuteGift, setLastMinuteGift] = useState(false);
  const [culturalAspect, setCulturalAspect] = useState("");
  const [ecoConsciousness, setEcoConsciousness] = useState(false);
  const [giftPurpose, setGiftPurpose] = useState("");

  const [response, setResponse] = useState<TGiftIdea[] | null>(null);

  const amazonAffiliateTag = "ideagenid-20";

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
    const amazonUrl = `https://www.amazon.ca/s?k=${encodeURIComponent(
      idea,
    )}&tag=${amazonAffiliateTag}`;

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

  return (
    <main className="flex h-screen justify-center">
      <form
        onSubmit={handlePrompt}
        className="flex flex-col items-center gap-1 sm:w-96"
      >
        <Input
          label="Relationship"
          name="relationship"
          type="text"
          placeholder="Brother, Sister, Uncle, Aunt, etc."
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        />

        <div className="flex">
          <Input
            label="Age"
            name="age"
            type="number"
            placeholder="25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            max={169}
            min={1}
          />

          <Input
            label="Budget in $"
            name="budget"
            type="number"
            placeholder="100"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min={1}
          />
        </div>

        <Input
          label="Gender"
          name="gender"
          type="text"
          placeholder="Male, Female, Non-binary, etc."
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <Input
          label="Hobbies"
          name="hobbies"
          type="text"
          placeholder="Reading, Hiking, Traveling, etc."
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
        />

        <Input
          label="Likes"
          name="likes"
          type="text"
          placeholder="Sunny days, Beaches, Cats, etc."
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />

        <Input
          label="Dislikes"
          name="dislikes"
          type="text"
          placeholder="Rainy days, Cold weather, Dogs, etc."
          value={dislikes}
          onChange={(e) => setDislikes(e.target.value)}
        />

        <Input
          label="Personality"
          name="personality"
          type="text"
          placeholder="Friendly, Sociable, Intelligent, etc."
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
        />

        <Input
          label="Occasion"
          name="occasion"
          type="text"
          placeholder="Wedding, Birthday, Christmas, etc."
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        />

        <Input
          label="Gift type"
          name="gift-type"
          type="text"
          placeholder="Clothing, Jewelry, Electronics, etc."
          value={giftType}
          onChange={(e) => setGiftType(e.target.value)}
        />

        <div>
          <label
            htmlFor="preference"
            className="block text-sm text-center font-medium leading-6 text-gray-900 dark:text-gray-50"
          >
            Preference
          </label>
          <select
            id="preference"
            name="preference"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={preference}
            onChange={(e) => setPreference(e.target.value as TGiftPreference)}
          >
            <option>Practical</option>
            <option>Sentimental</option>
          </select>
        </div>

        <Input
          label="Lifestyle"
          name="lifestyle"
          type="text"
          placeholder="Active, homebody, tech-savvy, nature-loving, eco-conscious, etc."
          value={lifestyle}
          onChange={(e) => setLifestyle(e.target.value)}
        />

        <Input
          label="Closeness"
          name="closeness"
          type="text"
          placeholder="New acquaintance, close friend, long-term partner, casual colleague, etc."
          value={closeness}
          onChange={(e) => setCloseness(e.target.value)}
        />

        <Input
          label="Cultural aspect"
          name="cultural-aspect"
          type="text"
          placeholder="Avoid alcohol, align with religious or cultural values, etc."
          value={culturalAspect}
          onChange={(e) => setCulturalAspect(e.target.value)}
        />

        <Input
          label="Gift purpose"
          name="gift-purpose"
          type="text"
          placeholder="To make them laugh, help them relax, challenge them, help them learn, or just to show appreciation, etc."
          value={giftPurpose}
          onChange={(e) => setGiftPurpose(e.target.value)}
        />
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="last-minute-gift"
              name="last-minute-gift"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={lastMinuteGift}
              onChange={(e) => setLastMinuteGift(e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label
              htmlFor="last-minute-gift"
              className="font-medium text-gray-900 dark:text-gray-50"
            >
              Last minute gift
            </label>
          </div>
        </div>

        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="eco-consciousness"
              name="eco-consciousness"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={ecoConsciousness}
              onChange={(e) => setEcoConsciousness(e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label
              htmlFor="eco-consciousness"
              className="font-medium text-gray-900 dark:text-gray-50"
            >
              Eco-friendly or with minimal environmental impact
            </label>
          </div>
        </div>

        <button
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          type="submit"
        >
          Generate
        </button>

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
                      <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">
                        {idea.category}
                      </p>
                      <ol className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-50">
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
      </form>
    </main>
  );
}
