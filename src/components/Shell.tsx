"use client";

import {
  ChangeEvent,
  FormEvent,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  ClockIcon,
  HomeIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/Input";
import { updateUserAction } from "@/app/actions/user";
import { Drawer } from "./Drawer";
import { TValidationRule, validateField } from "@/utils/validateField";
import { useToast } from "@/context/ToastContext";
import { useUser } from "@/hooks/useUser";
import { ERoute } from "@/types/route";

type THeroIcon = ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>
>;

export interface INavigation {
  name: string;
  href: string;
  icon: THeroIcon;
  current: boolean;
}

const navigation: INavigation[] = [
  { name: "Dashboard", href: ERoute.DASHBOARD, icon: HomeIcon, current: true },
  { name: "History", href: ERoute.HISTORY, icon: ClockIcon, current: false },
];

export const Shell = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { addToast } = useToast();

  const isInitialRender = useRef(true);

  const [formData, setFormData] = useState({
    name: user?.user_metadata.name || "",
    email: user?.email || "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const validationRules: { [key: string]: TValidationRule } = {
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)
        ? null
        : "Please enter a valid email address",
    password: (value) =>
      (value as string).length < 8
        ? "Password must be at least 8 characters long"
        : null,
    confirmPassword: (value) =>
      value !== formData.newPassword ? "Passwords do not match" : null,
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    validate: typeof validateField,
  ) => {
    const key = e.target.name;
    const value = e.target.value;

    const updatedErrors = validate(key, value, validationRules, formErrors);
    setFormErrors((prev) => ({ ...prev, ...updatedErrors }));
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const getFormDataToSubmit = () => {
    const { name, email, newPassword, confirmNewPassword } = formData;
    const formToSubmit: Record<string, string> = {};

    if (name !== user?.user_metadata.name && name.length !== 0) {
      formToSubmit["data.name"] = name;
    }

    if (email !== user?.email) {
      formToSubmit.email = email;
    }

    if (newPassword.length !== 0 && confirmNewPassword.length !== 0) {
      if (newPassword !== confirmNewPassword) {
        setFormErrors((prev) => ({
          ...prev,
          confirmNewPassword: "Passwords do not match",
        }));
        return;
      } else {
        formToSubmit.newPassword = newPassword;
        formToSubmit["confirm-new-password"] = confirmNewPassword;
      }
    }

    return formToSubmit;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const formDataToSubmit = getFormDataToSubmit();

    console.log("formDataToSubmit", formDataToSubmit);
    if (
      formDataToSubmit &&
      Object.values(formDataToSubmit).some((value) => value)
    ) {
      updateUserAction(formData);
    } else {
      addToast("Nothing to save", "info");
    }
  };

  const triggerSubmit = () => {
    const form = document.getElementById(
      "user-profile-form",
    ) as HTMLFormElement;
    form.requestSubmit();
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    setFormData((prev) => ({
      ...prev,
      name: user?.user_metadata.name || "",
      email: user?.email || "",
    }));
  }, [user]);

  return (
    <div>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>
            <Sidebar navigation={navigation} />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar navigation={navigation} />
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:justify-end lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>

          <button
            className="-m-1.5 flex items-center rounded-md p-1.5 hover:bg-gray-100"
            type="button"
            onClick={() => setDrawerOpen(true)}
          >
            <span className="sr-only">Open user menu</span>
            <UserCircleIcon className="h-8 w-8 rounded-full bg-gray-50" />
            <span className="hidden lg:flex lg:items-center">
              <span
                aria-hidden="true"
                className="ml-4 text-sm/6 font-semibold text-gray-900"
              >
                Hey,{" "}
                {user?.user_metadata.name
                  ? user.user_metadata.name
                  : user?.email}
              </span>
            </span>
          </button>
        </div>

        <main className="py-10">
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>

      <Drawer
        isOpen={drawerOpen}
        onCloseAction={() => setDrawerOpen(false)}
        onSaveAction={() => triggerSubmit()}
      >
        <form
          onSubmit={handleSubmit}
          id="user-profile-form"
          className="relative z-0 space-y-2"
          autoComplete="off"
        >
          <Input
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange(e, validateField)}
            error={formErrors.name}
            autoComplete="username"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, validateField)}
            error={formErrors.email}
            autoComplete="email"
          />

          <Input
            label="New password"
            id="new-password"
            name="new-password"
            type="password"
            value={formData.newPassword}
            onChange={(e) => handleInputChange(e, validateField)}
            error={formErrors.newPassword}
            autoComplete="new-password"
          />

          <Input
            label="Confirm new password"
            id="confirm-new-password"
            name="confirm-new-password"
            type="password"
            value={formData.confirmNewPassword}
            onChange={(e) => handleInputChange(e, validateField)}
            error={formErrors.confirmNewPassword}
            autoComplete="confirm-new-password"
          />
        </form>
      </Drawer>
    </div>
  );
};
