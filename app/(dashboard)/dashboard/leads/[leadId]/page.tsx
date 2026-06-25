// app/(dashboard)/dashboard/leads/[leadId]/page.tsx
import { PageLayout } from "@/layouts/page-layout";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { LeadAction } from "./lead-actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Briefcase,
  FileText,
  Calendar,
  RefreshCw,
  User,
  Building2,
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

type Field = {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
  mono?: boolean;
};

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

  const initials = (lead.firstName?.[0] ?? "") + (lead.lastName?.[0] ?? "");

  const fields: Field[] = [
    { icon: Mail, label: "Email", value: lead.email },
    { icon: Briefcase, label: "Position", value: lead.position },
    {
      icon: Building2,
      label: "Organization",
      value: lead.organizationId,
      mono: true,
    },
    { icon: User, label: "Assigned to", value: lead.assignedToId, mono: true },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: "Leads", href: "/dashboard/leads" },
        { label: `${lead.firstName} ${lead.lastName}` },
      ]}
      actionMenu={<LeadAction />}
    >
      <Card className="max-w-full border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <CardContent className="px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-medium text-zinc-700 dark:text-zinc-300 shrink-0 select-none">
                {initials || "?"}
              </div>
              <div>
                <p className="text-[15px] font-medium text-zinc-900 dark:text-zinc-50 leading-tight">
                  {lead.firstName} {lead.lastName}
                </p>
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

        <Separator />

        {/* Fields */}
        <CardContent className="px-6 py-1">
          {fields.map(({ icon: Icon, label, value, mono }, i) => (
            <div key={label}>
              <div className="flex items-center justify-between py-2.5 text-sm">
                <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                </span>
                {value ? (
                  <span
                    className={
                      mono
                        ? "font-mono text-xs text-zinc-500 dark:text-zinc-400"
                        : "text-zinc-800 dark:text-zinc-200"
                    }
                  >
                    {value}
                  </span>
                ) : (
                  <span className="text-zinc-400 dark:text-zinc-600 italic text-xs">
                    —
                  </span>
                )}
              </div>
              {i < fields.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>

        {/* Notes */}
        {lead.notes && (
          <>
            <Separator />
            <CardContent className="px-6 py-3.5">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                <FileText className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />
                {lead.notes}
              </p>
            </CardContent>
          </>
        )}

        {/* Footer */}
        <div className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-6 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {new Date(lead.createdAt).toLocaleDateString("en-US", {
              dateStyle: "medium",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCw className="h-3 w-3" />
            {new Date(lead.updatedAt).toLocaleDateString("en-US", {
              dateStyle: "medium",
            })}
          </span>
          <span className="ml-auto font-mono">{lead.id}</span>
        </div>
      </Card>
    </PageLayout>
  );
}
