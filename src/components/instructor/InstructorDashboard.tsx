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
    <div className="space-y-8 pb-12">
      {/* Executive Instructor Hero */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="info">Bộ phận: Đào tạo & Phát triển Nguồn nhân lực</Badge>
              <span className="text-xs text-slate-500 font-mono">Quyền: Giảng viên & Quản lý L&D</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Bảng Điều Khiển Giảng Viên & Quản Lý Đào Tạo
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Xin chào ThS. Hoàng Lê Trâm. Hiện có 142 nhân sự đang tham gia 4 chương trình đào tạo chuyên môn. Có {pendingSubmissionsCount} bài tập thực hành cần chấm điểm và phê duyệt phản hồi.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button onClick={() => setCurrentTab('grading')} className="cursor-pointer">
                <CheckSquare className="h-4 w-4 mr-2" />
                Vào sổ chấm điểm ({pendingSubmissionsCount} bài chờ)
              </Button>
              <Button variant="outline" onClick={() => setCurrentTab('analytics')} className="cursor-pointer">
                <Users className="h-4 w-4 mr-2 text-blue-700" />
                Theo dõi tiến độ học viên
              </Button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between text-blue-700 mb-1">
                <Users className="h-5 w-5" />
                <span className="text-xs font-bold font-mono">5 Khối</span>
              </div>
              <p className="text-lg font-bold text-slate-900">142 Học viên</p>
              <p className="text-[11px] text-slate-500">Đang theo học</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between text-emerald-700 mb-1">
                <TrendUp className="h-5 w-5" />
                <span className="text-xs font-bold font-mono">+4.2%</span>
              </div>
              <p className="text-lg font-bold text-slate-900">84.6%</p>
              <p className="text-[11px] text-slate-500">Tỷ lệ hoàn thành</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between text-amber-700 mb-1">
                <CheckSquare className="h-5 w-5" />
                <span className="text-xs font-bold font-mono text-amber-700">Mới</span>
              </div>
              <p className="text-lg font-bold text-slate-900">{pendingSubmissionsCount} Bài</p>
              <p className="text-[11px] text-slate-500">Cần chấm điểm</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between text-indigo-700 mb-1">
                <BookOpen className="h-5 w-5" />
                <span className="text-xs font-bold font-mono">{courses.length} Khóa</span>
              </div>
              <p className="text-lg font-bold text-slate-900">89.2 / 100</p>
              <p className="text-[11px] text-slate-500">Đánh giá chất lượng</p>
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
          Khóa học & Giáo trình ({courses.length})
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
          <span>Sổ chấm điểm bài tập</span>
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
          Theo dõi học viên & Báo cáo ({learners.length})
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
