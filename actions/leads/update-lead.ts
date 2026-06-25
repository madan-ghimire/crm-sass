// actions/leads/update-lead.ts

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateLead(formData: FormData) {
  const id = formData.get("id") as string;

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const notes = formData.get("notes") as string;

  if (!id) {
    throw new Error("Lead ID is required");
  }

  // if (!id) {
  //   return {
  //     success: false,
  //     message: "Lead ID is required",
  //   };
  // }

  try {
    await prisma.lead.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        notes,
      },
    });
    revalidatePath("/dashboard/leads");

    return {
      success: true,
      message: "Lead updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update lead",
      error,
    };
  }
}
