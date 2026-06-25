"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrganization(formData: FormData) {
  const id = formData.get("organizationId") as string;
  const name = formData.get("name") as string;

  if (!name.trim()) {
    return {
      success: false,
      message: "Organization name is required",
    };
  }

  await prisma.organization.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  revalidatePath("/dashboard/organization");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Organization updated successfully",
  };
}
