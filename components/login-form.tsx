"use client";

import {
  SignInSchema,
  type TSignInSchema,
} from "@/app/(auth)/components/schemas";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const signInForm = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = signInForm;

  const onSubmit = async (data: TSignInSchema) => {
    try {
      console.log("Login data:", data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Đăng nhập vào tài khoản của bạn</CardTitle>
          <CardDescription>
            Nhập email của bạn bên dưới để đăng nhập vào tài khoản của bạn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signInForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <FieldDescription className="text-center text-gray-400">
                Chưa có tài khoản?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Đăng ký
                </Link>
              </FieldDescription>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
