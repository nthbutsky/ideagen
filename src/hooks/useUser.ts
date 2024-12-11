import { getUserAction } from "@/app/actions/user";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserAction();
        setUser(fetchedUser.data.user);
        if (fetchedUser.error) {
          console.error("Failed to fetch user:", fetchedUser.error);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return { user };
};
