"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function signup(formData: FormData) {
  const cookieStore = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
    },
  });

  console.log("check error here", error);

  // if (error) {
  //   throw new Error(error.message);
  // }
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Account created successfully",
  };
}
