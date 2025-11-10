import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import SidebarSection from "./SidebarSection"
import logo from "@/assets/easylogo.png"

export default function Sidebar() {
  const [openItems, setOpenItems] = useState<string[]>([
    "dashboard",
    "personal",
    "organization",
  ])

  const handleToggle = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value) // close if open
        : [...prev, value] // open if closed
    )
  }

  return (
    <div className="w-64 h-screen bg-white border-r shadow-sm flex flex-col">
      <div className="flex justify-center items-center p-4">
        <img src={logo} alt="Easy Paypack" className="w-48 h-auto" />
      </div>

      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="px-3 mt-3 text-sm"
      >
        <AccordionItem value="dashboard" className="mb-3">
          <AccordionTrigger
            onClick={() => handleToggle("dashboard")}
            className="flex justify-between items-center py-2 hover:bg-gray-50 rounded-md px-2"
          >
            <div className="flex items-center gap-2 text-lg font-semibold">
              Dashboard
              <Badge
                variant="secondary"
                className="bg-green-600 text-white text-[10px] px-1.5 py-0 rounded-sm"
              >
                NEW
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SidebarSection
              items={[{ label: "Employee Dashboard", href: "/employee-dashboard" }]}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="personal" className="mb-3">
          <AccordionTrigger
            onClick={() => handleToggle("personal")}
            className="py-2 hover:bg-gray-50 rounded-md px-2 text-lg font-semibold"
          >
            Personal Details
          </AccordionTrigger>
          <AccordionContent>
            <SidebarSection
              items={[{ label: "Detail Profile", href: "/detail-profile" }]}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="organization">
          <AccordionTrigger
            onClick={() => handleToggle("organization")}
            className="py-2 hover:bg-gray-50 rounded-md px-2 text-lg font-semibold"
          >
            Organization
          </AccordionTrigger>
          <AccordionContent>
            <SidebarSection
              items={[
                { label: "Leave Application", href: "/leave-application" },
                { label: "PMS", href: "/pms" },
                { label: "Work Logs", href: "/work-logs" },
                { label: "Pay Slip", href: "/pay-slip" },
                { label: "Attendance", href: "/attendance" },
                { label: "Company Policy", href: "/company-policy" },
                { label: "Attendance Regulation", href: "/attendance-regulation" },
                { label: "Change Password", href: "/change-password" },
                { label: "Request WFM", href: "/request-wfm" },
              ]}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
