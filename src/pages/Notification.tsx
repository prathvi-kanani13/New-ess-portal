import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface NotificationItem {
    id: number;
    name: string;
    message: string;
    time: string;
    avatar: string;
    actions?: boolean;
}

export default function Notification() {
    const notifications: NotificationItem[] = [
        {
            id: 1,
            name: "Shawn",
            message: "Performance in Math is below the threshold.",
            time: "Just Now",
            avatar: "https://i.pravatar.cc/150?img=3",
        },
        {
            id: 2,
            name: "Sylvia",
            message: "Added appointment on 02:00 PM",
            time: "10 mins ago",
            avatar: "https://i.pravatar.cc/150?img=5",
            actions: true,
        },
        {
            id: 3,
            name: "Teressa",
            message: "Submitted leave application for 3 days.",
            time: "2 hrs ago",
            avatar: "https://i.pravatar.cc/150?img=8",
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-md bg-[#E8E9EA] w-9 h-9 relative"
                >
                    <Bell className="w-6 h-6 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-[400px] mt-4 shadow-lg rounded-lg overflow-hidden"
                align="end"
            >

                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-semibold">
                        Notifications ({notifications.length})
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                        <button className="text-[#126195] font-medium hover:underline">
                            Mark all as read
                        </button>
                        <span className="font-semibold">Today</span>
                    </div>
                </div>

                <div className="max-h-[280px] overflow-y-auto">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0 hover:bg-gray-50"
                        >
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={n.avatar} alt={n.name} />
                                <AvatarFallback>{n.name.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-sm text-gray-700">
                                <p className="leading-tight">
                                    <span className="font-semibold">{n.name}</span> {n.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">{n.time}</p>

                                {n.actions && (
                                    <div className="flex gap-2 mt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs px-2 py-1 h-6"
                                        >
                                            Deny
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="text-xs px-2 py-1 h-6 bg-[#126195] hover:bg-[#0f4f78]"
                                        >
                                            Approve
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2 p-3 bg-gray-50 border-t">
                    <Button
                        variant="outline"
                        className="h-8 text-sm px-4 border-gray-300"
                    >
                        Cancel
                    </Button>
                    <Button className="h-8 text-sm px-4 bg-[#126195] hover:bg-[#0f4f78]">
                        View All
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
