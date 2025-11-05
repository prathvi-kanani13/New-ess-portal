import { Card } from "@/components/ui/card"

interface TimelineSegment {
    width: string
    color: string
}

interface StatItem {
    label: string
    value: string
}

const stats: StatItem[] = [
    { label: "Total Working Hours", value: "12h 36m" },
    { label: "Productive Hours", value: "08h 36m" },
    { label: "Break Hours", value: "22m 15s" },
    { label: "Overtime", value: "02h 15m" },
]

const timeline: TimelineSegment[] = [
    { width: "flex-1", color: "#10B981" },
    { width: "w-16", color: "#FACC15" },
    { width: "flex-1", color: "#10B981" },
    { width: "w-20", color: "#FACC15" },
    { width: "flex-1", color: "#10B981" },
    { width: "w-12", color: "#2563EB" },
]

export default function WorkingHoursCard() {
    return (
        <Card className="shadow-sm border border-[#E5E7EB] p-5 h-[185px]">
            {/* Stats Row */}
            <div className="flex justify-between items-center mb-4">
                {stats.map((item, index) => (
                    <div key={index} className="text-center">
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <h3 className="text-lg font-semibold text-[#202C4B]">{item.value}</h3>
                    </div>
                ))}
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-1 mb-1">
                {timeline.map((seg, i) => (
                    <div
                        key={i}
                        className={`${seg.width} h-8 rounded-sm`}
                        style={{ backgroundColor: seg.color }}
                    />
                ))}
            </div>

            {/* Time Labels */}
            <div className="flex justify-between text-xs text-gray-400">
                {[
                    "10:00",
                    "11:00",
                    "12:00",
                    "01:00",
                    "02:00",
                    "03:00",
                    "04:00",
                    "05:00",
                    "06:00",
                    "07:00",
                ].map((time, i) => (
                    <span key={i}>{time}</span>
                ))}
            </div>
        </Card>
    )
}
