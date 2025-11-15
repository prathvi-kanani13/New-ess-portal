import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"
import EditFamilyDialog from "../Dialogs/EditFamilyDialog"

export default function FamilyInfoCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogFields, setDialogFields] = useState<any[]>([])

  const toggleDropdown = () => setIsOpen((prev) => !prev)

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDialogFields(fields)
    setShowDialog(true)
  }

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDialogFields(
      fields.map(f => ({ label: f.label, value: "" }))
    )
    setShowDialog(true)
  }

  const fields = [
    { label: "Name", value: "John Doe" },
    { label: "Relation", value: "Brother" },
    { label: "Date of Birth", value: "01/01/1990" },
    { label: "Phone", value: "123-456-7890" },
  ]

  return (
    <>
      <Card className="relative rounded-sm cursor-pointer" onClick={toggleDropdown}>
        <div className="flex justify-between items-center px-4 py-4">
          <h4 className="font-bold text-lg text-[#202C4B]">Family Information</h4>

          <Plus
            className="text-[#6B7280] hover:text-[#126195] cursor-pointer"
            size={20}
            onClick={handleAddClick}
          />
        </div>

        {isOpen && (
          <div
            className="absolute left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-md z-10"
            style={{ top: "100%" }}
          >
            <div className="flex items-center justify-between text-sm text-gray-700">
              {fields.map((field) => (
                <div key={field.label}>
                  <p className="text-gray-500">{field.label}</p>
                  <p className="font-semibold text-[#202C4B]">{field.value}</p>
                </div>
              ))}
              <Edit
                className="text-gray-500 cursor-pointer hover:text-[#126195]"
                size={18}
                onClick={handleEditClick}
              />
            </div>
          </div>
        )}
      </Card>

      <EditFamilyDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        fields={dialogFields}
      />
    </>
  )
}
