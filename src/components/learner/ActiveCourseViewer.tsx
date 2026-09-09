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
  // Find current active lesson (default to the first uncompleted or first lesson)
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
    // Auto mark quiz lesson complete
    if (activeLesson) {
      onUpdateCourseProgress(course.id, activeLesson.id, true)
    }
  }

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!assignmentText.trim()) {
      alert("Vui lòng nhập nội dung bài tập trước khi nộp.")
      return
    }
    setAssignmentSubmitted(true)
    onSubmitAssignment(course.id, activeLesson.id, assignmentText, attachmentName || "Bai_tap_thuc_hanh_TuanNM.docx")
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
    <div className="min-h-[100dvh] bg-slate-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onBack} className="cursor-pointer">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Bảng điều khiển
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
                Giảng viên: {course.instructorName} - {course.instructorTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-slate-500">Tiến độ khóa học</span>
              <span className="text-xs font-bold text-slate-900">{course.progress}% hoàn thành</span>
            </div>
            <Button
              variant={activeLesson?.completed ? "outline" : "default"}
              size="sm"
              onClick={handleToggleComplete}
              className="cursor-pointer"
            >
              <CheckCircle weight={activeLesson?.completed ? "fill" : "regular"} className="h-4 w-4 mr-1.5 text-emerald-600" />
              {activeLesson?.completed ? "Đã hoàn thành bài học" : "Đánh dấu hoàn thành"}
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
                    {currentModule?.title || "Nội dung bài học"}
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
                          Bài giảng có slide thuyết minh
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
                          {videoPlaying ? "Đang phát bài giảng (Nhấn để tạm dừng)" : "Nhấn để xem video bài giảng với phụ đề"}
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
                      <h3 className="text-base font-bold text-slate-900">Tóm tắt trọng tâm bài học</h3>
                      <p>{activeLesson.content}</p>
                      <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-blue-950 space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-blue-900">
                          <Lightbulb weight="fill" className="h-4 w-4 text-blue-700" />
                          <span>Gợi ý ứng dụng thực tế tại doanh nghiệp</span>
                        </div>
                        <p>
                          Hãy áp dụng kỹ thuật lắng nghe không ngắt lời trong buổi 1-on-1 tiếp theo của bạn với đồng nghiệp hoặc cấp dưới. Dành 5 phút đầu chỉ để lắng nghe trước khi đưa ra bất kỳ nhận định nào.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeLesson?.type === "reading" && (
                  <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Tài liệu đọc chuyên sâu
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        Khung phân tích hành vi và rào cản tâm lý trong giao tiếp
                      </h3>
                    </div>
                    <p>{activeLesson.content}</p>
                    <p>
                      Để khắc phục các rào cản nhận thức, người làm công tác quản trị và nhân sự cần thiết lập các tiêu chí đánh giá dựa trên hành vi cụ thể (Behaviorally Anchored Rating Scales - BARS). Việc bóc tách giữa hành vi khách quan và cảm xúc chủ quan là yếu tố then chốt giúp duy trì sự công bằng và an toàn tâm lý (Psychological Safety) trong tổ chức.
                    </p>
                  </div>
                )}

                {activeLesson?.type === "quiz" && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        Bài kiểm tra đánh giá kiến thức
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        Vui lòng chọn đáp án chính xác nhất cho các câu hỏi bên dưới
                      </h3>
                    </div>

                    {activeLesson.quiz?.map((q: QuizQuestion, qIndex: number) => {
                      const selected = selectedAnswers[q.id]
                      const isCorrect = selected === q.correctAnswer

                      return (
                        <div key={q.id} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                          <p className="font-semibold text-slate-900 text-sm">
                            Câu {qIndex + 1}: {q.question}
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
                                {isCorrect ? "Chính xác! Đáp án đúng." : "Chưa chính xác!"}
                              </p>
                              <p className="mt-1">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-500">
                        {quizSubmitted ? "Đã nộp bài đánh giá" : "Chọn câu trả lời và nhấn nộp bài"}
                      </span>
                      {!quizSubmitted ? (
                        <Button
                          size="sm"
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(selectedAnswers).length < (activeLesson.quiz?.length || 1)}
                        >
                          <Exam className="h-4 w-4 mr-1.5" />
                          Nộp bài trắc nghiệm
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
                          Làm lại bài kiểm tra
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {activeLesson?.type === "assignment" && (
                  <div className="space-y-6">
                    <div className="rounded-xl bg-blue-50/50 p-4 border border-blue-100">
                      <div className="flex items-center justify-between text-xs text-blue-900 font-semibold mb-1">
                        <span>Đề bài tập thực hành</span>
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
                          Tiêu chí chấm điểm (Rubric - Thang điểm {activeLesson.assignment?.maxScore}):
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
                          Nội dung bài làm của bạn
                        </label>
                        <Textarea
                          value={assignmentText}
                          onChange={(e) => setAssignmentText(e.target.value)}
                          placeholder="Nhập kịch bản phản hồi theo mô hình SBI hoặc dán bài viết chi tiết tại đây..."
                          className="min-h-[140px] text-xs sm:text-sm"
                          disabled={assignmentSubmitted}
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Khuyến nghị: Viết rõ ràng các mục Tình huống (S), Hành vi (B), Tác động (I).
                        </p>
                      </div>

                      {/* File attachment simulator */}
                      <div className="p-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4 text-slate-500" />
                          <span className="text-xs text-slate-700">
                            {attachmentName || "Đính kèm tài liệu Word / PDF (tùy chọn)"}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setAttachmentName("Kich_ban_Phan_hoi_SBI_TuanNM.docx")}
                          className="text-xs h-7"
                          disabled={assignmentSubmitted}
                        >
                          <UploadSimple className="h-3.5 w-3.5 mr-1" />
                          {attachmentName ? "Đổi file" : "Chọn file mẫu"}
                        </Button>
                      </div>

                      {assignmentSubmitted ? (
                        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs">
                          <p className="font-bold flex items-center gap-1.5">
                            <CheckCircle weight="fill" className="h-4 w-4 text-emerald-700" />
                            Đã nộp bài tập thành công!
                          </p>
                          <p className="mt-1">
                            Bài làm của bạn đã được chuyển vào Sổ chấm điểm của Giảng viên Hoàng Lê Trâm. Bạn sẽ nhận được thông báo khi bài được chấm xong.
                          </p>
                        </div>
                      ) : (
                        <Button type="submit" className="w-full sm:w-auto">
                          <UploadSimple className="h-4 w-4 mr-1.5" />
                          Nộp bài tập cho giảng viên
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
                Tài liệu & Biểu mẫu đính kèm khóa học
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Slide_Bai_Giang_SBI_HRD102.pdf</p>
                    <p className="text-slate-500 text-[11px]">Dung lượng: 4.8 MB - Bản chính thức</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => alert("Đang tải xuống tài liệu: Slide_Bai_Giang_SBI_HRD102.pdf")}
                  >
                    <DownloadSimple className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Template_Kich_ban_Phan_hoi.docx</p>
                    <p className="text-slate-500 text-[11px]">Dung lượng: 320 KB - Mẫu thực hành</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => alert("Đang tải xuống biểu mẫu: Template_Kich_ban_Phan_hoi.docx")}
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
                <h3 className="font-bold text-sm text-slate-900">Nội dung khóa học</h3>
                <span className="text-xs text-slate-500 font-medium">
                  {allLessons.filter(l => l.completed).length}/{allLessons.length} bài
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
                    Giảng viên hướng dẫn
                  </span>
                  <p className="text-sm font-bold text-slate-900">{course.instructorName}</p>
                  <p className="text-xs text-slate-500 leading-tight">{course.instructorTitle}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                Mọi thắc mắc về nội dung bài giảng và bài tập thực hành, học viên có thể gửi câu hỏi qua diễn đàn nội bộ hoặc buổi Q&A trực tuyến thứ Sáu hàng tuần.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
