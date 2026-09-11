import { Course } from "@/data/types"
import { ArrowRight, CheckCircle, ClipboardText, X } from "@phosphor-icons/react"

interface CourseOverviewModalProps {
  course: Course | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinue: (course: Course) => void
}

export function CourseOverviewModal({ course, open, onOpenChange, onContinue }: CourseOverviewModalProps) {
  if (!open || !course) return null
  const isEventReadiness = course.id === "event-readiness" || course.id === "course-1" || course.title.includes("Event Readiness")
  const overviewCode = isEventReadiness ? "06 · DELIVER STAGE" : course.code
  const overviewLevel = isEventReadiness ? "Core Pathway" : course.level || "Foundational"
  const overviewDescription = isEventReadiness
    ? "Learn to identify what matters most, verify critical information against reliable sources, and test whether connected event elements can work together before delivery."
    : course.description

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-overview-title"
    >
      <div className="relative w-full max-w-2xl space-y-5 overflow-hidden rounded-3xl border border-[#87AECE]/30 bg-white p-6 text-left shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close course overview"
          className="absolute right-5 top-5 cursor-pointer rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#AFD06E]/30 bg-[#AFD06E]/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#437118]">
              {overviewCode}
            </span>
            <span className="rounded-full border border-[#87AECE]/45 bg-[#EAF4FA] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#1D2A62]">
              {overviewLevel}
            </span>
          </div>

          <div className="flex items-start gap-3">
            {isEventReadiness && (
              <div className="translate-y-[25%] flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#AFD06E]/40 bg-[#EEF7E8] text-[#437118]">
                <ClipboardText className="h-5 w-5" />
              </div>
            )}
            <h2 id="course-overview-title" className="flex-1 text-xl font-extrabold leading-tight text-[#1D2A62] sm:text-2xl">
              {course.title}
            </h2>
          </div>
          <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
            {overviewDescription}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#87AECE]/30 bg-[#F0F7FC] p-3.5 text-xs sm:grid-cols-3">
          <div>
            <span className="block font-medium text-slate-400">Duration</span>
            <span className="font-bold text-[#1D2A62]">{course.duration}</span>
          </div>
          <div>
            <span className="block font-medium text-slate-400">Progress</span>
            <span className="font-bold text-[#437118]">{course.progress}% complete</span>
          </div>
          <div>
            <span className="block font-medium text-slate-400">Facilitator</span>
            <span className="font-bold text-[#1D2A62]">{course.instructorName || "RMIT Finance Club L&D"}</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1D2A62]">Course Syllabus & Modules</h3>
          <div className="space-y-2 text-xs">
            {course.modules.slice(0, 2).map((module, index) => (
              <div
                key={module.id}
                className={`flex items-center justify-between rounded-xl border p-3 ${
                  index === 0
                    ? "border-slate-200 bg-slate-50"
                    : "border-[#AFD06E]/40 bg-[#EEF7E8]"
                }`}
              >
                <div className="flex items-center gap-2">
                  {index === 0 ? (
                    <CheckCircle weight="fill" className="h-4 w-4 text-[#437118]" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-[#437118] animate-pulse" />
                  )}
                  <span className={index === 0 ? "font-medium text-slate-800" : "font-bold text-[#1D2A62]"}>
                    {module.title}
                  </span>
                </div>
                <span className="shrink-0 text-slate-400">{module.lessons.length} lessons</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:flex-row">
          <span className="text-xs font-medium text-slate-500">Continue when you are ready to learn.</span>
          <button
            type="button"
            onClick={() => onContinue(course)}
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1D2A62] px-6 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#16204a] active:scale-[0.98] sm:w-auto sm:text-sm"
          >
            <span>Continue to Active Lesson</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
