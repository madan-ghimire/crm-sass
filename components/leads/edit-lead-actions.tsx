"use client";

import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function EditLeadActions() {
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save Changes"}
      </Button>

      <Button type="button" disabled={pending} onClick={() => router.back()}>
        Back
      </Button>
    </div>
  );
}
