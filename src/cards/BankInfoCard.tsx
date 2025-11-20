import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"
import EditBankDialog from "../Dialogs/EditBankDialog"

export default function BankInfoCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const [bankInfo, setBankInfo] = useState([
    [
      { label: "Bank Name", value: "HDFC" },
      { label: "Bank Account Number", value: "XXXX 5567" },
      { label: "IFSC Code", value: "HDFC0001123" },
      { label: "Branch", value: "Andheri West" },
      { label: "Person name in bank", value: "John Doe" },
    ]
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
    if (activeIndex !== null) {
      const updated = [...bankInfo]
      updated[activeIndex] = updatedFields
      setBankInfo(updated)
    } else {
      setBankInfo((prev) => [...prev, updatedFields])
    }
    setShowDialog(false)
  }

  return (
    <>
      <Card className="relative rounded-sm cursor-pointer" onClick={toggleDropdown}>
        <div className="flex justify-between items-center px-4 py-4">
          <h4 className="font-bold text-lg text-[#202C4B]">Bank Information</h4>

          <Plus
            className="text-[#6B7280] hover:text-[#126195] cursor-pointer"
            size={20}
            onClick={handleAddClick}
          />
        </div>

        {isOpen && (
          <div
            className="absolute left-0 right-0 bg-white border-t border-gray-200 px-4 shadow-md z-10"
            style={{ top: "100%" }}
          >
            <div className="text-sm text-gray-700">
              {/* Header row */}
              <div className="flex font-semibold text-gray-500 border-b">
                {bankInfo[0].map((field) => (
                  <div key={field.label} className="flex-1 py-2">
                    {field.label}
                  </div>
                ))}
                <div className="w-6"></div> {/* Space for edit icon */}
              </div>

              {/* Data rows */}
              {bankInfo.map((member, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center"
                >
                  {member.map((field) => (
                    <div key={field.label} className="flex-1 py-2">
                      <p className="font-semibold text-[#202C4B]">{field.value}</p>
                    </div>
                  ))}

                  <Edit
                    className="text-gray-500 cursor-pointer hover:text-[#126195]"
                    size={18}
                    onClick={(e) => handleEditClick(index, e)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      <EditBankDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        fields={
          activeIndex !== null
            ? bankInfo[activeIndex]
            : bankInfo[0].map(f => ({ ...f, value: "" }))
        }
        onSave={handleSave}
      />
    </>
  )
}

