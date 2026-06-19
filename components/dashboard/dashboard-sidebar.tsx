import Link from "next/link";

export function DashboardSidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <nav className="flex flex-col p-4">
        <Link
          href="/dashboard"
          className="rounded-md px-4 py-2 hover:bg-gray-100"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/leads"
          className="rounded-md px-4 py-2 hover:bg-gray-100"
        >
          Leads
        </Link>
        <Link
          href="/dashboard/contacts"
          className="rounded-md px-4 py-2 hover:bg-gray-100"
        >
          Contacts
        </Link>

        <Link
          href="/dashboard/tasks"
          className="rounded-md px-4 py-2 hover:bg-gray-100"
        >
          Tasks
        </Link>

        <Link
          href="/dashboard/settings"
          className="rounded-md px-4 py-2 hover:bg-gray-100"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
