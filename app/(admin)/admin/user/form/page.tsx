"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ROLE } from "@/constants/constant";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/types/model";
import Link from "next/link";

const userFormSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  role: z.enum(ROLE, {
    error: "Vui lòng chọn loại người dùng",
  }),
  fullName: z.string().optional(),
  username: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

type UserFormData = z.infer<typeof userFormSchema>;

const UserFormPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      role: ROLE.APPLICANT,
      fullName: "",
      username: "",
      phoneNumber: "",
      address: "",
    },
  });

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (id: string) => {
    setIsFetching(true);
    try {
      // TODO: Call API to get user details
      // const response = await getUserById(id);
      // const user: User = response.data;

      // Mock data for demonstration
      const user: User = {
        userId: parseInt(id),
        email: "user@example.com",
        role: { name: ROLE.APPLICANT },
        fullName: "John Doe",
        username: "johndoe",
        contact: {
          phoneNumber: "0123456789",
          address: "123 Main St",
        },
      } as any;

      form.reset({
        email: user.contact.email,
        role: user.role.name as any,
        fullName: user.fullName || "",
        username: user.username || "",
        phoneNumber: user.contact.phone || "",
        address: user.address || "",
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error("Không thể tải thông tin người dùng");
      router.push("/admin/user");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    console.log(data);
    try {
      if (userId) {
        // TODO: Call API to update user
        // await updateUser(userId, data);
        toast.success("Cập nhật người dùng thành công!");
      } else {
        // TODO: Call API to create user
        // await createUser(data);
        toast.success("Thêm người dùng thành công!");
      }
      router.push("/admin/user");
    } catch (error) {
      console.error("Failed to save user:", error);
      toast.error(
        userId
          ? "Không thể cập nhật người dùng"
          : "Không thể thêm người dùng"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link href="/recruiter-portal/jobs">
          <Button variant="link" className="rounded-xl mb-4 p-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {userId ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {userId
            ? "Cập nhật thông tin người dùng"
            : "Điền thông tin để tạo người dùng mới"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <h1 className="text-base font-semibold">
            Thông tin người dùng
          </h1>
          {!userId && <p className={"text-muted-foreground text-sm"}>
            Các thông tin này sẽ được gửi về email của người dùng cùng với mật khẩu mặc định để đăng nhập
          </p>}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@example.com"
                          {...field}
                          disabled={isLoading || !!userId}
                          className="rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Loại người dùng</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-xl w-full">
                            <SelectValue placeholder="Chọn loại người dùng" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          <SelectItem value={ROLE.APPLICANT}>
                            Người dùng
                          </SelectItem>
                          <SelectItem value={ROLE.HR}>
                            Nhà tuyển dụng
                          </SelectItem>
                          <SelectItem value={ROLE.SUPER_ADMIN}>
                            Quản trị viên
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nguyễn Văn A"
                          {...field}
                          disabled={isLoading}
                          className="rounded-xl"
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
                      <FormLabel>Tên đăng nhập</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="username"
                          {...field}
                          disabled={isLoading}
                          className="rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0123456789"
                          {...field}
                          disabled={isLoading}
                          className="rounded-xl"
                        />
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
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Đường ABC, Quận XYZ"
                          {...field}
                          disabled={isLoading}
                          className="rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/user")}
                  disabled={isLoading}
                  className="rounded-xl"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Đang xử lý...
                    </>
                  ) : userId ? (
                    "Cập nhật"
                  ) : (
                    "Thêm người dùng"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserFormPage;