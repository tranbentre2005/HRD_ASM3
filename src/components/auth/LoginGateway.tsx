import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  ArrowRight, 
  Buildings,
  CheckCircle,
  Compass
} from "@phosphor-icons/react"
import confetti from "canvas-confetti"

interface LoginGatewayProps {
  onLoginAs: (role: 'learner' | 'instructor') => void
  onExploreOverview: () => void
}

export function LoginGateway({ onLoginAs, onExploreOverview }: LoginGatewayProps) {
  const [selectedRole, setSelectedRole] = useState<'learner' | 'instructor' | null>(null)

  const handleSelectRole = (role: 'learner' | 'instructor') => {
    setSelectedRole(role)
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    })
    setTimeout(() => {
      onLoginAs(role)
    }, 150)
  }

  return (
    <div className="min-h-[100dvh] bg-linear-to-b from-slate-50 via-white to-slate-100 flex flex-col justify-between py-6 px-4 sm:px-6">
      {/* Top Club Identity Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-white font-bold shadow-xs">
            <Buildings weight="duotone" className="h-6 w-6 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">
                RMIT FINANCE CLUB
              </span>
              <span className="rounded bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5">
                RFC
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Student Leadership & Capability Hub</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onExploreOverview}
          className="text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <Compass className="h-4 w-4 mr-1 text-blue-700" />
          <span>Tổng quan đề tài ASM3</span>
        </Button>
      </header>

      {/* Main Focus Center Section */}
      <main className="max-w-4xl w-full mx-auto my-auto py-8 text-center space-y-8">
        {/* Main Headline Block */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Project Leader Capability Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-3xl mx-auto">
            Welcome to RMIT FINANCE CLUB PROJECT LEADER LEARNING HUB !
          </h1>

          <div className="pt-2">
            <p className="text-lg sm:text-xl font-extrabold text-blue-700 tracking-wide uppercase">
              You are
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Chọn vai trò của bạn để chuyển tiếp trực tiếp vào không gian làm việc
            </p>
          </div>
        </div>

        {/* The Two Direct Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Choice 1: Learners */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleSelectRole('learner')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleSelectRole('learner')
            }}
            className="group relative rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-600 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                  <GraduationCap weight="duotone" className="h-8 w-8" />
                </div>
                <Badge variant="default" className="bg-blue-700 text-white font-semibold">
                  Người học
                </Badge>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Learners
                </h2>
                <p className="text-xs font-semibold text-blue-600 mt-1">
                  Project Leaders & Executive Committee Trainees
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Không gian dành cho Trưởng ban, Phó ban và Trưởng dự án RFC học tập các kỹ năng lãnh đạo, giao tiếp SBI và quản trị hiệu suất.
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Xem video bài giảng & tài liệu chuyên sâu</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Làm quiz trắc nghiệm & nộp bài tập thực hành</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Theo dõi khung năng lực & nhận chứng chỉ LMS</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Button
                type="button"
                className="w-full justify-between h-11 text-sm font-semibold bg-blue-700 hover:bg-blue-800 text-white group-hover:shadow-md cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectRole('learner')
                }}
              >
                <span>Vào giao diện Learners</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Choice 2: Trainers/Facilitators */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleSelectRole('instructor')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleSelectRole('instructor')
            }}
            className="group relative rounded-2xl border-2 border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-600 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors shadow-xs">
                  <ChalkboardTeacher weight="duotone" className="h-8 w-8" />
                </div>
                <Badge variant="success" className="bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold">
                  Người dạy
                </Badge>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Trainers/Facilitators
                </h2>
                <p className="text-xs font-semibold text-emerald-700 mt-1">
                  Club Mentors, Advisory Board & Capability Coaches
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Không gian dành cho Ban Cố vấn, Giảng viên và Ban Đào tạo dự án theo dõi tiến độ, chấm điểm bài tập và hỗ trợ các trưởng dự án.
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Quản lý giáo trình & tạo khóa đào tạo mới</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Sổ chấm điểm bài tập thực hành & gửi nhận xét</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Theo dõi tỷ lệ hoàn thành & gửi email nhắc nhở</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Button
                type="button"
                className="w-full justify-between h-11 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white group-hover:shadow-md cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectRole('instructor')
                }}
              >
                <span>Vào giao diện Trainers/Facilitators</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Helper Note */}
        <p className="text-xs text-slate-400">
          Chỉ cần click vào thẻ bạn muốn để chuyển tiếp tức thì mà không cần nhập mật khẩu.
        </p>
      </main>

      {/* Footer Identity */}
      <footer className="max-w-6xl w-full mx-auto pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Phiên bản thử nghiệm tương tác 2 quyền không cần cơ sở dữ liệu</span>
        </div>
        <p>RMIT Finance Club (RFC) • HRD Assignment 3</p>
      </footer>
    </div>
  )
}
