import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user from supabase", user);

  if (!user) return null;

  return prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      organization: true,
    },
  });
}
