"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function LeadButtons() {
  return (
    <Button onClick={() => console.log("New lead button clicked")}>
      <Plus className="mr-2 h-4 w-4" />
      New Lead
    </Button>
  );
}
