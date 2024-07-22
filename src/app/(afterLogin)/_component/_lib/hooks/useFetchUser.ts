import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";

export function useFetchUser() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState({
    avatar_url: "",
    user_name: "",
    id: "",
  });

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          if (error) throw error;
          if (data) setUser(data);
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar();
  }, [supabase]);

  return { user };
}
