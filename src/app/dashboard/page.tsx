import { redirect } from "next/navigation";

import { Form } from "@/components/Form";
import { Shell } from "@/components/Shell";

import { createClient } from "@/utils/supabase/server";

import { AuthProvider } from "@/context/AuthContext";
import { ERoute } from "@/types/route";

const Main = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect(ERoute.HOME);
  }

  console.dir(data); // FIXME: remove
  console.dir(error); // FIXME: remove

  return (
    <AuthProvider user={data.user}>
      <Shell>
        <Form />
      </Shell>
    </AuthProvider>
  );
};

export default Main;
