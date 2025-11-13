import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "../assets/avtar.jpg"

interface TeamMember {
    name: string
    role: string
    image: string
}

export default function TeamMemberCard() {

    const teamMembers: TeamMember[] = [
        { name: "Jiya Sharma", role: "Senior Product Designer", image: Image },
        { name: "Riya Sharma", role: "UI/UX Designer", image: Image },
        { name: "Mina Sharma", role: "Product Designer", image: Image },
        { name: "Kiya Sharma", role: "Project Manager", image: Image },
        { name: "Siya Sharma", role: "Team Leader", image: Image },
        { name: "Riya Sharma", role: "Senior Product Designer", image: Image },
    ]

    return (
        <Card className="shadow-sm w-[528px] h-[475px] border border-[#E5E7EB] rounded-md">
            <CardHeader className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
                <CardTitle className="text-[#202C4B] text-lg font-semibold">
                    Team Members
                </CardTitle>
                <Button
                    variant="outline"
                    className="text-[#202C4B] text-sm border-[#E5E7EB] px-4 py-2 hover:bg-[#F5F7FA]"
                >
                    View All
                </Button>
            </CardHeader>

            <CardContent className="space-y-3 px-6 py-3">
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                                src={member.image}
                                alt={`${member.name} profile`}
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="font-semibold text-md text-[#262A2A]">
                                {member.name}
                            </h2>
                            <p className="text-sm text-[#6B7280] font-medium">
                                {member.role}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
