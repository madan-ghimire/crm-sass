import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      organization: true,
    },
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <DashboardSidebar
        organizationName={dbUser?.organization?.name ?? "CRM"}
        email={user.email ?? ""}
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
