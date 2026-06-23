"use client";

import { ActionMenu } from "@/components/action-menu";

export function LeadAction() {
  return (
    <ActionMenu
      options={[
        { label: "Edit", icon: "Pencil", handler: () => {}, quickAccess: true },
        { label: "Delete", icon: "Trash2", handler: () => {} },
        { label: "Archive", icon: "Archive", handler: () => {} },
      ]}
      align="end"
      side="bottom"
    />
  );
}
