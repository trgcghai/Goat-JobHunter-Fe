"use client";

import {
  SignUpType,
  SignUpTypeOptions,
  TUserSignUpSchema,
  UserSignUpSchema
} from "@/app/(auth)/components/schemas";
import CheckPasswordStrength from "@/components/common/CheckPasswordStrength";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function SignupForm({
 className,
 ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { userSignUp, isSigningUp } = useUser();

  const signUpForm = useForm<TUserSignUpSchema>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
      type: SignUpType.APPLICANT
    }
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = signUpForm;

  const onSubmit = async (data: TUserSignUpSchema) => {
    try {
      console.log("Submited form data =>>> ", data);

      const result = await userSignUp(data);

      if (result.success) {
        router.push("/otp?email=" + encodeURIComponent(data.email));
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-2xl",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader>
          <Link href="/" className="flex items-center gap-2 mb-2">
            <Image
              src="/logo.png"
              alt="GOAT Logo"
              className=""
              width={120}
              height={80}
            />
          </Link>
          <CardTitle>
            Tạo tài khoản mới
          </CardTitle>
          <CardDescription>
            Nhập thông tin của bạn bên dưới để tạo tài khoản mới.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signUpForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required className="capitalize">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="mail@example.com"
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Label className="mb-3">Bạn là</Label>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {SignUpTypeOptions.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                            />
                            <Label htmlFor={option.value}>
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormItem className="col-span-2">
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
              </div>

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