import clsx from "clsx";
import {
  Cog6ToothIcon,
  LightBulbIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { INavigation } from "@/components/Shell";
import { logOutUserAction } from "@/app/actions/user";

export const Sidebar = ({ navigation }: { navigation: INavigation[] }) => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-4 pb-4">
      <div className="flex h-16 shrink-0 items-center gap-2 pl-1 text-white">
        <LightBulbIcon className="h-8 w-auto" />
        <span className="font-semibold">IdeaGen</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={clsx(
                      item.current
                        ? "bg-indigo-700 text-white"
                        : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={clsx(
                        item.current
                          ? "text-white"
                          : "text-indigo-200 group-hover:text-white",
                        "h-6 w-6 shrink-0",
                      )}
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            {/* <a
              href="#"
              className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white"
            >
              <Cog6ToothIcon
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
              />
              Settings
            </a> */}
            <button
              type="button"
              onClick={() => logOutUserAction()}
              className="group flex w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white"
            >
              <ArrowLeftStartOnRectangleIcon
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
              />
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
