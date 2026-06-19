"use client";

import { deleteLead } from "@/actions/leads/delete-lead";
import { toast } from "sonner";

type DeleteLeadFormProps = {
  leadId: string;
};

export function DeleteLeadForm({ leadId }: DeleteLeadFormProps) {
  return (
    <form
      action={deleteLead.bind(null, leadId)}
      onSubmit={(e) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this lead?",
        );

        if (confirmed) {
          toast.success("Lead deleted successfully");
        }

        if (!confirmed) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-md border border-red-500 px-3 py-1.5 text-sm text-red-500"
      >
        Delete
      </button>
    </form>
  );
}
