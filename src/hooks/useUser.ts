import { getUserAction } from "@/app/actions/user";
import { useState, useEffect } from "react";
import { AuthError, User } from "@supabase/supabase-js";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserAction();
        if (fetchedUser.data) {
          setUser(fetchedUser.data.user);
        }
        if (fetchedUser.error) {
          setError(fetchedUser.error);
          console.error("Failed to fetch user:", fetchedUser.error.message);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return { user, error };
};
