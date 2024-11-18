"use client";

import { useState } from "react";
import clsx from "clsx";

import { getResponse, handleAmazonSearch } from "@/utils/ideaHelpers";
import { validateField, validateForm } from "@/utils/fieldValidator";

import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Toggle } from "@/components/Toggle";
import { Button } from "@/components/Button";

import { EIdeaPreference, TIdea, TIdeaAttributes } from "@/types/idea";

export const Form = () => {
  const [formData, setFormData] = useState<TIdeaAttributes>({
    relationship: "",
    age: "",
    gender: "",
    hobbies: "",
    likes: "",
    dislikes: "",
    personality: "",
    occasion: "",
    budget: "",
    giftType: "",
    preference: EIdeaPreference.SENTIMENTAL,
    lifestyle: "",
    closeness: "",
    lastMinuteGift: false,
    culturalAspect: "",
    ecoConsciousness: false,
    giftPurpose: "",
  });
  const [ideas, setIdeas] = useState<TIdea[] | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (key: string, value: string | boolean) => {
    const updatedErrors = validateField(key, value, formErrors);
    setFormErrors((prev) => ({ ...prev, ...updatedErrors }));

    const isCharForNum = () => {
      return (
        (key === "age" || key === "budget") &&
        (isNaN(Number(value)) || Number(value) <= 0)
      );
    };

    setFormData((prev) => ({ ...prev, [key]: isCharForNum() ? "" : value }));
  };

  const handlePreferenceChange = (value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preference: value
        ? EIdeaPreference.PRACTICAL
        : EIdeaPreference.SENTIMENTAL,
    }));
  };

  const handlePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedErrors = validateForm(formData);
    if (Object.keys(updatedErrors).length > 0) {
      setFormErrors((prev) => ({ ...prev, ...updatedErrors }));
      return;
    }
    setFormErrors(updatedErrors);

    console.log({ ...formData });

    const response = await getResponse({ ...formData });
    setIdeas(response);
  };

  const renderIdeaList = () => {
    if (!ideas) return null;

    return (
      <div className="mt-4">
        <ul role="list" className="divide-y divide-gray-50">
          {ideas.map((idea) => (
            <li
              key={idea.category}
              className="flex justify-between gap-x-6 py-5"
            >
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
                            formData.lastMinuteGift,
                            formData.budget,
                          )
                        }
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <form
        onSubmit={handlePrompt}
        className="grid max-w-[1280px] grid-cols-2 items-start gap-x-6 md:grid-cols-4"
      >
        <Input
          placeholder="Relationship"
          name="relationship"
          type="text"
          className="col-span-2 md:col-span-1"
          value={formData.relationship}
          onChange={(e) => handleInputChange("relationship", e.target.value)}
          tooltipText="Parents, father, mother, brother, sister, uncle, aunt, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.relationship}
        />

        <Input
          placeholder="Gender"
          name="gender"
          type="text"
          className="col-span-2 md:col-span-1"
          value={formData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
          tooltipText="Male, Female, Non-binary, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.gender}
        />

        <Input
          placeholder="Occasion"
          name="occasion"
          type="text"
          className="col-span-2 md:col-span-1"
          value={formData.occasion}
          onChange={(e) => handleInputChange("occasion", e.target.value)}
          tooltipText="Wedding, Birthday, Christmas, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.occasion}
        />

        <div className="col-span-2 flex gap-4 md:col-span-1">
          <Input
            placeholder="Age"
            name="age"
            type="text"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            min={1}
            error={formErrors.age}
            className="w-full"
          />

          <Input
            placeholder="Budget"
            name="budget"
            type="text"
            value={formData.budget}
            price
            onChange={(e) => handleInputChange("budget", e.target.value)}
            min={1}
            error={formErrors.budget}
            className="w-full"
          />
        </div>

        <Input
          placeholder="Gift type"
          name="gift-type"
          type="text"
          className="col-span-2 md:col-span-1"
          value={formData.giftType}
          onChange={(e) => handleInputChange("giftType", e.target.value)}
          tooltipText="Clothing, Jewelry, Electronics, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.giftType}
        />

        <Input
          placeholder="Closeness"
          name="closeness"
          type="text"
          className="col-span-2 md:col-span-1"
          value={formData.closeness}
          onChange={(e) => handleInputChange("closeness", e.target.value)}
          tooltipText="New acquaintance, close friend, long-term partner, casual colleague, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.closeness}
        />

        <Input
          placeholder="Hobbies"
          name="hobbies"
          type="text"
          className="col-span-2"
          value={formData.hobbies}
          onChange={(e) => handleInputChange("hobbies", e.target.value)}
          tooltipText="Reading, hiking, traveling, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.hobbies}
        />

        <Input
          placeholder="Personality"
          name="personality"
          type="text"
          className="col-span-2"
          value={formData.personality}
          onChange={(e) => handleInputChange("personality", e.target.value)}
          tooltipText="Friendly, sociable, intelligent, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.personality}
        />

        <Input
          placeholder="Likes"
          name="likes"
          type="text"
          className="col-span-2"
          value={formData.likes}
          onChange={(e) => handleInputChange("likes", e.target.value)}
          tooltipText="Sunny days, beaches, animals, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.likes}
        />

        <Input
          placeholder="Dislikes"
          name="dislikes"
          type="text"
          className="col-span-2"
          value={formData.dislikes}
          onChange={(e) => handleInputChange("dislikes", e.target.value)}
          tooltipText="Rainy days, cold weather, dogs, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.dislikes}
        />

        <Input
          placeholder="Lifestyle"
          name="lifestyle"
          type="text"
          className="col-span-2"
          value={formData.lifestyle}
          onChange={(e) => handleInputChange("lifestyle", e.target.value)}
          tooltipText="Active, homebody, tech-savvy, nature-loving, eco-conscious, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.lifestyle}
        />

        <Input
          placeholder="Cultural aspect"
          name="cultural-aspect"
          type="text"
          className="col-span-2"
          value={formData.culturalAspect}
          onChange={(e) => handleInputChange("culturalAspect", e.target.value)}
          tooltipText="Avoid alcohol, align with religious or cultural values, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.culturalAspect}
        />

        <Input
          placeholder="Gift purpose"
          name="gift-purpose"
          type="text"
          className="col-span-2"
          value={formData.giftPurpose}
          onChange={(e) => handleInputChange("giftPurpose", e.target.value)}
          tooltipText="To make them laugh, help them relax, challenge them, help them learn, or just to show appreciation, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.giftPurpose}
        />

        <div className="col-span-2">
          <Checkbox
            label="Last minute gift"
            name="last-minute-gift"
            type="checkbox"
            checked={formData.lastMinuteGift}
            onChange={(e) =>
              handleInputChange("lastMinuteGift", e.target.checked)
            }
          />

          <Checkbox
            label="Eco-friendly / minimal environmental impact"
            name="eco-consciousness"
            type="checkbox"
            checked={formData.ecoConsciousness}
            onChange={(e) =>
              handleInputChange("ecoConsciousness", e.target.checked)
            }
          />
        </div>

        <Toggle
          label="Preference"
          name="preference"
          onChange={handlePreferenceChange}
          checked={formData.preference === EIdeaPreference.PRACTICAL}
        >
          <div className="h-6 overflow-hidden">
            <div
              className={clsx("duration-300 ease-in-out", {
                "-translate-y-6":
                  formData.preference === EIdeaPreference.PRACTICAL,
              })}
            >
              <div>{EIdeaPreference.SENTIMENTAL}</div>
              <div>{EIdeaPreference.PRACTICAL}</div>
            </div>
          </div>
        </Toggle>

        <div className="flex h-full items-center justify-end">
          <Button
            disabled={Object.values(formErrors).some((error) => error)}
            primary
            type="submit"
            text="Let's find ideas"
            size="xl"
          />
        </div>
      </form>

      {renderIdeaList()}
    </>
  );
};
