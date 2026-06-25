import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// The client you created from the Server-Side Auth instructions
// import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const cookieStore = await cookies();

  // if "next" is in param, use it as the redirect URL
  //   let next = searchParams.get("next") ?? "/";
  let next = searchParams.get("next") ?? "/dashboard";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/dashboard";
  }

  if (code) {
    const supabase = await createClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Sync supabase user -> Prisma
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        if (!existingUser) {
          const organization = await prisma.organization.create({
            data: {
              name: user.user_metadata?.full_name
                ? `${user.user_metadata.full_name}'s Workspace`
                : `${user.email}'s Workspace`,
            },
          });

          await prisma.user.create({
            data: {
              id: user.id,
              email: user.email!,
              username:
                user.user_metadata?.user_name ??
                user.user_metadata?.full_name
                  ?.replace(/\s+/g, "")
                  .toLowerCase() ??
                user.email!.split("@")[0],
              role: "OWNER",
              organizationId: organization.id,
            },
          });
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
