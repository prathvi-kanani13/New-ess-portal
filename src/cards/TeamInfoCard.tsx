import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "../assets/avtar.jpg"

interface HolidayInfo {
  title: string
  date: string
}

interface PolicyInfo {
  title: string
  updated: string
}

interface BirthdayInfo {
  name: string
  role: string
  image: string
}

export default function TeamInfoCard() {
  // Data (could be fetched or dynamic later)
  const birthday: BirthdayInfo = {
    name: "Andrew Jermia",
    role: "IOS Developer",
    image: Image,
  }

  const policy: PolicyInfo = {
    title: "Leave Policy",
    updated: "Today",
  }

  const holiday: HolidayInfo = {
    title: "Diwali",
    date: "15 Sep 2025",
  }

  return (
    <div className="flex flex-col gap-4 w-[420px] h-[448px]">
      {/* Team Birthday */}
      <Card className="shadow-sm bg-[#212529] text-white flex-1 p-6">
        <CardHeader className="text-center">
          <CardTitle>Team Birthday</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center">
          <img
            src={birthday.image}
            alt="birthday"
            className="w-16 h-16 rounded-full mb-2"
          />
          <h3 className="font-semibold text-lg">{birthday.name}</h3>
          <p className="text-sm text-gray-300">{birthday.role}</p>

          <Button className="bg-[#126195] hover:bg-[#0C4B5E] mt-4">
            Send Wishes
          </Button>
        </CardContent>
      </Card>

      {/* Leave Policy */}
      <Card className="shadow-sm bg-[#3B7080] text-white">
        <CardContent className="flex items-center justify-between py-4 px-5">
          <div>
            <p className="font-semibold text-md">{policy.title}</p>
            <p className="text-xs text-gray-100">
              Last Updated : {policy.updated}
            </p>
          </div>

          <Button className="bg-white text-[#202C4B] hover:bg-gray-100 px-4 py-1">
            View All
          </Button>
        </CardContent>
      </Card>

      {/* Next Holiday */}
      <Card className="shadow-sm bg-[#FFC107] text-[#202C4B]">
        <CardContent className="flex items-center justify-between py-4 px-5">
          <div>
            <p className="font-semibold text-md">Next Holiday</p>
            <p className="text-xs">
              {holiday.title}, {holiday.date}
            </p>
          </div>

          <Button className="bg-white text-[#202C4B] hover:bg-gray-100 px-4 py-1">
            View All
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
