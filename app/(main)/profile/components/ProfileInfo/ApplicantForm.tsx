import { ApplicantFormData, applicantSchema } from "@/app/(main)/profile/components/ProfileInfo/schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/example-date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/hooks/useUser";
import { Education, Gender, Level } from "@/types/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { capitalize } from "lodash";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FetchCurrentApplicantDto } from "@/types/dto";
import { useEffect } from "react";

interface ApplicantFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: FetchCurrentApplicantDto
}

const ApplicantForm = ({ open, onOpenChange, profile }: ApplicantFormProps) => {
  const {
    handleUpdateApplicant,
    isUpdatingApplicant
  } = useUser();

  const form = useForm<ApplicantFormData>({
    resolver: zodResolver(applicantSchema),
    defaultValues: {
      fullName: "",
      username: "",
      dob: new Date(),
      gender: Gender.NAM,
      email: "",
      phone: "",
      level: Level.INTERN,
      address: "",
      education: Education.SCHOOL
    }
  });

  useEffect(() => {
    form.reset({
      fullName: profile?.fullName || "",
      username: profile?.username || "",
      email: profile?.contact.email || "",
      phone: profile?.contact?.phone || "",
      address: profile?.address || "",
      dob: profile?.dob ? new Date(profile.dob) : new Date(),
      gender: profile?.gender || Gender.NAM,
      education: profile?.education || Education.SCHOOL,
      level: profile?.level || Level.INTERN
    });
  }, [profile, form]);

  const onSubmit = async (data: ApplicantFormData) => {
    if (!profile?.userId) {
      toast.error(
        "Không thể cập nhật thông tin ứng viên. Vui lòng thử lại sau."
      );
      return;
    }

    handleUpdateApplicant(profile.userId, {
      fullName: data.fullName,
      username: data.username,
      dob: data.dob.toISOString(),
      gender: data.gender,
      contact: {
        email: data.email,
        phone: data.phone
      },
      address: data.address,
      education: data.education,
      level: data.level
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
            Cập Nhật Thông Tin Ứng Viên
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Họ và tên</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-xl" />
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
                        <Input {...field} className="rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>


              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-xl"
                             placeholder="Địa chỉ liên hệ" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trình độ</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="rounded-xl w-full">
                            <SelectValue placeholder="Chọn trình độ" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(Level).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {capitalize(key)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Học vấn</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="rounded-xl w-full">
                            <SelectValue placeholder="Chọn học vấn" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(Education).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {capitalize(key)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                disabled={isUpdatingApplicant}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6"
              >
                {isUpdatingApplicant ? (
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
