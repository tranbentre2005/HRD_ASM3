import { useState } from "react"
import { Course, CertificateItem } from "@/data/types"
import { 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  Flag, 
  Lock, 
  ClipboardText,
  ArrowSquareOut,
  FileText,
  ChartBar,
  CaretRight,
  Sparkle,
} from "@phosphor-icons/react"

interface MyLearningViewProps {
  courses: Course[]
  certificates: CertificateItem[]
  onSelectCourse: (course: Course) => void
  onViewCertificate: (cert: CertificateItem) => void
  onBackToHome: () => void
  onNavigateCourses?: (category?: string) => void
}

export function MyLearningView({
  courses,
  onSelectCourse,
  onBackToHome,
  onNavigateCourses,
}: MyLearningViewProps) {
  const [showAllCompleted, setShowAllCompleted] = useState(false)
  const inProgressCourses = courses.filter((c) => c.status === "in-progress")
  const eventReadinessCourse = courses.find(
    (c) => c.id === "event-readiness" || c.id === "course-1" || c.title.includes("Event Readiness")
  ) || inProgressCourses[0] || courses[0]

  // All 5 Completed courses in Core Pathway for display in Completed Learning section
  const allCompletedList = [
    {
      id: "core-pl-role",
      code: "01 · CORE PATHWAY",
      title: "Stepping into the Project Leader Role",
      duration: "5 min · Foundation",
      completedDate: "Completed on 12 Sep 2026"
    },
    {
      id: "event-fundamentals-strategic-direction",
      code: "02 · CORE PATHWAY",
      title: "Event Fundamentals & Strategic Direction",
      duration: "6 min · Foundation",
      completedDate: "Completed on 14 Sep 2026"
    },
    {
      id: "event-planning-coordination",
      code: "03 · CORE PATHWAY",
      title: "Event Planning & Coordination",
      duration: "8 min · Core",
      completedDate: "Completed on 16 Sep 2026"
    },
    {
      id: "leading-event-team",
      code: "04 · CORE PATHWAY",
      title: "Leading the Event Team",
      duration: "8 min · Leadership",
      completedDate: "Completed on 18 Sep 2026"
    },
    {
      id: "cross-functional-collaboration",
      code: "05 · CORE PATHWAY",
      title: "Cross-Functional Collaboration",
      duration: "7 min · Collaboration",
      completedDate: "Completed on 20 Sep 2026"
    }
  ]

  const displayedCompleted = showAllCompleted ? allCompletedList : allCompletedList.slice(0, 3)

  // 9 Stepper nodes for Core Pathway
  const pathwaySteps = [
    { num: "01", status: "completed" },
    { num: "02", status: "completed" },
    { num: "03", status: "completed" },
    { num: "04", status: "completed" },
    { num: "05", status: "completed" },
    { num: "06", status: "in-progress", progress: "40%" },
    { num: "07", status: "locked" },
    { num: "08", status: "locked" },
    { num: "09", status: "locked" },
  ]

  return (
    <div className="space-y-6 pb-16 font-sans text-left">
      {/* ========================================================================= */}
      {/* 1. TOP BANNER: Matching Courses Banner & Image #1                         */}
      {/* ========================================================================= */}
      <div className="relative rounded-2xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fcfdfe] to-[#f2f7fa] p-5 sm:p-6 lg:py-4 lg:px-8 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] overflow-hidden flex items-center justify-between">
        {/* Subtle Architectural Dot Matrix Grid */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#87AECE_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none -z-0" 
        />

        {/* Ambient Radial Halo Blooms */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 w-[380px] h-[380px] rounded-full bg-radial from-[#AFD06E]/20 via-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-2xl" />
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-radial from-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-xl" />
        {/* Subtle Concentric Leadership Arcs framing the achievement artwork */}
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
        <div className="space-y-1.5 z-10 relative text-left max-w-md lg:max-w-xl">
          {/* Breadcrumb: Home / My Learning */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-[#1D2A62] transition-colors cursor-pointer text-slate-600 hover:underline"
            >
              Home
            </button>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-[#1D2A62]">My Learning</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#386b24] via-[#437118] to-[#1D2A62] bg-clip-text text-transparent leading-tight pt-0.5 inline-block">
            My Learning
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Track your progress and keep moving toward event-ready leadership.
          </p>
        </div>

        {/* Center-Right: Enlarged Learning Medal & Achievement Leader Illustration shifted inward */}
        <div className="hidden sm:flex items-center justify-center relative z-10 shrink-0 pr-4 sm:pr-8 lg:pr-14 xl:pr-20">
          <img
            src="/mylearning-hero-medal.png"
            alt="My Learning Achievement and Leadership Progress"
            loading="eager"
            className="max-h-[145px] sm:max-h-[160px] lg:max-h-[175px] w-auto object-contain select-none animate-hero-float drop-shadow-md hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP METRIC CARDS ROW: 3 Equal Metric Cards                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1: Core Pathway Progress (Deep Navy Gradient matching Home) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#121B3F] via-[#1D2A62] to-[#253A78] border border-[#87AECE]/30 text-white p-5 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-md relative overflow-hidden space-y-2">
          {/* Ambient light layers */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-radial from-white/10 via-transparent to-transparent pointer-events-none blur-xl" />
          <div className="absolute -bottom-8 left-1/4 w-32 h-32 rounded-full bg-radial from-[#87AECE]/15 via-transparent to-transparent pointer-events-none blur-xl" />

          <div className="relative z-10">
            <div className="h-7 flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold text-[#87AECE] tracking-wider uppercase">
                Core Pathway Progress
              </h3>
              <span className="inline-flex items-center text-[10px] font-bold text-[#87AECE] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 shrink-0">
                Core Pathway
              </span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              {/* Circular Gauge: 56% */}
              <div className="relative h-[68px] w-[68px] flex items-center justify-center shrink-0">
                <svg className="h-[68px] w-[68px] -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#87AECE"
                    strokeWidth="3.5"
                    strokeDasharray="94.25"
                    strokeDashoffset={94.25 * (1 - 0.56)}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-base font-extrabold text-white leading-none select-none">
                  56%
                </span>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  5 of 9 courses
                </h4>
                <p className="text-xs text-slate-200 font-medium">
                  completed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: In Progress (Forest Green Gradient matching Home) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#274818] via-[#386b24] to-[#4d8f31] border border-[#AFD06E]/25 text-white p-5 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-md relative overflow-hidden space-y-2">
          {/* Ambient light layers */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-radial from-white/10 via-transparent to-transparent pointer-events-none blur-xl" />
          <div className="absolute -bottom-8 left-1/4 w-32 h-32 rounded-full bg-radial from-[#AFD06E]/15 via-transparent to-transparent pointer-events-none blur-xl" />

          <div className="relative z-10">
            <div className="h-7 flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold text-[#AFD06E] tracking-wider uppercase">
                In Progress
              </h3>
              <span className="inline-flex items-center gap-1.5 bg-white text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-[#386b24]" />
                In Progress
              </span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 text-[#AFD06E] flex items-center justify-center shrink-0 shadow-2xs">
                <BookOpen weight="bold" className="h-6 w-6 text-[#AFD06E]" />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  1 course
                </h4>
                <p className="text-xs text-emerald-100/90 font-medium">
                  Event Readiness
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Learning Time (Deep Navy Gradient matching Home) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#121B3F] via-[#1D2A62] to-[#253A78] border border-[#87AECE]/30 text-white p-5 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-md relative overflow-hidden space-y-2">
          {/* Ambient light layers */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-radial from-white/10 via-transparent to-transparent pointer-events-none blur-xl" />
          <div className="absolute -bottom-8 left-1/4 w-32 h-32 rounded-full bg-radial from-[#87AECE]/15 via-transparent to-transparent pointer-events-none blur-xl" />

          <div className="relative z-10">
            <div className="h-7 flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold text-[#87AECE] tracking-wider uppercase">
                Learning Time
              </h3>
              <span className="inline-flex items-center text-[10px] font-bold text-[#87AECE] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 shrink-0">
                Time Invested
              </span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 text-[#87AECE] flex items-center justify-center shrink-0 shadow-2xs">
                <Clock weight="bold" className="h-6 w-6 text-[#87AECE]" />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  42 min
                </h4>
                <p className="text-xs text-slate-200 font-medium">
                  completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MIDDLE ROW: Continue Learning (Left) & Your Next Milestone (Right)      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: CONTINUE LEARNING (7 cols) */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col space-y-2">
          <h2 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
            CONTINUE LEARNING
          </h2>

          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 relative overflow-hidden flex-1 flex flex-col justify-between text-left">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* Left Artwork Box matching Image #1 */}
              <div className="w-28 sm:w-36 h-36 rounded-xl bg-[#F0F7ED] p-2 flex items-center justify-center shrink-0 border border-[#AFD06E]/30 shadow-2xs">
                <img
                  src="/core-pathway-clipboard.png"
                  alt="Event Readiness Checklist"
                  className="max-h-[120px] w-auto object-contain select-none animate-hero-float"
                />
              </div>

              {/* Right Content Area */}
              <div className="space-y-2 flex-1 min-w-0">
                {/* Top Row: Code + In Progress Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                    06 · CORE PATHWAY
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF7E8] text-[#386b24] text-xs font-bold border border-[#AFD06E]/30 shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#386b24] animate-pulse" />
                    <span>In Progress · 40%</span>
                  </span>
                </div>

                {/* Title & Subtext */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1D2A62] leading-snug">
                    {eventReadinessCourse?.title || "Event Readiness | From “Done” to Participant-Ready"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {eventReadinessCourse?.cardIntro || "Know what to check before saying, “We’re ready.”"}
                  </p>
                </div>

                {/* 3 Info Items with Icons */}
                <div className="space-y-1 pt-1 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>8–10 min · Interactive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>Current lesson: 1.3 Test the Flow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChartBar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>~ 2 min to next milestone</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Progress bar & CTA Button */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 space-y-1.5 max-w-xs">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden mr-3">
                    <div className="h-full bg-[#437118] rounded-full w-[40%]" />
                  </div>
                  <span className="font-bold text-[#437118]">40%</span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectCourse(eventReadinessCourse)}
                  className="h-9 px-5 rounded-xl bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-[0.98] whitespace-nowrap"
                >
                  <span>View Course</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: YOUR NEXT MILESTONE (5 cols) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
              YOUR NEXT MILESTONE
            </h2>
            <button
              type="button"
              onClick={() => {
                if (onNavigateCourses) onNavigateCourses('Core Pathway')
                else onBackToHome()
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
              }}
              className="text-xs font-semibold text-[#1D2A62] hover:text-[#437118] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View Pathway</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
            {/* Top row: Flag icon & Text matching Image #1 */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 text-[#386b24] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <Flag weight="fill" className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1D2A62] leading-snug">
                  Complete Event Readiness to unlock Course 07
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Finish the current course to continue your learning journey.
                </p>
              </div>
            </div>

            {/* Stepper Timeline: 01 to 09 along line matching Image #1 */}
            <div className="pt-2">
              <div className="relative flex items-center justify-between">
                {/* Background horizontal connector line */}
                <div className="absolute left-2 right-2 top-3.5 h-0.5 bg-slate-200 -z-0" />

                {pathwaySteps.map((step) => {
                  const isCompleted = step.status === "completed"
                  const isInProgress = step.status === "in-progress"
                  const isLocked = step.status === "locked"

                  return (
                    <div key={step.num} className="flex flex-col items-center relative z-10">
                      {/* Step Number label on top */}
                      <span className="text-[10px] font-semibold text-slate-400 mb-1">
                        {step.num}
                      </span>

                      {/* Node circle */}
                      {isCompleted && (
                        <div className="w-5 h-5 rounded-full bg-[#437118] text-white flex items-center justify-center shadow-2xs">
                          <CheckCircle weight="fill" className="h-5 w-5 text-[#437118] bg-white rounded-full" />
                        </div>
                      )}

                      {isInProgress && (
                        <div className="relative w-5 h-5 rounded-full bg-white border-2 border-[#437118] flex items-center justify-center shadow-2xs">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#437118] animate-pulse" />
                        </div>
                      )}

                      {isLocked && (
                        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center shadow-2xs">
                          <Lock weight="bold" className="h-2.5 w-2.5" />
                        </div>
                      )}

                      {/* Label below active step */}
                      {isInProgress && (
                        <span className="text-[10px] font-bold text-[#437118] mt-1 absolute -bottom-4.5 whitespace-nowrap">
                          {step.progress}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom Legend Row matching Image #1 */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle weight="fill" className="h-3.5 w-3.5 text-[#437118]" />
                <span className="text-[11px]">Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#437118] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#437118]" />
                </div>
                <span className="text-[11px]">In Progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock weight="bold" className="h-3 w-3 text-slate-400" />
                <span className="text-[11px]">Locked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. COMPLETED LEARNING: 3 Cards Row synced with Core Pathway colors         */}
      {/* ========================================================================= */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
            COMPLETED LEARNING
          </h2>
          <button
            type="button"
            onClick={() => setShowAllCompleted(!showAllCompleted)}
            className="text-xs font-semibold text-[#1D2A62] hover:text-[#437118] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{showAllCompleted ? "Show Less" : "View All (5)"}</span>
            <ArrowRight className={`h-3 w-3 transition-transform ${showAllCompleted ? "-rotate-90" : ""}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayedCompleted.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-[#AFD06E]/65 bg-gradient-to-br from-[#FAFCF8] via-[#F4F9F0] to-[#E6F3DC] p-4 sm:p-5 shadow-2xs flex flex-col justify-between text-left hover:shadow-xs transition-all relative group"
            >
              <div className="space-y-2">
                {/* Top row: Green check + Category Code */}
                <div className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-[#437118] shrink-0" />
                  <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
                    {course.code}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-bold text-[#1D2A62] leading-snug">
                  {course.title}
                </h3>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium pt-0.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Footer: Completion date & Right Arrow */}
              <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>{course.completedDate}</span>
                <CaretRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#1D2A62] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. EVENT EXECUTION SUPPORT: Formatted to match Home page card             */}
      {/* ========================================================================= */}
      <div className="rounded-2xl bg-gradient-to-br from-[#274818] via-[#386b24] to-[#4d8f31] border border-[#AFD06E]/25 text-white p-6 sm:p-8 lg:p-10 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 text-left relative overflow-hidden mt-6">
        {/* Ambient lighting layers */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-radial from-white/10 via-transparent to-transparent pointer-events-none blur-2xl" />
        <div className="absolute -bottom-10 left-1/4 w-72 h-72 rounded-full bg-radial from-[#AFD06E]/15 via-transparent to-transparent pointer-events-none blur-2xl" />

        {/* Left Content */}
        <div className="space-y-2.5 max-w-4xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-[#AFD06E] text-xs font-bold tracking-wide shadow-2xs">
            <Sparkle weight="fill" className="h-3.5 w-3.5 text-[#AFD06E]" />
            <span>EVENT EXECUTION SUPPORT</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
            EVENT EXECUTION SUPPORT
          </h3>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed block max-w-3xl lg:max-w-4xl xl:whitespace-nowrap">
            Leading an event soon? Open practical templates and checklists for final preparation, rehearsal, and live delivery.
          </p>
        </div>

        {/* Right CTA Button: White button with #386b24 text matching Home card */}
        <div className="z-10 shrink-0">
          <a
            href="https://rmiteduau-my.sharepoint.com/:f:/g/personal/s4063545_rmit_edu_vn/IgDxRh5pupKaRL_0n7tpIJmwAd17HHL2UKdpAGAvvEenSkg?e=Y4ZQ76"
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-6 rounded-xl bg-white hover:bg-slate-50 text-[#386b24] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-[0.98] inline-flex no-underline group/btn whitespace-nowrap"
          >
            <span>Open Event Support</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#386b24] group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

    </div>
  )
}
