import { useState, useEffect, useMemo } from "react"
import { Course } from "@/data/types"
import { 
  MagnifyingGlass, 
  ArrowRight, 
  Clock, 
  Sparkle, 
  Check, 
  Brain,
  CalendarCheck,
  Users,
  ShieldCheck,
  ArrowsClockwise,
  RocketLaunch,
  ChatCircleText,
  UserGear,
  TreeStructure,
  Megaphone,
  Coins,
  Warehouse,
  Heartbeat,
  Timer,
  ShieldStar,
  BookOpen,
  X
} from "@phosphor-icons/react"

interface CoursesViewProps {
  courses: Course[]
  onSelectCourse: (course: Course) => void
  onBackToHome: () => void
  initialCategory?: string
}

type FilterCategoryKey = 'all' | 'Core Pathway' | 'Leadership Skills' | 'Functional Essentials' | 'Personal Development'

interface CategorySectionDef {
  key: FilterCategoryKey
  label: string
  heading: string
  description: string
}

const CATEGORY_SECTIONS: CategorySectionDef[] = [
  {
    key: "Core Pathway",
    label: "CORE PATHWAY",
    heading: "Core Project Leader Pathway",
    description: "Build the core capability to plan, lead, deliver, and improve student events."
  },
  {
    key: "Leadership Skills",
    label: "LEADERSHIP SKILLS",
    heading: "Build Your Leadership Skills",
    description: "Strengthen the behaviours that help you lead people and decisions well."
  },
  {
    key: "Functional Essentials",
    label: "CROSS-FUNCTIONAL ALIGNMENT",
    heading: "Functional Essentials",
    description: "Understand the cross-functional work that makes an event possible."
  },
  {
    key: "Personal Development",
    label: "LEADERSHIP RESILIENCE",
    heading: "Personal Development",
    description: "Build confidence, resilience, and practical habits for leading under pressure."
  }
]

export function CoursesView({
  courses,
  onSelectCourse,
  onBackToHome,
  initialCategory = "all",
}: CoursesViewProps) {
  // Map incoming category (e.g. from homepage cards) to filter keys
  const resolveCategoryKey = (cat: string): FilterCategoryKey => {
    if (cat === "Foundation" || cat === "Plan & Lead" || cat === "Deliver" || cat === "Reflect & Grow" || cat === "Core Pathway") {
      return "Core Pathway"
    }
    if (cat === "Leadership Skills" || cat === "Functional Essentials" || cat === "Personal Development") {
      return cat
    }
    return "all"
  }

  const [selectedCategory, setSelectedCategory] = useState<FilterCategoryKey>(() => resolveCategoryKey(initialCategory))
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(resolveCategoryKey(initialCategory))
    }
  }, [initialCategory])

  // Filter Tabs Options
  const filterTabs: { id: FilterCategoryKey; label: string }[] = [
    { id: "all", label: "All Courses" },
    { id: "Core Pathway", label: "Core Pathway" },
    { id: "Leadership Skills", label: "Leadership Skills" },
    { id: "Functional Essentials", label: "Functional Essentials" },
    { id: "Personal Development", label: "Personal Development" }
  ]

  // Filtered Courses calculation
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch = !query || 
        course.title.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        (course.briefIntro && course.briefIntro.toLowerCase().includes(query)) ||
        (course.competencies && course.competencies.some(c => c.toLowerCase().includes(query)))
      return matchesCategory && matchesSearch
    })
  }, [courses, selectedCategory, searchQuery])

  // In-progress Event Readiness course for Featured Learning Strip
  const inProgressCourse = useMemo(() => {
    return courses.find(c => c.status === "in-progress" && (c.id === "course-1" || c.title.includes("Event Readiness"))) ||
           courses.find(c => c.status === "in-progress")
  }, [courses])

  // Helper to pick icon for course card based on title or stage
  const getCourseIcon = (course: Course) => {
    const t = course.title.toLowerCase()
    if (t.includes("stepping") || t.includes("culture")) return <Brain weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("fundamentals") || t.includes("direction")) return <Brain weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("planning") || t.includes("timelines")) return <CalendarCheck weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("leading the event team") || t.includes("delegation")) return <Users weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("cross-functional")) return <TreeStructure weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("readiness")) return <ShieldCheck weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("rehearsal") || t.includes("simulation")) return <RocketLaunch weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("execution") || t.includes("live delivery")) return <Clock weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("feedback") || t.includes("reflection")) return <ArrowsClockwise weight="bold" className="h-4 w-4 text-[#437118]" />
    if (t.includes("difficult conversations")) return <ChatCircleText weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("decision-making")) return <UserGear weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("marketing")) return <Megaphone weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("finance") || t.includes("budget")) return <Coins weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("logistics") || t.includes("venue")) return <Warehouse weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("stress") || t.includes("stamina")) return <Heartbeat weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("time mastery")) return <Timer weight="duotone" className="h-4 w-4 text-[#437118]" />
    if (t.includes("trust") || t.includes("safety")) return <ShieldStar weight="duotone" className="h-4 w-4 text-[#437118]" />
    return <BookOpen weight="duotone" className="h-4 w-4 text-[#437118]" />
  }

  const handleClearFilters = () => {
    setSelectedCategory("all")
    setSearchQuery("")
  }

  const isFiltered = selectedCategory !== "all" || searchQuery.trim() !== ""

  return (
    <div className="space-y-6 pb-16 font-sans text-left">
      {/* ========================================================================= */}
      {/* 1. PAGE TITLE AREA: Open, left-aligned, quiet breadcrumb, RFC typography  */}
      {/* ========================================================================= */}
      <div className="space-y-1.5 pt-1">
        {/* Quiet Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
          <button 
            type="button" 
            onClick={onBackToHome}
            className="hover:text-[#1D2A62] transition-colors cursor-pointer flex items-center gap-1 font-medium"
          >
            <span>Overview</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-[#1D2A62]">Course Library</span>
        </nav>

        <div className="pt-1 space-y-1">
          <span className="text-[11px] font-bold text-[#437118] uppercase tracking-wider font-mono block">
            LEARNER COURSE LIBRARY
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1D2A62] tracking-tight leading-tight">
            Course Library
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Explore practical courses designed to help you become a more capable Project Leader.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. COMPACT COURSE-NAVIGATION ROW: Category tabs + Search + Result Count   */}
      {/* ========================================================================= */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
          {/* Left: Category filters / text tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar shrink-0">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] ${
                    isActive
                      ? "bg-[#AFD06E]/20 text-[#1D2A62] border border-[#1D2A62] font-bold shadow-2xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900 font-medium"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Center: Search input */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, skills, or topics…"
              className="w-full pl-8 pr-8 py-1.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1D2A62] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                title="Clear search query"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Right: Quiet result count + Clear action */}
          <div className="flex items-center gap-2.5 shrink-0 justify-end">
            <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
            </span>

            {isFiltered && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer transition-colors whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FEATURED LEARNING STRIP: Positional role for current in-progress course */}
      {/* ========================================================================= */}
      {inProgressCourse && (selectedCategory === "all" || selectedCategory === "Core Pathway") && !searchQuery.trim() && (
        <div className="rounded-2xl border-l-4 border-l-[#437118] border-t border-r border-b border-slate-200/90 bg-gradient-to-r from-white via-[#fcfdfe] to-[#f4f8fb] p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left transition-all hover:shadow-xs">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2 text-[10px] font-bold font-mono">
              <span className="text-[#437118] tracking-wider uppercase">CONTINUE LEARNING</span>
              <span className="text-slate-300">•</span>
              <span className="bg-[#87AECE]/20 text-[#1D2A62] px-1.5 py-0.5 rounded">06</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#437118]">{inProgressCourse.progress}% complete</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#1D2A62] leading-snug">
              {inProgressCourse.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Continue building participant-ready event delivery skills.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onSelectCourse(inProgressCourse)}
              className="h-10 px-5 rounded-xl bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
            >
              <span>Continue Course</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. COURSE CATALOGUE GRID: 3-4 columns responsive grid, RFC card styling  */}
      {/* ========================================================================= */}
      <div className="space-y-10">
        {CATEGORY_SECTIONS.map((sec) => {
          // If a category filter is active, only show that category section
          if (selectedCategory !== "all" && selectedCategory !== sec.key) {
            return null
          }

          // Filter courses matching this category and query
          const sectionCourses = filteredCourses.filter(c => c.category === sec.key)

          // If filtering or searching and section has no results, omit section
          if (sectionCourses.length === 0) {
            return null
          }

          return (
            <section key={sec.key} className="space-y-4">
              {/* Category Heading & Description Header */}
              <div className="space-y-1 pb-1 border-b border-slate-200/80">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-[#437118] uppercase tracking-wider font-mono">
                    {sec.label}
                  </span>
                  <span className="text-xs font-semibold font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {sectionCourses.length} {sectionCourses.length === 1 ? 'course' : 'courses'}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1D2A62] tracking-tight">
                  {sec.heading}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600">
                  {sec.description}
                </p>
              </div>

              {/* Course Cards Grid: 3 cols desktop, 4 on 2xl screens, 2 tablet, 1 mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {sectionCourses.map((course) => {
                  const isEventReadiness = course.id === "course-1" || course.title.includes("Event Readiness")
                  const isInProgress = course.status === "in-progress"
                  const isCompleted = course.status === "completed"
                  const isComingSoon = course.status === "coming-soon"

                  return (
                    <div
                      key={course.id}
                      className={`rounded-2xl border bg-white p-5 shadow-2xs flex flex-col justify-between text-left transition-all ${
                        isEventReadiness
                          ? "border-[#437118]/40 ring-1 ring-[#AFD06E]/30 hover:shadow-md hover:border-[#437118]"
                          : "border-slate-200/90 hover:border-[#87AECE] hover:shadow-xs"
                      }`}
                    >
                      {/* Top Row: Icon in square + Code/Stage + Status Chip */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#AFD06E]/20 text-[#437118] flex items-center justify-center shrink-0">
                              {getCourseIcon(course)}
                            </div>
                            <span className="text-[10px] font-bold text-[#5A6578] font-mono tracking-wider uppercase">
                              {course.code}
                            </span>
                          </div>

                          {/* Status Chip */}
                          <div className="shrink-0">
                            {isInProgress && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#437118] border border-emerald-200/70">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#437118] animate-pulse" />
                                <span>In Progress · {course.progress}%</span>
                              </span>
                            )}
                            {isCompleted && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                                <Check weight="bold" className="h-3 w-3 text-emerald-700" />
                                <span>Completed</span>
                              </span>
                            )}
                            {isComingSoon && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-200">
                                <Clock className="h-3 w-3 text-slate-400" />
                                <span>Coming Soon</span>
                              </span>
                            )}
                            {!isInProgress && !isCompleted && !isComingSoon && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
                                <span>Not Started</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title clamped to 2 lines */}
                        <h3 className="text-base font-bold text-[#1D2A62] leading-snug line-clamp-2 mt-3">
                          {course.title}
                        </h3>

                        {/* Intro clamped to 3 lines */}
                        <p className="text-xs text-[#68707D] leading-relaxed line-clamp-3 mt-1.5 min-h-[48px]">
                          {course.briefIntro || course.description}
                        </p>

                        {/* Recommendation note on Event Readiness */}
                        {course.recommendationNote && (
                          <div className="pt-2">
                            <p className="text-[11px] text-[#437118] font-semibold flex items-center gap-1.5">
                              <Sparkle weight="fill" className="h-3.5 w-3.5 text-[#437118] shrink-0" />
                              <span>{course.recommendationNote}</span>
                            </p>
                          </div>
                        )}

                        {/* Mini progress line for In Progress course */}
                        {isInProgress && (
                          <div className="pt-3">
                            <div className="h-1.5 w-full bg-[#E0F2FE] rounded-full overflow-hidden">
                              <div className="h-full bg-[#437118] rounded-full" style={{ width: `${course.progress}%` }} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Footer: Duration + Action CTA */}
                      <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#68707D] font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span>{course.duration}</span>
                        </span>

                        <div>
                          {isInProgress && (
                            <button
                              type="button"
                              onClick={() => onSelectCourse(course)}
                              className="text-xs font-bold text-[#437118] hover:text-[#1D2A62] flex items-center gap-1 cursor-pointer transition-colors group"
                            >
                              <span>Continue Course</span>
                              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          )}
                          {isCompleted && (
                            <button
                              type="button"
                              onClick={() => onSelectCourse(course)}
                              className="text-xs font-bold text-[#437118] hover:text-[#1D2A62] flex items-center gap-1 cursor-pointer transition-colors group"
                            >
                              <span>Review Course</span>
                              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          )}
                          {!isInProgress && !isCompleted && !isComingSoon && (
                            <button
                              type="button"
                              onClick={() => onSelectCourse(course)}
                              className="text-xs font-bold text-[#1D2A62] hover:text-[#437118] flex items-center gap-1 cursor-pointer transition-colors group"
                            >
                              <span>View Course</span>
                              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          )}
                          {isComingSoon && (
                            <span className="text-xs font-medium text-slate-400">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}

        {/* 5. Empty State */}
        {filteredCourses.length === 0 && (
          <div className="py-16 px-6 text-center space-y-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <MagnifyingGlass className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-[#1D2A62]">
              No courses found
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Try a different keyword, category, or course status.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-xl bg-[#1D2A62] hover:bg-[#16204a] text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
