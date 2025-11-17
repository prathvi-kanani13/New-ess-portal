import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"
import EditKycDialog from "../Dialogs/EditKycCard"

export interface kycItem {
    id: number
    documentName: string
    documentType: string
    year: string
}

export default function KycCard() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<kycItem | null>(null)
    const toggleDropdown = () => setIsOpen((prev) => !prev)

    const kycData: kycItem[] = [
        {
            id: 1,
            documentName: "Aadhar Card",
            documentType: "Government ID",
            year: "2020 - 2022",
        },
        {
            id: 2,
            documentName: "PAN Card",
            documentType: "Government ID",
            year: "2026 - 2029",
        },
        {
            id: 3,
            documentName: "Voter ID",
            documentType: "Government ID",
            year: "2022 - 2025",
        },
    ]

    const openEdit = (e: React.MouseEvent, item: kycItem) => {
        e.stopPropagation()
        setSelectedItem(item)
    }

    const openAdd = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedItem({
            id: Date.now(),
            documentName: "",
            documentType: "",
            year: "",
        })
    }

    return (
        <>
            <Card className="relative rounded-sm cursor-pointer" onClick={toggleDropdown}>
                <div className="flex justify-between items-center px-4 py-4">
                    <h4 className="font-bold text-lg text-[#202C4B]">KYC</h4>

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
                            {kycData.map((kyc) => (
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
                                            onClick={(e) => openEdit(e, kyc)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card>

            <EditKycDialog
                open={!!selectedItem}
                onOpenChange={(open) => !open && setSelectedItem(null)}
                fields={selectedItem
                    ? [
                        { name: "documentName", label: "Document Name", value: selectedItem.documentName },
                        { name: "documentType", label: "Document Type", value: selectedItem.documentType },
                        { name: "year", label: "Year", value: selectedItem.year },
                    ]
                    : []
                }
            />
        </>
    )
}
