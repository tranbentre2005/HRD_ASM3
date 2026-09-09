import { useState } from "react"
import { UserRole } from "@/data/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  Compass, 
  ArrowRight, 
  Sparkle, 
  ShieldCheck, 
  Buildings,
  CheckCircle,
  UserCircle
} from "@phosphor-icons/react"
import confetti from "canvas-confetti"

interface LoginGatewayProps {
  onLoginAs: (role: 'learner' | 'instructor', customName?: string) => void
  onExploreOverview: () => void
}

export function LoginGateway({ onLoginAs, onExploreOverview }: LoginGatewayProps) {
  const [activeHover, setActiveHover] = useState<'learner' | 'instructor' | null>(null)
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [selectedRoleForCustom, setSelectedRoleForCustom] = useState<'learner' | 'instructor'>('learner')
  const [customName, setCustomName] = useState('')
  const [studentId, setStudentId] = useState('')

  const handleQuickSelect = (role: 'learner' | 'instructor') => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    })
    onLoginAs(role)
  }

  const handleCustomLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalName = customName.trim() || (selectedRoleForCustom === 'learner' ? 'Nguyễn Minh Tuấn' : 'ThS. Hoàng Lê Trâm')
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    })
    onLoginAs(selectedRoleForCustom, finalName)
  }

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col justify-between py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle Background Accent Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-linear-to-b from-blue-100/40 via-blue-50/20 to-transparent pointer-events-none -z-10" />

      {/* Top Club Identity Bar */}
      <div className="max-w-6xl w-full mx-auto flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-950 text-white font-bold shadow-sm">
            <Buildings weight="duotone" className="h-6 w-6 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                RMIT FINANCE CLUB
              </span>
              <span className="rounded bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5">
                RFC
              </span>
            </div>
            <p className="text-xs text-slate-500">Student Leadership & Capability Development Initiative</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onExploreOverview}
            className="text-xs cursor-pointer text-slate-600 hover:text-slate-900"
          >
            <Compass className="h-4 w-4 mr-1.5 text-blue-700" />
            <span>Xem giới thiệu nền tảng</span>
          </Button>
        </div>
      </div>

      {/* Main Welcome Hero Container */}
      <div className="max-w-5xl w-full mx-auto my-auto py-8 space-y-8 text-center">
        {/* Banner and Headlines */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Leadership Portal 2026</span>
            <span className="text-slate-400">•</span>
            <span>Hệ thống Đào tạo Trưởng Dự án</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Welcome to RMIT FINANCE CLUB PROJECT LEADER LEARNING HUB !
          </h1>

          <div className="pt-2">
            <p className="text-base sm:text-lg font-bold text-slate-800 uppercase tracking-widest text-blue-700">
              You are:
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
              Vui lòng chọn vai trò của bạn bên dưới để truy cập trực tiếp vào không gian đào tạo và quản lý tương ứng
            </p>
          </div>
        </div>

        {/* Dual Role Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          {/* Card 1: Learners */}
          <Card
            onMouseEnter={() => setActiveHover('learner')}
            onMouseLeave={() => setActiveHover(null)}
            className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
              activeHover === 'learner'
                ? 'border-blue-600 shadow-xl ring-2 ring-blue-600/30 -translate-y-1 bg-white'
                : 'border-slate-200 bg-white shadow-sm hover:border-blue-300'
            }`}
            onClick={() => handleQuickSelect('learner')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <GraduationCap weight="duotone" className="h-8 w-8" />
                </div>
                <Badge variant="default" className="bg-blue-700 text-white font-semibold">
                  Học viên
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Learners
                </h3>
                <p className="text-xs font-semibold text-blue-700 mt-0.5">
                  Project Leaders & Executive Committee Trainees
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Dành cho các Trưởng dự án, Phó ban và Thành viên Ban điều hành tham gia lộ trình nâng cao năng lực quản trị, giao tiếp và điều phối dự án thực tế.
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Tham gia bài giảng video, slide lý thuyết và tài liệu mẫu</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Làm quiz trắc nghiệm và thực hành kịch bản phản hồi SBI</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Theo dõi khung năng lực cá nhân và nhận chứng chỉ hoàn thành</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Học viên đại diện:</span>
                <span className="font-semibold text-slate-800">Nguyễn Minh Tuấn (Lead Q3)</span>
              </div>

              <Button
                className="w-full justify-between group-hover:bg-blue-800 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  handleQuickSelect('learner')
                }}
              >
                <span>Đăng nhập với vai trò Learners</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>

          {/* Card 2: Trainers/Facilitators */}
          <Card
            onMouseEnter={() => setActiveHover('instructor')}
            onMouseLeave={() => setActiveHover(null)}
            className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
              activeHover === 'instructor'
                ? 'border-emerald-600 shadow-xl ring-2 ring-emerald-600/30 -translate-y-1 bg-white'
                : 'border-slate-200 bg-white shadow-sm hover:border-emerald-300'
            }`}
            onClick={() => handleQuickSelect('instructor')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                  <ChalkboardTeacher weight="duotone" className="h-8 w-8" />
                </div>
                <Badge variant="success">Giảng viên</Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Trainers/Facilitators
                </h3>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                  Project Mentors, Coaches & L&D Committee Leads
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Dành cho Ban Cố vấn, Trưởng ban Đào tạo và Huấn luyện viên dự án giám sát kết quả đào tạo, chấm điểm và phản hồi bài tập thực hành.
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Quản lý danh mục khóa học, tạo và biên tập bài giảng mới</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Sổ chấm điểm bài tập SBI, xếp loại học lực và gửi nhận xét</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Theo dõi tiến độ học viên theo ban và gửi email nhắc nhở</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Giảng viên phụ trách:</span>
                <span className="font-semibold text-slate-800">ThS. Hoàng Lê Trâm (Senior Advisor)</span>
              </div>

              <Button
                variant="outline"
                className="w-full justify-between border-slate-300 text-slate-800 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  handleQuickSelect('instructor')
                }}
              >
                <span>Đăng nhập với vai trò Trainers/Facilitators</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Customized Name Entry Option */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setShowCustomModal(!showCustomModal)}
            className="text-xs text-slate-500 hover:text-blue-700 underline underline-offset-4 font-medium transition-colors cursor-pointer"
          >
            Tùy chọn: Nhập họ tên hoặc mã sinh viên riêng để thử nghiệm
          </button>

          {showCustomModal && (
            <form
              onSubmit={handleCustomLoginSubmit}
              className="mt-4 max-w-md mx-auto p-4 rounded-xl border border-slate-200 bg-white shadow-md text-left space-y-3 animate-in fade-in-50"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900">Tùy chỉnh thông tin người dùng</span>
                <span className="text-[10px] text-slate-400">Không cần mật khẩu</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Chọn vai trò:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRoleForCustom('learner')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                      selectedRoleForCustom === 'learner'
                        ? 'bg-blue-50 border-blue-600 text-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Learners
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRoleForCustom('instructor')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                      selectedRoleForCustom === 'instructor'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Trainers/Facilitators
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Họ và tên hiển thị:
                </label>
                <Input
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={selectedRoleForCustom === 'learner' ? 'VD: Trần Gia Bảo' : 'VD: TS. Nguyễn Văn A'}
                  className="text-xs h-9"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Mã sinh viên / Staff ID (tùy chọn):
                </label>
                <Input
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="VD: s3982104"
                  className="text-xs h-9 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCustomModal(false)}
                  className="text-xs"
                >
                  Hủy
                </Button>
                <Button type="submit" size="sm" className="text-xs">
                  Xác nhận vào hệ thống
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer System Status */}
      <div className="max-w-6xl w-full mx-auto pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Hệ thống sẵn sàng: 100% Client Session State (Không cần cơ sở dữ liệu)</span>
        </div>
        <div>
          <span>RMIT Vietnam Finance Club • ASM3 Project Leadership Platform</span>
        </div>
      </div>
    </div>
  )
}
