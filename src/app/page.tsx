import { redirect } from "next/navigation";

import { Button } from "@/components/Button";
import { Banner } from "@/components/Banner";

import { LightBulbIcon } from "@heroicons/react/24/outline";

import { ERoute } from "@/types/route";

import { createClient } from "@/utils/supabase/server";

const Home = async (props: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!error && data?.user) {
    redirect(ERoute.DASHBOARD);
  }

  const searchParams = await props.searchParams;

  return (
    <>
      <header className="bg-white">
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

          <div className="flex flex-1 items-center justify-end gap-x-6">
            <Button primary type="button" size="xl">
              <a href={ERoute.SIGN_IN}>Sign in</a>
            </Button>
            <Button secondary type="submit" size="xl">
              <a href={ERoute.SIGN_UP}>Sign up</a>
            </Button>
          </div>
        </nav>
      </header>

      {"message" in searchParams && (
        <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
          <Banner message={searchParams.message} />
        </div>
      )}
    </>
  );
};

export default Home;
