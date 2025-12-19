import { UserFormData, userSchema } from "@/app/(main)/profile/components/ProfileInfo/schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/example-date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUser } from "@/hooks/useUser";
import { ApplicantResponse, RecruiterResponse, UserResponse } from "@/types/dto";
import { Education, Gender, Level } from "@/types/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { capitalize } from "lodash";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { HasApplicant, HasRecruiter } from "@/components/common/HasRole";
import { ROLE } from "@/constants/constant";

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ApplicantResponse | RecruiterResponse;
}

const UserForm = ({ open, onOpenChange, profile }: UserFormProps) => {
  const { handleUpdateApplicant, isUpdatingApplicant, handleUpdateRecruiter, isUpdatingRecruiter } = useUser();

  const isApplicant = profile.role.name === ROLE.APPLICANT;
  const isUpdating = isApplicant ? isUpdatingApplicant : isUpdatingRecruiter;

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      username: "",
      dob: new Date(),
      gender: Gender.NAM,
      email: "",
      phone: "",
      address: "",
      education: Education.SCHOOL,
      level: Level.INTERN,
      availableStatus: true,
      position: "",
    },
  });

  useEffect(() => {
    const baseData = {
      fullName: profile?.fullName || "",
      username: profile?.username || "",
      email: profile.email || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      dob: profile?.dob ? new Date(profile.dob) : new Date(),
      gender: profile?.gender || Gender.NAM,
    };

    if (isApplicant) {
      form.reset({
        ...baseData,
        education: (profile as ApplicantResponse)?.education || Education.SCHOOL,
        level: (profile as ApplicantResponse)?.level || Level.INTERN,
        availableStatus: (profile as ApplicantResponse)?.availableStatus ?? true,
      });
    } else {
      form.reset({
        ...baseData,
        position: (profile as RecruiterResponse)?.position || "",
      });
    }
  }, [profile, form, isApplicant]);

  const onSubmit = async (data: UserFormData) => {
    if (!profile?.accountId) {
      toast.error("Không thể cập nhật thông tin. Vui lòng thử lại sau.");
      return;
    }

    const basePayload = {
      fullName: data.fullName,
      username: data.username,
      dob: data.dob.toISOString(),
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };

    if (isApplicant) {
      await handleUpdateApplicant(profile.accountId, {
        ...basePayload,
        education: data.education!,
        level: data.level!,
        availableStatus: data.availableStatus!,
      });
    } else {
      await handleUpdateRecruiter(profile.accountId, {
        ...basePayload,
        position: data.position!,
      });
    }

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
          <DialogTitle className="text-xl">Cập Nhật Thông Tin</DialogTitle>
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
                      <Input {...field} type="email" disabled className="rounded-xl" placeholder="Email" />
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
                        <Input {...field} className="rounded-xl" placeholder="Số điện thoại" />
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
                      <Input {...field} className="rounded-xl" placeholder="Địa chỉ liên hệ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="flex flex-row"
                        >
                          {Object.entries(Gender).map(([key, value]) => {
                            return (
                              <div key={key} className="flex items-center gap-3">
                                <RadioGroupItem value={value} id={`r-${key}`} />
                                <Label htmlFor={`r-${key}`}>{capitalize(key)}</Label>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <HasApplicant user={profile}>
                  <FormField
                    control={form.control}
                    name="availableStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trạng thái tài khoản</FormLabel>
                        <FormControl>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2">
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  <Label className="cursor-pointer">
                                    {field.value ? "Công khai hồ sơ" : "Ẩn hồ sơ"}
                                  </Label>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent align={"start"}>
                                <p>
                                  {field.value
                                    ? "Hồ sơ của bạn có thể được tìm thấy bởi nhà tuyển dụng"
                                    : "Hồ sơ của bạn sẽ bị ẩn khỏi nhà tuyển dụng"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </HasApplicant>

                <HasRecruiter user={profile}>
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vị trí</FormLabel>
                        <FormControl>
                          <Input {...field} className="rounded-xl" placeholder="Vị trí công việc" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </HasRecruiter>
              </div>

              <HasApplicant user={profile}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trình độ</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
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
                          <Select value={field.value} onValueChange={field.onChange}>
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
              </HasApplicant>
            </div>

            <div className="flex gap-3 pt-4 justify-end items-center">
              <Button type="button" variant="outline" onClick={handleCancel} className="rounded-xl px-6">
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6"
              >
                {isUpdating ? (
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

export default UserForm;