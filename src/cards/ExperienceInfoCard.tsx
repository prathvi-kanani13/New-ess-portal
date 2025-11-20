import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"
import EditExperienceDialog from "../Dialogs/EditExperienceDialog"

export interface ExperienceItem {
    id: number
    color: string
    companyName: string
    position: string
    years: string
    file?: File
}

export default function ExperienceInfoCard() {
    const [isOpen, setIsOpen] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const [experienceData, setExperienceData] = useState<ExperienceItem[]>([
        { id: 1, color: "#22C55E", companyName: "Google", position: "Software Engineer", years: "2030 - Present" },
        { id: 2, color: "#F97316", companyName: "Microsoft", position: "UI/UX Designer", years: "2026 - 2029" },
        { id: 3, color: "#FB923C", companyName: "Facebook", position: "Intern", years: "2022 - 2025" },
    ])

    const toggleDropdown = () => setIsOpen(prev => !prev)

    const handleEditClick = (index: number, e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveIndex(index)
        setShowDialog(true)
    }

    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveIndex(null)
        setShowDialog(true)
    }

    const handleSave = (updatedFields: any[], file?: File) => {
        const updatedItem: ExperienceItem = {
            id: activeIndex !== null ? experienceData[activeIndex].id : Date.now(),
            color: "#22C55E",
            companyName: updatedFields.find(f => f.name === "companyName")?.value || "",
            position: updatedFields.find(f => f.name === "position")?.value || "",
            years: updatedFields.find(f => f.name === "years")?.value || "",
            file,
        }

        if (activeIndex !== null) {
            const updated = [...experienceData]
            updated[activeIndex] = updatedItem
            setExperienceData(updated)
        } else {
            setExperienceData(prev => [...prev, updatedItem])
        }

        setShowDialog(false)
    }

    return (
        <>
            <Card className="relative rounded-sm cursor-pointer" onClick={toggleDropdown}>
                <div className="flex justify-between items-center px-4 py-4">
                    <h4 className="font-bold text-lg text-[#202C4B]">Experience Details</h4>

                    <Plus
                        size={20}
                        className="text-[#6B7280] hover:text-[#126195] cursor-pointer"
                        onClick={handleAddClick}
                    />
                </div>

                {isOpen && (
                    <div
                        className="absolute left-0 right-0 bg-white border-t border-gray-200 px-5 py-3 shadow-md z-10"
                        style={{ top: "100%" }}
                    >
                        <div className="space-y-4 text-sm text-gray-700">
                            {experienceData.map((exp, index) => (
                                <div key={exp.id} className="flex justify-between items-start">
                                    <div className="flex items-start gap-2">
                                        <span
                                            className="w-2 h-2 mt-2 rounded-full"
                                            style={{ backgroundColor: exp.color }}
                                        ></span>

                                        <div>
                                            <p className="text-[14px] text-gray-500">{exp.companyName}</p>
                                            <p className="font-semibold text-[#202C4B]">{exp.position}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <p className="text-gray-500 text-sm whitespace-nowrap">{exp.years}</p>

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

            <EditExperienceDialog
                open={showDialog}
                onOpenChange={setShowDialog}
                fields={
                    activeIndex !== null
                        ? [
                            { name: "companyName", label: "Previous Company Name", value: experienceData[activeIndex].companyName },
                            { name: "position", label: "Position", value: experienceData[activeIndex].position },
                            { name: "years", label: "Years", value: experienceData[activeIndex].years },
                        ]
                        : [
                            { name: "companyName", label: "Previous Company Name", value: "" },
                            { name: "position", label: "Position", value: "" },
                            { name: "years", label: "Years", value: "" },
                        ]
                }
                onSave={handleSave}
            />
        </>
    )
}
