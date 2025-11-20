import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"
import EditAddSkillsDialog from "../Dialogs/EditAddSkillsDialog"

export interface SkillsItem {
    id: number
    skillName: string
    tool: string
    years: string
}

export default function AddSkillsCard() {
    const [isOpen, setIsOpen] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const [skillsData, setSkillsData] = useState<SkillsItem[]>([
        { id: 1, skillName: "JavaScript", tool: "W3 Schools", years: "2020 - 2022" },
        { id: 2, skillName: "HTML", tool: "W3 Schools", years: "2026 - 2029" },
        { id: 3, skillName: "CSS", tool: "W3 Schools", years: "2022 - 2025" },
    ])

    const toggleDropdown = () => setIsOpen(!isOpen)

    // ----------- EDIT CLICK -----------
    const handleEditClick = (index: number, e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveIndex(index)
        setShowDialog(true)
    }

    // ----------- ADD NEW -----------
    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveIndex(null)
        setShowDialog(true)
    }

    // ----------- SAVE DATA -----------
    const handleSave = (updatedFields: any[]) => {
        const updatedItem: SkillsItem = {
            id: activeIndex !== null ? skillsData[activeIndex].id : Date.now(),
            skillName: updatedFields.find(f => f.name === "skillName")?.value || "",
            tool: updatedFields.find(f => f.name === "tool")?.value || "",
            years: updatedFields.find(f => f.name === "years")?.value || "",
        }

        if (activeIndex !== null) {
            // update existing
            const updated = [...skillsData]
            updated[activeIndex] = updatedItem
            setSkillsData(updated)
        } else {
            // add new
            setSkillsData(prev => [...prev, updatedItem])
        }

        setShowDialog(false)
    }

    return (
        <>
            <Card className="relative rounded-sm cursor-pointer" onClick={toggleDropdown}>
                <div className="flex justify-between items-center px-4 py-4">
                    <h4 className="font-bold text-lg text-[#202C4B]">Add Skills</h4>

                    <Plus
                        size={20}
                        className="text-[#6B7280] hover:text-[#126195] cursor-pointer"
                        onClick={handleAddClick}
                    />
                </div>

                {isOpen && (
                    <div className="absolute left-0 right-0 bg-white border-t border-gray-200 px-5 py-3 shadow-md z-10" style={{ top: "100%" }}>
                        <div className="space-y-4 text-sm text-gray-700">
                            {skillsData.map((skill, index) => (
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
                                            onClick={(e) => handleEditClick(index, e)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            <EditAddSkillsDialog
                open={showDialog}
                onOpenChange={setShowDialog}
                fields={
                    activeIndex !== null
                        ? [
                            { name: "skillName", label: "Skill Name", value: skillsData[activeIndex].skillName },
                            { name: "tool", label: "Tool", value: skillsData[activeIndex].tool },
                            { name: "years", label: "Years", value: skillsData[activeIndex].years },
                        ]
                        : [
                            { name: "skillName", label: "Skill Name", value: "" },
                            { name: "tool", label: "Tool", value: "" },
                            { name: "years", label: "Years", value: "" },
                        ]
                }
                onSave={handleSave}
            />
        </>
    )
}
