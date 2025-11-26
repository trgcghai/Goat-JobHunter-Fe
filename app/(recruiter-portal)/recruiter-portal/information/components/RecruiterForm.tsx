import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/useUser";
import { Recruiter } from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  RecruiterFormData,
  recruiterSchema
} from "@/app/(recruiter-portal)/recruiter-portal/information/components/schema";
import { Gender } from "@/types/enum";
import { DatePicker } from "@/components/ui/example-date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { capitalize } from "lodash";
import { toast } from "sonner";

interface RecruiterFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function RecruiterForm({ open, onOpenChange }: RecruiterFormProps) {
  const { user: profile, handleUpdateRecruiter, isUpdatingRecruiter } = useUser();
  const form = useForm<RecruiterFormData>({
    resolver: zodResolver(recruiterSchema),
    defaultValues: {
      fullName: profile?.fullName || "",
      username: profile?.username || "",
      email: profile?.contact.email || "",
      phone: profile?.contact?.phone || "",
      address: profile?.address || "",
      description: (profile as Recruiter)?.description || "",
      website: (profile as Recruiter)?.website || ""
    }
  });

  const onSubmit = async (data: RecruiterFormData) => {
    if (!profile?.userId) {
      toast.error(
        "Không thể cập nhật thông tin nhà tuyển dụng. Vui lòng thử lại sau."
      );
      return;
    }
    await handleUpdateRecruiter(profile.userId, {
      fullName: data.fullName,
      username: data.username,
      contact: {
        email: data.email,
        phone: data.phone
      },
      description: data.description,
      address: data.address,
      website: data.website,
      gender: data.gender,
      dob: data.dob?.toISOString()
    });

    onOpenChange(false);
    form.reset();
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl! max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Cập Nhật Thông Tin Nhà Tuyển Dụng
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Họ và tên</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isUpdatingRecruiter} className="rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Tên hiển thị</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isUpdatingRecruiter} className="rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isUpdatingRecruiter} type="email" className="rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số Điện Thoại</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isUpdatingRecruiter} type="tel" className="rounded-xl"
                                 placeholder="Số điện thoại liên hệ" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày sinh</FormLabel>
                      <FormControl>
                        <DatePicker
                          {...field}
                          placeholder="Ngày sinh"
                          value={field.value}
                          onChange={field.onChange}
                          className="rounded-xl w-full border border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giới tính</FormLabel>
                      <FormControl>
                        <RadioGroup
                          {...field}
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue="comfortable"
                          className="space-y-2"
                          disabled={isUpdatingRecruiter}
                        >
                          {Object.entries(Gender).map(([key, value]) => {
                            return (
                              <div key={key} className="flex items-center gap-3">
                                <RadioGroupItem value={value} id={`r-${key}`} />
                                <Label htmlFor={`r-${key}`}>
                                  {capitalize(key)}
                                </Label>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isUpdatingRecruiter} className="rounded-xl"
                               placeholder="Địa chỉ liên hệ" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Website</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isUpdatingRecruiter} className="rounded-xl" placeholder="Website" />
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
                      <FormLabel>Mô tả công ty</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isUpdatingRecruiter}
                          className="rounded-xl min-h-[150px] resize-none"
                          placeholder="Nhập mô tả về công ty..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 justify-end items-center border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isUpdatingRecruiter}
                className="rounded-xl px-6"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isUpdatingRecruiter}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6"
              >
                {isUpdatingRecruiter ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Đang lưu...
                  </>
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default RecruiterForm;
