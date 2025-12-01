import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface JobSummaryChartProps {
  data: Record<string, number>;
}

export default function JobSummaryChart({ data } : JobSummaryChartProps) {
  const chartData = [
    { name: "Active", value: data.active },
    { name: "Inactive", value: data.inactive }
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
