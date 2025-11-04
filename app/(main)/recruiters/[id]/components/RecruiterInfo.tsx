import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { Calendar, Users } from "lucide-react";

interface RecruiterInfoProps {
  recruiter: Recruiter;
}

export function RecruiterInfo({ recruiter }: RecruiterInfoProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Giới Thiệu Công Ty</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {recruiter.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông Tin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Ngày tham gia</p>
                <p className="font-medium text-foreground">
                  {formatDate(recruiter.createdAt || "")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Công việc đang mở
                </p>
                <p className="font-medium text-foreground">
                  {recruiter.jobs?.length || 0} vị trí
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
