"use server";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getPrismaErrorMessage } from "@/lib/errors/prisma-error";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLead(formData: FormData) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const notes = formData.get("notes") as string;

    await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        notes,
        organizationId: currentUser.organizationId,
        assignedToId: currentUser.id,
      },
    });

    revalidatePath("/dashboard/leads");

    return {
      success: true,
      message: "Lead created successfully",
    };
  } catch (error) {
    console.log(
      "check error thrown from prisma while creating new lead",
      error,
    );
    return {
      success: false,
      message: getPrismaErrorMessage(error),
      error,
    };
  }
}
