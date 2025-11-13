import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

interface Task {
    id: number
    name: string
    status: "Onhold" | "Inprogress" | "Completed" | "Pending"
    team: string[]
    completed?: boolean
}

export default function TasksCard() {

    const tasks: Task[] = [
        {
            id: 1,
            name: "Patient appointment booking",
            status: "Onhold",
            team: [
                "https://i.pravatar.cc/40?img=1",
                "https://i.pravatar.cc/40?img=2",
                "https://i.pravatar.cc/40?img=3",
            ],
        },
        {
            id: 2,
            name: "Appointment booking with payment",
            status: "Inprogress",
            team: [
                "https://i.pravatar.cc/40?img=4",
                "https://i.pravatar.cc/40?img=5",
                "https://i.pravatar.cc/40?img=6",
            ],
        },
        {
            id: 3,
            name: "Patient and Doctor video conferencing",
            status: "Completed",
            team: [
                "https://i.pravatar.cc/40?img=7",
                "https://i.pravatar.cc/40?img=8",
                "https://i.pravatar.cc/40?img=9",
            ],
            completed: true,
        },
        {
            id: 4,
            name: "Private chat module",
            status: "Pending",
            team: [
                "https://i.pravatar.cc/40?img=10",
                "https://i.pravatar.cc/40?img=11",
                "https://i.pravatar.cc/40?img=12",
            ],
        },
        {
            id: 5,
            name: "Go-Live and Post-Implementation Support",
            status: "Inprogress",
            team: [
                "https://i.pravatar.cc/40?img=13",
                "https://i.pravatar.cc/40?img=14",
            ],
        },
    ]


    const statusColors: Record<Task["status"], string> = {
        Onhold: "bg-pink-200 text-pink-600",
        Inprogress: "bg-purple-200 text-purple-600",
        Completed: "bg-green-200 text-green-600",
        Pending: "bg-blue-200 text-blue-600",
    }

    return (
        <Card className="h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
                <CardTitle className="text-[#202C4B] text-lg font-semibold">
                    Tasks
                </CardTitle>

                <Select defaultValue="all">
                    <SelectTrigger className="w-[150px] border border-[#E5E7EB] rounded-md text-sm text-[#202C4B] focus:ring-0 focus:outline-none">
                        <SelectValue placeholder="All Projects" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        <SelectItem value="onhold">Onhold</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="inprogress">InProgress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent className="divide-y divide-[#E5E7EB] px-6">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="flex items-center justify-between py-3 text-sm"
                    >
                        <div className="flex items-center gap-3">
                            <Checkbox checked={task.completed} />
                            <span
                                className={`${task.completed
                                    ? "line-through text-gray-400"
                                    : "text-[#202C4B]"
                                    } font-medium`}
                            >
                                {task.name}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div
                                className={`flex items-center gap-1 rounded-full px-2 py-[2px] text-xs font-medium ${statusColors[task.status]}`}
                            >
                                <span className="w-2 h-2 rounded-full bg-current opacity-80"></span>
                                {task.status}
                            </div>

                            <div className="flex -space-x-2">
                                {task.team.map((member, i) => (
                                    <Avatar
                                        key={i}
                                        className="w-6 h-6 border-2 border-white shadow-sm"
                                    >
                                        <AvatarImage src={member} />
                                    </Avatar>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}