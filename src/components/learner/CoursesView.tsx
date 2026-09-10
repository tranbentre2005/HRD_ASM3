import { useState, useEffect, useMemo } from "react"
import { Course } from "@/data/types"
import { 
  MagnifyingGlass, 
  ArrowRight, 
  Clock, 
  Sparkle, 
  Check, 
  CheckCircle,
  SquaresFour,
  Target,
  Users,
  Gear,
  Plant,
  BookOpen,
  Brain,
  CalendarCheck,
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
  Compass,
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

  // Count courses per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: courses.length,
      "Core Pathway": 0,
      "Leadership Skills": 0,
      "Functional Essentials": 0,
      "Personal Development": 0
    }
    courses.forEach(c => {
      if (counts[c.category] !== undefined) {
        counts[c.category]++
      }
    })
    return counts
  }, [courses])

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
    if (t.includes("stepping") || t.includes("culture")) return <Brain weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("fundamentals") || t.includes("direction")) return <Compass weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("planning") || t.includes("timelines")) return <CalendarCheck weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("leading the event team") || t.includes("delegation")) return <Users weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("cross-functional")) return <TreeStructure weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("readiness")) return <ShieldCheck weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("rehearsal") || t.includes("simulation")) return <RocketLaunch weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("execution") || t.includes("live delivery")) return <Clock weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("feedback") || t.includes("reflection")) return <ArrowsClockwise weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("difficult conversations")) return <ChatCircleText weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("decision-making")) return <UserGear weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("marketing")) return <Megaphone weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("finance") || t.includes("budget")) return <Coins weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("logistics") || t.includes("venue")) return <Warehouse weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("stress") || t.includes("stamina")) return <Heartbeat weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("time mastery")) return <Timer weight="bold" className="h-5 w-5 text-[#437118]" />
    if (t.includes("trust") || t.includes("safety")) return <ShieldStar weight="bold" className="h-5 w-5 text-[#437118]" />
    return <BookOpen weight="bold" className="h-5 w-5 text-[#437118]" />
  }

  const handleClearFilters = () => {
    setSelectedCategory("all")
    setSearchQuery("")
  }

  const renderCourseCard = (course: Course) => {
    const isEventReadiness = course.id === "course-1" || course.title.includes("Event Readiness")
    const isInProgress = course.status === "in-progress"
    const isCompleted = course.status === "completed"
    const isComingSoon = course.status === "coming-soon"

    return (
      <div
        key={course.id}
        className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between text-left relative"
      >
        <div>
          {/* Top Row: Lime Square Icon + Stage Label + Status */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#AFD06E]/30 text-[#437118] flex items-center justify-center shrink-0">
                {getCourseIcon(course)}
              </div>
              <span className="text-[11px] font-bold text-[#5A6578] font-mono tracking-wider uppercase">
                {course.code}
              </span>
            </div>

            <div className="shrink-0 flex items-center gap-1 text-xs text-slate-400 font-medium">
              {isComingSoon && (
                <>
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Coming Soon</span>
                </>
              )}
              {isInProgress && (
                <span className="text-[#437118] font-bold font-mono flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#437118] animate-pulse" />
                  40%
                </span>
              )}
              {isCompleted && (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check weight="bold" className="h-3 w-3" />
                  Done
                </span>
              )}
            </div>
          </div>

          {/* Title & Short Description */}
          <h3 className="text-sm sm:text-base font-bold text-[#1D2A62] leading-snug line-clamp-2 mt-2.5">
            {course.title}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mt-1 min-h-[34px]">
            {course.briefIntro || course.description}
          </p>
        </div>

        {/* Bottom Row: Duration on left + Pill Button on right */}
        <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Clock className="h-3 w-3 text-slate-400" />
            <span>{course.duration}</span>
          </span>

          <div>
            {isInProgress ? (
              <button
                type="button"
                onClick={() => onSelectCourse(course)}
                className="h-7 px-3 rounded-lg bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-xs flex items-center gap-1 cursor-pointer transition-all active:scale-[0.98]"
              >
                <span>Continue</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            ) : isCompleted ? (
              <button
                type="button"
                onClick={() => onSelectCourse(course)}
                className="h-7 px-3 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Review</span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="h-7 px-3 rounded-lg border border-slate-200 text-slate-400 bg-slate-50/70 text-xs font-medium cursor-not-allowed"
              >
                Coming Soon
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="pb-16 font-sans text-left">
      {/* ========================================================================= */}
      {/* TWO-COLUMN LAYOUT: Left Sidebar Section starts level with Right Banner     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================================= */}
        {/* LEFT COLUMN: Sidebar Card (Browse Courses & Metrics) - Level with Banner */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-6 text-left">
          {/* Group 1: BROWSE COURSES */}
          <div className="space-y-3">
            <h2 className="text-[11px] font-bold text-[#1D2A62] tracking-wider uppercase font-mono">
              BROWSE COURSES
            </h2>

            <div className="space-y-1.5">
              {/* 1. All Courses */}
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  selectedCategory === "all"
                    ? "bg-[#AFD06E]/15 border-l-4 border-l-[#437118] text-[#1D2A62] font-bold shadow-2xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <SquaresFour weight="bold" className={`h-4 w-4 ${selectedCategory === "all" ? "text-[#437118]" : "text-slate-500"}`} />
                  <div>
                    <span className="block text-xs leading-tight">All Courses</span>
                    <span className="text-[10px] text-slate-500 font-mono font-normal">
                      {categoryCounts["all"]} courses
                    </span>
                  </div>
                </div>
                {selectedCategory === "all" && (
                  <CheckCircle weight="fill" className="h-4 w-4 text-[#437118] shrink-0" />
                )}
              </button>

              {/* 2. Core Pathway */}
              <button
                type="button"
                onClick={() => setSelectedCategory("Core Pathway")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  selectedCategory === "Core Pathway"
                    ? "bg-[#AFD06E]/15 border-l-4 border-l-[#437118] text-[#1D2A62] font-bold shadow-2xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Target weight="bold" className={`h-4 w-4 ${selectedCategory === "Core Pathway" ? "text-[#437118]" : "text-slate-500"}`} />
                  <span className="text-xs">Core Pathway</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {categoryCounts["Core Pathway"]} courses
                </span>
              </button>

              {/* 3. Leadership Skills */}
              <button
                type="button"
                onClick={() => setSelectedCategory("Leadership Skills")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  selectedCategory === "Leadership Skills"
                    ? "bg-[#AFD06E]/15 border-l-4 border-l-[#437118] text-[#1D2A62] font-bold shadow-2xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users weight="bold" className={`h-4 w-4 ${selectedCategory === "Leadership Skills" ? "text-[#437118]" : "text-slate-500"}`} />
                  <span className="text-xs">Leadership Skills</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {categoryCounts["Leadership Skills"]} courses
                </span>
              </button>

              {/* 4. Functional Essentials */}
              <button
                type="button"
                onClick={() => setSelectedCategory("Functional Essentials")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  selectedCategory === "Functional Essentials"
                    ? "bg-[#AFD06E]/15 border-l-4 border-l-[#437118] text-[#1D2A62] font-bold shadow-2xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Gear weight="bold" className={`h-4 w-4 ${selectedCategory === "Functional Essentials" ? "text-[#437118]" : "text-slate-500"}`} />
                  <span className="text-xs">Functional Essentials</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {categoryCounts["Functional Essentials"]} courses
                </span>
              </button>

              {/* 5. Personal Development */}
              <button
                type="button"
                onClick={() => setSelectedCategory("Personal Development")}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  selectedCategory === "Personal Development"
                    ? "bg-[#AFD06E]/15 border-l-4 border-l-[#437118] text-[#1D2A62] font-bold shadow-2xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Plant weight="bold" className={`h-4 w-4 ${selectedCategory === "Personal Development" ? "text-[#437118]" : "text-slate-500"}`} />
                  <span className="text-xs">Personal Development</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {categoryCounts["Personal Development"]} courses
                </span>
              </button>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Group 2: AVAILABLE COURSES Metric */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1D2A62] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
              <BookOpen weight="bold" className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#68707D] tracking-wider uppercase font-mono block">
                AVAILABLE COURSES
              </span>
              <span className="text-2xl font-extrabold text-[#1D2A62] font-mono leading-none block mt-1">
                {courses.length}
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Across 4 learning categories
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Group 3: YOUR LEARNING PROGRESS Metric */}
          <div className="flex items-start gap-3">
            {/* Circular progress ring (40% progress for Event Readiness) */}
            <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
              <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#437118"
                  strokeWidth="3.5"
                  strokeDasharray="94.25"
                  strokeDashoffset={94.25 * (1 - 0.40)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-[#1D2A62] font-mono">
                40%
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#68707D] tracking-wider uppercase font-mono block">
                YOUR LEARNING PROGRESS
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-[#1D2A62] leading-tight mt-1">
                Event Readiness
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                in progress
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: Search Bar + Featured Strip + Course Catalogue Cards       */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          {/* Top Compact Hero Banner: With attached workspace laptop illustration in RFC palette */}
          <div className="relative rounded-2xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fcfdfe] to-[#f2f7fa] p-5 sm:p-6 lg:py-3.5 lg:px-7 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] overflow-hidden flex items-center justify-between">
            {/* Subtle Architectural Dot Matrix Grid */}
            <div 
              className="absolute inset-0 bg-[radial-gradient(#87AECE_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none -z-0" 
            />

            {/* Ambient Radial Halo Blooms */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 w-[380px] h-[380px] rounded-full bg-radial from-[#AFD06E]/20 via-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-2xl" />
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-radial from-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-xl" />

            {/* Subtle Concentric Leadership Arcs framing right side */}
            <svg 
              className="absolute right-0 top-0 h-full w-[45%] pointer-events-none -z-0 opacity-40 select-none overflow-visible hidden md:block" 
              viewBox="0 0 400 400" 
              fill="none"
            >
              <circle cx="260" cy="180" r="95" stroke="#87AECE" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="260" cy="180" r="160" stroke="#87AECE" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="260" cy="230" stroke="#AFD06E" strokeWidth="1.2" strokeDasharray="5 5" />
              <circle cx="165" cy="180" r="3.5" fill="#437118" />
              <circle cx="260" cy="20" r="3.5" fill="#1D2A62" />
              <circle cx="355" cy="180" r="3.5" fill="#87AECE" />
              <circle cx="260" cy="340" r="3.5" fill="#AFD06E" />
            </svg>

            {/* Left: Banner Content */}
            <div className="space-y-1.5 z-10 relative text-left max-w-md lg:max-w-lg">
              {/* Breadcrumb: Home / Courses */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="hover:text-[#1D2A62] transition-colors cursor-pointer text-slate-600 hover:underline"
                >
                  Home
                </button>
                <span className="text-slate-300">/</span>
                <span className="font-semibold text-[#1D2A62]">Courses</span>
              </nav>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#437118] via-[#1D2A62] to-[#1D2A62] bg-clip-text text-transparent leading-tight pt-0.5 inline-block">
                Course Library
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Explore practical courses designed to help you become a more capable Project Leader.
              </p>
            </div>

            {/* Right: Attached Kanban Tablet Illustration in RFC Palette */}
            <div className="hidden sm:flex items-center justify-center relative z-10 shrink-0 pr-0 lg:pr-1">
              <img
                src="/courses-hero-kanban.png"
                alt="Course Library Kanban Task Board"
                loading="eager"
                className="max-h-[125px] sm:max-h-[135px] lg:max-h-[142px] w-auto object-contain select-none animate-hero-float drop-shadow-sm hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
              />
            </div>
          </div>

          {/* Top Search Input */}
          <div className="relative rounded-xl border border-slate-200/90 bg-white p-1 shadow-2xs">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, skills, or topics..."
              className="w-full pl-10 pr-10 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Clear filter action if active */}
          {(selectedCategory !== 'all' || searchQuery) && (
            <div className="flex items-center justify-end text-xs px-0.5">
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Featured "CONTINUE LEARNING" Card from Image #1 */}
          {inProgressCourse && (selectedCategory === "all" || selectedCategory === "Core Pathway") && !searchQuery.trim() && (
            <div className="rounded-xl border-l-4 border-l-[#437118] border-t border-r border-b border-slate-200/80 bg-[#F0F7FC] p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#437118] uppercase tracking-wider font-mono block">
                  CONTINUE LEARNING
                </span>

                <div className="flex items-center gap-3">
                  {/* Progress ring inside continue strip */}
                  <div className="relative h-9 w-9 flex items-center justify-center shrink-0">
                    <svg className="h-9 w-9 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="#437118"
                        strokeWidth="4"
                        strokeDasharray="94.25"
                        strokeDashoffset={94.25 * (1 - 0.40)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-[9px] font-bold text-[#1D2A62] font-mono">
                      40%
                    </span>
                  </div>

                  {/* 06 Marker Badge */}
                  <span className="px-2 py-0.5 rounded bg-[#AFD06E]/30 text-[#437118] text-xs font-mono font-bold shrink-0">
                    06
                  </span>

                  {/* Course Title & Description */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#1D2A62] leading-snug">
                      {inProgressCourse.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                      Continue building participant-ready event delivery skills.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right CTA Button */}
              <div className="shrink-0 pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => onSelectCourse(inProgressCourse)}
                  className="h-10 px-5 rounded-xl bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-[0.98] whitespace-nowrap"
                >
                  <span>Continue Course</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* COURSE CATALOGUE: 3 Courses per row (no categories when All Courses)  */}
          {/* ===================================================================== */}
          {selectedCategory === "all" ? (
            /* All Courses: Single continuous 3-column grid without dividing into categories */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => renderCourseCard(course))}
            </div>
          ) : (
            /* Specific Category View: 3 Courses per row */
            <div className="space-y-8">
              {CATEGORY_SECTIONS.filter(sec => sec.key === selectedCategory).map((sec) => {
                const sectionCourses = filteredCourses.filter(c => c.category === sec.key)
                if (sectionCourses.length === 0) return null

                return (
                  <section key={sec.key} className="space-y-3">
                    {/* Category Title Header */}
                    <div>
                      <span className="text-[10px] font-bold text-[#437118] uppercase tracking-wider font-mono block">
                        {sec.label}
                      </span>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <h2 className="text-lg sm:text-xl font-extrabold text-[#1D2A62] tracking-tight">
                          {sec.heading}
                        </h2>
                        <span className="text-xs text-slate-500 font-mono">
                          {sectionCourses.length} {sectionCourses.length === 1 ? 'course' : 'courses'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {sec.description}
                      </p>
                    </div>

                    {/* 3-Column Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sectionCourses.map((course) => renderCourseCard(course))}
                    </div>
                  </section>
                )
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="py-16 px-6 text-center space-y-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <MagnifyingGlass className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-[#1D2A62]">
                No courses found
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                Try a different keyword or category.
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
    </div>
  )
}
