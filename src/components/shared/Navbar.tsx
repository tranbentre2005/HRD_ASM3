import { useState } from "react"
import { UserRole } from "@/data/types"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  Compass, 
  Bell, 
  SignOut,
  Sparkle
} from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  currentRole: UserRole
  onRoleChange: (role: UserRole) => void
  onLogout: () => void
  userName?: string
  unreadCount?: number
}

export function Navbar({ currentRole, onRoleChange, onLogout, userName, unreadCount = 2 }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-slate-100">RMIT FINANCE CLUB (RFC)</span>
            <span className="text-slate-400">• Project Leader Learning Hub</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-xs">
            <span className="hidden sm:inline text-slate-400">Quick Switch:</span>
            <button
              type="button"
              onClick={() => onRoleChange('learner')}
              className={`hover:text-white transition-colors cursor-pointer underline-offset-2 ${
                currentRole === 'learner' ? 'text-blue-300 font-semibold underline' : ''
              }`}
            >
              Learners
            </button>
            <span className="text-slate-600">/</span>
            <button
              type="button"
              onClick={() => onRoleChange('instructor')}
              className={`hover:text-white transition-colors cursor-pointer underline-offset-2 ${
                currentRole === 'instructor' ? 'text-blue-300 font-semibold underline' : ''
              }`}
            >
              Trainers
            </button>
            <span className="text-slate-600">/</span>
            <button
              type="button"
              onClick={() => onRoleChange('overview')}
              className={`hover:text-white transition-colors cursor-pointer underline-offset-2 ${
                currentRole === 'overview' ? 'text-blue-300 font-semibold underline' : ''
              }`}
            >
              Overview
            </button>
            <span className="text-slate-600">|</span>
            <button
              type="button"
              onClick={onLogout}
              className="text-rose-300 hover:text-rose-100 transition-colors cursor-pointer font-medium flex items-center gap-1"
            >
              <SignOut className="h-3 w-3" />
              <span>Switch Role</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Bull Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-auto flex items-center justify-center">
            <img
              src="/finance-club-logo-green.png"
              alt="RMIT Finance Club Logo"
              className="h-10 w-auto object-contain drop-shadow-2xs"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
                RMIT Finance Club
              </span>
              <span className="rounded px-1.5 py-0.5 text-[10px] font-bold bg-rose-600 text-white">
                RFC
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Project Leader Learning Hub</p>
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
            <span>Learners</span>
          </button>

          <button
            type="button"
            onClick={() => onRoleChange('instructor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
              currentRole === 'instructor'
                ? 'bg-white text-emerald-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ChalkboardTeacher weight={currentRole === 'instructor' ? 'fill' : 'regular'} className="h-4 w-4" />
            <span>Trainers/Facilitators</span>
          </button>

          <button
            type="button"
            onClick={() => onRoleChange('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
              currentRole === 'overview'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass weight={currentRole === 'overview' ? 'fill' : 'regular'} className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </button>
        </div>

        {/* Right: Notifications, Current Role Profile & Logout */}
        <div className="flex items-center gap-3">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="System Notifications"
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
                  <span className="font-semibold text-sm text-slate-900">Notifications</span>
                  <Badge variant="secondary" className="text-[10px]">2 unread</Badge>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2.5">
                    <p className="font-medium text-slate-800">SBI Assignment HRD-102 Graded</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Facilitator Hoang Le Tram provided personalized feedback on your scenario script.</p>
                    <span className="text-[10px] text-blue-600 font-medium">10 mins ago</span>
                  </div>
                  <div className="py-2.5">
                    <p className="font-medium text-slate-800">Quiz Deadline Reminder</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">AI in Project Operations assessment is due this Sunday evening.</p>
                    <span className="text-[10px] text-amber-600 font-medium">Today</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active User Card */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            {currentRole === 'learner' ? (
              <>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Nguyen Minh Tuan"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-600/20"
                />
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">
                    {userName || "Nguyen Minh Tuan"}
                  </p>
                  <p className="text-[11px] text-slate-500 leading-tight">Project Leader • RFC</p>
                </div>
              </>
            ) : currentRole === 'instructor' ? (
              <>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="MSc. Hoang Le Tram"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-600/20"
                />
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">
                    {userName || "MSc. Hoang Le Tram"}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium leading-tight">Lead Facilitator • L&D</p>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                  <Sparkle className="h-4 w-4" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">Preview Mode</p>
                  <p className="text-[11px] text-slate-500 leading-tight">ASM3 Overview</p>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="h-8 px-2.5 text-xs font-semibold border-slate-300 text-slate-700 hover:text-rose-700 hover:bg-rose-50 hover:border-rose-300 cursor-pointer"
              title="Return to Welcome screen to switch role"
            >
              <SignOut className="h-3.5 w-3.5 mr-1 text-rose-600" />
              <span>Switch Role</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
