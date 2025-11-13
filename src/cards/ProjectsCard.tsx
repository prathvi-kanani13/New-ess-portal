import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Image from "../assets/avtar.jpg" // adjust path as per your setup

interface Project {
    id: number
    name: string
    leader: string
    deadline: string
    tasksDone: number
    totalTasks: number
    timeSpent: string
    team: string[]
    image: string
}

export default function ProjectsCard() {

    const projects: Project[] = [
        {
            id: 1,
            name: "Project Name 1",
            leader: "Jiya Sharma",
            deadline: "14/10/2024",
            tasksDone: 6,
            totalTasks: 10,
            timeSpent: "65/120 Hrs",
            image: Image,
            team: [
                "https://i.pravatar.cc/40?img=10",
                "https://i.pravatar.cc/40?img=11",
                "https://i.pravatar.cc/40?img=12",
                "https://i.pravatar.cc/40?img=13",
            ],
        },
        {
            id: 2,
            name: "Project Name 2",
            leader: "Aarav Patel",
            deadline: "20/12/2024",
            tasksDone: 4,
            totalTasks: 8,
            timeSpent: "48/100 Hrs",
            image: Image,
            team: [
                "https://i.pravatar.cc/40?img=20",
                "https://i.pravatar.cc/40?img=21",
                "https://i.pravatar.cc/40?img=22",
                "https://i.pravatar.cc/40?img=23",
                "https://i.pravatar.cc/40?img=24",
            ],
        },
    ]

    return (
        <Card className="h-[400px]">
            <CardHeader className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
                <CardTitle className="text-[#202C4B] text-lg font-semibold">
                    Projects
                </CardTitle>
                <Button
                    variant="outline"
                    className="text-[#202C4B] text-sm border-[#E5E7EB] px-4 py-2 hover:bg-[#F5F7FA]"
                >
                    Opening Projects
                </Button>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    {projects.map((project) => (
                        <Card key={project.id} className="py-4 h-[290px]">
                            <CardHeader className="text-md font-semibold text-[#202C4B]">
                                {project.name}
                            </CardHeader>

                            <CardContent className="space-y-3">
                                {/* Project Leader */}
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt="Team member profile"
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-md text-[#262A2A]">
                                            {project.leader}
                                        </h2>
                                        <p className="text-sm text-[#6B7280] font-medium">
                                            Project Leader
                                        </p>
                                    </div>
                                </div>

                                {/* Deadline */}
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt="Team member profile"
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-md text-[#262A2A]">
                                            {project.deadline}
                                        </h2>
                                        <p className="text-sm text-[#6B7280] font-medium">
                                            Deadline
                                        </p>
                                    </div>
                                </div>

                                {/* Tasks Section */}
                                <div className="flex items-center justify-between border rounded-sm p-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                        <span className="text-gray-600 text-sm">
                                            Tasks: {project.tasksDone}/{project.totalTasks}
                                        </span>
                                    </div>

                                    <div className="flex -space-x-2">
                                        {project.team.slice(0, 3).map((member, i) => (
                                            <Avatar key={i} className="w-6 h-6 border-2 border-white">
                                                <AvatarImage src={member} />
                                            </Avatar>
                                        ))}
                                        {project.team.length > 3 && (
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#007AFF] text-[11px] text-white">
                                                +{project.team.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Time Spent */}
                                <div className="bg-[#B9CBD1] flex items-center justify-between px-2 py-2 rounded-sm text-sm font-semibold text-[#3B7080]">
                                    <span>Time Spent:</span>
                                    <span className="font-bold">{project.timeSpent}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
