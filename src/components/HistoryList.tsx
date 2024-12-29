"use client";

import { handleAmazonSearch } from "@/helpers/amazonSearch";
import { IHistoryItem } from "@/types/historyItem";
import { IIdea, IPromptAttributes } from "@/types/idea";
import { formatDate } from "@/utils/formatDate";

const renderPromptAttributes = (attributes: IPromptAttributes) => {
  const labels = {
    relationship: "Relationship",
    gender: "Gender",
    occasion: "Occasion",
    age: "Age",
    budget: "Budget",
    type: "Gift type",
    closeness: "Closeness",
    hobbies: "Hobbies",
    personality: "Personality",
    likes: "Likes",
    dislikes: "Dislikes",
    lifestyle: "Lifestyle",
    culturalAspect: "Cultural aspect",
    purpose: "Gift purpose",
    lastMinute: "Last minute gift",
    eco: "Eco-friendly / minimal environmental impact",
    preference: "Preference",
  };

  return Object.keys(labels).map((key) => {
    const value = attributes[key as keyof IPromptAttributes];
    return (
      <span key={key}>
        <strong>{labels[key as keyof IPromptAttributes]}:</strong>{" "}
        {typeof value === "boolean"
          ? value
            ? "Yes"
            : "No"
          : value
            ? value.toString()
            : " - "}
        {", "}
      </span>
    );
  });
};

export const HistoryList = ({ list }: { list: IHistoryItem[] }) => {
  return (
    <>
      {list.map((item, index) => (
        <div key={index}>
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900">
              {formatDate(item.created_at) || "No Date Available"}
            </h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
              Date when you made a prompt.
            </p>
          </div>
          <div className="my-6 border-y border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Prompt attributes
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.prompt_attributes &&
                    renderPromptAttributes(item.prompt_attributes)}
                </dd>
              </div>

              {item.generated_response?.response.data?.map(
                (idea: IIdea, ideaIndex: number) => (
                  <div
                    key={ideaIndex}
                    className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                  >
                    <dt className="text-sm/6 font-medium text-gray-900">
                      {idea.category}
                    </dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {idea.ideas.map((ideaItem, ideaItemIndex) => (
                        <button
                          key={ideaItemIndex}
                          className="relative text-left text-sm font-medium text-gray-500 hover:text-black"
                          type="button"
                          onClick={() =>
                            handleAmazonSearch(
                              ideaItem,
                              item.prompt_attributes?.lastMinute ?? false,
                              item.prompt_attributes?.budget ?? "",
                            )
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {ideaItem}
                        </button>
                      ))}
                    </dd>
                  </div>
                ),
              )}
            </dl>
          </div>
        </div>
      ))}
    </>
  );
};
