"use client";

import { FormEvent, useState } from "react";
import clsx from "clsx";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Toggle } from "@/components/Toggle";
import { Button } from "@/components/Button";
import { fetchGeminiResponse } from "@/utils/fetchGeminiResponse";
import { handleAmazonSearch } from "@/helpers/amazonSearch";
import { validateField } from "@/utils/validateField";
import { validateForm } from "@/utils/validateForm";
import { EGiftPreference, IIdea, TPromptAttributes } from "@/types/idea";
import { IResponse } from "@/types/response";
import { useToast } from "@/context/ToastContext";

export const Form = () => {
  const [formData, setFormData] = useState<TPromptAttributes>({
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
    preference: EGiftPreference.SENTIMENTAL,
    lifestyle: "",
    closeness: "",
    lastMinuteGift: false,
    culturalAspect: "",
    ecoConsciousness: false,
    giftPurpose: "",
  });
  const [ideaList, setIdeaList] = useState<IIdea[] | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { addToast } = useToast();

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
        ? EGiftPreference.PRACTICAL
        : EGiftPreference.SENTIMENTAL,
    }));
  };

  const handlePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedErrors = validateForm(formData);
    if (Object.entries(updatedErrors).length > 0) {
      setFormErrors((prev) => ({ ...prev, ...updatedErrors }));
      return;
    }
    setFormErrors(updatedErrors);
    console.log("formData", formData); // FIXME: remove
    const result = (await fetchGeminiResponse(formData)) as IResponse;
    console.log("result", result); // FIXME: remove
    if (result.status === "error" && result.response.details) {
      addToast(result.response.details.message, "error");
      return;
    }

    setIdeaList(result.response.data);
  };

  const renderIdeaList = () => {
    if (!ideaList) return null;

    return (
      <div className="mt-4">
        <ul role="list" className="divide-y divide-gray-50">
          {ideaList.map((item) => (
            <li
              key={item.category}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {item.category}
                </p>
                <ol className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {item.ideas.map((item) => (
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
        className="grid max-w-7xl grid-cols-2 items-start gap-x-6 md:grid-cols-4"
      >
        <Input
          label="Relationship"
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
          label="Gender"
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
          label="Occasion"
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
            label="Age"
            name="age"
            type="text"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            min={1}
            error={formErrors.age}
            className="w-full"
          />

          <Input
            label="Budget"
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
          label="Gift type"
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
          label="Closeness"
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
          label="Hobbies"
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
          label="Personality"
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
          label="Likes"
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
          label="Dislikes"
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
          label="Lifestyle"
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
          label="Cultural aspect"
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
          label="Gift purpose"
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
          onChangeAction={handlePreferenceChange}
          checked={formData.preference === EGiftPreference.PRACTICAL}
        >
          <div className="h-6 overflow-hidden">
            <div
              className={clsx("duration-300 ease-in-out", {
                "-translate-y-6":
                  formData.preference === EGiftPreference.PRACTICAL,
              })}
            >
              <div>{EGiftPreference.SENTIMENTAL}</div>
              <div>{EGiftPreference.PRACTICAL}</div>
            </div>
          </div>
        </Toggle>

        <div className="flex h-full items-center justify-end">
          <Button
            isDisabled={Object.values(formErrors).some((error) => error)}
            primary
            type="submit"
            size="xl"
          >
            Let's find ideas
          </Button>
        </div>
      </form>

      {renderIdeaList()}
    </>
  );
};
