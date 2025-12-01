import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface UserSummaryChartProps {
  data: Record<string, number>;
}

export default function UserSummaryChart({ data }: UserSummaryChartProps) {
  const chartData = [
    { name: "Applicants", value: data.applicants },
    { name: "Recruiters", value: data.recruiters }
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </ResponsiveContainer>
  );
}
