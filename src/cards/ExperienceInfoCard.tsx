import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"
import EditExperienceDialog from "../Dialogs/EditExperienceInfoDialog"

export interface ExperienceItem {
    id: number
    color: string
    companyName: string
    position: string
    years: string
}

export default function ExperienceInfoCard() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null)
    const toggleDropdown = () => setIsOpen((prev) => !prev)

    const experienceData: ExperienceItem[] = [
        {
            id: 1,
            color: "#22C55E",
            companyName: "Google",
            position: "Software Engineer",
            years: "jan-2030 - present",
        },
        {
            id: 2,
            color: "#F97316",
            companyName: "Microsoft",
            position: "UI/UX Designer",
            years: "jan-2026 - dec-2029",
        },
        {
            id: 3,
            color: "#FB923C",
            companyName: "Facebook",
            position: "Intern",
            years: "jan-2022 - dec-2025",
        },
    ]

    const openEdit = (e: React.MouseEvent, item: ExperienceItem) => {
        e.stopPropagation()
        setSelectedItem(item)
    }

    const openAdd = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedItem({
            id: Date.now(),
            color: "",
            companyName: "",
            position: "",
            years: "",
        })
    }

    return (
        <>
            <Card className="relative rounded-sm cursor-pointer" onClick={toggleDropdown}>
                <div className="flex justify-between items-center px-4 py-4">
                    <h4 className="font-bold text-lg text-[#202C4B]">Experience Details</h4>

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
                            {experienceData.map((exp) => (
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
                                            onClick={(e) => openEdit(e, exp)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            <EditExperienceDialog
                open={!!selectedItem}
                onOpenChange={(open) => !open && setSelectedItem(null)}
                fields={selectedItem
                    ? [
                        { name: "companyName", label: "Company Name", value: selectedItem.companyName },
                        { name: "position", label: "Position", value: selectedItem.position },
                        { name: "years", label: "Years", value: selectedItem.years },
                    ]
                    : []
                }
            />
        </>
    )
}
