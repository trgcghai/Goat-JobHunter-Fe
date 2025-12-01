import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface ApplicationSummaryChartProps {
  data: Record<string, number>
}

export default function ApplicationSummaryChart({ data } : ApplicationSummaryChartProps) {
  const chartData = [
    { name: "Accepted", value: data.ACCEPTED },
    { name: "Pending", value: data.PENDING },
    { name: "Rejected", value: data.REJECTED },
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
