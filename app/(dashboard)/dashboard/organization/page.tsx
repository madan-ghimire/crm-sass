import { getCurrentUser } from "@/lib/auth/get-current-user";
import { Building2, Crown, CalendarDays, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditOrganizationDialog from "@/components/organization/edit-organization-dialog";

export default async function OrganizationPage() {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organization</h1>

          <p className="text-muted-foreground">
            Manage your organization settings and workspace.
          </p>
        </div>

        <EditOrganizationDialog
          organizationId={user.organization.id}
          organizationName={user.organization.name}
        />
      </div>

      <Card>
        <CardContent className="flex items-center gap-6 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
            <Building2 className="h-8 w-8 text-primary" />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{user.organization.name}</h2>

            <p className="text-muted-foreground">
              This is your organization&apos;s workspace.
            </p>
          </div>

          <Badge variant="secondary">{user.role}</Badge>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Your Role</CardDescription>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Crown className="h-4 w-4" />
              {user.role}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Members</CardDescription>

            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-4 w-4" />1 Member
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Created</CardDescription>

            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarDays className="h-4 w-4" />
              {new Date(user.organization.createdAt).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>

          <CardDescription>
            Basic information about your workspace.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-muted-foreground">Organization Name</span>

              <span className="font-medium">{user.organization.name}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-muted-foreground">Owner Email</span>

              <span className="font-medium">{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Role</span>

              <Badge>{user.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
