import {
  ApplicantFormData,
  applicantSchema,
} from "@/app/(main)/profile/components/ProfileInfo/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/example-date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUpdateApplicantMutation } from "@/services/applicant/applicantApi";
import { Gender } from "@/types/enum";
import { Applicant } from "@/types/model";
import capitalizeText from "@/utils/capitalizeText";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ApplicantFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Applicant;
}

const ApplicantForm = ({ open, onOpenChange, profile }: ApplicantFormProps) => {
  const [updateApplicant, { isLoading }] = useUpdateApplicantMutation();
  const form = useForm<ApplicantFormData>({
    resolver: zodResolver(applicantSchema),
    defaultValues: {
      fullName: profile.fullName || "",
      username: profile.username || "",
      dob: profile.dob ? new Date(profile.dob) : undefined,
      gender: profile.gender || Gender.NAM,
      email: profile.contact.email || "",
      phone: profile.contact.phone || "",
    },
  });

  const onSubmit = async (data: ApplicantFormData) => {
    console.log("submit data", data);

    try {
      const response = await updateApplicant({
        userId: profile.userId,
        fullName: data.fullName,
        username: data.username,
        dob: data.dob,
        gender: data.gender,
        contact: {
          email: data.email,
          phone: data.phone,
        },
      });

      if (response.error) {
        throw new Error("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
      }

      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Failed to update applicant:", error);
      toast.error("Cập nhật thông tin thất bại. Vui lòng thử lại sau.");
    }
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
            Cập Nhật Thông Tin Ứng Viên
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-xl"
                          placeholder="Họ và tên"
                        />
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
                      <FormLabel>Tên hiển thị</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-xl"
                          placeholder="Tên hiển thị"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          disabled
                          className="rounded-xl"
                          placeholder="Email"
                        />
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
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-xl"
                          placeholder="Số điện thoại"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        >
                          {Object.entries(Gender).map(([key, value]) => {
                            return (
                              <div
                                key={key}
                                className="flex items-center gap-3"
                              >
                                <RadioGroupItem value={value} id={`r-${key}`} />
                                <Label htmlFor={`r-${key}`}>
                                  {capitalizeText(key)}
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
              </div>
            </div>

            <div className="flex gap-3 pt-4 justify-end items-center border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="rounded-xl px-6"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6"
              >
                {isLoading ? (
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
};

export default ApplicantForm;
