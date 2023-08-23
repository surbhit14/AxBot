import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const SupabaseAuth = () => (
  <div className="dark:bg-slate-900 bg-white dark:text-slate-200">
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <Auth
        providers={["discord"]}
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
      />
    </div>
  </div>
);

export default SupabaseAuth;
