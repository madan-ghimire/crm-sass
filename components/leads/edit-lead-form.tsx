"use client";

import { updateLead } from "@/actions/leads/update-lead";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { EditLeadActions } from "./edit-lead-actions";

type Props = {
  lead: {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    notes: string | null;
  };
};

export function EditLeadForm({ lead }: Props) {
  const router = useRouter();

  const { pending } = useFormStatus();
  async function handleSubmit(formData: FormData) {
    const result = await updateLead(formData);

    if (result.success) {
      toast.success(result.message);
      router.push("/dashboard/leads");
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="id" defaultValue={lead.id} />

      <div>
        <label htmlFor="firstName">First Name</label>

        <input
          id="firstName"
          name="firstName"
          defaultValue={lead.firstName}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>

        <input
          id="lastName"
          name="lastName"
          defaultValue={lead.lastName}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          name="email"
          defaultValue={lead.email ?? ""}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label htmlFor="notes">Notes</label>

        <textarea
          id="notes"
          name="notes"
          defaultValue={lead.notes ?? ""}
          rows={4}
          className="w-full rounded-lg border p-2"
        />
      </div>

      {/* <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Changes"}
        </Button>

        <Button type="button" disabled={pending} onClick={() => router.back()}>
          Back
        </Button>
      </div> */}
      <EditLeadActions />
    </form>
  );
}
