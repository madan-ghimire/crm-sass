import { prisma } from "@/lib/prisma";

export async function getLeads(organizationId: string, search?: string) {
  return prisma.lead.findMany({
    where: {
      organizationId,

      ...(search && {
        OR: [
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
