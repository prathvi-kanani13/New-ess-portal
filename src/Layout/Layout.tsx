import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 bg-[#F5F7FA] overflow-y-auto px-4 h-screen overflow-y-auto no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
