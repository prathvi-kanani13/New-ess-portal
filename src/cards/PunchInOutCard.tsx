import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PunchInOutCard() {
  return (
    <Card className="w-[528px] h-[400px] border border-[#126195]">
      <CardContent className="flex flex-col items-center justify-center space-y-3">
        <div className="pt-2 text-[#6B7280] font-semibold">Attendance</div>

        <p className="text-[#111827] text-lg font-semibold">
          08:35 AM, 11 Mar 2025
        </p>

        {/* Circular Progress */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-40 h-40 -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#E5E7EB"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#00C389"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.65)}`}
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-sm text-gray-500">Total Hours</p>
            <h2 className="text-xl font-semibold text-[#202C4B]">5:45:32</h2>
          </div>
        </div>

        <div className="bg-[#202C4B] text-white text-sm px-4 py-2 rounded-md">
          Production : 3.45 hrs
        </div>

        <p className="text-sm text-[#202C4B]">Punch In at 10:00 AM</p>

        <Button className="w-full bg-[#126195] hover:bg-[#0C4B5E] text-white">
          Punch Out
        </Button>
      </CardContent>
    </Card>
  )
}
