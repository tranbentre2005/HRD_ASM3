import { useState, useEffect } from "react"
import { Announcement, AnnouncementType } from "@/data/types"
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  RocketLaunch, 
  CalendarCheck, 
  Sparkle, 
  Megaphone,
  MapPin,
  EnvelopeSimple,
  ArrowSquareOut
} from "@phosphor-icons/react"

interface AnnouncementsViewProps {
  announcements: Announcement[]
  selectedAnnouncementId: string | null
  onSelectAnnouncement: (id: string | null) => void
  onMarkAsRead: (id: string) => void
  onBackToHome: () => void
  onNavigateMyLearning?: () => void
  onNavigateCourses?: () => void
}

type FilterCategoryKey = 'all' | AnnouncementType

export function AnnouncementsView({ 
  announcements,
  selectedAnnouncementId,
  onSelectAnnouncement,
  onMarkAsRead,
  onBackToHome,
  onNavigateMyLearning,
  onNavigateCourses
}: AnnouncementsViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategoryKey>('all')

  const selectedItem = announcements.find(a => a.id === selectedAnnouncementId)

  // Mark as read when detail view is open
  useEffect(() => {
    if (selectedItem && !selectedItem.isRead) {
      onMarkAsRead(selectedItem.id)
    }
  }, [selectedItem, onMarkAsRead])

  const filterTabs: { key: FilterCategoryKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'learning', label: 'Learning' },
    { key: 'new-course', label: 'New Courses' },
    { key: 'club-event', label: 'Club Events' },
    { key: 'platform-update', label: 'Platform Updates' }
  ]

  const filteredAnnouncements = announcements.filter(item => {
    if (selectedFilter === 'all') return true
    return item.type === selectedFilter
  })

  const getTypeBadge = (type: AnnouncementType) => {
    switch (type) {
      case 'learning':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#386b24] border border-emerald-200/70">
            <CheckCircle weight="fill" className="h-3.5 w-3.5" />
            <span>Learning</span>
          </span>
        )
      case 'new-course':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D2A62] border border-blue-200/70">
            <RocketLaunch weight="bold" className="h-3.5 w-3.5" />
            <span>New Course</span>
          </span>
        )
      case 'club-event':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70">
            <CalendarCheck weight="bold" className="h-3.5 w-3.5" />
            <span>Club Event</span>
          </span>
        )
      case 'platform-update':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200/70">
            <Sparkle weight="fill" className="h-3.5 w-3.5" />
            <span>Platform Update</span>
          </span>
        )
    }
  }

  const getDetailActionCTA = (item: Announcement) => {
    if (!item.ctaText) return null

    if (item.ctaAction === 'my-learning') {
      return (
        <button
          type="button"
          onClick={onNavigateMyLearning || onBackToHome}
          className="h-11 px-6 rounded-xl bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
        >
          <span>{item.ctaText}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      )
    }

    if (item.ctaAction === 'courses') {
      return (
        <button
          type="button"
          onClick={onNavigateCourses || onBackToHome}
          className="h-11 px-6 rounded-xl bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
        >
          <span>{item.ctaText}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      )
    }

    if (item.ctaAction === 'external' && item.ctaTarget) {
      return (
        <a
          href={item.ctaTarget}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 px-6 rounded-xl bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.98] inline-flex no-underline"
        >
          <span>{item.ctaText}</span>
          <ArrowSquareOut className="h-4 w-4" />
        </a>
      )
    }

    return null
  }

  // =========================================================================
  // VIEW 1: ANNOUNCEMENT DETAIL PAGE (/announcements/[id])
  // =========================================================================
  if (selectedItem) {
    return (
      <div className="space-y-3 pb-16 font-sans text-left max-w-4xl mx-auto pt-1 sm:pt-2">
        {/* Top Back Navigation - Larger & Closer to Information Card */}
        <div>
          <button
            type="button"
            onClick={() => onSelectAnnouncement(null)}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#1D2A62] hover:text-[#437118] transition-colors cursor-pointer py-1 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to announcements</span>
          </button>
        </div>
        {/* Announcement Detail Article Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
          {/* Header Row: Type Badge + Published Time */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {getTypeBadge(selectedItem.type)}

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Published on {selectedItem.publishedAt}</span>
            </div>
          </div>

          {/* Full Announcement Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D2A62] tracking-tight leading-tight">
            {selectedItem.title}
          </h1>

          {/* Body Content */}
          <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 pt-1">
            <p className="whitespace-pre-line">{selectedItem.body}</p>
          </div>

          {/* Event Specific Metadata Box (if Club Event) */}
          {selectedItem.type === 'club-event' && selectedItem.eventDate && (
            <div className="rounded-2xl bg-[#F0F7FC] border border-[#87AECE]/35 p-5 space-y-3.5 mt-4">
              <h3 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
                Event Details & Schedule
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <CalendarCheck weight="bold" className="h-4 w-4 text-[#1D2A62] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-xs font-medium">Date & Time</span>
                    <span className="font-bold text-[#1D2A62]">{selectedItem.eventDate} · {selectedItem.eventTime}</span>
                  </div>
                </div>

                {selectedItem.eventLocation && (
                  <div className="flex items-start gap-2.5">
                    <MapPin weight="bold" className="h-4 w-4 text-[#1D2A62] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-xs font-medium">Location</span>
                      <span className="font-bold text-[#1D2A62]">{selectedItem.eventLocation}</span>
                    </div>
                  </div>
                )}

                {selectedItem.eventContact && (
                  <div className="flex items-start gap-2.5 sm:col-span-2">
                    <EnvelopeSimple weight="bold" className="h-4 w-4 text-[#1D2A62] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-xs font-medium">Contact</span>
                      <span className="font-semibold text-slate-700">{selectedItem.eventContact}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action CTA Area */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-medium">
              RMIT Finance Club • Project Leader Learning Hub
            </span>

            <div>
              {getDetailActionCTA(selectedItem)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // VIEW 2: ANNOUNCEMENTS OVERVIEW PAGE (/announcements)
  // =========================================================================
  return (
    <div className="space-y-6 pb-16 font-sans text-left max-w-5xl mx-auto">
      {/* Top Banner Notice */}
      <div className="relative rounded-2xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fcfdfe] to-[#f2f7fa] p-5 sm:p-6 lg:py-6 lg:px-8 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] overflow-hidden flex items-center justify-between">
        {/* Subtle Architectural Dot Matrix Grid */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#87AECE_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none -z-0" 
        />

        {/* Ambient Radial Halo Blooms */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 w-[380px] h-[380px] rounded-full bg-radial from-[#AFD06E]/20 via-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-2xl" />
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-radial from-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-xl" />

        {/* Left: Banner Content */}
        <div className="space-y-1.5 z-10 relative text-left max-w-md lg:max-w-xl">
          {/* Breadcrumb: Home / Announcements */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-[#1D2A62] transition-colors cursor-pointer text-slate-600 hover:underline"
            >
              Home
            </button>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-[#1D2A62]">Announcements</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#386b24] via-[#437118] to-[#1D2A62] bg-clip-text text-transparent leading-tight pt-0.5 inline-block">
            Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Stay updated on learning progress, new courses, club events, and Learning Hub updates.
          </p>
        </div>

        {/* Right: Icon Box Illustration */}
        <div className="hidden sm:flex items-center justify-center relative z-10 shrink-0 pr-0 lg:pr-2">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#AFD06E]/20 to-[#87AECE]/20 border border-[#87AECE]/35 flex items-center justify-center shadow-xs">
            <Bell className="h-10 w-10 text-[#1D2A62]" />
          </div>
        </div>
      </div>

      {/* Filter Chips / Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab.key
          const count = tab.key === 'all' 
            ? announcements.length 
            : announcements.filter(a => a.type === tab.key).length

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1D2A62] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-[#1D2A62] hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* List of Announcements */}
      <div className="space-y-3.5">
        {filteredAnnouncements.map((item) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectAnnouncement(item.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectAnnouncement(item.id)
            }}
            className={`rounded-2xl border p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left shadow-2xs hover:shadow-xs cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] ${
              !item.isRead 
                ? 'bg-gradient-to-r from-emerald-50/50 via-white to-[#F0F7FC]/40 border-emerald-300/80' 
                : 'bg-white border-slate-200/90 hover:border-[#87AECE]/60'
            }`}
          >
            <div className="space-y-2 flex-1 min-w-0">
              {/* Type Badge + Relative Time + Unread indicator */}
              <div className="flex items-center gap-2.5">
                {getTypeBadge(item.type)}
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-400 font-medium">
                  {item.relativeTime}
                </span>
                {!item.isRead && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#AFD06E]/30 text-[#386b24]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#386b24] animate-pulse" />
                    <span>New</span>
                  </span>
                )}
              </div>

              {/* Title & Preview */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1D2A62] group-hover:text-[#437118] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mt-1">
                  {item.preview}
                </p>
              </div>
            </div>

            {/* Read Details Action */}
            <div className="shrink-0 pt-2 sm:pt-0">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1D2A62] group-hover:text-[#437118] transition-colors group-hover:translate-x-0.5">
                <span>Read details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="py-16 px-6 text-center space-y-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Bell className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-[#1D2A62]">
              No announcements in this category
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              Select another filter or check back later for new updates.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
