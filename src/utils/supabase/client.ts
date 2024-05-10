// import { createBrowserClient } from "@supabase/ssr";
// import type { Database } from "@/utils/database.types";
// import { useMemo } from "react";
// import { TypedSupabaseClient } from "../types";

// let client: TypedSupabaseClient | undefined;

// function getSupabaseBrowserClient() {
//   if (client) {
//     return client;
//   }

//   client = createBrowserClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );

//   return client;
// }

// function useSupabaseBrowser() {
//   return useMemo(getSupabaseBrowserClient, []);
// }

// export default useSupabaseBrowser;

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}