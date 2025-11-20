import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"
import EditKycDialog from "../Dialogs/EditKycDialog"

export interface KycItem {
    id: number
    documentName: string
    documentType: string
    year: string
}

export default function KycCard() {
    const [isOpen, setIsOpen] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const [kycData, setKycData] = useState<KycItem[]>([
        { id: 1, documentName: "Aadhar Card", documentType: "Government ID", year: "2020 - 2022" },
        { id: 2, documentName: "PAN Card", documentType: "Government ID", year: "2026 - 2029" },
        { id: 3, documentName: "Voter ID", documentType: "Government ID", year: "2022 - 2025" },
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
        const updatedItem: KycItem = {
            id: activeIndex !== null ? kycData[activeIndex].id : Date.now(),
            documentName: updatedFields.find(f => f.name === "documentName")?.value || "",
            documentType: updatedFields.find(f => f.name === "documentType")?.value || "",
            year: updatedFields.find(f => f.name === "year")?.value || "",
        }

        if (activeIndex !== null) {
            const updated = [...kycData]
            updated[activeIndex] = updatedItem
            setKycData(updated)
        } else {
            setKycData(prev => [...prev, updatedItem])
        }

        setShowDialog(false)
    }

    return (
        <>
            <Card className="relative rounded-sm cursor-pointer" onClick={toggleDropdown}>
                <div className="flex justify-between items-center px-4 py-4">
                    <h4 className="font-bold text-lg text-[#202C4B]">KYC</h4>

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
                            {kycData.map((kyc, index) => (
                                <div key={kyc.id} className="flex justify-between items-start">

                                    <div className="flex items-start gap-2">
                                        <div>
                                            <p className="text-[14px] text-gray-500">{kyc.documentName}</p>
                                            <p className="font-semibold text-[#202C4B]">{kyc.documentType}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <p className="text-gray-500 text-sm whitespace-nowrap">{kyc.year}</p>

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

            <EditKycDialog
                open={showDialog}
                onOpenChange={setShowDialog}
                fields={
                    activeIndex !== null
                        ? [
                            { name: "documentName", label: "Document Name", value: kycData[activeIndex].documentName },
                            { name: "documentType", label: "Document Type", value: kycData[activeIndex].documentType },
                            { name: "year", label: "Year", value: kycData[activeIndex].year },
                        ]
                        : [
                            { name: "documentName", label: "Document Name", value: "" },
                            { name: "documentType", label: "Document Type", value: "" },
                            { name: "year", label: "Year", value: "" },
                        ]
                }
                onSave={handleSave}
            />
        </>
    )
}
