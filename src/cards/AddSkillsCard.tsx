import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"
import EditAddSkillsDialog from "../Dialogs/EditAddSkillsDialog"

export interface skillsItem {
    id: number
    skillName: string
    tool: string
    years: string
}

export default function AddSkillsCard() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<skillsItem | null>(null)
    const toggleDropdown = () => setIsOpen((prev) => !prev)
    
    const skillsData: skillsItem[] = [
        {
            id: 1,
            skillName: "JavaScript",
            tool: "W3 Schools",
            years: "2020 - 2022",
        },
        {
            id: 2,
            skillName: "HTML",
            tool: "W3 Schools",
            years: "2026 - 2029",
        },
        {
            id: 3,
            skillName: "CSS",
            tool: "W3 Schools",
            years: "2022 - 2025",
        },
    ]

    const openEdit = (e: React.MouseEvent, item: skillsItem) => {
        e.stopPropagation()
        setSelectedItem(item)
    }

    const openAdd = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedItem({
            id: Date.now(),
            skillName: "",
            tool: "",
            years: "",
        })
    }

    return (
        <>
            <Card className="relative rounded-sm cursor-pointer" onClick={toggleDropdown}>
                <div className="flex justify-between items-center px-4 py-4">
                    <h4 className="font-bold text-lg text-[#202C4B]">Add Skills</h4>

                    <Plus
                        size={20}
                        className="text-[#6B7280] hover:text-[#126195] cursor-pointer"
                        onClick={openAdd}
                    />
                </div>

                {isOpen && (
                    <div
                        className="absolute left-0 right-0 bg-white border-t border-gray-200 px-5 py-3 shadow-md z-10"
                        style={{ top: "100%" }}
                    >
                        <div className="space-y-4 text-sm text-gray-700">
                            {skillsData.map((skill) => (
                                <div key={skill.id} className="flex justify-between items-start">

                                    <div className="flex items-start gap-2">

                                        <div>
                                            <p className="text-[14px] text-gray-500">{skill.skillName}</p>
                                            <p className="font-semibold text-[#202C4B]">{skill.tool}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <p className="text-gray-500 text-sm whitespace-nowrap">{skill.years}</p>

                                        <Edit
                                            size={18}
                                            className="text-gray-500 cursor-pointer hover:text-[#126195]"
                                            onClick={(e) => openEdit(e, skill)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            <EditAddSkillsDialog
                open={!!selectedItem}
                onOpenChange={(open) => !open && setSelectedItem(null)}
                fields={selectedItem
                    ? [
                        { name: "skillName", label: "Skill Name", value: selectedItem.skillName },
                        { name: "tool", label: "Tool", value: selectedItem.tool },
                        { name: "years", label: "Years", value: selectedItem.years },
                    ]
                    : []
                }
            />
        </>
    )
}
