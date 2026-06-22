import { LogoutButton } from "../logout-button";

type Props = {
  email: string;
};

export function DashboardHeader({ email }: Props) {
  return (
    <header className="flex h-16 items-center justify-between border-b shadow-card bg-white px-6">
      <div>
        <h1 className="text-xl font-bold">CRM Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{email}</span>

        <LogoutButton />
      </div>
    </header>
  );
}
