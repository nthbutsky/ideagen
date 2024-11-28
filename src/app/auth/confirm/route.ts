// import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";
import { ERoute } from "@/types/route";

// import { encodedRedirect } from "@/utils/redirectUtils";

export const GET = async (request: NextRequest) => {
  // const { searchParams } = new URL(request.url);
  // const token_hash = searchParams.get("token_hash");
  // const type = searchParams.get("type") as EmailOtpType | null;
  // const next = searchParams.get("next") ?? ERoute.HOME;

  // if (token_hash && type) {
  //   const supabase = await createClient();

  //   const { error } = await supabase.auth.verifyOtp({
  //     type,
  //     token_hash,
  //   });
  //   if (!error) {
  //     redirect(next);
  //   }
  // }

  // encodedRedirect("error", ERoute.HOME, "Error. Please try again.");

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  return NextResponse.redirect(`${origin}${ERoute.DASHBOARD}`);
};
