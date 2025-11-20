import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"
import EditEducationDialog from "../Dialogs/EditEducationDialog"

export interface EducationItem {
    id: number
    color: string
    institution: string
    course: string
    years: string
}

export default function EducationInfoCard() {
    const [isOpen, setIsOpen] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const [educationData, setEducationData] = useState<EducationItem[]>([
        { id: 1, color: "#22C55E", institution: "Oxford University", course: "Computer Science", years: "2020 - 2022" },
        { id: 2, color: "#F97316", institution: "Cambridge University", course: "Computer Network & Systems", years: "2016 - 2019" },
        { id: 3, color: "#FB923C", institution: "Oxford School", course: "Grade X", years: "2012 - 2016" },
    ])

    const toggleDropdown = () => setIsOpen(!isOpen)

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

    const handleSave = (updatedFields: any[]) => {
        const updatedItem: EducationItem = {
            id: activeIndex !== null ? educationData[activeIndex].id : Date.now(),
            color: "#22C55E",
            institution: updatedFields.find(f => f.name === "institution")?.value || "",
            course: updatedFields.find(f => f.name === "course")?.value || "",
            years: updatedFields.find(f => f.name === "years")?.value || "",
        }

        if (activeIndex !== null) {
            const updated = [...educationData]
            updated[activeIndex] = updatedItem
            setEducationData(updated)
        } else {
            setEducationData(prev => [...prev, updatedItem])
        }

        setShowDialog(false)
    }

    return (
        <>
            <Card className="relative rounded-sm cursor-pointer" onClick={toggleDropdown}>
                <div className="flex justify-between items-center px-4 py-4">
                    <h4 className="font-bold text-lg text-[#202C4B]">Education Details</h4>
                    <Plus
                        className="text-[#6B7280] hover:text-[#126195] cursor-pointer"
                        size={20}
                        onClick={handleAddClick}
                    />
                </div>

                {isOpen && (
                    <div className="absolute left-0 right-0 bg-white border-t border-gray-200 px-5 py-3 shadow-md z-10" style={{ top: "100%" }}>
                        <div className="space-y-4 text-sm text-gray-700">
                            {educationData.map((edu, index) => (
                                <div key={edu.id} className="flex justify-between items-start">
                                    <div className="flex items-start gap-2">
                                        <span className="w-2 h-2 mt-2 rounded-full" style={{ backgroundColor: edu.color }}></span>
                                        <div>
                                            <p className="text-[14px] text-gray-500">{edu.institution}</p>
                                            <p className="font-semibold text-[#202C4B]">{edu.course}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <p className="text-gray-500 text-sm whitespace-nowrap">{edu.years}</p>
                                        <Edit
                                            className="text-gray-500 cursor-pointer hover:text-[#126195]"
                                            size={18}
                                            onClick={(e) => handleEditClick(index, e)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            <EditEducationDialog
                open={showDialog}
                onOpenChange={setShowDialog}
                fields={
                    activeIndex !== null
                        ? [
                            { name: "institution", label: "Institution", value: educationData[activeIndex].institution },
                            { name: "course", label: "Course", value: educationData[activeIndex].course },
                            { name: "years", label: "Years", value: educationData[activeIndex].years },
                        ]
                        : [
                            { name: "institution", label: "Institution", value: "" },
                            { name: "course", label: "Course", value: "" },
                            { name: "years", label: "Years", value: "" },
                        ]
                }
                onSave={handleSave}
            />
        </>
    )
}
