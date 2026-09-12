import { useEffect, useMemo, useState } from "react"
import { Course } from "@/data/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle,
  Clock,
  Flag,
  Lightbulb,
  PlayCircle,
  ShieldCheck,
  Sparkle,
  Target,
  UsersThree
} from "@phosphor-icons/react"

interface EventReadinessCoursePageProps {
  course: Course
  onNavigateHome: () => void
  onNavigateCourses: () => void
  onProgressChange?: (progress: number) => void
}

type OutlineItem = {
  id: string
  title: string
  section: string
}

type OutlineSection = {
  title: string
  items: OutlineItem[]
}

type SavedCourseState = {
  activeLessonId: string
  completedLessonIds: string[]
  quickCheckAnswer: string
  feedbackRating: string
  feedbackText: string
}

const COURSE_PROGRESS_KEY = "rmit-finance-club:event-readiness-progress"

const OUTLINE_SECTIONS: OutlineSection[] = [
  {
    title: "GETTING STARTED",
    items: [
      { id: "course-overview", title: "Course Overview", section: "GETTING STARTED" },
      { id: "course-outcomes", title: "Course Learning Outcomes", section: "GETTING STARTED" }
    ]
  },
  {
    title: "LEARN & PRACTISE",
    items: [
      { id: "1.0-done-ready", title: "1.0 | Done ≠ Ready", section: "LEARN & PRACTISE" },
      { id: "1.1-ready-framework", title: "1.1 | The Event Ready Framework", section: "LEARN & PRACTISE" },
      { id: "1.2-ready-simulation", title: "1.2 | Event Ready Simulation", section: "LEARN & PRACTISE" }
    ]
  },
  {
    title: "CHECK YOUR UNDERSTANDING",
    items: [
      { id: "2.0-quick-check", title: "2.0 | Event Readiness Quick Check", section: "CHECK YOUR UNDERSTANDING" },
      { id: "2.1-check-results", title: "2.1 | Your Readiness Check Results", section: "CHECK YOUR UNDERSTANDING" }
    ]
  },
  {
    title: "APPLY TO YOUR EVENT",
    items: [
      { id: "3.0-event-check", title: "3.0 | 3-Minute Event Readiness Check", section: "APPLY TO YOUR EVENT" }
    ]
  },
  {
    title: "REFLECTION & FEEDBACK",
    items: [
      { id: "4.0-course-feedback", title: "4.0 | Course Feedback", section: "REFLECTION & FEEDBACK" }
    ]
  }
]

const OUTLINE_ITEMS = OUTLINE_SECTIONS.flatMap(section => section.items)
const DEFAULT_COMPLETED_IDS = ["course-overview", "course-outcomes", "1.0-done-ready"]

function getSavedCourseState(): SavedCourseState {
  const fallback: SavedCourseState = {
    activeLessonId: "1.0-done-ready",
    completedLessonIds: DEFAULT_COMPLETED_IDS,
    quickCheckAnswer: "",
    feedbackRating: "",
    feedbackText: ""
  }

  if (typeof window === "undefined") return fallback

  try {
    const raw = window.localStorage.getItem(COURSE_PROGRESS_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<SavedCourseState>
    const completedLessonIds = Array.isArray(parsed.completedLessonIds)
      ? parsed.completedLessonIds.filter(id => OUTLINE_ITEMS.some(item => item.id === id))
      : fallback.completedLessonIds
    const activeLessonId = OUTLINE_ITEMS.some(item => item.id === parsed.activeLessonId)
      ? parsed.activeLessonId || fallback.activeLessonId
      : fallback.activeLessonId

    return {
      activeLessonId,
      completedLessonIds,
      quickCheckAnswer: typeof parsed.quickCheckAnswer === "string" ? parsed.quickCheckAnswer : "",
      feedbackRating: typeof parsed.feedbackRating === "string" ? parsed.feedbackRating : "",
      feedbackText: typeof parsed.feedbackText === "string" ? parsed.feedbackText : ""
    }
  } catch {
    return fallback
  }
}

export function EventReadinessCoursePage({
  course,
  onNavigateHome,
  onNavigateCourses,
  onProgressChange
}: EventReadinessCoursePageProps) {
  const initialState = useMemo(() => getSavedCourseState(), [])
  const [activeLessonId, setActiveLessonId] = useState(initialState.activeLessonId)
  const [completedLessonIds, setCompletedLessonIds] = useState(initialState.completedLessonIds)
  const [quickCheckAnswer, setQuickCheckAnswer] = useState(initialState.quickCheckAnswer)
  const [feedbackRating, setFeedbackRating] = useState(initialState.feedbackRating)
  const [feedbackText, setFeedbackText] = useState(initialState.feedbackText)

  const activeLesson = OUTLINE_ITEMS.find(item => item.id === activeLessonId) || OUTLINE_ITEMS[0]
  const activeLessonIndex = OUTLINE_ITEMS.findIndex(item => item.id === activeLesson.id)
  const completedCount = completedLessonIds.length
  const progress = completedCount === OUTLINE_ITEMS.length
    ? 100
    : Math.max(course.progress, Math.round((completedCount / OUTLINE_ITEMS.length) * 100))

  useEffect(() => {
    window.localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify({
      activeLessonId,
      completedLessonIds,
      quickCheckAnswer,
      feedbackRating,
      feedbackText
    }))
  }, [activeLessonId, completedLessonIds, quickCheckAnswer, feedbackRating, feedbackText])

  const markComplete = (lessonId: string) => {
    setCompletedLessonIds(previous => previous.includes(lessonId) ? previous : [...previous, lessonId])
  }

  const handleProgressUpdate = (nextCompletedIds: string[]) => {
    const nextProgress = nextCompletedIds.length === OUTLINE_ITEMS.length
      ? 100
      : Math.max(course.progress, Math.round((nextCompletedIds.length / OUTLINE_ITEMS.length) * 100))
    onProgressChange?.(nextProgress)
  }

  const handlePrimaryAction = () => {
    if (activeLesson.id === "2.0-quick-check" && !quickCheckAnswer) return

    markComplete(activeLesson.id)
    const nextCompletedIds = completedLessonIds.includes(activeLesson.id)
      ? completedLessonIds
      : [...completedLessonIds, activeLesson.id]
    handleProgressUpdate(nextCompletedIds)

    const nextLesson = OUTLINE_ITEMS[activeLessonIndex + 1]
    if (nextLesson) setActiveLessonId(nextLesson.id)
  }
  const handlePrevious = () => {
    const previousLesson = OUTLINE_ITEMS[activeLessonIndex - 1]
    if (previousLesson) setActiveLessonId(previousLesson.id)
  }

  const isCompleted = completedLessonIds.includes(activeLesson.id)
  const isGettingStarted = activeLesson.section === "GETTING STARTED"
  const primaryLabel = "Next"

  return (
    <div className="space-y-5 pb-16 font-sans text-left">

      <section className="relative overflow-hidden rounded-2xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fcfdfe] to-[#f2f7fa] p-4 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] sm:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#87AECE_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        <nav aria-label="Breadcrumb" className="relative z-10 mb-5 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
          <button type="button" onClick={onNavigateHome} className="cursor-pointer transition-colors hover:text-[#1D2A62] hover:underline">
            Home
          </button>
          <span className="text-slate-300">/</span>
          <button type="button" onClick={onNavigateCourses} className="cursor-pointer transition-colors hover:text-[#1D2A62] hover:underline">
            Courses
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-[#1D2A62]">Event Readiness</span>
        </nav>
        <div className="mb-3 flex flex-wrap items-center gap-2 lg:absolute lg:right-7 lg:top-7 lg:justify-end">
          <span className="rounded-full border border-[#AFD06E]/35 bg-[#EEF7E8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#437118]">
            06 · DELIVER STAGE
          </span>
          <span className="rounded-full border border-[#87AECE]/45 bg-[#EAF4FA] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1D2A62]">
            Core Pathway
          </span>
        </div>
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-3xl flex-1 lg:max-w-4xl lg:pr-40">
            <div className="flex items-end gap-[15.6px]">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#AFD06E]/40 bg-[#EEF7E8] p-1.5 text-[#437118] sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                <img
                  src="/core-pathway-clipboard.png"
                  alt="Event Readiness Checklist"
                  className="h-full w-full object-contain select-none"
                />
              </div>
              <div className="min-w-0">
                <h1 className="inline-block text-2xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-[#386b24] via-[#437118] to-[#1D2A62] bg-clip-text text-transparent sm:text-3xl lg:whitespace-nowrap">
                  <span>Event Readiness</span>{" | "}
                  <span>From “Done” to Participant-Ready</span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600" style={{ transform: "translateY(-10%)" }}>
                  Learn the practical checks that turn a completed event plan into a delivery-ready experience.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#1D2A62]">
                  <Clock className="h-3.5 w-3.5 text-[#437118]" />
                  <span>{course.duration} · Interactive</span>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-[220px] lg:text-right">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold text-[#1D2A62] lg:justify-end">
              <span>Overall progress</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/80 ring-1 ring-[#87AECE]/25">
              <div className="h-full rounded-full bg-[#437118] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">{completedCount} of {OUTLINE_ITEMS.length} outline items completed</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-20">
          <Card className="border-slate-200/90 p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#437118]" />
                <h2 className="text-sm font-extrabold text-[#1D2A62]">Course Outline</h2>
              </div>
              <span className="text-[11px] font-bold text-slate-500">{completedCount}/{OUTLINE_ITEMS.length}</span>
            </div>
            <div className="space-y-4">
              {OUTLINE_SECTIONS.map(section => {
                return (
                  <div key={section.title} className="space-y-1.5">
                    <h3 className="px-2 text-[10px] font-extrabold tracking-wider text-[#437118]">{section.title}</h3>
                    <div className="space-y-1">
                      {section.items.map(item => {
                        const itemCompleted = completedLessonIds.includes(item.id)
                        const itemActive = activeLesson.id === item.id
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveLessonId(item.id)}
                            className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                              itemActive
                                ? "bg-[#EAF4FA] font-bold text-[#1D2A62] ring-1 ring-[#87AECE]/45"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                          {itemCompleted ? (
                            <CheckCircle weight="fill" className="h-4 w-4 shrink-0 text-[#437118]" />
                          ) : item.id.includes("1.") ? (
                            <PlayCircle className="h-4 w-4 shrink-0 text-slate-400" />
                          ) : (
                            <span className="h-4 w-4 shrink-0 rounded-full border border-slate-300" />
                          )}
                          <span className="min-w-0 flex-1">{item.title}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                )
              })}
            </div>
          </Card>
        </aside>

        <main className="min-w-0 space-y-5">
          <Card className="overflow-hidden border-slate-200/90 shadow-sm">
            <div className={`flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7 ${isGettingStarted ? "border-[#AFD06E]/30 bg-gradient-to-br from-[#274818] via-[#386b24] to-[#4d8f31]" : "border-slate-100 bg-[#F8FCF6]"}`}>
              <div>
                <p className={`text-[10px] font-extrabold uppercase tracking-wider ${isGettingStarted ? "text-[#D8F0B0]" : "text-[#437118]"}`}>{activeLesson.section}</p>
                <h2 className={`mt-1 text-xl font-extrabold leading-tight ${isGettingStarted ? "text-white" : "text-[#1D2A62]"} sm:text-2xl`}>{activeLesson.title}</h2>
              </div>
              <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${isGettingStarted ? "bg-white/15 text-white ring-white/25" : "bg-white text-slate-500 ring-slate-200"}`}>
                {isCompleted ? <CheckCircle weight="fill" className={`h-3.5 w-3.5 ${isGettingStarted ? "text-[#AFD06E]" : "text-[#437118]"}`} /> : <Target className={`h-3.5 w-3.5 ${isGettingStarted ? "text-[#D8F0B0]" : "text-[#1D2A62]"}`} />}
                {isCompleted ? "Completed" : `Item ${activeLessonIndex + 1} of ${OUTLINE_ITEMS.length}`}
              </span>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              {activeLesson.id === "course-overview" && (
                <div className="space-y-5 text-sm leading-relaxed text-slate-700">
                  <p className="text-[#1D2A62]">
                    <strong>Event Readiness</strong> is the final check before delivery. It shifts the focus from what the team has completed behind the scenes to what participants will actually experience. In this course, Project Leaders learn what “event ready” really means and practise how to move an event from “done” to participant-ready by:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { title: "Prioritise", copy: "Identify what matters most to participants and event delivery.", cardClass: "border-[#AFD06E]/35 bg-[#EEF7E8]", Icon: Lightbulb },
                      { title: "Verify", copy: "Check critical information against reliable, up-to-date sources.", cardClass: "border-[#87AECE]/35 bg-[#F0F7FC]", Icon: ShieldCheck },
                      { title: "Test", copy: "Confirm that connected event elements work together before delivery.", cardClass: "border-[#F3C979]/45 bg-[#FFF7E5]", Icon: PlayCircle }
                    ].map(({ title, copy, cardClass, Icon }) => (
                      <div key={title} className={`rounded-2xl border p-4 text-center ${cardClass}`}>
                        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-[#437118] ring-1 ring-black/5">
                          <Icon weight="fill" className="h-5 w-5" />
                        </div>
                        <p className="font-bold text-[#1D2A62]">{title}</p>
                        <p className="mt-1 text-xs text-slate-600">{copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeLesson.id === "course-outcomes" && (
                <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                  <p>By the end of Event Readiness, you will be able to:</p>
                  <ul className="space-y-3">
                    {[
                      "Recognise which event elements require the most attention before delivery based on their potential impact on participants and event flow.",
                      "Use reliable, up-to-date sources to verify that critical information is accurate and ready for use.",
                      "Identify readiness gaps when completed tasks still need to be tested together, and select appropriate follow-up actions to ensure the event flow works as intended."
                    ].map(outcome => (
                      <li key={outcome} className="flex items-center gap-2">
                        <CheckCircle weight="fill" className="h-4 w-4 shrink-0 text-[#437118]" />
                        <span className="font-medium">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeLesson.id === "1.0-done-ready" && (
                <div className="space-y-5 text-sm leading-relaxed text-slate-700">
                  <div className="rounded-2xl border border-[#87AECE]/35 bg-[#EAF4FA] p-5">
                    <div className="flex items-center gap-2 font-bold text-[#1D2A62]"><Lightbulb weight="fill" className="h-5 w-5 text-[#437118]" />Done is evidence. Ready is confidence.</div>
                    <p className="mt-2 text-xs text-slate-600">A finished checklist does not guarantee that participants can find, understand, and use what they need.</p>
                  </div>
                  <p>Separate completion from readiness by checking the participant journey from first message to final handover.</p>
                </div>
              )}

              {activeLesson.id === "1.1-ready-framework" && (
                <div className="space-y-5 text-sm leading-relaxed text-slate-700">
                  <p>Use the Event Ready Framework as a repeatable three-step scan:</p>
                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      ["1", "Participant-critical", "What must be clear for people to take the next step?"],
                      ["2", "Source-verified", "Which details need a reliable source before sharing?"],
                      ["3", "Connected flow", "Where could one broken handoff interrupt the experience?"]
                    ].map(([number, title, copy]) => (
                      <div key={number} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1D2A62] text-xs font-bold text-white">{number}</span>
                        <p className="mt-3 font-bold text-[#1D2A62]">{title}</p>
                        <p className="mt-1 text-xs text-slate-600">{copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeLesson.id === "1.2-ready-simulation" && (
                <div className="space-y-5 text-sm leading-relaxed text-slate-700">
                  <div className="flex items-start gap-3 rounded-2xl border border-[#AFD06E]/40 bg-[#EEF7E8] p-5">
                    <Flag weight="fill" className="mt-0.5 h-5 w-5 shrink-0 text-[#437118]" />
                    <div><p className="font-bold text-[#1D2A62]">Simulation brief</p><p className="mt-1 text-xs text-slate-600">Walk through registration, arrival, participation, and follow-up as if you were a first-time participant.</p></div>
                  </div>
                  <p>Note one moment that feels unclear, one detail that needs verification, and one handoff that must be tested with another team member.</p>
                </div>
              )}

              {activeLesson.id === "2.0-quick-check" && (
                <div className="space-y-5">
                  <p className="text-sm leading-relaxed text-slate-700">Which check best demonstrates that an event is ready for participants?</p>
                  <div className="space-y-2">
                    {[
                      ["finished", "The team has completed every internal task."],
                      ["verified-tested", "Critical details are verified and the connected participant flow has been tested."],
                      ["approved", "The event has received final approval from the project leader."]
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setQuickCheckAnswer(value)}
                        className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors cursor-pointer ${quickCheckAnswer === value ? "border-[#437118] bg-[#EEF7E8] text-[#1D2A62] ring-1 ring-[#437118]" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
                      >
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${quickCheckAnswer === value ? "border-[#437118] bg-[#437118] text-white" : "border-slate-300"}`}>{quickCheckAnswer === value ? <Check className="h-3.5 w-3.5" /> : ""}</span>
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeLesson.id === "2.1-check-results" && (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-[#AFD06E]/40 bg-[#EEF7E8] p-5">
                    <div className="flex items-center gap-2 font-bold text-[#1D2A62]"><CheckCircle weight="fill" className="h-5 w-5 text-[#437118]" />Readiness result</div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">A ready event makes the participant journey observable, verifiable, and testable before delivery.</p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">Use this result to revisit any part of your event plan where completion has not yet translated into participant confidence.</p>
                </div>
              )}

              {activeLesson.id === "3.0-event-check" && (
                <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                  <p>Run this three-minute check immediately before your final briefing:</p>
                  {[
                    "Can a participant find the right time, location, and next step?",
                    "Have the critical details been checked against the latest reliable source?",
                    "Can the team explain what happens when the expected flow changes?"
                  ].map(checkItem => (
                    <div key={checkItem} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <CheckCircle weight="fill" className="mt-0.5 h-4 w-4 shrink-0 text-[#437118]" />
                      <span>{checkItem}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeLesson.id === "4.0-course-feedback" && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-[#1D2A62]">How useful was this course for your event planning?</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Very useful", "Useful", "Needs more practice"].map(rating => (
                        <button key={rating} type="button" onClick={() => setFeedbackRating(rating)} className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${feedbackRating === rating ? "border-[#437118] bg-[#EEF7E8] text-[#1D2A62]" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>{rating}</button>
                      ))}
                    </div>
                  </div>
                  <label className="block text-sm font-semibold text-[#1D2A62]">
                    One improvement you will make before delivery
                    <textarea value={feedbackText} onChange={event => setFeedbackText(event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 p-3 text-sm font-normal text-slate-700 outline-none transition focus:border-[#87AECE] focus:ring-2 focus:ring-[#87AECE]/20" placeholder="Write a short reflection..." />
                  </label>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full items-center justify-between gap-3">
                  {activeLessonIndex > 0 ? (
                    <Button type="button" variant="outline" onClick={handlePrevious} className="flex-1 cursor-pointer sm:flex-none">
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Previous
                    </Button>
                  ) : (
                    <span />
                  )}
                  <Button type="button" onClick={handlePrimaryAction} disabled={activeLesson.id === "2.0-quick-check" && !quickCheckAnswer} className="flex-1 cursor-pointer bg-[#1D2A62] hover:bg-[#16204a] sm:flex-none">
                    {primaryLabel}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex items-center gap-2 rounded-2xl border border-[#87AECE]/30 bg-[#F0F7FC] px-4 py-3 text-xs text-slate-600">
            <Sparkle className="h-4 w-4 shrink-0 text-[#437118]" />
            <span>Your progress is saved automatically on this device.</span>
          </div>
        </main>
      </div>
    </div>
  )
}
