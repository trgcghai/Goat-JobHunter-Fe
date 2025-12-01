"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Permission } from "@/types/model";
import useRoleAndPermissionActions from "@/hooks/useRoleAndPermissionActions";
import LoaderSpin from "@/components/common/LoaderSpin";

const permissionSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống" }),
  module: z.string().min(1, { message: "Module không được để trống" }),
  method: z.string().min(1, { message: "Method không được để trống" }),
  apiPath: z.string().min(1, { message: "API path không được để trống" }),
});

export type PermissionFormValues = z.infer<typeof permissionSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  permission?: Permission;
}

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export default function EditPermissionDialog({ open, onOpenChange, permission }: Props) {
  const { handleCreatePermission, handleUpdatePermission, isCreatingPermission, isUpdatingPermission } = useRoleAndPermissionActions();

  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      name: "",
      module: "",
      method: "",
      apiPath: "",
    },
  });

  useEffect(() => {
    if (open && permission) {
      form.reset({
        name: permission.name || "",
        module: permission.module || "",
        method: permission.method || "",
        apiPath: permission.apiPath || "",
      });
    } else if (!open) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, permission]);

  const onSubmit = async (data: PermissionFormValues) => {
    try {
      if (permission) {
        await handleUpdatePermission({
          ...permission,
          ...data,
          permissionId: permission.permissionId,
        });
      } else {
        await handleCreatePermission(data);
      }
      onOpenChange(false);
      form.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>{permission ? "Edit Permission" : "Create Permission"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="module" render={({ field }) => (
              <FormItem>
                <FormLabel>Module</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="method" render={({ field }) => (
              <FormItem>
                <FormLabel>Method</FormLabel>
                <FormControl>
                  <Select value={field.value || "GET"} onValueChange={(v) => field.onChange(v)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {METHODS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="apiPath" render={({ field }) => (
              <FormItem>
                <FormLabel>API Path</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">Cancel</Button>
              <Button type="submit" className="rounded-xl" disabled={isCreatingPermission || isUpdatingPermission}>
                {(isCreatingPermission || isUpdatingPermission) ?
                  <>
                    <LoaderSpin />
                    Đang lưu...
                  </>
                  :
                  "Xác nhận"
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}