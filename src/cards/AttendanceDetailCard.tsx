import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

interface AttendanceItem {
    name: string
    value: number
    color: string
    label: string
    [key: string]: string | number
}

export default function AttendanceDetailCard() {

    const attendanceData: AttendanceItem[] = [
        { name: "On Time", value: 1000, color: "#0C4B5E", label: "On Time" },
        { name: "Late Attendance", value: 40, color: "#FFC107", label: "Late Attendance" },
        { name: "Work From Home", value: 500, color: "#126195", label: "Work From Home" },
        { name: "Absent", value: 50, color: "#E70D0D", label: "Absent" },
        { name: "Sick Leave", value: 158, color: "#03C95A", label: "Sick Leave" },
    ]

    return (
        <Card className="shadow-sm w-[650px] h-[345px] border border-[#E5E7EB] rounded-md">
            <CardHeader className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
                <CardTitle className="text-[#202C4B] text-lg font-semibold">
                    Attendance Details
                </CardTitle>
                <Button
                    variant="outline"
                    className="text-[#202C4B] border-[#E5E7EB] text-md px-6 py-2 hover:bg-[#F5F7FA]"
                >
                    2024
                </Button>
            </CardHeader>

            <CardContent className="flex justify-between items-center px-6">
                <div className="space-y-3 text-md">
                    {attendanceData.map((item) => (
                        <p
                            key={item.name}
                            className="text-[#6B7280] font-semibold capitalize"
                        >
                            <span className="font-semibold text-[#202C4B]">
                                {item.value}
                            </span>{" "}
                            {item.label}
                        </p>
                    ))}
                </div>

                <div className="w-50 h-50">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={attendanceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {attendanceData.map((item, index) => (
                                    <Cell key={`cell-${index}`} fill={item.color as string} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
