"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import clsx from "clsx";

import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Toggle } from "@/components/Toggle";
import { Button } from "@/components/Button";
import { IdeaList } from "@/components/IdeaList";

import { fetchGeminiResponse } from "@/utils/fetchGeminiResponse";
import { TValidationRule, validateField } from "@/utils/validateField";
import { validateForm } from "@/utils/validateForm";

import { IIdea } from "@/types/idea";
import { EGiftPreference, EPromptAttributes, IPromptAttributes } from "@/types/prompt";
import { IResponse } from "@/types/response";

import { useToast } from "@/context/ToastContext";

import { handleAmazonSearch } from "@/helpers/amazonSearch";
import { capFirstChar } from "@/utils/capFirstChar";
import { TFormError } from "@/types/formError";

// import { dummyResponse } from "@/helpers/dummyResponse";

export const Form = () => {
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState<IPromptAttributes>({
    relationship: "",
    age: "",
    gender: "",
    hobbies: "",
    likes: "",
    dislikes: "",
    personality: "",
    occasion: "",
    budget: "",
    type: "",
    preference: EGiftPreference.SENTIMENTAL,
    lifestyle: "",
    closeness: "",
    lastMinute: false,
    culturalAspect: "",
    eco: false,
    purpose: "",
  });
  const [ideaList, seIIdeaList] = useState<IIdea[] | null>(
    // dummyResponse.response.data,
    null,
  );
  const [formErrors, setFormErrors] = useState<TFormError>({});

  const { addToast } = useToast();

  const validationRules: { [key: string]: TValidationRule } = {
    default: (value, key) =>
      !value && typeof value !== "boolean" && key !== "gender"
        ? "Required field"
        : null,
    age: (value) =>
      isNaN(Number(value)) || Number(value) <= 0 ? "Must be a number" : null,
    budget: (value) =>
      isNaN(Number(value)) || Number(value) <= 0 ? "Must be a number" : null,
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    validate: typeof validateField,
  ) => {
    const key = e.target.name as keyof IPromptAttributes;
    const value = e.target.value;

    const updatedErrors = validate(key, value, validationRules, formErrors);
    setFormErrors((prev) => ({ ...prev, ...updatedErrors }));

    const isCharForNum = () => {
      return (
        (key === "age" || key === "budget") &&
        (validationRules.age(value) || validationRules.budget(value))
      );
    };

    setFormData((prev) => ({ ...prev, [key]: isCharForNum() ? "" : value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handlePreferenceChange = (value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preference: value
        ? EGiftPreference.PRACTICAL
        : EGiftPreference.SENTIMENTAL,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    try {
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
      seIIdeaList(result.response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 items-start gap-x-6 md:grid-cols-4"
      >
        <Input
          label="Relationship"
          name={EPromptAttributes.RELATIONSHIP}
          type="text"
          className="col-span-2 md:col-span-1"
          value={formData.relationship}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="Parents, father, mother, brother, sister, uncle, aunt, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.relationship}
        />

        <Input
          label="Gender"
          name={EPromptAttributes.GENDER}
          type="text"
          className="col-span-2 md:col-span-1"
          value={formData.gender}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="Male, Female, Non-binary, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.gender}
        />

        <Input
          label="Occasion"
          name={EPromptAttributes.OCCASION}
          type="text"
          className="col-span-2 md:col-span-1"
          value={formData.occasion}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="Wedding, Birthday, Christmas, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.occasion}
        />

        <div className="col-span-2 flex gap-4 md:col-span-1">
          <Input
            label="Age"
            name={EPromptAttributes.AGE}
            type="text"
            value={formData.age}
            onChange={(e) => handleInputChange(e, validateField)}
            min={1}
            error={formErrors.age}
            className="w-full"
          />

          <Input
            label="Budget"
            name={EPromptAttributes.BUDGET}
            type="text"
            value={formData.budget}
            price
            onChange={(e) => handleInputChange(e, validateField)}
            min={1}
            error={formErrors.budget}
            className="w-full"
          />
        </div>

        <Input
          label="Gift type"
          name={EPromptAttributes.TYPE}
          type="text"
          className="col-span-2 md:col-span-1"
          value={formData.type}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="Clothing, Jewelry, Electronics, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.type}
        />

        <Input
          label="Closeness"
          name={EPromptAttributes.CLOSENESS}
          type="text"
          className="col-span-2 md:col-span-1"
          value={formData.closeness}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="New acquaintance, close friend, long-term partner, casual colleague, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.closeness}
        />

        <Input
          label="Hobbies"
          name={EPromptAttributes.HOBBIES}
          type="text"
          className="col-span-2"
          value={formData.hobbies}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="Reading, hiking, traveling, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.hobbies}
        />

        <Input
          label="Personality"
          name={EPromptAttributes.PERSONALITY}
          type="text"
          className="col-span-2"
          value={formData.personality}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="Friendly, sociable, intelligent, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.personality}
        />

        <Input
          label="Likes"
          name={EPromptAttributes.LIKES}
          type="text"
          className="col-span-2"
          value={formData.likes}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="Sunny days, beaches, animals, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.likes}
        />

        <Input
          label="Dislikes"
          name={EPromptAttributes.DISLIKES}
          type="text"
          className="col-span-2"
          value={formData.dislikes}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="Rainy days, cold weather, dogs, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.dislikes}
        />

        <Input
          label="Lifestyle"
          name={EPromptAttributes.LIFESTYLE}
          type="text"
          className="col-span-2"
          value={formData.lifestyle}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="Active, homebody, tech-savvy, nature-loving, eco-conscious, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.lifestyle}
        />

        <Input
          label="Cultural aspect"
          name={EPromptAttributes.CULTURAL_ASPECT}
          type="text"
          className="col-span-2"
          value={formData.culturalAspect}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="Avoid alcohol, align with religious or cultural values, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.culturalAspect}
        />

        <Input
          label="Gift purpose"
          name={EPromptAttributes.PURPOSE}
          type="text"
          className="col-span-2"
          value={formData.purpose}
          onChange={(e) => handleInputChange(e, validateField)}
          tooltipText="To make them laugh, help them relax, challenge them, help them learn, or just to show appreciation, etc."
          tooltipSettings={{ bodyOffsetX: "-8px", bodyOffsetY: "8px" }}
          error={formErrors.purpose}
        />

        <div className="col-span-2 mb-4 md:mb-0">
          <Checkbox
            label="Last minute gift"
            name={EPromptAttributes.LAST_MINUTE}
            type="checkbox"
            checked={formData.lastMinute}
            onChange={handleCheckboxChange}
          />

          <Checkbox
            label="Eco-friendly / minimal environmental impact"
            name={EPromptAttributes.ECO}
            type="checkbox"
            checked={formData.eco}
            onChange={handleCheckboxChange}
          />
        </div>

        <Toggle
          label="Preference"
          name={EPromptAttributes.PREFERENCE}
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
              <div>{capFirstChar(EGiftPreference.SENTIMENTAL)}</div>
              <div>{capFirstChar(EGiftPreference.PRACTICAL)}</div>
            </div>
          </div>
        </Toggle>

        <div className="flex h-full items-center justify-end">
          <Button
            primary
            type="submit"
            size="xl"
            isDisabled={Object.values(formErrors).some((error) => error)}
          >
            {pending ? "Loading..." : "Let's find ideas"}
          </Button>
        </div>
      </form>

      <IdeaList
        list={ideaList}
        handleSearch={(idea) =>
          handleAmazonSearch(idea, formData.lastMinute, formData.budget)
        }
      />
    </>
  );
};
