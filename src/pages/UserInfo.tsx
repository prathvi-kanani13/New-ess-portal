import Image from "../assets/avtar.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { User, Settings, CircleDot, LogOut, Book, UserCog, type LucideIcon } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

type MenuItem = {
  label: string;
  icon: LucideIcon;
  action: () => void;
  isDanger?: boolean;
};

export default function UserInfo() {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems: MenuItem[] = [
    { label: "Profile", icon: User, action: () => navigate("/profile") },
    { label: "Settings", icon: Settings, action: () => console.log("Settings clicked") },
    { label: "Status", icon: CircleDot, action: () => console.log("Status clicked") },
    { label: "My Account", icon: UserCog, action: () => console.log("Status clicked") },
    { label: "Knowledge Base", icon: Book, action: () => console.log("Status clicked") },
    { label: "Logout", icon: LogOut, action: logout, isDanger: true },
  ];

  const user = {
    name: "Parthvi Kanani",
    email: "parthvi@example.com",
    image: Image,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src={Image} alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[215px] mt-4" align="end">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="w-12 h-12 border-2 border-gray-300">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-sm">{user.name}</span>
            <span className="text-xs font-semibold">{user.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />

        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.action}
            className={`flex items-center font-semibold text-sm gap-3 ${item.isDanger ? "text-red-600 focus:text-red-600" : ""
              }`}
          >
            <item.icon size={18} className="text-gray-700" />
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

  );
}
