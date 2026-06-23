import Link from "next/link";
import { getLeads } from "@/lib/leads/get-leads";
import { DeleteLeadForm } from "@/components/leads/delete-lead-form";
import { SearchInput } from "@/components/leads/search-input";
import { NewLeadButton } from "@/components/leads/new-lead-button";
import { LeadSearchParams } from "@/features/leads";
import { PageLayout } from "@/layouts/page-layout";
import { LeadButtons } from "./lead-buttons";

export async function LeadList({ searchParams }: LeadSearchParams) {
  const { search, status } = await searchParams;

  const organizationId = "512baa35-9b15-4740-8e38-4ecd6dc6ec7a";

  console.log("check search params here: you go iii ", search);

  console.log("status here: ", status);
  const leads = await getLeads(organizationId, search);

  console.log("check leads here", leads);

  return (
    <PageLayout
      title="Leads"
      buttons={[
        {
          children: <LeadButtons />,
        },
      ]}
      // breadcrumbs={[
      //   { label: "Dashboard", href: "/dashboard" },
      //   { label: "Leads" },
      // ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Leads</h1>

          <div className="flex gap-3">
            <SearchInput />
            <NewLeadButton />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border">
          <table className="min-w-full divide-y">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Position
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Created
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-sm text-muted-foreground"
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="block w-full h-full"
                      >
                        {lead.firstName || lead.lastName
                          ? `${lead.firstName} ${lead.lastName}`
                          : "-"}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="block w-full h-full"
                      >
                        {lead.email || "-"}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="block w-full h-full"
                      >
                        <span className="rounded-full border px-2 py-1 text-xs">
                          {lead.status}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="block w-full h-full"
                      >
                        {lead.position || "-"}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="block w-full h-full"
                      >
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </Link>
                    </td>
                    {/* Actions — no Link here */}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/leads/${lead.id}/edit`}
                          className="rounded-md border px-3 py-1.5 text-sm"
                        >
                          Edit
                        </Link>
                        <DeleteLeadForm leadId={lead.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
