import { useState } from "react"
import { UserRole } from "@/data/types"
import { 
  Bell
} from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"

interface NavbarProps {
  currentRole: UserRole
  currentPage?: 'home' | 'courses' | 'my-learning' | 'announcements' | 'account'
  onNavigate: (page: 'home' | 'courses' | 'my-learning' | 'announcements' | 'account') => void
  onRoleChange: (role: UserRole) => void
  onLogout: () => void
  onOpenSupport?: () => void
  userName?: string
  unreadCount?: number
}

export function Navbar({ 
  currentRole, 
  currentPage = 'home',
  onNavigate,
  onRoleChange, 
  onLogout, 
  onOpenSupport,
  userName, 
  unreadCount = 2 
}: NavbarProps) {
  const displayName = userName?.trim() || (currentRole === 'learner' ? 'Nguyen Minh Tuan' : 'MSc. Hoang Le Tram')
  const nameParts = displayName.split(' ')
  const initial = (nameParts[nameParts.length - 1]?.[0] || displayName[0] || 'T').toUpperCase()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md font-sans">

      {/* Main Navbar: Unified across roles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-15 flex items-center justify-between gap-4">
        {/* 1. Logo -> Trang Home */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] rounded-lg p-1 -ml-1 transition-opacity hover:opacity-90"
          title="Return to Home"
          aria-label="Return to Home"
        >
          <div className="h-10 w-auto flex items-center justify-center bg-transparent shrink-0">
            <img
              src="/finance-club-logo-green.png"
              alt="RMIT Finance Club Logo"
              className="h-10 w-auto object-contain drop-shadow-2xs"
            />
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-extrabold tracking-tight text-[#1D2A62] block leading-tight">
              RMIT Finance Club
            </span>
            <p className="text-[11px] text-slate-500 font-medium block leading-tight mt-0.5">Project Leader Learning Hub</p>
          </div>
        </button>
        {/* Right: Navigation (Courses, My Learning, Support) placed on the right next to Bell and Account */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className={`px-3.5 py-1.5 rounded-xl text-sm transition-all cursor-pointer ${
                currentPage === 'courses'
                  ? 'bg-[#1D2A62] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-[#1D2A62] hover:bg-slate-100 font-medium'
              }`}
            >
              Courses
            </button>

            <button
              type="button"
              onClick={() => onNavigate('my-learning')}
              className={`px-3.5 py-1.5 rounded-xl text-sm transition-all cursor-pointer ${
                currentPage === 'my-learning'
                  ? 'bg-[#1D2A62] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-[#1D2A62] hover:bg-slate-100 font-medium'
              }`}
            >
              My Learning
            </button>

            <button
              type="button"
              onClick={onOpenSupport}
              className="px-3.5 py-1.5 rounded-xl text-sm text-slate-600 hover:text-[#1D2A62] hover:bg-slate-100 font-medium transition-all cursor-pointer"
            >
              Support
            </button>
          </nav>

          {/* Announcements Bell Icon */}
          <button
            type="button"
            onClick={() => onNavigate('announcements')}
            className={`relative p-2 rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] ${
              currentPage === 'announcements'
                ? 'bg-[#1D2A62] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Announcements Page"
            title="View Announcements"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-2xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Account Icon (1 initial letter) */}
          <div className="pl-1 border-l border-slate-200">
            <button
              type="button"
              onClick={() => onNavigate('account')}
              className={`h-9 w-9 rounded-full flex items-center justify-center font-extrabold text-sm shadow-xs border-2 transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] ${
                currentPage === 'account'
                  ? 'bg-[#437118] text-white border-white ring-2 ring-[#1D2A62]'
                  : 'bg-[#1D2A62] hover:bg-[#16204a] text-white border-[#87AECE]/50'
              }`}
              title={`Account Profile: ${displayName}`}
              aria-label="Account Page"
            >
              <span>{initial}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
