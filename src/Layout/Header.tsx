import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, MessageSquareText, SmilePlus } from "lucide-react"
import UserInfo from "../pages/UserInfo"

export default function Header() {
    return (
        <header className="flex items-center justify-between w-full h-14 bg-white border-b border-gray-200 px-4 shadow-sm">
            {/* Search bar */}
            <div className="flex items-center w-[300px] relative">
                <Input
                    placeholder="Search in HRMS"
                    className="pr-16 text-sm bg-gray-50 focus-visible:ring-1 focus-visible:ring-[#126195] border-gray-200 rounded-md"
                />
                <div className="absolute right-2 top-[4px]">
                    <kbd className="bg-gray-100 text-gray-500 text-[10px] px-[4px] py-[4px] border border-gray-300 rounded">
                        CTRL + /
                    </kbd>
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-md bg-[#E8E9EA] w-9 h-9"
                >
                    <SmilePlus className="w-6 h-6 text-gray-600" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-md bg-[#E8E9EA] w-9 h-9 relative"
                >
                    <MessageSquareText className="w-6 h-6 text-gray-600" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-md bg-[#E8E9EA] w-9 h-9 relative"
                >
                    <Bell className="w-6 h-6 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>

                <div className="w-8 h-8">
                    <UserInfo />
                </div>
            </div>
        </header>
    )
}
