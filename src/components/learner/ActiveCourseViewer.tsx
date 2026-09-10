import { useState } from "react"
import { Course, Lesson, QuizQuestion } from "@/data/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  CheckCircle, 
  PlayCircle, 
  FileText, 
  Exam, 
  Paperclip, 
  UploadSimple, 
  DownloadSimple,
  Lightbulb,
  Clock,
  Sparkle
} from "@phosphor-icons/react"
import confetti from "canvas-confetti"

interface ActiveCourseViewerProps {
  course: Course
  onBack: () => void
  onUpdateCourseProgress: (courseId: string, lessonId: string, completed: boolean) => void
  onSubmitAssignment: (courseId: string, lessonId: string, text: string, fileName?: string) => void
}

export function ActiveCourseViewer({
  course,
  onBack,
  onUpdateCourseProgress,
  onSubmitAssignment,
}: ActiveCourseViewerProps) {
  const allLessons: Lesson[] = course.modules.flatMap(m => m.lessons)
  const initialLesson = allLessons.find(l => !l.completed) || allLessons[0]

  const [activeLessonId, setActiveLessonId] = useState<string>(initialLesson?.id || "")
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [assignmentText, setAssignmentText] = useState("")
  const [attachmentName, setAttachmentName] = useState("")
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)

  const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0]
  const currentModule = course.modules.find(m => m.lessons.some(l => l.id === activeLessonId))

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    })
    if (activeLesson) {
      onUpdateCourseProgress(course.id, activeLesson.id, true)
    }
  }

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!assignmentText.trim()) {
      alert("Please write your assignment submission before sending.")
      return
    }
    setAssignmentSubmitted(true)
    onSubmitAssignment(course.id, activeLesson.id, assignmentText, attachmentName || "SBI_Scenario_TuanNM.docx")
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    })
    onUpdateCourseProgress(course.id, activeLesson.id, true)
  }

  const handleToggleComplete = () => {
    if (!activeLesson) return
    const nextState = !activeLesson.completed
    onUpdateCourseProgress(course.id, activeLesson.id, nextState)
    if (nextState) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      })
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[var(--page-canvas,#FFFFFF)] py-6 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onBack} className="cursor-pointer">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back to Dashboard
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {course.code}
                </span>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate max-w-md sm:max-w-xl">
                  {course.title}
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Facilitator: {course.instructorName} - {course.instructorTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-slate-500">Course Progress</span>
              <span className="text-xs font-bold text-slate-900">{course.progress}% Completed</span>
            </div>
            <Button
              variant={activeLesson?.completed ? "outline" : "default"}
              size="sm"
              onClick={handleToggleComplete}
              className="cursor-pointer"
            >
              <CheckCircle weight={activeLesson?.completed ? "fill" : "regular"} className="h-4 w-4 mr-1.5 text-emerald-600" />
              {activeLesson?.completed ? "Lesson Completed" : "Mark as Completed"}
            </Button>
          </div>
        </div>

        {/* Classroom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Stage Content: 8 cols */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stage Container */}
            <Card className="overflow-hidden border-slate-200 shadow-md">
              <div className="bg-slate-900 p-4 sm:p-6 text-white">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2">
                  <span className="uppercase tracking-wider font-semibold text-blue-400">
                    {currentModule?.title || "Lesson Overview"}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Clock className="h-3.5 w-3.5" />
                    {activeLesson?.duration}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {activeLesson?.title}
                </h2>
              </div>

              {/* Lesson Body depending on type */}
              <div className="p-5 sm:p-7 bg-white">
                {activeLesson?.type === "video" && (
                  <div className="space-y-6">
                    {/* Simulated High-End Video Player */}
                    <div className="relative aspect-video w-full rounded-xl bg-slate-950 overflow-hidden shadow-inner flex flex-col justify-between p-4 text-white">
                      <div className="flex items-center justify-between text-xs text-slate-300 z-10">
                        <span className="bg-slate-800/80 px-2.5 py-1 rounded backdrop-blur-xs font-mono">
                          HD 1080p - TalentCore LMS Player
                        </span>
                        <Badge variant="secondary" className="bg-blue-900/80 text-blue-200 border-none">
                          Interactive Slides Included
                        </Badge>
                      </div>

                      {/* Center Play Button */}
                      <div className="flex flex-col items-center justify-center my-auto text-center">
                        <button
                          type="button"
                          onClick={() => setVideoPlaying(!videoPlaying)}
                          className="h-16 w-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg hover:scale-105 hover:bg-blue-600 transition-all cursor-pointer"
                        >
                          <PlayCircle weight="fill" className="h-10 w-10 ml-0.5" />
                        </button>
                        <p className="mt-3 text-xs sm:text-sm font-medium text-slate-200">
                          {videoPlaying ? "Playing Lecture (Click to pause)" : "Click to play video lecture with closed captions"}
                        </p>
                      </div>

                      {/* Video Progress Bar Simulator */}
                      <div className="space-y-2 z-10">
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: videoPlaying ? "62%" : "35%" }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                          <span>{videoPlaying ? "15:20" : "08:45"}</span>
                          <span>{activeLesson.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Lesson Core Text Summary */}
                    <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3">
                      <h3 className="text-base font-bold text-slate-900">Key Lesson Takeaways</h3>
                      <p>{activeLesson.content}</p>
                      <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-blue-950 space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-blue-900">
                          <Lightbulb weight="fill" className="h-4 w-4 text-blue-700" />
                          <span>Practical Project Leadership Tip</span>
                        </div>
                        <p>
                          Practice non-interruptive listening in your next 1-on-1 sprint check-in with your committee members. Spend the first 5 minutes listening actively before delivering your evaluation.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeLesson?.type === "reading" && (
                  <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        In-Depth Reading Material
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        Cognitive Bias Frameworks and Psychological Safety in Project Teams
                      </h3>
                    </div>
                    <p>{activeLesson.content}</p>
                    <p>
                      To overcome perceptual distortions, project leaders must institute objective behaviorally-anchored criteria (BARS). Distinguishing between observable action and subjective emotion is the cornerstone of psychological safety across high-performing student initiatives.
                    </p>
                  </div>
                )}

                {activeLesson?.type === "quiz" && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        Knowledge Assessment Quiz
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        Select the most accurate answer for each prompt below
                      </h3>
                    </div>

                    {activeLesson.quiz?.map((q: QuizQuestion, qIndex: number) => {
                      const selected = selectedAnswers[q.id]
                      const isCorrect = selected === q.correctAnswer

                      return (
                        <div key={q.id} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                          <p className="font-semibold text-slate-900 text-sm">
                            Question {qIndex + 1}: {q.question}
                          </p>

                          <div className="space-y-2">
                            {q.options.map((opt, optIndex) => {
                              const isThisSelected = selected === optIndex
                              let optionClass = "border-slate-200 bg-white hover:border-slate-300 text-slate-800"

                              if (quizSubmitted) {
                                if (optIndex === q.correctAnswer) {
                                  optionClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-500"
                                } else if (isThisSelected && !isCorrect) {
                                  optionClass = "border-rose-400 bg-rose-50 text-rose-950 line-through"
                                }
                              } else if (isThisSelected) {
                                optionClass = "border-blue-600 bg-blue-50/60 text-blue-900 font-semibold ring-1 ring-blue-600"
                              }

                              return (
                                <button
                                  key={optIndex}
                                  type="button"
                                  disabled={quizSubmitted}
                                  onClick={() => handleSelectAnswer(q.id, optIndex)}
                                  className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optionClass}`}
                                >
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              )
                            })}
                          </div>

                          {quizSubmitted && (
                            <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                              isCorrect ? "bg-emerald-100 text-emerald-950 border border-emerald-200" : "bg-rose-100 text-rose-950 border border-rose-200"
                            }`}>
                              <p className="font-bold">
                                {isCorrect ? "Correct! Excellent answer." : "Incorrect."}
                              </p>
                              <p className="mt-1">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-500">
                        {quizSubmitted ? "Assessment Submitted" : "Select answers and click submit"}
                      </span>
                      {!quizSubmitted ? (
                        <Button
                          size="sm"
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(selectedAnswers).length < (activeLesson.quiz?.length || 1)}
                        >
                          <Exam className="h-4 w-4 mr-1.5" />
                          Submit Quiz
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setQuizSubmitted(false)
                            setSelectedAnswers({})
                          }}
                        >
                          Retake Assessment
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {activeLesson?.type === "assignment" && (
                  <div className="space-y-6">
                    <div className="rounded-xl bg-blue-50/50 p-4 border border-blue-100">
                      <div className="flex items-center justify-between text-xs text-blue-900 font-semibold mb-1">
                        <span>Practical Assignment Brief</span>
                        <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {activeLesson.assignment?.dueDaysText}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {activeLesson.assignment?.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {activeLesson.assignment?.instructions}
                      </p>

                      <div className="mt-4 pt-3 border-t border-blue-100">
                        <p className="text-xs font-semibold text-slate-900 mb-1.5">
                          Evaluation Rubric (Maximum {activeLesson.assignment?.maxScore} points):
                        </p>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                          {activeLesson.assignment?.rubric.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Submission Form */}
                    <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                          Your Written Response
                        </label>
                        <Textarea
                          value={assignmentText}
                          onChange={(e) => setAssignmentText(e.target.value)}
                          placeholder="Draft your situation-behavior-impact dialogue or paste your completed script here..."
                          className="min-h-[140px] text-xs sm:text-sm"
                          disabled={assignmentSubmitted}
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Recommendation: Clearly label Situation (S), Behavior (B), and Impact (I).
                        </p>
                      </div>

                      {/* File attachment simulator */}
                      <div className="p-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4 text-slate-500" />
                          <span className="text-xs text-slate-700">
                            {attachmentName || "Attach Word / PDF deliverable (optional)"}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setAttachmentName("SBI_Feedback_Script_TuanNM.docx")}
                          className="text-xs h-7"
                          disabled={assignmentSubmitted}
                        >
                          <UploadSimple className="h-3.5 w-3.5 mr-1" />
                          {attachmentName ? "Replace File" : "Select Sample File"}
                        </Button>
                      </div>

                      {assignmentSubmitted ? (
                        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs">
                          <p className="font-bold flex items-center gap-1.5">
                            <CheckCircle weight="fill" className="h-4 w-4 text-emerald-700" />
                            Assignment Submitted Successfully!
                          </p>
                          <p className="mt-1">
                            Your submission has been delivered to Facilitator Hoang Le Tram for grading and feedback.
                          </p>
                        </div>
                      ) : (
                        <Button type="submit" className="w-full sm:w-auto">
                          <UploadSimple className="h-4 w-4 mr-1.5" />
                          Submit to Facilitator
                        </Button>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </Card>

            {/* Course Material Downloads */}
            <Card className="p-5 border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-700" />
                Course Documents & Framework Templates
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Lecture_Slides_SBI_HRD102.pdf</p>
                    <p className="text-slate-500 text-[11px]">Size: 4.8 MB - Official Release</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => alert("Downloading: Lecture_Slides_SBI_HRD102.pdf")}
                  >
                    <DownloadSimple className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">SBI_Feedback_Template.docx</p>
                    <p className="text-slate-500 text-[11px]">Size: 320 KB - Practical Worksheet</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => alert("Downloading: SBI_Feedback_Template.docx")}
                  >
                    <DownloadSimple className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Syllabus Sidebar: 4 cols */}
          <div className="lg:col-span-4 space-y-5">
            <Card className="p-4 sm:p-5 border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900">Course Curriculum</h3>
                <span className="text-xs text-slate-500 font-medium">
                  {allLessons.filter(l => l.completed).length}/{allLessons.length} Completed
                </span>
              </div>

              {/* Module List */}
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <div key={module.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 px-1">
                      <span className="truncate max-w-[220px]">{module.title}</span>
                      <span className="text-slate-400 font-mono text-[10px]">{module.duration}</span>
                    </div>

                    <div className="space-y-1">
                      {module.lessons.map((lesson) => {
                        const isActive = lesson.id === activeLessonId

                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            onClick={() => setActiveLessonId(lesson.id)}
                            className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                              isActive
                                ? "bg-blue-50 text-blue-900 font-semibold ring-1 ring-blue-600/30"
                                : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {lesson.completed ? (
                                <CheckCircle weight="fill" className="h-4 w-4 text-emerald-600 shrink-0" />
                              ) : lesson.type === "video" ? (
                                <PlayCircle weight="regular" className="h-4 w-4 text-slate-400 shrink-0" />
                              ) : lesson.type === "quiz" ? (
                                <Exam weight="regular" className="h-4 w-4 text-amber-600 shrink-0" />
                              ) : (
                                <FileText weight="regular" className="h-4 w-4 text-slate-400 shrink-0" />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                              {lesson.duration}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Instructor Info Card */}
            <Card className="p-4 border-slate-200 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructorName}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-600/20"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                    Course Facilitator
                  </span>
                  <p className="text-sm font-bold text-slate-900">{course.instructorName}</p>
                  <p className="text-xs text-slate-500 leading-tight">{course.instructorTitle}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                For questions regarding module frameworks or assignment rubrics, reach out via the club leadership Slack or attend the weekly Friday coaching office hours.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
