import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell } from "recharts"

export default function SkillsCard() {
    const skills: Skill[] = [
        { name: "Figma", percent: 95, color: "#126195", updated: "15 May 2025" },
        { name: "HTML", percent: 85, color: "#03C95A", updated: "12 May 2025" },
        { name: "CSS", percent: 70, color: "#AB47BC", updated: "12 May 2025" },
        { name: "Wordpress", percent: 61, color: "#1B84FF", updated: "15 May 2025" },
        { name: "Javascript", percent: 58, color: "#000000", updated: "13 May 2025" },
    ]

    return (
        <Card className="shadow-sm w-[510px] h-[448px]">
            <CardHeader className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
                <CardTitle className="text-[#202C4B] text-lg font-semibold">
                    My Skills
                </CardTitle>
                <Button
                    variant="outline"
                    className="text-[#202C4B] border-[#E5E7EB] text-md px-6 py-2 hover:bg-[#F5F7FA]"
                >
                    2024
                </Button>
            </CardHeader>

            <CardContent className="space-y-2">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="flex items-center justify-between bg-[#F9FAFB] border-2 border-dotted border-[#E5E7EB] rounded-lg px-2 py-2"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-[3px] h-4 rounded-full"
                                style={{ backgroundColor: skill.color }}
                            ></div>

                            <div>
                                <p className="font-semibold text-[#202C4B] text-md">
                                    {skill.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Updated : {skill.updated}
                                </p>
                            </div>
                        </div>

                        <div className="relative w-10 h-10">
                            <PieChart width={40} height={40}>
                                <Pie
                                    data={[
                                        { value: skill.percent },
                                        { value: 100 - skill.percent },
                                    ]}
                                    dataKey="value"
                                    innerRadius={15}
                                    outerRadius={20}
                                    startAngle={90} // start from top
                                    endAngle={-270} // clockwise full circle
                                >
                                    <Cell fill={skill.color} />
                                    <Cell fill="#E5E7EB" />
                                </Pie>
                            </PieChart>

                            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-[#202C4B]">
                                {skill.percent}%
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

interface Skill {
    name: string
    percent: number
    color: string
    updated: string
}
