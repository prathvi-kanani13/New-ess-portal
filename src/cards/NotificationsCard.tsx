import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "../assets/avtar.jpg"

interface Notification {
    message: string
    time: string
    image: string
}

const notifications: Notification[] = [
    {
        message: "You have received a new message from HR.",
        time: "2 hours ago",
        image: Image,
    },
    {
        message: "Don't forget about the team meeting tomorrow at 10 AM.",
        time: "1 day ago",
        image: Image,
    },
    {
        message: "Your performance review is scheduled for next week.",
        time: "3 days ago",
        image: Image,
    },
]

export default function NotificationsCard() {
    return (
        <Card className="shadow-sm w-[528px] h-[475px] border border-[#E5E7EB] rounded-md">
            <CardHeader className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
                <CardTitle className="text-[#202C4B] text-lg font-semibold">
                    Notifications
                </CardTitle>
                <Button
                    variant="outline"
                    className="text-[#202C4B] text-sm border-[#E5E7EB] px-4 py-2 hover:bg-[#F5F7FA]"
                >
                    View All
                </Button>
            </CardHeader>

            <CardContent className="space-y-4 px-6 py-4">
                {notifications.map((notification, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                                src={notification.image}
                                alt="notification"
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="font-semibold text-md text-[#262A2A]">
                                {notification.message}
                            </h2>
                            <p className="text-sm text-[#6B7280] font-normal">
                                {notification.time}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
