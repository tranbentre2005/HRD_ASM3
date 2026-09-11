import { useState, useRef, useEffect } from "react"
import { UserRole, Announcement } from "@/data/types"
import { 
  Bell, 
  CheckCircle, 
  RocketLaunch, 
  CalendarCheck, 
  Sparkle, 
  ArrowRight,
  Megaphone
} from "@phosphor-icons/react"

interface NavbarProps {
  currentRole: UserRole
  currentPage?: 'home' | 'courses' | 'my-learning' | 'announcements' | 'account'
  onNavigate: (page: 'home' | 'courses' | 'my-learning' | 'announcements' | 'account') => void
  onLogout: () => void
  onOpenSupport?: () => void
  userName?: string
  announcements?: Announcement[]
  onOpenAnnouncement?: (id: string) => void
  onViewAllAnnouncements?: () => void
  onMarkAllAnnouncementsRead?: () => void
}

export function Navbar({ 
  currentRole, 
  currentPage = 'home',
  onNavigate,
  onLogout,
  onOpenSupport,
  userName, 
  announcements = [],
  onOpenAnnouncement,
  onViewAllAnnouncements,
  onMarkAllAnnouncementsRead
}: NavbarProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const bellButtonRef = useRef<HTMLButtonElement>(null)
  const displayName = userName?.trim() || (currentRole === 'learner' ? 'Tran Le Bao Tran' : 'MSc. Hoang Le Tram')
  const nameParts = displayName.split(' ')
  const initial = (nameParts[nameParts.length - 1]?.[0] || displayName[0] || 'T').toUpperCase()

  const unreadCount = announcements.filter(a => !a.isRead).length
  const recentAnnouncements = announcements.slice(0, 4)

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        bellButtonRef.current && 
        !bellButtonRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false)
      }
    }

    // Close on Escape key
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPopoverOpen(false)
        bellButtonRef.current?.focus()
      }
    }

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isPopoverOpen])

  const handleTogglePopover = () => {
    setIsPopoverOpen(prev => !prev)
  }

  const handleItemClick = (id: string) => {
    setIsPopoverOpen(false)
    if (onOpenAnnouncement) {
      onOpenAnnouncement(id)
    } else {
      onNavigate('announcements')
    }
  }

  const handleViewAllClick = () => {
    setIsPopoverOpen(false)
    if (onViewAllAnnouncements) {
      onViewAllAnnouncements()
    } else {
      onNavigate('announcements')
    }
  }

  const getAnnouncementIcon = (type: Announcement['type']) => {
    switch (type) {
      case 'learning':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#386b24] border border-emerald-200/60 flex items-center justify-center shrink-0 shadow-2xs">
            <CheckCircle weight="fill" className="h-4 w-4" />
          </div>
        )
      case 'new-course':
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1D2A62] border border-blue-200/60 flex items-center justify-center shrink-0 shadow-2xs">
            <RocketLaunch weight="bold" className="h-4 w-4" />
          </div>
        )
      case 'club-event':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center shrink-0 shadow-2xs">
            <CalendarCheck weight="bold" className="h-4 w-4" />
          </div>
        )
      case 'platform-update':
        return (
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkle weight="fill" className="h-4 w-4" />
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Megaphone weight="bold" className="h-4 w-4" />
          </div>
        )
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#AFD06E]/35 bg-gradient-to-r from-[#F4F9F1]/95 via-[#F8FCF6]/95 to-[#EDF6E8]/95 backdrop-blur-md font-sans transition-colors">
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
                  : 'text-slate-600 hover:text-[#1D2A62] hover:bg-slate-100/80 font-medium'
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
                  : 'text-slate-600 hover:text-[#1D2A62] hover:bg-slate-100/80 font-medium'
              }`}
            >
              My Learning
            </button>

            <button
              type="button"
              onClick={onOpenSupport}
              className="px-3.5 py-1.5 rounded-xl text-sm text-slate-600 hover:text-[#1D2A62] hover:bg-slate-100/80 font-medium transition-all cursor-pointer"
            >
              Support
            </button>
          </nav>

          {/* Announcements Bell Popover Trigger */}
          <div className="relative">
            <button
              ref={bellButtonRef}
              type="button"
              onClick={handleTogglePopover}
              aria-label="Open announcements"
              aria-expanded={isPopoverOpen}
              aria-haspopup="dialog"
              className={`relative p-2 rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] ${
                isPopoverOpen || currentPage === 'announcements'
                  ? 'text-[#1D2A62]'
                  : 'text-slate-600 hover:text-[#1D2A62]'
              }`}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-2xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Compact Announcement Popover */}
            {isPopoverOpen && (
              <div
                ref={popoverRef}
                role="dialog"
                aria-label="Recent Announcements"
                className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-[#87AECE]/35 shadow-xl z-50 overflow-hidden text-left font-sans animate-fade-in"
              >
                {/* Popover Header */}
                <div className="p-3.5 px-4 bg-gradient-to-r from-[#F0F7FC] via-[#F8FCF6] to-[#EEF7E8] border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#1D2A62]">
                      Announcements
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#AFD06E]/30 text-[#386b24] text-[10px] font-bold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                </div>

                {/* Popover Items (Top 4 most recent) */}
                <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
                  {recentAnnouncements.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full p-3.5 px-4 flex items-start gap-3 text-left transition-colors cursor-pointer hover:bg-slate-50/90 ${
                        !item.isRead ? 'bg-emerald-50/40' : 'bg-white'
                      }`}
                    >
                      {getAnnouncementIcon(item.type)}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-xs sm:text-[13px] text-[#1D2A62] truncate">
                            {item.title}
                          </h4>
                          {!item.isRead && (
                            <span className="h-2 w-2 rounded-full bg-[#437118] shrink-0 animate-pulse" title="Unread" />
                          )}
                        </div>

                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {item.preview}
                        </p>

                        <span className="text-[11px] text-slate-400 font-medium block mt-1">
                          {item.relativeTime}
                        </span>
                      </div>
                    </button>
                  ))}

                  {recentAnnouncements.length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-500">
                      No announcements at this time.
                    </div>
                  )}
                </div>

                {/* Popover Footer: Mark all read and view all */}
                <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onMarkAllAnnouncementsRead?.()}
                    disabled={unreadCount === 0 || !onMarkAllAnnouncementsRead}
                    className="text-xs font-bold text-[#1D2A62] hover:text-[#437118] disabled:cursor-not-allowed disabled:text-slate-400 cursor-pointer transition-colors"
                  >
                    Mark all read
                  </button>
                  <button
                    type="button"
                    onClick={handleViewAllClick}
                    className="text-xs font-bold text-[#1D2A62] hover:text-[#437118] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>View all announcements</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Account Menu */}
          <div
            className="relative pl-1"
            onMouseEnter={() => setIsAccountMenuOpen(true)}
            onMouseLeave={() => setIsAccountMenuOpen(false)}
            onFocus={() => setIsAccountMenuOpen(true)}
          >
            <button
              type="button"
              onClick={() => onNavigate('account')}
              aria-expanded={isAccountMenuOpen}
              aria-haspopup="menu"
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

            {isAccountMenuOpen && (
              <div className="absolute right-0 top-full z-50 w-36 pt-1" role="menu" aria-label="Account menu">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsAccountMenuOpen(false)
                      onNavigate('account')
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#1D2A62] cursor-pointer"
                  >
                    Settings
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsAccountMenuOpen(false)
                      onLogout()
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
                  >
                    Log out
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
