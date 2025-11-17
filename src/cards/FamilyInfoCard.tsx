import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"
import EditFamilyDialog from "../Dialogs/EditFamilyDialog"

export default function FamilyInfoCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const [familyMembers, setFamilyMembers] = useState([
    [
      { label: "Name", value: "John Doe" },
      { label: "Date of Birth", value: "01/01/1990" },
      { label: "Gender", value: "Male" },
      { label: "Relation", value: "Brother" },
      { label: "Phone", value: "123-456-7890" },
    ],
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
      const updatedMembers = [...familyMembers]
      updatedMembers[activeIndex] = updatedFields
      setFamilyMembers(updatedMembers)
    } else {
      setFamilyMembers((prev) => [...prev, updatedFields])
    }

    setShowDialog(false)
  }

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
            className="absolute left-0 right-0 bg-white border-t border-gray-200 px-4 shadow-md z-10"
            style={{ top: "100%" }}
          >
            <div className="text-sm text-gray-700">
              {/* Header row */}
              <div className="flex font-semibold text-gray-500">
                {familyMembers[0].map((field) => (
                  <div key={field.label} className="flex-1 py-2 border-b">
                    {field.label}
                  </div>
                ))}
                <div className="w-6"></div> {/* Space for edit icon */}
              </div>

              {/* Data rows */}
              {familyMembers.map((member, index) => (
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

      <EditFamilyDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        fields={
          activeIndex !== null
            ? familyMembers[activeIndex]
            : familyMembers[0].map(f => ({ ...f, value: "" }))
        }
        onSave={handleSave}
      />
    </>
  )
}
