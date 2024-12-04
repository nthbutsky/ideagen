"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirectEncoded } from "@/utils/redirectEncoded";
import { ERoute } from "@/types/route";

export async function logInUserAction(formData: FormData) {
  const supabase = await createClient();
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    redirectEncoded("error", ERoute.HOME, error.message);
  }

  revalidatePath(ERoute.DASHBOARD, "layout");
  redirect(ERoute.DASHBOARD);
}

export async function registerUserAction(formData: FormData) {
  const supabase = await createClient();
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp(payload);

  if (error) {
    redirectEncoded("error", ERoute.HOME, error.message);
  }

  revalidatePath(ERoute.HOME, "layout");
  redirectEncoded(
    "success",
    ERoute.HOME,
    "Please check your email for confirmation link",
  );
}

export const logOutUserAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirectEncoded("error", ERoute.HOME, error.message);
  }

  revalidatePath(ERoute.HOME, "layout");
  redirectEncoded("success", ERoute.HOME, "Signed out successfully");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const payload = {
    email: formData.get("email") as string,
  };
  const { error } = await supabase.auth.resetPasswordForEmail(payload.email, {
    redirectTo: `${origin}/auth/confirm?redirect_to=${ERoute.RESET_PASSWORD}`,
  });

  if (error) {
    redirectEncoded("error", ERoute.FORGOT_PASSWORD, error.message);
  }

  revalidatePath(ERoute.HOME, "layout");
  redirectEncoded(
    "success",
    ERoute.HOME,
    "Check your email for a link to reset your password",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();
  const payload = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  };

  if (payload.password !== payload.confirmPassword) {
    redirectEncoded("error", ERoute.RESET_PASSWORD, "Passwords do not match");
  }

  const { error } = await supabase.auth.updateUser({
    password: payload.password,
  });

  if (error) {
    redirectEncoded("error", ERoute.RESET_PASSWORD, error.message);
  }

  revalidatePath(ERoute.LOG_IN, "layout");
  redirectEncoded("success", ERoute.LOG_IN, "Password updated");
};

export const updateUserAction = async (formData: FormData) => {
  const supabase = await createClient();

  const payload: Record<string, string | undefined> = {};

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const newPassword = formData.get("new-password") as string;
  const confirmNewPassword = formData.get("confirm-new-password") as string;

  if (name) {
    payload.name = name;
  }
  if (email) {
    payload.email = email;
  }
  if (newPassword) {
    if (newPassword !== confirmNewPassword) {
      redirectEncoded("error", ERoute.DASHBOARD, "Passwords do not match");
      return;
    }
    payload.password = newPassword;
  }

  const updateOptions: {
    data?: {
      name?: string;
    };
    email?: string;
    password?: string;
  } = {};

  if (payload.name) {
    updateOptions.data = {
      name: payload.name,
    };
  }
  if (payload.email) {
    updateOptions.email = payload.email;
  }
  if (payload.password) {
    updateOptions.password = payload.password;
  }

  const { error } = await supabase.auth.updateUser(updateOptions);

  if (error) {
    redirectEncoded("error", ERoute.DASHBOARD, error.message);
  }

  revalidatePath(ERoute.DASHBOARD, "layout");
  redirectEncoded("success", ERoute.DASHBOARD, "Profile updated");
};
