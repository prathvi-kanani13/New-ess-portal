import { Button } from "@/components/ui/button"
import EmployeeInfoCard from "../cards/EmployeeInfoCard"
import AttendanceDetailCard from "../cards/AttendanceDetailCard"
import LeaveDetailCard from "../cards/LeaveDetailCard"
import PerformanceCard from "../cards/PerformanceCard"
import SkillsCard from "../cards/SkillsCard"
import TeamInfoCard from "../cards/TeamInfoCard"
import TeamMemberCard from "../cards/TeamMemberCard"
import NotificationsCard from "../cards/NotificationsCard"
import MeetingsCard from "../cards/MeetingsCard"
import PunchInOutCard from "../cards/PunchInOutCard"
import StatCard from "../cards/StatCard"
import WorkingHoursCard from "../cards/WorkingHoursCard"
import ProjectsCard from "../cards/ProjectsCard"
import TasksCard from "../cards/TasksCard"

export default function Dashboard() {
  return (
    <div className="px-1">

      {/* Header */}
      <div className="flex items-center justify-between py-8">
        <h1 className="text-2xl font-bold text-[#202C4B]">Employee Dashboard</h1>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="text-[#202C4B] text-md border-[#E5E7EB] px-6 py-2 hover:bg-[#F5F7FA]"
          >
            Export
          </Button>
          <Button
            variant="outline"
            className="text-[#202C4B] text-md border-[#E5E7EB] px-6 py-2 hover:bg-[#F5F7FA]"
          >
            2024
          </Button>
        </div>
      </div>

      {/* Login/Logout Notification */}
      <div className="text-sm text-[#3B7080] bg-[#E9EDF4] px-2 py-3">
        Last login: 10 AM
      </div>

      <div className="flex justify-center mt-3 mb-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Employee Info Card */}
          <EmployeeInfoCard />

          {/* Attendance Details Card */}
          <AttendanceDetailCard />

          {/* Leave Details Card */}
          <LeaveDetailCard />

        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Performance Card */}
          <PerformanceCard />

          {/* my skills Card */}
          <SkillsCard />

          {/* birthdays and announcements */}
          <TeamInfoCard />
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Team Members Card */}
          <TeamMemberCard />

          {/* Notifications Card */}
          <NotificationsCard />

          {/* Meetings schedules Card */}
          <MeetingsCard />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* punch in/out */}
          <PunchInOutCard />

          <div className="col-span-3 flex flex-col gap-6">
            {/* stat cards */}
            <StatCard />

            {/* Working Hours Section */}
            <WorkingHoursCard />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">

        {/* Projects */}
        <ProjectsCard />

        {/* Tasks */}
        <TasksCard />
      </div>
    </div>
  )
}
