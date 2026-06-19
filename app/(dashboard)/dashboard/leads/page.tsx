import Link from "next/link";
// import { createLead } from "@/actions/leads/create-lead";
import { getLeads } from "@/lib/leads/get-leads";
import { DeleteLeadForm } from "@/components/leads/delete-lead-form";
import { SearchInput } from "@/components/leads/search-input";
import { Button } from "@/components/ui/button";
import { NewLeadButton } from "@/components/leads/new-lead-button";

interface Props {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
}

export default async function LeadsPage({ searchParams }: Props) {
  const { search, status } = await searchParams;
  const organizationId = "512baa35-9b15-4740-8e38-4ecd6dc6ec7a";

  console.log("check search params here: you go iii ", search);

  console.log("status here: ", status);
  const leads = await getLeads(organizationId, search);

  console.log("check leads here", leads);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads</h1>

        <div className="flex gap-3">
          <SearchInput />
          {/* <Link
            href="/dashboard/leads/new"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            New Lead
          </Link> */}
          <NewLeadButton />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
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
                <tr key={lead.id}>
                  <td className="px-4 py-3">
                    {lead.firstName || lead.lastName
                      ? `${lead.firstName} ${lead.lastName}`
                      : "-"}
                  </td>

                  <td className="px-4 py-3">{lead.email || "-"}</td>

                  <td className="px-4 py-3">
                    <span className="rounded-full border px-2 py-1 text-xs">
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">{lead.position || "-"}</td>

                  <td className="px-4 py-3">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>

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
  );
}
