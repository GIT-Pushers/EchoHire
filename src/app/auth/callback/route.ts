import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = "/dashboard";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user data :", userError.message);
        return NextResponse.redirect(`${origin}/error`);
      }

      const { data: existingUser } = await supabase
        .from("User")
        .select("*")
        .eq("email", data?.user?.user_metadata?.email || data?.user?.email)
        .limit(1)
        .single();

      if (!existingUser) {
        const user_id = nanoid(6);
        const { error: insertError } = await supabase.from("User").insert({
          email: data?.user.email || data?.user?.user_metadata?.email,
          username:
            data?.user?.user_metadata?.username ||
            data?.user?.user_metadata?.full_name ||
            data?.user?.user_metadata?.name ||
            data?.user?.user_metadata?.preferred_username,
          avatarUrl: data?.user?.user_metadata?.avatar_url,
          user_id,
        });

        if (insertError) {
          console.error("Error Inserting Users", insertError.message);
          return NextResponse.redirect(`${origin}/error`);
        }
      }
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
