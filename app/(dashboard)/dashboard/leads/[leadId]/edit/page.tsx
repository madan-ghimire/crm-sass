// import { notFound } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import { updateLead } from "@/actions/leads/update-lead";
// import Link from "next/link";

// type Props = {
//   params: Promise<{
//     leadId: string;
//   }>;
// };

// export default async function EditLeadPage({ params }: Props) {
//   const { leadId } = await params;

//   const lead = await prisma.lead.findUnique({
//     where: {
//       id: leadId,
//     },
//   });

//   if (!lead) {
//     notFound();
//   }

//   return (
//     <div className="max-w-2xl space-y-6">
//       <h1 className="text-2xl font-bold">Edit Lead</h1>

//       <form action={updateLead} className="space-y-4">
//         <input type="hidden" name="id" defaultValue={lead.id} />
//         <div>
//           <label htmlFor="firstName">First Name</label>
//           <input
//             id="firstName"
//             name="firstName"
//             defaultValue={lead.firstName}
//             className="w-full rounded-lg border p-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             id="lastName"
//             name="lastName"
//             defaultValue={lead.lastName}
//             className="w-full rounded-lg border p-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             name="email"
//             defaultValue={lead.email ?? ""}
//             className="w-full rounded-lg border p-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="notes">Notes</label>
//           <textarea
//             id="notes"
//             name="notes"
//             defaultValue={lead.notes ?? ""}
//             rows={4}
//             className="w-full rounded-lg border p-2"
//           />
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             type="submit"
//             className="rounded-lg bg-black px-4 py-2 text-white"
//           >
//             Save Changes
//           </button>
//           <Link
//             href="/dashboard/leads"
//             className="rounded-lg bg-black px-4 py-2 text-white"
//           >
//             Back
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EditLeadForm } from "@/components/leads/edit-lead-form";
import { PageLayout } from "@/layouts/page-layout";

type Props = {
  params: Promise<{
    leadId: string;
  }>;
};

export default async function EditLeadPage({ params }: Props) {
  const { leadId } = await params;

  const lead = await prisma.lead.findUnique({
    where: {
      id: leadId,
    },
  });

  if (!lead) {
    notFound();
  }

  console.log("check lead here", lead);

  return (
    // <div className="max-w-2xl space-y-6">
    //   <h1 className="text-2xl font-bold">Edit Lead</h1>

    //   <EditLeadForm lead={lead} />
    // </div>

    <PageLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: "Leads",
          href: "/dashboard/leads",
        },
        {
          label: `${lead.firstName} ${lead.lastName}`,
        },
      ]}
      // title="Edit Lead"
    >
      <EditLeadForm lead={lead} />
    </PageLayout>
  );
}
