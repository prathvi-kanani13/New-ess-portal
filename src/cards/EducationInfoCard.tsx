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
    const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null)
    const toggleDropdown = () => setIsOpen((prev) => !prev)

    const educationData: EducationItem[] = [
        {
            id: 1,
            color: "#22C55E",
            institution: "Oxford University",
            course: "Computer Science",
            years: "2020 - 2022",
        },
        {
            id: 2,
            color: "#F97316",
            institution: "Cambridge University",
            course: "Computer Network & Systems",
            years: "2016 - 2019",
        },
        {
            id: 3,
            color: "#FB923C",
            institution: "Oxford School",
            course: "Grade X",
            years: "2012 - 2016",
        },
    ]

    const openEdit = (e: React.MouseEvent, item: EducationItem) => {
        e.stopPropagation()
        setSelectedItem(item)
    }

    const openAdd = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedItem({
            id: Date.now(),
            color: "",
            institution: "",
            course: "",
            years: "",
        })
    }

    return (
        <>
            <Card className="relative rounded-sm cursor-pointer" onClick={toggleDropdown}>
                <div className="flex justify-between items-center px-4 py-4">
                    <h4 className="font-bold text-lg text-[#202C4B]">Education Details</h4>

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
                            {educationData.map((edu) => (
                                <div key={edu.id} className="flex justify-between items-start">

                                    <div className="flex items-start gap-2">
                                        <span
                                            className="w-2.5 h-2.5 mt-1 rounded-full"
                                            style={{ backgroundColor: edu.color }}
                                        ></span>

                                        <div>
                                            <p className="text-[14px] text-gray-500">{edu.institution}</p>
                                            <p className="font-semibold text-[#202C4B]">{edu.course}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <p className="text-gray-500 text-sm whitespace-nowrap">{edu.years}</p>

                                        <Edit
                                            size={18}
                                            className="text-gray-500 cursor-pointer hover:text-[#126195]"
                                            onClick={(e) => openEdit(e, edu)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            <EditEducationDialog
                open={!!selectedItem}
                onOpenChange={(open) => !open && setSelectedItem(null)}
                fields={selectedItem
                    ? [
                        { name: "institution", label: "Institution", value: selectedItem.institution },
                        { name: "course", label: "Course", value: selectedItem.course },
                        { name: "years", label: "Years", value: selectedItem.years },
                    ]
                    : []
                }
            />
        </>
    )
}
