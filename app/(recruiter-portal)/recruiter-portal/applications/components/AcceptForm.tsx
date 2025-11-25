import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { acceptSchema, AcceptFormData } from "./schema";
import { useEffect } from "react";

interface AcceptFormProps {
  onSubmit: (data: AcceptFormData) => Promise<void>;
  open: boolean;
}

const AcceptForm = ({ onSubmit, open }: AcceptFormProps) => {
  const form = useForm<AcceptFormData>({
    resolver: zodResolver(acceptSchema),
    defaultValues: {
      interviewAt: "",
      location: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        id="accept-form"
      >
        <FormField
          control={form.control}
          name="interviewAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Thời gian phỏng vấn</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Địa điểm phỏng vấn</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập địa chỉ phỏng vấn"
                  {...field}
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lưu ý thêm</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Thêm ghi chú nếu cần..."
                  rows={5}
                  {...field}
                  className="rounded-xl resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AcceptForm;