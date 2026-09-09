import { useState } from "react"
import { AssignmentSubmission } from "@/data/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Paperclip, 
  PencilSimple, 
  Star,
  Check,
  Sparkle
} from "@phosphor-icons/react"
import confetti from "canvas-confetti"

interface GradingCenterProps {
  submissions: AssignmentSubmission[]
  onGradeSubmission: (submissionId: string, score: number, feedback: string) => void
}

export function GradingCenter({ submissions, onGradeSubmission }: GradingCenterProps) {
  const [selectedSubId, setSelectedSubId] = useState<string>(submissions[0]?.id || "")
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'graded'>('all')

  const currentSubmission = submissions.find(s => s.id === selectedSubId) || submissions[0]

  const [scoreInput, setScoreInput] = useState<number>(currentSubmission?.score || 90)
  const [feedbackInput, setFeedbackInput] = useState<string>(currentSubmission?.feedback || "")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSelectSubmission = (sub: AssignmentSubmission) => {
    setSelectedSubId(sub.id)
    setScoreInput(sub.score || 90)
    setFeedbackInput(sub.feedback || "")
    setSaveSuccess(false)
  }

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentSubmission) return

    onGradeSubmission(currentSubmission.id, scoreInput, feedbackInput)
    setSaveSuccess(true)
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    })
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const filteredList = submissions.filter(s => {
    if (filterStatus === 'all') return true
    return s.status === filterStatus
  })

  const quickFeedbackChips = [
    "The feedback script is highly specific and closely adheres to the SBI model.",
    "Include a concrete real-world situational example to increase impact.",
    "The concluding coaching questions are thoughtful and encourage accountability.",
    "Meets standard by cleanly distinguishing observable behavior from emotion."
  ]

  const getGradeRank = (score: number) => {
    if (score >= 90) return { label: "Distinction (Grade A)", color: "text-emerald-700" }
    if (score >= 80) return { label: "Merit (Grade B)", color: "text-blue-700" }
    if (score >= 65) return { label: "Pass (Grade C)", color: "text-amber-700" }
    return { label: "Needs Improvement (Grade D)", color: "text-rose-700" }
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Grading & Coaching Feedback Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Evaluate practical member submissions and provide actionable developmental feedback
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded text-xs font-medium cursor-pointer ${
              filterStatus === 'all' ? 'bg-white text-blue-700 shadow-xs font-semibold' : 'text-slate-600'
            }`}
          >
            All ({submissions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1 rounded text-xs font-medium cursor-pointer ${
              filterStatus === 'pending' ? 'bg-white text-blue-700 shadow-xs font-semibold' : 'text-slate-600'
            }`}
          >
            Pending ({submissions.filter(s => s.status === 'pending').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('graded')}
            className={`px-3 py-1 rounded text-xs font-medium cursor-pointer ${
              filterStatus === 'graded' ? 'bg-white text-blue-700 shadow-xs font-semibold' : 'text-slate-600'
            }`}
          >
            Graded ({submissions.filter(s => s.status === 'graded').length})
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Submissions List: 5 cols */}
        <div className="lg:col-span-5 space-y-3">
          {filteredList.map((sub) => {
            const isSelected = sub.id === selectedSubId
            return (
              <div
                key={sub.id}
                onClick={() => handleSelectSubmission(sub)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/40 shadow-sm ring-1 ring-blue-600/30"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={sub.learnerAvatar}
                      alt={sub.learnerName}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">
                        {sub.learnerName}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                        {sub.department}
                      </p>
                    </div>
                  </div>

                  {sub.status === 'pending' ? (
                    <Badge variant="warning" className="text-[10px]">Pending</Badge>
                  ) : (
                    <Badge variant="success" className="text-[10px]">
                      {sub.score} / 100
                    </Badge>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs">
                  <p className="font-medium text-slate-800 line-clamp-1">
                    {sub.courseTitle}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>Submitted: {sub.submittedAt}</span>
                    {sub.attachmentName && (
                      <span className="flex items-center gap-1 text-blue-600">
                        <Paperclip className="h-3 w-3" />
                        Attached File
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Grading Desk: 7 cols */}
        <div className="lg:col-span-7">
          {currentSubmission ? (
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                    Member Submission Review
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-0.5">
                    {currentSubmission.learnerName} - {currentSubmission.department}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Assignment: {currentSubmission.lessonTitle}
                  </p>
                </div>

                <div className="text-right text-xs">
                  <span className="text-slate-400">Submitted at:</span>
                  <p className="font-semibold text-slate-800">{currentSubmission.submittedAt}</p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Submission Content Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-2">
                    Submitted Script Content:
                  </label>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                    {currentSubmission.content}
                  </div>

                  {currentSubmission.attachmentName && (
                    <div className="mt-3 p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-700" />
                        <span className="font-medium text-slate-800">
                          {currentSubmission.attachmentName}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => alert(`Downloading submission document: ${currentSubmission.attachmentName}`)}
                      >
                        Download File
                      </Button>
                    </div>
                  )}
                </div>

                {/* Grading Controls Form */}
                <form onSubmit={handleSaveGrade} className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <label className="text-xs font-bold text-slate-900">
                      Evaluation Scale (0 - 100):
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="50"
                        max="100"
                        step="1"
                        value={scoreInput}
                        onChange={(e) => setScoreInput(Number(e.target.value))}
                        className="w-36 accent-blue-700 cursor-pointer"
                      />
                      <span className="text-base font-bold font-mono text-blue-900 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                        {scoreInput} / 100
                      </span>
                      <span className={`text-xs font-semibold ${getGradeRank(scoreInput).color}`}>
                        {getGradeRank(scoreInput).label}
                      </span>
                    </div>
                  </div>

                  {/* Feedback Chips */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Quick Coaching Prompts:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {quickFeedbackChips.map((chip, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFeedbackInput(prev => prev ? `${prev} ${chip}` : chip)}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-left"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                      Facilitator Coaching Feedback:
                    </label>
                    <Textarea
                      value={feedbackInput}
                      onChange={(e) => setFeedbackInput(e.target.value)}
                      placeholder="Enter detailed feedback highlighting strengths and development areas..."
                      className="min-h-[100px] text-xs sm:text-sm"
                    />
                  </div>

                  {saveSuccess && (
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                      <CheckCircle weight="fill" className="h-4 w-4 text-emerald-700" />
                      <span>Grade saved and feedback notification sent to member!</span>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button type="submit">
                      <Check className="h-4 w-4 mr-1.5" />
                      Save Grade & Send Feedback
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          ) : (
            <div className="p-8 text-center text-slate-500 rounded-xl border border-dashed border-slate-300">
              Select a member submission from the left panel to begin evaluation
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
