"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import type { Career } from "@/types/model";
import { useEffect } from "react";
import useCareerActions from "@/hooks/useCareerActions";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  career: Career | null;
}

const careerSchema = z.object({
  name: z.string().min(1, { message: "Tên ngành nghề là bắt buộc" })
});

export type CareerFormValues = z.infer<typeof careerSchema>;

export default function EditCareerDialog({ open, onOpenChange, career }: Props) {
  const { handleCreateCareer, handleUpdateCareer, isCreating, isUpdating } = useCareerActions();
  const isEditMode = !!career;

  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (career) {
      form.reset({
        name: career.name
      });
    } else {
      form.reset({
        name: ""
      });
    }
  }, [career, form]);

  const onSubmit = async (data: CareerFormValues) => {
    try {
      if (isEditMode) {
        await handleUpdateCareer({
          careerId: String(career.careerId),
          name: data.name
        });
      } else {
        await handleCreateCareer(data);
      }
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
          <DialogTitle>
            {isEditMode ? "Cập nhật ngành nghề" : "Tạo ngành nghề mới"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên ngành nghề <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Ví dụ: Công nghệ thông tin" {...field} className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
                Hủy
              </Button>
              <Button type="submit" className="rounded-xl" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating
                  ? (isEditMode ? "Đang cập nhật..." : "Đang tạo...")
                  : (isEditMode ? "Cập nhật" : "Tạo ngành nghề")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}