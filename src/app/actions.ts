"use server";

// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { ERoute } from "@/types/route";
import { encodedRedirect } from "@/utils/redirectUtils";

export async function signInAction(formData: FormData) {
  const supabase = await createClient();
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    encodedRedirect("error", ERoute.HOME, error.message);
  }

  // revalidatePath(ERoute.DASHBOARD, "layout");
  redirect(ERoute.DASHBOARD);
}

export async function signUpAction(formData: FormData) {
  const supabase = await createClient();
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp(payload);

  if (error) {
    encodedRedirect("error", ERoute.HOME, error.message);
  }

  // revalidatePath(ERoute.HOME, "layout");
  encodedRedirect("success", ERoute.HOME, "Please check your email for confirmation link");
}

export const signOutAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    encodedRedirect("error", ERoute.HOME, error.message);
  }

  // revalidatePath(ERoute.HOME, "layout");
  encodedRedirect("success", ERoute.HOME, "Signed out successfully");;
};

export const forgotPasswordAction = async (formData: FormData) => {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const payload = {
    email: formData.get("email") as string,
  }
  const { error } = await supabase.auth.resetPasswordForEmail(payload.email, {
    redirectTo: `${origin}/auth/confirm?redirect_to=${ERoute.RESET_PASSWORD}`,
  })

  if (error) {
    encodedRedirect("error", ERoute.FORGOT_PASSWORD, error.message);
  }

  encodedRedirect("success", ERoute.HOME, "Check your email for a link to reset your password");;
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();
  const payload = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  }

  if (payload.password !== payload.confirmPassword) {
    encodedRedirect(
      "error",
      ERoute.RESET_PASSWORD,
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: payload.password
  })

  if (error) {
    encodedRedirect("error", ERoute.RESET_PASSWORD, error.message);
  }

  encodedRedirect("success", ERoute.SIGN_IN, "Password updated");;
}