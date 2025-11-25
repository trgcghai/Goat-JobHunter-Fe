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
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn } = useUser();
  const router = useRouter();

  const signInForm = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    setError,
    control,
    formState: { isSubmitting },
  } = signInForm;

  const onSubmit = async (data: TSignInSchema) => {
    try {
      const result = await signIn(data);

      console.log(result.user);

      if (result.success) {
        router.push(result.user?.type == "HR" ? "/recruiter-portal" : "/");
      } else {
        // xử lý lỗi cụ thể
        if (result.error === "Bad credentials") {
          setError("root", {
            type: "manual",
            message: "Email hoặc mật khẩu không đúng",
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-md", className)} {...props}>
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
                    <FormLabel required>Email</FormLabel>
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
                    <FormLabel required>Mật khẩu</FormLabel>
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
              {signInForm.formState.errors.root && (
                <div className="p-3 rounded-xl text-sm bg-destructive/10 text-destructive border border-destructive/20">
                  {signInForm.formState.errors.root.message}
                </div>
              )}
              <Button
                type="submit"
                className="rounded-xl w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
              <FieldDescription className="text-center text-gray-400">
                Chưa có tài khoản?{" "}
                <Link
                  href={isSubmitting ? "#" : "/signup"}
                  className={`text-primary hover:underline underline underline-offset-2 ${isSubmitting ? "pointer-events-none" : ""}`}
                >
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
