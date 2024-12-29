"use server";

import { createClient } from "@/utils/supabase/server";
import { redirectEncoded } from "@/utils/redirectEncoded";
import { ERoute } from "@/types/route";
import { Tables } from "@/types/supabase";

export const getHistoryAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('history_ideas')
    .select('*').returns<Tables<'history_ideas'>[]>();

  if (error) {
    redirectEncoded(ERoute.HOME, "error", error.message);
  }

  return { data, error };
};