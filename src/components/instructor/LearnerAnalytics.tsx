import { useState } from "react"
import { LearnerProgressItem } from "@/data/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  MagnifyingGlass, 
  PaperPlaneTilt, 
  FileArrowDown, 
  CheckCircle, 
  WarningCircle, 
  Sparkle,
  TrendUp
} from "@phosphor-icons/react"

interface LearnerAnalyticsProps {
  learners: LearnerProgressItem[]
}

export function LearnerAnalytics({ learners }: LearnerAnalyticsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDept, setSelectedDept] = useState("all")
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null)

  const departments = [
    { id: "all", label: "All Committees" },
    { id: "Project", label: "Project Management" },
    { id: "Marketing", label: "Marketing & PR" },
    { id: "Technology", label: "Technology & Data" },
    { id: "Finance", label: "Finance & Sponsorship" },
    { id: "Product", label: "Product & Research" }
  ]

  const filteredLearners = learners.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.roleTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = selectedDept === "all" || l.department.toLowerCase().includes(selectedDept.toLowerCase())
    return matchesSearch && matchesDept
  })

  const handleSendReminder = (learner: LearnerProgressItem) => {
    setNotificationMsg(`Sent development milestone reminder email to ${learner.name} (${learner.email}).`)
    setTimeout(() => setNotificationMsg(null), 4000)
  }

  const handleExportReport = () => {
    alert("Extracting Committee Leadership Training Q3 Report (Excel & PDF)... Export complete.")
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Project Leader Progress & Team Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Comprehensive member engagement, milestone KPI completion, and pacing alerts
          </p>
        </div>

        <Button variant="outline" onClick={handleExportReport} className="cursor-pointer">
          <FileArrowDown className="h-4 w-4 mr-1.5 text-blue-700" />
          Export Cohort Report
        </Button>
      </div>

      {notificationMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle weight="fill" className="h-4 w-4 text-emerald-700 shrink-0" />
            <span>{notificationMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotificationMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by leader name, email, or role..."
            className="pl-9 text-xs sm:text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {departments.map((dept) => (
            <button
              key={dept.id}
              type="button"
              onClick={() => setSelectedDept(dept.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedDept === dept.id
                  ? 'bg-blue-700 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
      </div>

      {/* Learners Table Container */}
      <Card className="overflow-hidden border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs">
                <th className="p-4 pl-6">Leader & Role</th>
                <th className="p-4">Committee</th>
                <th className="p-4">Enrolled Tracks</th>
                <th className="p-4">Overall Completion</th>
                <th className="p-4">Avg Score</th>
                <th className="p-4">Pacing Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLearners.map((learner) => (
                <tr key={learner.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={learner.avatar}
                        alt={learner.name}
                        className="h-9 w-9 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">{learner.name}</p>
                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{learner.email}</p>
                        <p className="text-[10px] text-blue-700 mt-0.5">{learner.roleTitle}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-xs text-slate-700 font-medium">
                    {learner.department}
                  </td>

                  <td className="p-4 text-xs text-slate-700">
                    <span className="font-semibold text-slate-900">{learner.completedCourses}</span> / {learner.coursesEnrolled} tracks
                  </td>

                  <td className="p-4 w-48">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-slate-800">{learner.overallProgress}%</span>
                        <span className="text-[10px] text-slate-400">{learner.lastActive}</span>
                      </div>
                      <Progress
                        value={learner.overallProgress}
                        className="h-1.5"
                        indicatorClassName={learner.overallProgress === 100 ? "bg-emerald-600" : undefined}
                      />
                    </div>
                  </td>

                  <td className="p-4 font-mono font-bold text-xs text-slate-900">
                    {learner.scoreAverage} / 100
                  </td>

                  <td className="p-4">
                    {learner.status === 'completed' ? (
                      <Badge variant="success" className="text-[10px]">Completed</Badge>
                    ) : learner.status === 'on-track' ? (
                      <Badge variant="default" className="text-[10px]">On Track</Badge>
                    ) : (
                      <Badge variant="warning" className="text-[10px]">Needs Reminder</Badge>
                    )}
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendReminder(learner)}
                      className="text-xs h-8 cursor-pointer"
                    >
                      <PaperPlaneTilt className="h-3.5 w-3.5 mr-1 text-blue-700" />
                      Send Reminder
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
