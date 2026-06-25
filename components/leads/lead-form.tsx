// import { createLead } from "@/actions/leads/create-lead";
// import Link from "next/link";

// type Props = {
//   organizationId?: string;
// };

// export function LeadForm({ organizationId }: Props) {
//   return (
//     <form action={createLead} className="space-y-4 rounded-xl border p-6">
//       <input type="hidden" name="organizationId" value={organizationId} />

//       <input
//         name="firstName"
//         placeholder="First Name"
//         className="w-full rounded-lg border p-3"
//         required
//       />

//       <input
//         name="lastName"
//         placeholder="Last Name"
//         className="w-full rounded-lg border p-3"
//         required
//       />

//       <input
//         name="email"
//         placeholder="Email"
//         className="w-full rounded-lg border p-3"
//         required
//         type="email"
//       />

//       <input
//         name="phone"
//         placeholder="Phone"
//         className="w-full rounded-lg border p-3"
//         type="text"
//         required
//       />

//       <input
//         name="company"
//         placeholder="Company"
//         className="w-full rounded-lg border p-3"
//         required
//       />

//       <textarea
//         name="notes"
//         rows={5}
//         placeholder="Notes"
//         className="w-full rounded-lg border p-3"
//       />

//       <div className="flex gap-3 items-center">
//         <button
//           type="submit"
//           className="rounded-lg bg-black px-4 py-2 text-white"
//         >
//           Create Lead
//         </button>
//         <Link
//           href="/dashboard/leads"
//           className="rounded-lg bg-black px-4 py-2 text-white"
//         >
//           Back
//         </Link>
//       </div>
//     </form>
//   );
// }

"use client";

import React, { useRef } from "react";
import { createLead } from "@/actions/leads/create-lead";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { CreateLeadButton } from "./create-lead-button";
import { PageLayout } from "@/layouts/page-layout";

type Props = {
  organizationId?: string;
};

export function LeadForm({ organizationId }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = await createLead(formData);

    console.log("check result here i am", result.success);

    if (result.success) {
      toast.success(result.message);
      console.log(formRef.current);
      formRef.current?.reset();

      router.push("/dashboard/leads");
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <PageLayout title="Create Lead">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border p-6"
      >
        <input type="hidden" name="organizationId" value={organizationId} />

        <input
          name="firstName"
          placeholder="First Name"
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full rounded-lg border p-3"
          required
          type="email"
        />

        <input
          name="phone"
          placeholder="Phone"
          className="w-full rounded-lg border p-3"
          type="text"
          required
        />

        <input
          name="company"
          placeholder="Company"
          className="w-full rounded-lg border p-3"
          required
        />

        <textarea
          name="notes"
          rows={5}
          placeholder="Notes"
          className="w-full rounded-lg border p-3"
        />

        <div className="flex gap-3 items-center">
          {/* <Button type="submit">Create Lead</Button> */}
          <CreateLeadButton />
          <Button onClick={() => router.back()}>Back</Button>
        </div>
      </form>
    </PageLayout>
  );
}
