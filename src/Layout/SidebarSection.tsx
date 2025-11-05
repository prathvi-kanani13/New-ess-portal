import { Link, useLocation } from "react-router-dom"

interface SidebarItem {
  label: string
  href: string
}

interface SidebarSectionProps {
  items: SidebarItem[]
}

export default function SidebarSection({ items }: SidebarSectionProps) {
  const location = useLocation()

  return (
    <div className="ml-4 mt-1 pl-3">
      {items.map((item) => {
        const isActive = location.pathname === item.href

        return (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-2 text-[16px] font-medium py-[6px] px-2 leading-relaxed 
              ${isActive
                ? "bg-[#E8E9EA] text-[#126195] rounded-sm"
                : "text-[#126195] hover:text-gray-500 hover:bg-gray-50"
              }`}
          >
            <div className="w-[2px] h-5 bg-[#126195]"></div>
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
