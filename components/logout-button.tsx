"use client";

import { logout } from "@/actions/auth/logout";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
      >
        Logout
      </button>
    </form>
  );
}
