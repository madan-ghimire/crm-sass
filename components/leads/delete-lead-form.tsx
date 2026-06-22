// "use client";

// import { deleteLead } from "@/actions/leads/delete-lead";
// import { toast } from "sonner";

// type DeleteLeadFormProps = {
//   leadId: string;
// };

// export function DeleteLeadForm({ leadId }: DeleteLeadFormProps) {
//   return (
//     <form
//       action={deleteLead.bind(null, leadId)}
//       onSubmit={(e) => {
//         const confirmed = window.confirm(
//           "Are you sure you want to delete this lead?",
//         );

//         if (confirmed) {
//           toast.success("Lead deleted successfully");
//         }

//         if (!confirmed) {
//           e.preventDefault();
//         }
//       }}
//     >
//       <button
//         type="submit"
//         className="rounded-md border border-red-500 px-3 py-1.5 text-sm text-red-500"
//       >
//         Delete
//       </button>
//     </form>
//   );
// }

"use client";
import { deleteLead } from "@/actions/leads/delete-lead";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // adjust path to your alert-dialog
import { Button } from "../ui/button";

type DeleteLeadFormProps = {
  leadId: string;
};

export function DeleteLeadForm({ leadId }: DeleteLeadFormProps) {
  async function handleDelete() {
    await deleteLead(leadId);
    toast.success("Lead deleted successfully");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete</Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this lead?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The lead will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
