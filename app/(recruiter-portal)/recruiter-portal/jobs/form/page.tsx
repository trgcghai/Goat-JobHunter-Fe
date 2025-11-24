"use client";

import {
  CreateJobFormData,
  createJobSchema,
} from "@/app/(recruiter-portal)/recruiter-portal/jobs/form/components/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { LEVEL_OPTIONS, WORKING_TYPE_OPTIONS } from "@/constants/constant";
import useJobActions from "@/hooks/useJobActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function JobForm() {
  const router = useRouter();
  const { handleCreateJob, isCreating } = useJobActions();

  const form = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      salary: 0,
      quantity: 1,
      level: "",
      workingType: "",
      startDate: "",
      endDate: "",
      skillIds: [],
      careerId: "",
    },
  });

  const onSubmit = async (data: CreateJobFormData) => {
    try {
      await handleCreateJob(data);
      router.push("/recruiter-portal/jobs");
    } catch (error) {
      // Error handled in hook
      console.error("Create job failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link href="/recruiter-portal/jobs">
          <Button variant="link" className="rounded-xl mb-4 p-0!">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Tạo công việc mới</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Điền thông tin để đăng tuyển vị trí mới
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Tiêu đề công việc</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: Senior Full-stack Developer"
                        className="rounded-xl"
                        {...field}
                      />
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
                    <FormLabel required>Mô tả công việc</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả chi tiết về công việc, yêu cầu, quyền lợi..."
                        className="rounded-xl min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Tối thiểu 50 ký tự</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Địa điểm làm việc</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: Hà Nội, Việt Nam"
                        className="rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chi tiết công việc</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Cấp độ</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Chọn cấp độ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LEVEL_OPTIONS.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Hình thức</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Chọn hình thức" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {WORKING_TYPE_OPTIONS.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Mức lương (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="VD: 20000000"
                          className="rounded-xl"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Số lượng</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="VD: 2"
                          className="rounded-xl"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Ngày bắt đầu</FormLabel>
                      <FormControl>
                        <Input type="date" className="rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Ngày kết thúc</FormLabel>
                      <FormControl>
                        <Input type="date" className="rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              disabled={isCreating}
              onClick={() => {
                form.reset();
                form.clearErrors();
              }}
            >
              Hủy
            </Button>
            <Button type="submit" className="rounded-xl" disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Đang tạo...
                </>
              ) : (
                "Tạo công việc"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
