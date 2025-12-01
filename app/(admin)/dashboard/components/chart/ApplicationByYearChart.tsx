import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface ApplicationByYearChartProps {
  data: Record<number, number>;
}

export default function ApplicationByYearChart({ data } : ApplicationByYearChartProps) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    month: key,
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </ResponsiveContainer>
  );
}
