"use client";

import {
  RecruiterSchema,
  SignUpType,
  SignUpTypeOptions,
  TRecruiterSchema,
} from "@/app/(auth)/components/schemas";
import CheckPasswordStrength from "@/components/common/CheckPasswordStrength";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
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
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface RecruiterFormProps extends React.ComponentProps<"div"> {
  signUpType: SignUpType;
  setSignUpType: (type: SignUpType) => void;
}

export function RecruiterForm({
  className,
  signUpType,
  setSignUpType,
  ...props
}: RecruiterFormProps) {
  const router = useRouter();
  const { recruiterSignUp, isSigningUp } = useUser();
  const signUpForm = useForm<TRecruiterSchema>({
    resolver: zodResolver(RecruiterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      username: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = signUpForm;

  const onSubmit = async (data: TRecruiterSchema) => {
    try {
      const result = await recruiterSignUp({
        ...data,
        contact: { email: data.email, phone: data.phone },
        type: "recruiter",
      });

      if (result.success) {
        toast(
          "Tạo tài khoản nhà tuyển dụng thành công. Vui lòng đợi admin xét duyện trước khi có thể đăng nhập",
          {
            action: {
              label: "Xác nhận",
              onClick: () => {
                router.push("/");
              },
            },
          },
        );
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-2xl", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Tạo tài khoản Nhà tuyển dụng</CardTitle>
          <CardDescription>
            Nhập thông tin của bạn bên dưới để tạo tài khoản nhà tuyển dụng.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signUpForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required className="capitalize">
                      Email công ty
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="company@example.com"
                        className="rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Label className="mb-3">Bạn là</Label>
                <RadioGroup
                  defaultValue={signUpType}
                  onValueChange={setSignUpType}
                >
                  {SignUpTypeOptions.map((option) => {
                    return (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                        />
                        <Label htmlFor={option.value}>{option.label}</Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required className="capitalize">
                        Họ và tên
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nguyễn Văn A"
                          className="rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required className="capitalize">
                        Tên hiển thị
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="nguyenvana"
                          className="rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required className="capitalize">
                        Số điện thoại
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="0123456789"
                          className="rounded-xl"
                          maxLength={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required className="capitalize">
                        Địa chỉ
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="123 Đường ABC, Quận 1"
                          className="rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel required className="capitalize">
                        Mật khẩu
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********"
                          className="rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      {field.value && (
                        <CheckPasswordStrength password={field.value} />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="col-span-2 mt-3">
                      <FormLabel required className="capitalize">
                        Xác nhận mật khẩu
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********"
                          className="rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="rounded-xl w-full"
                disabled={isSubmitting || isSigningUp}
              >
                {isSubmitting || isSigningUp
                  ? "Đang tạo tài khoản..."
                  : "Tạo tài khoản"}
              </Button>

              <FieldDescription className="text-center text-gray-400">
                Đã có tài khoản?{" "}
                <Link
                  href={isSubmitting ? "#" : "/signin"}
                  className={`text-primary hover:underline underline underline-offset-2 ${isSubmitting ? "pointer-events-none" : ""}`}
                >
                  Đăng nhập
                </Link>
              </FieldDescription>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
