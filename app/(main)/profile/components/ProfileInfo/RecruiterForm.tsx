import {
  RecruiterFormData,
  recruiterSchema,
} from "@/app/(main)/profile/components/ProfileInfo/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Recruiter } from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface RecruiterFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Recruiter;
  avatarPreview: string;
  setAvatarPreview: (preview: string) => void;
}

function RecruiterForm({
  open,
  onOpenChange,
  profile,
  avatarPreview,
  setAvatarPreview,
}: RecruiterFormProps) {
  const form = useForm<RecruiterFormData>({
    resolver: zodResolver(recruiterSchema),
    defaultValues: {
      fullName: profile.fullName || "",
      username: profile.username || "",
      email: profile.contact.email || "",
      avatar: profile.avatar || "",
      contactEmail: profile.contact?.email || "",
      contactPhone: profile.contact?.phone || "",
      address: profile.address || "",
      description: profile.description || "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        form.setValue("avatar", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: RecruiterFormData) => {
    console.log("submit data", data);
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
    setAvatarPreview(profile.avatar || "");
  };

  const isLoading = false;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Cập Nhật Thông Tin Nhà Tuyển Dụng
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <FormLabel className="text-sm font-medium">
                  Ảnh đại diện
                </FormLabel>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-full aspect-square rounded-full border overflow-hidden bg-muted">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="object-cover w-full h-full"
                        fill
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("avatar")?.click()}
                    className="w-full rounded-xl"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Chọn ảnh
                  </Button>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
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
                      <FormLabel required>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" className="rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Liên Hệ</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số Điện Thoại</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" className="rounded-xl" />
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
                        <Input {...field} className="rounded-xl" />
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
}

export default RecruiterForm;
