import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Meetings {
    message: string
    submessage: string
    time: string
}

const meetings: Meetings[] = [
    {
        message: "Project ESS-Portal",
        submessage: "Discuss project goals and timelines.",
        time: "11:00 AM",
    },
    {
        message: "Project ESS-Portal",
        submessage: "Discuss project goals and timelines.",
        time: "12:00 AM",
    },
    {
        message: "Project ESS-Portal",
        submessage: "Discuss project goals and timelines.",
        time: "15:00 PM",
    },
    {
        message: "Project ESS-Portal",
        submessage: "Discuss project goals and timelines.",
        time: "18:40 AM",
    },
]

export default function MeetingsCard() {
    return (
        <Card className="shadow-sm w-[528px] h-[475px] border border-[#E5E7EB] rounded-md">
            <CardHeader className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
                <CardTitle className="text-[#202C4B] text-lg font-semibold">
                    Meetings schedules
                </CardTitle>
                <Button
                    variant="outline"
                    className="text-[#202C4B] text-sm border-[#E5E7EB] px-4 py-2 hover:bg-[#F5F7FA]"
                >
                    Today
                </Button>
            </CardHeader>

            <CardContent className="space-y-5 px-6 py-4">
                {meetings.map((meeting, index) => (
                    <div key={index} className="flex items-stretch gap-5">
                        <div className="min-w-[90px] text-md text-[#6B7280] font-medium border-r-2 border-[#E5E7EB] pr-4 flex items-center justify-center">
                            <p className="whitespace-nowrap">{meeting.time}</p>
                        </div>

                        <div className="bg-[#F8F9FA] px-4 py-2 rounded-md flex-1">
                            <h2 className="font-semibold text-[#262A2A] text-md leading-snug">
                                {meeting.submessage}
                            </h2>
                            <p className="text-sm text-[#6B7280] font-normal leading-relaxed mt-1">
                                {meeting.message}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
