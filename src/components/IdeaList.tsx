import clsx from "clsx";
import { IIdea, IPromptAttributes } from "@/types/idea";
import {
  ArrowUpRightIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

export const IdeaList = ({
  list,
  handleSearch,
}: {
  list: IIdea[] | null;
  handleSearch: (item: string, options?: IPromptAttributes) => void;
}) => {
  if (!list) return null;

  return (
    <>
      {list.map((listItem, itemIndex) => (
        <li key={itemIndex} className="flex justify-between gap-x-6">
          <div className="min-w-0 flex-auto">
            <h3 className="py-5 text-base font-semibold text-gray-900">
              {listItem.category}
            </h3>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
              {listItem.ideas.map((ideaItem, ideaIndex) => (
                <div
                  key={`${itemIndex}-${ideaIndex}`}
                  className={clsx(
                    ideaIndex === 0
                      ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                      : "",
                    ideaIndex === 1 ? "sm:rounded-tr-lg" : "",
                    ideaIndex === listItem.ideas.length - 2
                      ? "sm:rounded-bl-lg"
                      : "",
                    ideaIndex === listItem.ideas.length - 1
                      ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                      : "",
                    "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-indigo-50",
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "bg-indigo-50",
                        "text-indigo-700",
                        "inline-flex rounded-lg p-3 ring-4 ring-white",
                      )}
                    >
                      <LightBulbIcon aria-hidden="true" className="size-6" />
                    </span>
                  </div>

                  <button
                    className="mt-4 text-left text-sm font-medium text-gray-500"
                    type="button"
                    onClick={() => handleSearch(ideaItem)}
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {ideaItem}
                  </button>

                  <ArrowUpRightIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute right-6 top-6 size-6 text-gray-300 group-hover:text-gray-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </li>
      ))}
    </>
  );
};
