"use client";

import { logout } from "@/actions/auth/logout";

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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    // <form action={logout}>
    //   <Button
    //     type="submit"
    //     className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
    //   >
    //     Logout
    //   </Button>
    // </form>
    // <AlertDialog>
    //   <AlertDialogTrigger
    //     render={<Button variant="destructive">Logout</Button>}
    //   />
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
    //       <AlertDialogDescription>
    //         You will be signed out of your account and redirected to the login
    //         page.
    //       </AlertDialogDescription>
    //     </AlertDialogHeader>
    //     <AlertDialogFooter>
    //       <AlertDialogCancel>Cancel</AlertDialogCancel>
    //       <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Logout</Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out and redirected to the login page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={logout}>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
