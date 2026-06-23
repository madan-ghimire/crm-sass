// import { PageLayout } from "@/layouts/page-layout";
// import { prisma } from "@/lib/prisma";
// import { notFound } from "next/navigation";

// import { ActionMenu } from "@/components/action-menu";
// import { LeadAction } from "./lead-actions";

// interface Props {
//   params: Promise<{ leadId: string }>;
// }
// export default async function LeadDetailPage({ params }: Props) {
//   const { leadId } = await params;

//   const lead = await prisma.lead.findUnique({
//     where: { id: leadId },
//   });

//   if (!lead) notFound();

//   return (
//     <PageLayout
//       breadcrumbs={[
//         { label: "Leads", href: "/dashboard/leads" },
//         { label: `${lead.firstName} ${lead.lastName}` },
//       ]}
//       actionMenu={<LeadAction />}
//     >
//       <div className="space-y-6">
//         <h1 className="text-2xl font-bold">
//           {lead.firstName} {lead.lastName}
//         </h1>

//         <p>Status: {lead.status}</p>
//         <p>Email: {lead.email}</p>
//         <p>Position: {lead.position}</p>
//       </div>
//     </PageLayout>
//   );
// }

// app/(dashboard)/dashboard/leads/[leadId]/page.tsx
import { PageLayout } from "@/layouts/page-layout";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { LeadAction } from "./lead-actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Briefcase,
  FileText,
  Calendar,
  RefreshCw,
  User,
  Building2,
  Hash,
} from "lucide-react";

interface Props {
  params: Promise<{ leadId: string }>;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  NEW: {
    label: "New",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  CONTACTED: {
    label: "Contacted",
    className:
      "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",
  },
  QUALIFIED: {
    label: "Qualified",
    className:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  },
  LOST: {
    label: "Lost",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  },
  WON: {
    label: "Won",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
};

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <p className="text-sm text-zinc-800 dark:text-zinc-200 break-all">
          {value ?? (
            <span className="text-zinc-400 dark:text-zinc-600 italic">
              Not provided
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default async function LeadDetailPage({ params }: Props) {
  const { leadId } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
  });

  if (!lead) notFound();

  const status = statusConfig[lead.status] ?? {
    label: lead.status,
    className: "bg-zinc-100 text-zinc-600 border-zinc-200",
  };

  return (
    <PageLayout
      breadcrumbs={[
        { label: "Leads", href: "/dashboard/leads" },
        { label: `${lead.firstName} ${lead.lastName}` },
      ]}
      actionMenu={<LeadAction />}
    >
      <div className="max-w-3xl space-y-4">
        {/* Hero card */}
        <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 dark:bg-zinc-100">
                  <span className="text-xl font-semibold text-white dark:text-zinc-900">
                    {lead.firstName?.[0] ?? "?"}
                    {lead.lastName?.[0] ?? ""}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {lead.firstName} {lead.lastName}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {lead.email ?? "No email"}
                  </p>
                </div>
              </div>
              <Badge
                className={`shrink-0 border text-xs font-medium px-2.5 py-1 rounded-full ${status.className}`}
              >
                {status.label}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Details card */}
        <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="px-6 py-4 pb-0">
            <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Contact Details
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-2">
            <Separator className="mb-1 mt-3" />
            <InfoRow icon={Mail} label="Email" value={lead.email} />
            <Separator />
            <InfoRow icon={Briefcase} label="Position" value={lead.position} />
            <Separator />
            <InfoRow
              icon={Building2}
              label="Organization ID"
              value={lead.organizationId}
            />
            <Separator />
            <InfoRow
              icon={User}
              label="Assigned To"
              value={lead.assignedToId}
            />
          </CardContent>
        </Card>

        {/* Notes card */}
        {lead.notes && (
          <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="px-6 py-4 pb-0">
              <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <FileText className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pt-1">
                  {lead.notes}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timestamps card */}
        <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="px-6 py-4 pb-0">
            <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-2">
            <Separator className="mb-1 mt-3" />
            <InfoRow
              icon={Calendar}
              label="Created"
              value={new Date(lead.createdAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            />
            <Separator />
            <InfoRow
              icon={RefreshCw}
              label="Last Updated"
              value={new Date(lead.updatedAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            />
            <Separator />
            <InfoRow icon={Hash} label="Lead ID" value={lead.id} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
