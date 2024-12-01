import { redirect } from "next/navigation";
import { ERoute } from "@/types/route";
import { createClient } from "@/utils/supabase/server";

const Home = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!error && data?.user) {
    redirect(ERoute.DASHBOARD);
  }

  return (
    <div className="flex min-h-full flex-col justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Welcome
        </h2>
        <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.
        </p>
      </div>
    </div>
  );
};

export default Home;
