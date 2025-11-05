import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Image from "../assets/avtar.jpg"

interface EmployeeInfo {
  label: string
  value: string
}

const employeeInfo: EmployeeInfo[] = [
  { label: "Phone Number", value: "+1 324 3453 545" },
  { label: "Email Address", value: "Steperde124@example.com" },
  { label: "Report Office", value: "Doglas Martini" },
  { label: "Joined on", value: "15 Jan 2024" },
]

export default function EmployeeInfoCard() {
  return (
    <Card className="shadow-sm w-[510px] h-[345px] border border-[#E5E7EB] rounded-md">
      <CardHeader className="bg-[#212529] text-white rounded-t-md px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={Image}
              alt="User profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Jiya Sharma</h2>
            <p className="text-sm">Senior Product Designer</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 text-sm text-gray-700 px-6 py-4">
        {employeeInfo.map((item) => (
          <div key={item.label}>
            <p className="font-medium text-[#6B7280]">{item.label}</p>
            <p className="text-[#111827] font-normal">{item.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
