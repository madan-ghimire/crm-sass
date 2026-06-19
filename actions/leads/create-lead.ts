"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export async function createLead(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const notes = formData.get("notes") as string;

    const organizationId = formData.get("organizationId") as string;

    await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        notes,
        organizationId,
      },
    });

    revalidatePath("/dashboard/leads");

    // redirect("/dashboard/leads");

    return {
      success: true,
      message: "Lead created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create lead",
      error,
    };
  }
}
