import { Course, CertificateItem } from "@/data/types"
import { 
  ArrowLeft, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  Flag, 
  Lock, 
  ClipboardText,
  ArrowSquareOut
} from "@phosphor-icons/react"

interface MyLearningViewProps {
  courses: Course[]
  certificates: CertificateItem[]
  onSelectCourse: (course: Course) => void
  onViewCertificate: (cert: CertificateItem) => void
  onBackToHome: () => void
}

export function MyLearningView({
  courses,
  onSelectCourse,
  onBackToHome,
}: MyLearningViewProps) {
  const inProgressCourses = courses.filter((c) => c.status === "in-progress")
  const eventReadinessCourse = courses.find(
    (c) => c.id === "event-readiness" || c.id === "course-1" || c.title.includes("Event Readiness")
  ) || inProgressCourses[0] || courses[0]

  // Completed courses in Core Pathway for display in Completed Learning section
  const completedCoreCourses = courses.filter(
    (c) => c.status === "completed" && (c.category === "Core Pathway" || c.code.includes("01") || c.code.includes("02") || c.code.includes("03") || c.code.includes("04") || c.code.includes("05"))
  ).slice(0, 3)

  // Fallback completed courses if list is empty
  const completedList = completedCoreCourses.length >= 3 ? completedCoreCourses : [
    {
      id: "core-pl-role",
      title: "Stepping into the Project Leader Role",
      code: "01 · FOUNDATION",
      category: "Core Pathway",
      duration: "5 min",
      status: "completed" as const,
      progress: 100,
      description: "Understand what it really means to lead an event.",
      competencies: [],
      modules: []
    },
    {
      id: "event-fundamentals-strategic-direction",
      title: "Event Fundamentals & Strategic Direction",
      code: "02 · FOUNDATION",
      category: "Core Pathway",
      duration: "6 min",
      status: "completed" as const,
      progress: 100,
      description: "Start with purpose before building the plan.",
      competencies: [],
      modules: []
    },
    {
      id: "event-planning-coordination",
      title: "Event Planning & Coordination",
      code: "03 · CORE",
      category: "Core Pathway",
      duration: "8 min",
      status: "completed" as const,
      progress: 100,
      description: "Turn ideas into a clear, workable event plan.",
      competencies: [],
      modules: []
    }
  ]

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

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1D2A62] leading-tight pt-0.5 inline-block">
            My Learning
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Track your progress and keep moving toward event-ready leadership.
          </p>
        </div>

        {/* Right: Attached Learning Clipboard & Checklist Illustration */}
        <div className="hidden sm:flex items-center justify-center relative z-10 shrink-0 pr-0 lg:pr-2">
          <img
            src="/core-pathway-clipboard.png"
            alt="My Learning Progress"
            loading="eager"
            className="max-h-[115px] sm:max-h-[125px] lg:max-h-[135px] w-auto object-contain select-none animate-hero-float drop-shadow-sm hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP METRIC CARDS ROW: 3 Equal Metric Cards                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1: Core Pathway Progress */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-2 text-left">
          <h3 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
            Core Pathway Progress
          </h3>

          <div className="flex items-center gap-4 pt-1">
            {/* Circular Gauge: 56% */}
            <div className="relative h-[68px] w-[68px] flex items-center justify-center shrink-0">
              <svg className="h-[68px] w-[68px] -rotate-90" viewBox="0 0 36 36">
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
                5 of 9 courses
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                completed
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-2 text-left">
          <h3 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
            In Progress
          </h3>

          <div className="flex items-center gap-4 pt-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-800 flex items-center justify-center shrink-0 shadow-2xs">
              <BookOpen weight="bold" className="h-6 w-6 text-[#1D2A62]" />
            </div>

            <div className="space-y-0.5">
              <h4 className="text-base sm:text-lg font-bold text-[#1D2A62] leading-snug">
                1 course
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Event Readiness
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Learning Time */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-2 text-left">
          <h3 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
            Learning Time
          </h3>

          <div className="flex items-center gap-4 pt-1">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 flex items-center justify-center shrink-0 shadow-2xs">
              <Clock weight="bold" className="h-6 w-6 text-[#1D2A62]" />
            </div>

            <div className="space-y-0.5">
              <h4 className="text-base sm:text-lg font-bold text-[#1D2A62] leading-snug">
                42 min
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MIDDLE ROW: Continue Learning (Left) & Your Next Milestone (Right)      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: CONTINUE LEARNING (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-2">
          <h2 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
            CONTINUE LEARNING
          </h2>

          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 relative overflow-hidden flex-1 flex flex-col justify-between text-left">
            {/* Left green stripe accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#437118]" />

            <div className="space-y-2.5 pl-1.5">
              {/* Top Row: Icon + Code + In Progress Pill */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#AFD06E]/25 text-[#386b24] border border-[#AFD06E]/35 flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck weight="bold" className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                    06 · CORE PATHWAY
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AFD06E]/20 border border-[#AFD06E]/35 text-[#386b24] text-xs font-bold shadow-2xs shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#386b24] animate-pulse" />
                  <span>IN PROGRESS · 40%</span>
                </span>
              </div>

              {/* Title & Intro */}
              <div className="pt-1">
                <h3 className="text-base sm:text-lg font-bold text-[#1D2A62] leading-snug">
                  {eventReadinessCourse?.title || "Event Readiness | From ‘Done’ to Participant-Ready"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {eventReadinessCourse?.cardIntro || "Know what to check before saying, ‘We’re ready.’"}
                </p>
              </div>

              {/* Duration metadata */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pt-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>8–10 min · Interactive</span>
              </div>
            </div>

            {/* Bottom Row: Progress bar & CTA Button */}
            <div className="pt-4 mt-4 border-t border-slate-100 pl-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Progress</span>
                  <span className="font-bold text-[#437118]">40%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#437118] rounded-full w-[40%]" />
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => eventReadinessCourse && onSelectCourse(eventReadinessCourse)}
                  className="h-9 px-5 rounded-xl bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-[0.98] whitespace-nowrap"
                >
                  <span>Continue Course</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: YOUR NEXT MILESTONE (4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col space-y-2">
          <h2 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
            YOUR NEXT MILESTONE
          </h2>

          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-5 flex-1 flex flex-col justify-between space-y-5 text-left">
            {/* Top row: Flag icon & Text */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 text-[#386b24] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <Flag weight="fill" className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1D2A62] leading-snug">
                  Complete Event Readiness to unlock course 07
                </h3>
              </div>
            </div>

            {/* Stepper Timeline: 01 to 09 along line */}
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
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. COMPLETED LEARNING: 3 Horizontal Cards Row                             */}
      {/* ========================================================================= */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
          COMPLETED LEARNING
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {completedList.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs flex items-center justify-between gap-3 text-left hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <CheckCircle weight="fill" className="h-5 w-5 text-[#437118] shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold text-[#1D2A62] leading-snug truncate">
                  {course.title}
                </h3>
              </div>

              <span className="text-xs font-semibold text-[#1D2A62] shrink-0 hover:text-[#437118] flex items-center gap-1 cursor-default">
                Review
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. EVENT EXECUTION TOOLKIT: Bottom Banner matching Image #1               */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-[#87AECE]/35 bg-gradient-to-r from-[#F0F7FC] via-[#F6FAFD] to-[#EFF6FA] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs mt-4 text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#386b24] border border-emerald-200/60 flex items-center justify-center shrink-0 shadow-2xs">
            <ClipboardText weight="bold" className="h-6 w-6" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-xs font-extrabold text-[#1D2A62] tracking-wider uppercase">
              EVENT EXECUTION TOOLKIT
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Leading an event soon? Open practical templates and checklists for final preparation, rehearsal, and live delivery.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={() => eventReadinessCourse && onSelectCourse(eventReadinessCourse)}
            className="h-9 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#1D2A62] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-[0.98] whitespace-nowrap"
          >
            <span>Open Event Toolkit</span>
            <ArrowSquareOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
