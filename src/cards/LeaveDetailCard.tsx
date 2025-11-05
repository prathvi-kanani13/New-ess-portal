import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddLeaveDialog } from "../Dialogs/AddLeaveDialog"

interface LeaveDetail {
  label: string
  value: string | number
}

const leaveDetails: LeaveDetail[] = [
  { label: "Total Leaves", value: 16 },
  { label: "Taken", value: 10 },
  { label: "Absent", value: 2 },
  { label: "Request", value: 0 },
  { label: "Worked Days", value: 240 },
  { label: "Loss of Pay", value: 2 },
]

export default function LeaveDetailCard() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card className="shadow-sm w-[420px] h-[345px] border border-[#E5E7EB] rounded-md">
        <CardHeader className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <CardTitle className="text-[#202C4B] text-lg font-semibold">
            Leave Details
          </CardTitle>
          <Button
            variant="outline"
            className="text-[#202C4B] text-md border-[#E5E7EB] px-6 py-2 hover:bg-[#F5F7FA]"
          >
            2024
          </Button>
        </CardHeader>

        <CardContent className="space-y-2 text-md px-4">
          <div className="grid grid-cols-2 gap-3 text-md px-2">
            {leaveDetails.map((item) => (
              <div key={item.label} className="flex flex-col items-start">
                <p className="font-semibold text-[#6B7280]">{item.label}</p>
                <p className="font-semibold text-[#202C4B]">{item.value}</p>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="w-full bg-[#212529] hover:bg-[#1A2440] text-white mt-3"
          >
            Apply New Leave
          </Button>
        </CardContent>
      </Card>

      <AddLeaveDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
