"use client";

import {
  ApplicantSchema,
  SignUpType,
  SignUpTypeOptions,
  TApplicantSchema,
} from "@/app/(auth)/components/schemas";
import CheckPasswordStrength from "@/components/CheckPasswordStrength";
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

interface ApplicantFormProps extends React.ComponentProps<"div"> {
  signUpType: SignUpType;
  setSignUpType: (type: SignUpType) => void;
}

export function ApplicantForm({
  className,
  signUpType,
  setSignUpType,
  ...props
}: ApplicantFormProps) {
  const router = useRouter();
  const { applicantSignUp, isSigningUp } = useUser();
  const signUpForm = useForm<TApplicantSchema>({
    resolver: zodResolver(ApplicantSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = signUpForm;

  const onSubmit = async (data: TApplicantSchema) => {
    try {
      const result = await applicantSignUp({
        ...data,
        contact: { email: data.email },
        type: "applicant",
      });

      if (result.success) {
        router.push("/otp?email=" + encodeURIComponent(data.email));
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 w-md mx-auto", className)}
      {...props}
    >
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
                        <Label>{option.label}</Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

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
