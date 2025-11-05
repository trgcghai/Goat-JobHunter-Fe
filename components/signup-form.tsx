"use client";

import {
  SignUpSchema,
  SignUpTypeOptions,
  type TSignUpSchema,
} from "@/app/(auth)/components/schemas";
import CheckPasswordStrength from "@/app/(main)/profile/components/ProfilePassword/CheckPasswordStrength";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const signUpForm = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      type: "applicant",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = signUpForm;

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      console.log("Sign up data:", data);
      // TODO: Call API to register
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Tạo tài khoản mới</CardTitle>
          <CardDescription>
            Nhập thông tin của bạn bên dưới để tạo tài khoản mới.
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
                    <FormLabel required>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
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
                    <FormLabel required>Bạn là</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {SignUpTypeOptions.map((option) => {
                          return (
                            <div
                              className="flex items-center space-x-2"
                              key={option.value}
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                              />
                              <Label
                                htmlFor={option.value}
                                className="cursor-pointer capitalize"
                              >
                                {option.label}
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
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Mật khẩu</FormLabel>
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
                  <FormItem>
                    <FormLabel required>Xác nhận mật khẩu</FormLabel>
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
              </Button>

              <FieldDescription className="text-center text-gray-400">
                Đã có tài khoản?{" "}
                <Link
                  href="/signin"
                  className="text-primary hover:underline underline underline-offset-2"
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
