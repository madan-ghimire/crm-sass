"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React, { useEffect, useState } from "react";
import { updateOrganization } from "@/actions/organization/update-organization";
import { toast } from "sonner";

interface Props {
  organizationId: string;
  organizationName: string;
}

const EditOrganizationDialog = ({
  organizationId,
  organizationName,
}: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(organizationName);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("organizationId", organizationId);
      formData.append("name", name);

      console.log("here i am from edit org ");

      const result = await updateOrganization(formData);

      console.log("check result here:", result);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update organization",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);

        if (isOpen) {
          setName(organizationName);
        }
      }}
    >
      {" "}
      <DialogTrigger
        render={<Button variant="outline">Edit Organization</Button>}
      />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Organization</DialogTitle>
            <DialogDescription>
              Update your organization information.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="organization-name"> Organization Name</Label>
              <Input
                id="organization-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Organization Name"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button
              disabled={isLoading}
              type="submit"
              onClick={() => console.log("button clicked")}
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrganizationDialog;
