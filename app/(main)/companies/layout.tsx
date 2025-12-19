"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function CompanyLayout({
                                     children
}: {
  children: React.ReactNode;
}) {

    return (
        <div className="flex-1">
            <section className="border-b border-border bg-primary/5 py-8 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    27,055 đánh giá về các công ty hàng đầu
                </h1>
                <p className="text-muted-foreground">
                    Mọi người đang nói gì về công ty của bạn? Tìm hiểu ngay!
                </p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                 <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">{children}</div>
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    <h3 className="text-lg font-bold text-foreground">
                                        Đánh Giá Mới Nhất
                                    </h3>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Chưa có đánh giá mới nào được thêm vào.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                 </div>
            </section>
        </div>
    )

}