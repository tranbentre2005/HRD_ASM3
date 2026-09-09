import { useState } from "react"
import { Course, AssignmentSubmission, LearnerProgressItem } from "@/data/types"
import { CourseManager } from "./CourseManager"
import { GradingCenter } from "./GradingCenter"
import { LearnerAnalytics } from "./LearnerAnalytics"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ChalkboardTeacher, 
  Users, 
  CheckSquare, 
  TrendUp, 
  PencilSimple, 
  BookOpen,
  ArrowRight
} from "@phosphor-icons/react"

interface InstructorDashboardProps {
  courses: Course[]
  submissions: AssignmentSubmission[]
  learners: LearnerProgressItem[]
  onCreateCourse: (course: Course) => void
  onGradeSubmission: (submissionId: string, score: number, feedback: string) => void
  onSelectCourse: (course: Course) => void
}

export function InstructorDashboard({
  courses,
  submissions,
  learners,
  onCreateCourse,
  onGradeSubmission,
  onSelectCourse,
}: InstructorDashboardProps) {
  const [currentTab, setCurrentTab] = useState<'courses' | 'grading' | 'analytics'>('courses')

  const pendingSubmissionsCount = submissions.filter(s => s.status === 'pending').length

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Executive Instructor Hero */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="info">L&D Committee • Leadership Development</Badge>
              <span className="text-xs text-slate-500 font-mono">Role: Lead Facilitator & L&D Head</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Executive Facilitator & L&D Dashboard
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Welcome, MSc. Hoang Le Tram. 142 project leaders are actively enrolled across 4 leadership development tracks. There are {pendingSubmissionsCount} practical submissions waiting for evaluation and coaching feedback.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button onClick={() => setCurrentTab('grading')} className="cursor-pointer">
                <CheckSquare className="h-4 w-4 mr-2" />
                Open Grading Desk ({pendingSubmissionsCount} pending)
              </Button>
              <Button variant="outline" onClick={() => setCurrentTab('analytics')} className="cursor-pointer">
                <Users className="h-4 w-4 mr-2 text-blue-700" />
                Track Member Progress
              </Button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between text-blue-700 mb-1">
                <Users className="h-5 w-5" />
                <span className="text-xs font-bold font-mono">5 Teams</span>
              </div>
              <p className="text-lg font-bold text-slate-900">142 Enrolled</p>
              <p className="text-[11px] text-slate-500">Active Leaders</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between text-emerald-700 mb-1">
                <TrendUp className="h-5 w-5" />
                <span className="text-xs font-bold font-mono">+4.2%</span>
              </div>
              <p className="text-lg font-bold text-slate-900">84.6%</p>
              <p className="text-[11px] text-slate-500">Completion Rate</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between text-amber-700 mb-1">
                <CheckSquare className="h-5 w-5" />
                <span className="text-xs font-bold font-mono text-amber-700">New</span>
              </div>
              <p className="text-lg font-bold text-slate-900">{pendingSubmissionsCount} Tasks</p>
              <p className="text-[11px] text-slate-500">Awaiting Grade</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between text-indigo-700 mb-1">
                <BookOpen className="h-5 w-5" />
                <span className="text-xs font-bold font-mono">{courses.length} Tracks</span>
              </div>
              <p className="text-lg font-bold text-slate-900">89.2 / 100</p>
              <p className="text-[11px] text-slate-500">Quality Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setCurrentTab('courses')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentTab === 'courses'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Curriculum & Modules ({courses.length})
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab('grading')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
            currentTab === 'grading'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Grading & Feedback Desk</span>
          {pendingSubmissionsCount > 0 && (
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              currentTab === 'grading' ? 'bg-white text-blue-900' : 'bg-amber-100 text-amber-900'
            }`}>
              {pendingSubmissionsCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab('analytics')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentTab === 'analytics'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Member Progress & Analytics ({learners.length})
        </button>
      </div>

      {/* Tab Panels */}
      {currentTab === 'courses' && (
        <CourseManager
          courses={courses}
          onCreateCourse={onCreateCourse}
          onSelectCourse={onSelectCourse}
        />
      )}

      {currentTab === 'grading' && (
        <GradingCenter
          submissions={submissions}
          onGradeSubmission={onGradeSubmission}
        />
      )}

      {currentTab === 'analytics' && (
        <LearnerAnalytics
          learners={learners}
        />
      )}
    </div>
  )
}
