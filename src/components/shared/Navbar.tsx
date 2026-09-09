import { useState } from "react"
import { UserRole } from "@/data/types"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  Compass, 
  Bell, 
  CheckCircle,
  Sparkle,
  BookOpen
} from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"

interface NavbarProps {
  currentRole: UserRole
  onRoleChange: (role: UserRole) => void
  unreadCount?: number
}

export function Navbar({ currentRole, onRoleChange, unreadCount = 2 }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium text-slate-100">Hệ thống Đào tạo & Phát triển Nhân lực HRD</span>
            <span className="hidden sm:inline text-slate-400">- Phiên bản thử nghiệm tương tác hai quyền</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-xs">
            <span>Không cần đăng nhập, chuyển vai trò tức thì:</span>
            <button
              onClick={() => onRoleChange('learner')}
              className={`hover:text-white transition-colors cursor-pointer underline-offset-2 ${
                currentRole === 'learner' ? 'text-blue-300 font-semibold underline' : ''
              }`}
            >
              Người học
            </button>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => onRoleChange('instructor')}
              className={`hover:text-white transition-colors cursor-pointer underline-offset-2 ${
                currentRole === 'instructor' ? 'text-blue-300 font-semibold underline' : ''
              }`}
            >
              Người dạy
            </button>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => onRoleChange('overview')}
              className={`hover:text-white transition-colors cursor-pointer underline-offset-2 ${
                currentRole === 'overview' ? 'text-blue-300 font-semibold underline' : ''
              }`}
            >
              Tổng quan
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm font-bold text-lg">
            <BookOpen weight="duotone" className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">TalentCore HRD</span>
              <span className="hidden md:inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                ASM3
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Nền tảng Đào tạo Nội bộ & Phát triển Kỹ năng</p>
          </div>
        </div>

        {/* Center: Role Switcher Selector */}
        <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
          <button
            type="button"
            onClick={() => onRoleChange('learner')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
              currentRole === 'learner'
                ? 'bg-white text-blue-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap weight={currentRole === 'learner' ? 'fill' : 'regular'} className="h-4 w-4" />
            <span>Người học</span>
            {currentRole === 'learner' && (
              <span className="hidden lg:inline-flex text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700">
                Học viên
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onRoleChange('instructor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
              currentRole === 'instructor'
                ? 'bg-white text-blue-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ChalkboardTeacher weight={currentRole === 'instructor' ? 'fill' : 'regular'} className="h-4 w-4" />
            <span>Người dạy</span>
            {currentRole === 'instructor' && (
              <span className="hidden lg:inline-flex text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700">
                Giảng viên
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onRoleChange('overview')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
              currentRole === 'overview'
                ? 'bg-white text-blue-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass weight={currentRole === 'overview' ? 'fill' : 'regular'} className="h-4 w-4" />
            <span className="hidden sm:inline">Tổng quan</span>
          </button>
        </div>

        {/* Right: Notifications & Current Role Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Thông báo hệ thống"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-xl z-50 animate-in fade-in-50 slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-semibold text-sm text-slate-900">Thông báo mới</span>
                  <Badge variant="secondary" className="text-[10px]">2 chưa đọc</Badge>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2.5">
                    <p className="font-medium text-slate-800">Bài tập HRD-102 đã được chấm điểm</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Giảng viên Hoàng Lê Trâm đã gửi nhận xét cho kịch bản phản hồi SBI của bạn.</p>
                    <span className="text-[10px] text-blue-600 font-medium">10 phút trước</span>
                  </div>
                  <div className="py-2.5">
                    <p className="font-medium text-slate-800">Nhắc nhở hạn nộp bài kiểm tra</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Khóa học Ứng dụng AI trong Nhân sự có hạn nộp bài vào cuối tuần này.</p>
                    <span className="text-[10px] text-amber-600 font-medium">Hôm nay</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active User Card representation based on role */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            {currentRole === 'learner' ? (
              <>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Nguyễn Minh Tuấn"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-600/20"
                />
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">Nguyễn Minh Tuấn</p>
                  <p className="text-[11px] text-slate-500 leading-tight">Học viên - Ban Nhân sự</p>
                </div>
              </>
            ) : currentRole === 'instructor' ? (
              <>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="ThS. Hoàng Lê Trâm"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-600/20"
                />
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">ThS. Hoàng Lê Trâm</p>
                  <p className="text-[11px] text-emerald-700 font-medium leading-tight">Giảng viên / Head of L&D</p>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                  <Sparkle className="h-4 w-4" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">Chế độ Demo</p>
                  <p className="text-[11px] text-slate-500 leading-tight">Khảo sát toàn diện</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
