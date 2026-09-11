import { useState, useEffect, useMemo } from "react"
import { Course } from "@/data/types"
import { 
  MagnifyingGlass, 
  ArrowRight, 
  Clock, 
  Sparkle, 
  Check, 
  CheckCircle,
  Circle,
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
  X,
  Stack,
  User
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

const BANNER_CONTENT: Record<string, { title: string; subtitle: string; countText?: string; image?: string; imageAlt?: string }> = {
  all: {
    title: "Course Library",
    subtitle: "Explore practical courses designed to help you become a more capable Project Leader.",
    image: "/courses-hero-kanban.png",
    imageAlt: "Course Library Kanban Task Board"
  },
  "Core Pathway": {
    title: "Core Project Leader Pathway",
    subtitle: "Build the core capability to plan, lead, deliver, and improve student events.",
    countText: "9 courses",
    image: "/courses-hero-kanban.png",
    imageAlt: "Course Library Kanban Task Board"
  },
  "Leadership Skills": {
    title: "Build Your Leadership Skills",
    subtitle: "Strengthen the behaviours that help you lead people and decisions well.",
    countText: "6 courses",
    image: "/courses-hero-kanban.png",
    imageAlt: "Course Library Kanban Task Board"
  },
  "Functional Essentials": {
    title: "Functional Essentials",
    subtitle: "Understand the cross-functional work that makes an event possible.",
    countText: "5 courses",
    image: "/courses-hero-kanban.png",
    imageAlt: "Course Library Kanban Task Board"
  },
  "Personal Development": {
    title: "Personal Development",
    subtitle: "Build confidence, resilience, and practical habits for leading under pressure.",
    countText: "3 courses",
    image: "/courses-hero-kanban.png",
    imageAlt: "Personal Development"
  }
}

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

  // Dynamic banner content derived from active category
  const currentBanner = BANNER_CONTENT[selectedCategory] || BANNER_CONTENT.all

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(resolveCategoryKey(initialCategory))
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
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

  // Signature course IDs for each category to push to the top of "All Courses"
  const SIGNATURE_COURSE_IDS = [
    "event-readiness",                    // Core Pathway (In Progress interactive course)
    "leadership-essentials",              // Leadership Skills
    "finance-for-project-leaders",        // Functional Essentials
    "confidence-as-new-project-leader"    // Personal Development
  ]

  // Filtered Courses calculation with signature courses elevated to the top in "All Courses"
  const filteredCourses = useMemo(() => {
    const list = courses.filter((course) => {
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch = !query || 
        course.title.toLowerCase().includes(query) ||
        (course.cardTitle && course.cardTitle.toLowerCase().includes(query)) ||
        course.code.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        (course.cardIntro && course.cardIntro.toLowerCase().includes(query)) ||
        (course.courseType && course.courseType.toLowerCase().includes(query)) ||
        (course.briefIntro && course.briefIntro.toLowerCase().includes(query)) ||
        (course.competencies && course.competencies.some(c => c.toLowerCase().includes(query)))
      return matchesCategory && matchesSearch
    })

    // If viewing All Courses without a search query, push the signature course of each category to the front
    if (selectedCategory === "all" && !searchQuery.trim()) {
      const signatureCourses = SIGNATURE_COURSE_IDS
        .map(id => list.find(c => c.id === id || (id === "event-readiness" && (c.id === "course-1" || c.title.includes("Event Readiness")))))
        .filter(Boolean) as Course[]

      const otherCourses = list.filter(c => !signatureCourses.some(sc => sc.id === c.id))
      return [...signatureCourses, ...otherCourses]
    }

    return list
  }, [courses, selectedCategory, searchQuery])

  // In-progress Event Readiness course for Featured Learning Strip
  const inProgressCourse = useMemo(() => {
    return courses.find(c => c.status === "in-progress" && (c.id === "event-readiness" || c.id === "course-1" || c.title.includes("Event Readiness"))) ||
           courses.find(c => c.status === "in-progress")
  }, [courses])

  // Category theme styling helper: 20% deeper/richer backgrounds, borders, icon badges, and ambient auras
  const getCategoryTheme = (category: string, isInProgress: boolean) => {
    if (isInProgress) {
      return {
        bg: "bg-gradient-to-br from-[#FAFCF8] via-[#F2F8EC] to-[#E3F2D7]",
        border: "border-[#AFD06E]/80 hover:border-[#437118] shadow-xs hover:shadow-md",
        iconBox: "bg-[#AFD06E]/40 text-[#2D5A1B] border-[#AFD06E]/60",
        aura: "from-[#AFD06E]/35"
      }
    }

    switch (category) {
      case "Core Pathway":
        return {
          bg: "bg-gradient-to-br from-[#FAFCF8] via-[#F4F9F0] to-[#E6F3DC]",
          border: "border-[#AFD06E]/65 hover:border-[#437118]/80",
          iconBox: "bg-[#AFD06E]/35 text-[#2D5A1B] border-[#AFD06E]/50",
          aura: "from-[#AFD06E]/30"
        }
      case "Leadership Skills":
        return {
          bg: "bg-gradient-to-br from-[#FFFDF8] via-[#FEF9EE] to-[#FDF0D5]",
          border: "border-[#F59E0B]/50 hover:border-[#D97706]/80",
          iconBox: "bg-[#F59E0B]/25 text-[#92400E] border-[#F59E0B]/40",
          aura: "from-[#F59E0B]/30"
        }
      case "Functional Essentials":
        return {
          bg: "bg-gradient-to-br from-[#FAFCFE] via-[#F2F7FC] to-[#E2EFF8]",
          border: "border-[#87AECE]/55 hover:border-[#1D2A62]/75",
          iconBox: "bg-[#87AECE]/35 text-[#131D47] border-[#87AECE]/50",
          aura: "from-[#87AECE]/35"
        }
      case "Personal Development":
        return {
          bg: "bg-gradient-to-br from-[#FCFBFD] via-[#F8F5FC] to-[#ECE4F6]",
          border: "border-[#8B5CF6]/45 hover:border-[#7C3AED]/75",
          iconBox: "bg-[#8B5CF6]/25 text-[#5B21B6] border-[#8B5CF6]/40",
          aura: "from-[#8B5CF6]/30"
        }
      default:
        return {
          bg: "bg-gradient-to-br from-[#FAFCF8] via-[#F4F9F0] to-[#E6F3DC]",
          border: "border-slate-300/80 hover:border-slate-400",
          iconBox: "bg-[#AFD06E]/30 text-[#2D5A1B] border-[#AFD06E]/45",
          aura: "from-[#AFD06E]/25"
        }
    }
  }

  // Helper to pick icon for course card based on title or stage
  const getCourseIcon = (course: Course) => {
    const t = (course.title + " " + (course.cardTitle || "")).toLowerCase()
    if (t.includes("stepping")) return <Brain weight="bold" className="h-5 w-5" />
    if (t.includes("fundamentals") || t.includes("direction")) return <Compass weight="bold" className="h-5 w-5" />
    if (t.includes("planning") || t.includes("coordination")) return <CalendarCheck weight="bold" className="h-5 w-5" />
    if (t.includes("leading the event team") || t.includes("delegation")) return <Users weight="bold" className="h-5 w-5" />
    if (t.includes("cross-functional") || t.includes("collaboration")) return <TreeStructure weight="bold" className="h-5 w-5" />
    if (t.includes("readiness")) return <ShieldCheck weight="bold" className="h-5 w-5" />
    if (t.includes("rehearsal") || t.includes("simulation")) return <RocketLaunch weight="bold" className="h-5 w-5" />
    if (t.includes("execution") || t.includes("live delivery")) return <Clock weight="bold" className="h-5 w-5" />
    if (t.includes("feedback") || t.includes("reflection")) return <ArrowsClockwise weight="bold" className="h-5 w-5" />
    if (t.includes("leadership essentials")) return <UserGear weight="bold" className="h-5 w-5" />
    if (t.includes("teamwork")) return <Users weight="bold" className="h-5 w-5" />
    if (t.includes("inclusive") || t.includes("accessible")) return <Heartbeat weight="bold" className="h-5 w-5" />
    if (t.includes("ethics") || t.includes("responsible")) return <ShieldStar weight="bold" className="h-5 w-5" />
    if (t.includes("communication") || t.includes("stakeholder")) return <ChatCircleText weight="bold" className="h-5 w-5" />
    if (t.includes("problem-solving") || t.includes("pressure")) return <Timer weight="bold" className="h-5 w-5" />
    if (t.includes("finance") || t.includes("budget")) return <Coins weight="bold" className="h-5 w-5" />
    if (t.includes("marketing")) return <Megaphone weight="bold" className="h-5 w-5" />
    if (t.includes("external relations")) return <Sparkle weight="bold" className="h-5 w-5" />
    if (t.includes("operations") || t.includes("logistics")) return <Warehouse weight="bold" className="h-5 w-5" />
    if (t.includes("hr") || t.includes("people")) return <Users weight="bold" className="h-5 w-5" />
    if (t.includes("confidence")) return <Sparkle weight="bold" className="h-5 w-5" />
    return <BookOpen weight="bold" className="h-5 w-5" />
  }

  const handleClearFilters = () => {
    setSelectedCategory("all")
    setSearchQuery("")
  }

  const renderCourseCard = (course: Course) => {
    const isEventReadiness = course.id === "event-readiness" || course.id === "course-1" || course.title.includes("Event Readiness")
    const isInProgress = course.status === "in-progress"
    const isCompleted = course.status === "completed"
    const isComingSoon = course.status === "coming-soon"
    const isNotStarted = !isComingSoon && !isInProgress && !isCompleted

    // Compact course number / category marker (e.g. "06 · CORE PATHWAY")
    let topMetadata = ""
    const numberMatch = course.code.match(/^\d{2}/)
    if (numberMatch && course.category === "Core Pathway") {
      topMetadata = `${numberMatch[0]} · CORE PATHWAY`
    } else if (numberMatch) {
      topMetadata = `${numberMatch[0]} · ${course.category.toUpperCase()}`
    } else {
      topMetadata = course.category.toUpperCase()
    }

    // Duration formatting: "8–10 min · Interactive" for Event Readiness
    const displayDuration = isEventReadiness
      ? "8–10 min · Interactive"
      : `${course.duration}${course.courseType && !course.duration.includes(course.courseType) ? ` · ${course.courseType}` : ""}`

    const theme = getCategoryTheme(course.category, isInProgress)

    return (
      <div
        key={course.id}
        className={`group rounded-2xl border ${theme.border} ${theme.bg} transition-all duration-300 flex flex-col justify-between h-full text-left relative overflow-hidden p-5 shadow-2xs ${
          isInProgress ? "hover:shadow-md hover:-translate-y-1 cursor-pointer" : "cursor-default select-none"
        }`}
      >
        {/* Subtle Ambient Radial Bloom in top-right corner that illuminates on hover */}
        <div 
          className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-radial ${theme.aura} via-transparent to-transparent pointer-events-none blur-lg opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`} 
        />

        {/* Top & Main Section */}
        <div className="relative z-10">
          {/* Top Row: Illustration Icon + Compact Course Number/Category Marker + Status Indicator */}
          <div className="flex items-center justify-between gap-2 pb-1">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${theme.iconBox} flex items-center justify-center shrink-0 shadow-2xs border transition-transform duration-300 group-hover:scale-105`}>
                {getCourseIcon(course)}
              </div>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                {topMetadata}
              </span>
            </div>

            {/* Status indicator: always icon plus text */}
            <div className="shrink-0 flex items-center">
              {isComingSoon && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Coming Soon</span>
                </span>
              )}
              {isInProgress && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#437118]">
                  <span className="h-2 w-2 rounded-full bg-[#437118] animate-pulse" />
                  <span>In Progress</span>
                </span>
              )}
              {isCompleted && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#437118]">
                  <CheckCircle weight="fill" className="h-3.5 w-3.5 text-[#437118]" />
                  <span>Completed</span>
                </span>
              )}
              {isNotStarted && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Circle weight="bold" className="h-3 w-3 text-slate-400" />
                  <span>Not Started</span>
                </span>
              )}
            </div>
          </div>

          {/* Main Content: Course Title (max 2 lines) & Brief Intro (max 2 lines) */}
          <div className="space-y-1.5 mt-2.5 flex-1">
            <h3 className="text-base font-bold text-[#1D2A62] leading-snug line-clamp-2">
              {course.cardTitle || course.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 min-h-[36px]">
              {course.cardIntro || course.briefIntro}
            </p>
          </div>
        </div>

        {/* Footer: Duration + Progress Row (In Progress only) + CTA or availability message */}
        <div className="pt-3.5 mt-3.5 border-t border-slate-100 space-y-2.5 relative z-10">
          {/* Duration metadata row with clock icon */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{displayDuration}</span>
          </div>

          {/* Progress row only for an In Progress course */}
          {isInProgress && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span className="font-medium">Progress</span>
                <span className="font-bold text-[#437118]">{course.progress}% complete</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#437118] rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* CTA or availability message at the bottom */}
          <div className="pt-0.5">
            {isInProgress ? (
              <button
                type="button"
                onClick={() => onSelectCourse(course)}
                className="w-full h-9 px-4 rounded-xl bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2A62]"
              >
                <span>Continue Course</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : isCompleted ? (
              <div className="h-9 flex items-center text-xs text-slate-400 font-medium px-0.5 select-none">
                <span>Completed in demo record</span>
              </div>
            ) : isComingSoon ? (
              <div className="h-9 flex items-center text-xs text-slate-400 font-medium px-0.5 select-none">
                <span>Available soon</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onSelectCourse(course)}
                className="w-full h-9 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#1D2A62] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2A62]"
              >
                <span>View Course</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="pb-16 font-sans text-left">
      {/* TWO-COLUMN LAYOUT: Left Section level with Right Banner                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================================= */}
        {/* LEFT COLUMN: Sidebar Card (White Background, Frameless / No Border)       */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 rounded-2xl bg-white text-slate-800 p-4 sm:p-5 space-y-5 text-left">
          <div className="relative z-10">
            <div className="space-y-1">
              {/* 1. All Courses (SquaresFour icon matching Image #1) */}
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  selectedCategory === "all"
                    ? "bg-[#EEF7E8] border-l-4 border-l-[#386b24] text-[#1D2A62] font-bold shadow-2xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <SquaresFour weight="bold" className={`h-5 w-5 ${selectedCategory === "all" ? "text-[#386b24]" : "text-[#1D2A62]"}`} />
                  <span className="text-xs">All Courses</span>
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  {categoryCounts["all"]}
                </span>
              </button>

              {/* 2. Core Pathway (Target bullseye icon matching Image #1) */}
              <button
                type="button"
                onClick={() => setSelectedCategory("Core Pathway")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  selectedCategory === "Core Pathway"
                    ? "bg-[#EEF7E8] border-l-4 border-l-[#386b24] text-[#1D2A62] font-bold shadow-2xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Target weight="bold" className={`h-5 w-5 ${selectedCategory === "Core Pathway" ? "text-[#386b24]" : "text-[#1D2A62]"}`} />
                  <span className="text-xs">Core Pathway</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {categoryCounts["Core Pathway"]}
                </span>
              </button>

              {/* 3. Leadership Skills (Users group icon matching Image #1) */}
              <button
                type="button"
                onClick={() => setSelectedCategory("Leadership Skills")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  selectedCategory === "Leadership Skills"
                    ? "bg-[#EEF7E8] border-l-4 border-l-[#386b24] text-[#1D2A62] font-bold shadow-2xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users weight="bold" className={`h-5 w-5 ${selectedCategory === "Leadership Skills" ? "text-[#386b24]" : "text-[#1D2A62]"}`} />
                  <span className="text-xs">Leadership Skills</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {categoryCounts["Leadership Skills"]}
                </span>
              </button>

              {/* 4. Functional Essentials (Gear icon matching Image #1) */}
              <button
                type="button"
                onClick={() => setSelectedCategory("Functional Essentials")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  selectedCategory === "Functional Essentials"
                    ? "bg-[#EEF7E8] border-l-4 border-l-[#386b24] text-[#1D2A62] font-bold shadow-2xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Gear weight="bold" className={`h-5 w-5 ${selectedCategory === "Functional Essentials" ? "text-[#386b24]" : "text-[#1D2A62]"}`} />
                  <span className="text-xs">Functional Essentials</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {categoryCounts["Functional Essentials"]}
                </span>
              </button>

              {/* 5. Personal Development (Plant sprout icon matching Image #1) */}
              <button
                type="button"
                onClick={() => setSelectedCategory("Personal Development")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  selectedCategory === "Personal Development"
                    ? "bg-[#EEF7E8] border-l-4 border-l-[#386b24] text-[#1D2A62] font-bold shadow-2xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Plant weight="bold" className={`h-5 w-5 ${selectedCategory === "Personal Development" ? "text-[#386b24]" : "text-[#1D2A62]"}`} />
                  <span className="text-xs">Personal Development</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {categoryCounts["Personal Development"]}
                </span>
              </button>
            </div>
          </div>
          <hr className="border-slate-100" />
          {/* Group 2: YOUR LEARNING PROGRESS (Exact format and content of Home page card) */}
          <div className="space-y-2.5 relative z-10">
            <div className="h-7 flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
                LEARNING PROGRESS
              </h3>
              <span className="inline-flex items-center text-[10px] font-bold text-[#1D2A62] bg-[#87AECE]/20 px-2.5 py-0.5 rounded-full border border-[#87AECE]/35 shrink-0">
                Core Pathway
              </span>
            </div>

            <div className="flex items-center gap-3.5 my-auto py-1">
              {/* Circular Gauge: 56% */}
              <div className="relative h-[68px] w-[68px] flex items-center justify-center shrink-0">
                <svg className="h-[68px] w-[68px] -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#437118"
                    strokeWidth="3"
                    strokeDasharray="94.25"
                    strokeDashoffset={94.25 * (1 - 0.56)}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-base font-extrabold text-[#1D2A62] leading-none select-none">
                  56%
                </span>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm sm:text-base font-bold text-[#1D2A62] leading-snug">
                  5 of 9 courses completed
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  1 course in progress
                </p>
              </div>
            </div>
          </div>

          {/* Group 3: CONTINUE LEARNING (placed directly after Your Learning Progress) */}
          {inProgressCourse && (
            <>
              <hr className="border-slate-100" />
              <div className="space-y-2.5 relative z-10 pt-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#1D2A62] tracking-wider uppercase block">
                    CONTINUE LEARNING
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white border border-[#87AECE]/35 text-[#1D2A62] text-[10px] font-bold shadow-2xs">
                    06 · 40%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1D2A62] leading-snug">
                    {inProgressCourse.cardTitle || inProgressCourse.title}
                  </h4>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectCourse(inProgressCourse)}
                      className="w-full h-8.5 px-3 rounded-lg bg-[#1D2A62] hover:bg-[#16204a] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-[0.98]"
                    >
                      <span>Continue Course</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: Banner + Search Bar + Course Catalogue Cards               */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          {/* Top Compact Hero Banner */}
          <div className="relative rounded-2xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fcfdfe] to-[#f2f7fa] p-5 sm:p-6 lg:py-5 lg:px-8 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] overflow-hidden flex items-center justify-between">
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

            {/* Left: Banner Content with aria-live="polite" */}
            <div className="space-y-1.5 z-10 relative text-left max-w-md lg:max-w-xl" aria-live="polite">
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
                {selectedCategory === "all" ? (
                  <span className="font-semibold text-[#1D2A62]">Courses</span>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className="hover:text-[#1D2A62] transition-colors cursor-pointer text-slate-600 hover:underline"
                    >
                      Courses
                    </button>
                    <span className="text-slate-300">/</span>
                    <span className="font-semibold text-[#1D2A62]">{currentBanner.title}</span>
                  </>
                )}
              </nav>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#386b24] via-[#437118] to-[#1D2A62] bg-clip-text text-transparent leading-tight pt-0.5 inline-block">
                {currentBanner.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {currentBanner.subtitle}
              </p>
            </div>
            {/* Right: Category Illustration in RFC Palette */}
            <div className="hidden sm:flex items-center justify-center relative z-10 shrink-0 pr-0 lg:pr-2">
              <img
                src={currentBanner.image || "/courses-hero-kanban.png"}
                alt={currentBanner.imageAlt || "Course Illustration"}
                loading="eager"
                className="max-h-[130px] sm:max-h-[140px] lg:max-h-[150px] w-auto object-contain select-none animate-hero-float drop-shadow-sm hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
              />
            </div>
          </div>

          {/* Top Search Input - Restored to Full Width */}
          <div className="relative w-full rounded-xl border border-slate-200/90 bg-white p-1 shadow-2xs">
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
          {/* ===================================================================== */}

          {/* COURSE CATALOGUE: 3 Courses per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => renderCourseCard(course))}
          </div>

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
