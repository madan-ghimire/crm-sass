"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function signup(formData: FormData) {
  const cookieStore = await cookies();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const username = formData.get("username") as string;

  const organizationName = formData.get("organizationName") as string;

  const supabase = await createClient(cookieStore);

  const { data, error } = await supabase.auth.signUp({
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

  if (!data.user) {
    return {
      success: false,
      message: "User created failed",
    };
  }

  try {
    const organization = await prisma.organization.create({
      data: {
        name: organizationName,
      },
    });

    await prisma.user.create({
      data: {
        id: data.user.id,
        email,
        username,
        role: "OWNER",
        organizationId: organization.id,
      },
    });

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to create organization",
    };
  }
}
