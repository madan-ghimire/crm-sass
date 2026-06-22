"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookUser,
  CircleCheck,
  Settings,
} from "lucide-react";
import { LogoutButton } from "../logout-button";

type Props = {
  email: string;
};

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/leads",
    label: "Leads",
    icon: Users,
  },
  {
    href: "/dashboard/contacts",
    label: "Contacts",
    icon: BookUser,
  },
  {
    href: "/dashboard/tasks",
    label: "Tasks",
    icon: CircleCheck,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function DashboardSidebar({ email }: Props) {
  const pathname = usePathname();
  const initials = email.split("@")[0].slice(0, 2).toUpperCase();
  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r bg-white">
      <div className="border-b px-4 py-5 ml-4">
        <span className="text-base font-medium">CRM</span>
        <p className="text-[11px">Workspace</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-gray-100">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-medium text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-gray-800">
              {email.split("@")[0]}
            </p>
            <p className="truncate text-[10px] text-gray-400">{email}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
