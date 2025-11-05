import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, } from "recharts"

interface PerformanceData {
  month: string
  value: number
}

const performanceData: PerformanceData[] = [
  { month: "Jan", value: 20000 },
  { month: "Feb", value: 20000 },
  { month: "Mar", value: 30000 },
  { month: "Apr", value: 30000 },
  { month: "May", value: 40000 },
  { month: "Jun", value: 40000 },
  { month: "Jul", value: 50000 },
  { month: "Aug", value: 50000 },
  { month: "Sep", value: 55000 },
  { month: "Oct", value: 55000 },
  { month: "Nov", value: 60000 },
  { month: "Dec", value: 60000 },
]

export default function PerformanceCard() {
  return (
    <Card className="shadow-sm w-[650px] h-[448px] border border-[#E5E7EB] rounded-md">
      {/* Header */}
      <CardHeader className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
        <CardTitle className="text-[#202C4B] text-lg font-semibold">
          Performance
        </CardTitle>
        <Button
          variant="outline"
          className="text-[#202C4B] border-[#E5E7EB] text-md px-6 py-2 hover:bg-[#F5F7FA]"
        >
          2024
        </Button>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-4">
        <div className="flex items-center gap-3 px-2 py-2 bg-[#F8F9FA] mb-6 rounded-md">
          <p className="text-md font-bold text-[#202C4B]">98%</p>
          <span className="text-green-600 bg-green-100 rounded-lg px-2 text-sm font-semibold">
            12%
          </span>
          <span className="text-[#6B7280] text-sm">vs last year</span>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={performanceData}
            margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00B074" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00B074" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              stroke="#373D3F"
              tick={{ fontSize: 12, fill: "#373D3F" }}
              axisLine={{ strokeWidth: 1 }}
            />

            <YAxis
              stroke="#373D3F"
              tick={{ fontSize: 12, fill: "#373D3F" }}
              axisLine={{ strokeWidth: 1 }}
              domain={[10000, 60000]}
              ticks={[10000, 20000, 30000, 40000, 50000, 60000]}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#00B074"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
