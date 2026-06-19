"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function NewLeadButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/dashboard/leads/new")}>
      New Lead
    </Button>
  );
}
