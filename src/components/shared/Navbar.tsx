import { useState } from "react"
import { UserRole } from "@/data/types"
import { 
  Bell, 
  SignOut,
  Sparkle,
  ChalkboardTeacher,
  GraduationCap,
  Compass,
  CheckCircle,
  User
} from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  currentRole: UserRole
  onRoleChange: (role: UserRole) => void
  onLogout: () => void
  onGoHome?: () => void
  onNavigateTab?: (tab: 'my-courses' | 'catalog') => void
  onOpenSupport?: () => void
  activeLearnerTab?: 'my-courses' | 'catalog' | 'skills' | 'certificates'
  userName?: string
  unreadCount?: number
}

export function Navbar({ 
  currentRole, 
  onRoleChange, 
  onLogout, 
  onGoHome,
  onNavigateTab,
  onOpenSupport,
  activeLearnerTab = 'my-courses',
  userName, 
  unreadCount = 2 
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)

  // Extract 1 initial letter from the user's name (e.g. "Nguyen Minh Tuan" -> "T")
  const displayName = userName?.trim() || (currentRole === 'learner' ? 'Nguyen Minh Tuan' : 'MSc. Hoang Le Tram')
  const nameParts = displayName.split(' ')
  const initial = (nameParts[nameParts.length - 1]?.[0] || displayName[0] || 'T').toUpperCase()

  const handleLogoClick = () => {
    if (onGoHome) {
      onGoHome()
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md font-sans">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-slate-100">RMIT FINANCE CLUB (RFC)</span>
            <span className="text-slate-400">• Project Leader Learning Hub</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-xs">
            <span className="hidden sm:inline text-slate-400">Quick Role Switch:</span>
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
        {/* 1. Club Logo (Click to return to Home) */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] rounded-lg p-1 -ml-1 transition-opacity hover:opacity-90"
          title="RMIT Finance Club - Return to Home"
        >
          <div className="h-10 w-auto flex items-center justify-center bg-transparent shrink-0">
            <img
              src="/finance-club-logo-green.png"
              alt="RMIT Finance Club Logo"
              className="h-10 w-auto object-contain drop-shadow-2xs"
            />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-[#1D2A62] block leading-tight">
                RMIT Finance Club
              </span>
              <span className="rounded px-1.5 py-0.2 text-[9px] font-bold bg-rose-600 text-white">
                RFC
              </span>
            </div>
            <p className="text-[10px] text-[#68707D] block leading-tight mt-0.5">Project Leader Learning Hub</p>
          </div>
        </button>

        {/* Center: When in Learner role -> COURSES, MY LEARNING, SUPPORT */}
        {currentRole === 'learner' ? (
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => onNavigateTab?.('catalog')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeLearnerTab === 'catalog'
                  ? 'bg-[#1D2A62] text-white shadow-xs font-extrabold'
                  : 'text-[#68707D] hover:text-[#1D2A62] hover:bg-slate-100'
              }`}
            >
              COURSES
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab?.('my-courses')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeLearnerTab === 'my-courses'
                  ? 'bg-[#1D2A62] text-white shadow-xs font-extrabold'
                  : 'text-[#68707D] hover:text-[#1D2A62] hover:bg-slate-100'
              }`}
            >
              MY LEARNING
            </button>

            <button
              type="button"
              onClick={onOpenSupport}
              className="px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase text-[#68707D] hover:text-[#1D2A62] hover:bg-slate-100 transition-all cursor-pointer"
            >
              SUPPORT
            </button>
          </nav>
        ) : currentRole === 'instructor' ? (
          <nav className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
              <span className="text-xs font-bold text-emerald-800 px-3 py-1 bg-white rounded-lg shadow-xs">
                Trainer / Facilitator Portal
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenSupport}
              className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase text-[#68707D] hover:text-[#1D2A62] hover:bg-slate-100 transition-all cursor-pointer"
            >
              SUPPORT
            </button>
          </nav>
        ) : (
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <span>Platform Overview Mode</span>
          </div>
        )}

        {/* Right: Announcements (Bell Icon) & Learner Account Icon (1 Letter) */}
        <div className="flex items-center gap-3">
          {/* Announcements Bell Icon */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowAccountMenu(false)
              }}
              className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62]"
              aria-label="Announcements"
              title="Announcements"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-2xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-xl z-50 animate-in fade-in-50 slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-semibold text-sm text-[#1D2A62]">Club Announcements</span>
                  <Badge variant="secondary" className="text-[10px]">2 new</Badge>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2.5">
                    <p className="font-semibold text-slate-900">SBI Assignment HRD-102 Graded</p>
                    <p className="text-[#68707D] text-[11px] mt-0.5">Facilitator Hoang Le Tram provided personalized feedback on your scenario script.</p>
                    <span className="text-[10px] text-blue-700 font-semibold mt-1 inline-block">10 mins ago</span>
                  </div>
                  <div className="py-2.5">
                    <p className="font-semibold text-slate-900">Quiz Deadline Reminder</p>
                    <p className="text-[#68707D] text-[11px] mt-0.5">AI in Project Operations assessment is due this Sunday evening.</p>
                    <span className="text-[10px] text-amber-700 font-semibold mt-1 inline-block">Today</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Learner Account Icon: 1 Letter Initial */}
          <div className="relative pl-1 border-l border-slate-200">
            <button
              type="button"
              onClick={() => {
                setShowAccountMenu(!showAccountMenu)
                setShowNotifications(false)
              }}
              className="h-9 w-9 rounded-full bg-[#1D2A62] hover:bg-[#16204a] text-white flex items-center justify-center font-extrabold text-sm shadow-xs border-2 border-[#87AECE]/50 transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62]"
              title={`Account: ${displayName}`}
              aria-label="Learner Account Profile"
            >
              <span>{initial}</span>
            </button>

            {/* User Profile Dropdown Menu */}
            {showAccountMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in-50 slide-in-from-top-2 text-xs">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="h-8 w-8 rounded-full bg-[#1D2A62] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {initial}
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-[#1D2A62] truncate">{displayName}</p>
                    <p className="text-[10px] text-[#68707D] truncate">
                      {currentRole === 'learner' ? 'Project Leader • RFC' : 'Facilitator • L&D Lead'}
                    </p>
                  </div>
                </div>

                <div className="py-2 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAccountMenu(false)
                      onRoleChange(currentRole === 'learner' ? 'instructor' : 'learner')
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-[#1D2A62] hover:bg-slate-100 transition-colors font-medium flex items-center justify-between"
                  >
                    <span>
                      {currentRole === 'learner' ? 'Switch to Facilitator' : 'Switch to Learner'}
                    </span>
                    <ChalkboardTeacher className="h-4 w-4 text-[#437118]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAccountMenu(false)
                      onRoleChange('overview')
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-[#1D2A62] hover:bg-slate-100 transition-colors font-medium flex items-center justify-between"
                  >
                    <span>Explore ASM3 Overview</span>
                    <Compass className="h-4 w-4 text-[#1D2A62]" />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAccountMenu(false)
                      onLogout()
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors font-semibold flex items-center justify-between"
                  >
                    <span>Switch Role / Logout</span>
                    <SignOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
