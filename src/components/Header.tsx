"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { ERoute } from "@/types/route";
import { TToastType } from "@/types/toast";
import { useToast } from "@/context/ToastContext";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { addToast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const type = searchParams.get("type") as TToastType;

  useEffect(() => {
    if (!message || !type) return;
    addToast(message, type);
  }, [message, type, addToast]);

  if (pathname === ERoute.HOME) {
    return (
      <header className="fixed w-full bg-white">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href={ERoute.HOME} className="-m-1.5 p-1.5">
              <div className="flex h-16 shrink-0 items-center gap-2 text-indigo-600">
                <LightBulbIcon className="h-8 w-auto" />
                <span className="font-semibold">IdeaGen</span>
              </div>
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <Button primary type="button" size="xl">
              <a href={ERoute.LOG_IN}>Log in</a>
            </Button>
            <Button secondary type="submit" size="xl">
              <a href={ERoute.REGISTER}>Sign up</a>
            </Button>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center gap-x-6">
              <a href={ERoute.HOME} className="-m-1.5 p-1.5">
                <div className="flex h-16 shrink-0 items-center gap-2 text-indigo-600">
                  <LightBulbIcon className="h-8 w-auto" />
                  <span className="font-semibold">IdeaGen</span>
                </div>
              </a>
              <a
                href={ERoute.REGISTER}
                className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href={ERoute.LOG_IN}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    );
  } else {
    return null;
  }
};
