"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import * as Icons from "lucide-react";
import { LucideIcon, EllipsisVertical } from "lucide-react";

interface ActionMenuOption {
  label: string;
  icon?: string;
  handler?: () => void;
  quickAccess?: boolean;
}

interface ActionMenuProps {
  options: ActionMenuOption[];
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

const getIcon = (iconName?: string) => {
  if (!iconName) return null;
  const Icon = Icons[iconName as keyof typeof Icons] as LucideIcon;
  return Icon ? <Icon className="h-4 w-4" /> : null;
};

export function ActionMenu({
  options,
  align = "end",
  side = "bottom",
}: ActionMenuProps) {
  const quickAccessOptions = options.filter((o) => o.quickAccess);
  const menuOptions = options.filter((o) => !o.quickAccess);

  return (
    <div className="flex items-center gap-2">
      {/* Quick access buttons */}
      {quickAccessOptions.map((option) => (
        <button
          key={option.label}
          onClick={option.handler}
          aria-label={option.label}
          title={option.label}
          className="rounded-md p-1.5 hover:bg-muted transition-colors"
        >
          {option.icon ? (
            getIcon(option.icon)
          ) : (
            <span className="text-xs font-medium">{option.label}</span>
          )}
        </button>
      ))}

      {menuOptions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="rounded-md p-1.5 hover:bg-muted transition-colors focus:outline-none">
                <EllipsisVertical className="h-4 w-4" />
              </button>
            }
          />

          <DropdownMenuContent align={align} side={side} className="min-w-40">
            <DropdownMenuGroup>
              {menuOptions.map((option) => (
                <DropdownMenuItem
                  key={option.label}
                  className="flex cursor-pointer items-center gap-2"
                  render={
                    <div
                      onClick={option.handler}
                      className="flex w-full items-center gap-2"
                    >
                      {getIcon(option.icon)}
                      <span>{option.label}</span>
                    </div>
                  }
                />
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
