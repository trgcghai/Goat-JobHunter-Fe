"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import UseRoleAndPermissionActions from "@/hooks/useRoleAndPermissionActions";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roleSchema = z.object({
  name: z.string().min(1, { message: "Tên vai trò là bắt buộc" }),
  description: z.string().optional()
});

export type RoleFormValues = z.infer<typeof roleSchema>;

export default function CreateRoleDialog({ open, onOpenChange }: Props) {
  const { handleCreateRole, isCreating } = UseRoleAndPermissionActions();

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  });

  const onSubmit = async (data: RoleFormValues) => {
    try {
      await handleCreateRole(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle>Tạo vai trò mới</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên vai trò <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Ví dụ: HR, SUPER_ADMIN" {...field} className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mô tả (không bắt buộc)" {...field} className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
                Hủy
              </Button>
              <Button type="submit" className="rounded-xl" disabled={isCreating}>
                {isCreating ? "Đang tạo..." : "Tạo vai trò"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}