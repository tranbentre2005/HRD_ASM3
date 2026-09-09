import { UserRole, Course, CertificateItem } from "@/data/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  Compass, 
  Lightning, 
  ShieldCheck, 
  ArrowRight, 
  Exam, 
  CheckSquare, 
  FolderSimplePlus, 
  Medal,
  Sparkle,
  Code
} from "@phosphor-icons/react"

interface PlatformOverviewProps {
  onSelectRole: (role: UserRole) => void
  onQuickStartCourse: (courseId: string) => void
  onOpenCertificate: () => void
}

export function PlatformOverview({
  onSelectRole,
  onQuickStartCourse,
  onOpenCertificate,
}: PlatformOverviewProps) {
  return (
    <div className="space-y-10 pb-16 font-sans">
      {/* Hero Presentation Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200">
              RMIT Finance Club • Project Leader Learning Hub
            </span>
            <Badge variant="outline">React 19 + Tailwind v4 + Shadcn UI</Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Leadership Capability & Project Governance Platform
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            An interactive executive learning hub engineered for student club leadership and project execution with dual independent perspectives: Learners and Trainers/Facilitators. Operates entirely in-session without backend database friction for immediate evaluation.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Button size="lg" onClick={() => onSelectRole('learner')} className="cursor-pointer">
              <GraduationCap weight="fill" className="h-5 w-5 mr-2" />
              Explore Learner Experience
            </Button>
            <Button size="lg" variant="outline" onClick={() => onSelectRole('instructor')} className="cursor-pointer">
              <ChalkboardTeacher weight="fill" className="h-5 w-5 mr-2 text-blue-700" />
              Explore Facilitator Experience
            </Button>
          </div>
        </div>
      </div>

      {/* Two-Role Interactive Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learner Card */}
        <Card className="p-6 border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <GraduationCap weight="duotone" className="h-7 w-7" />
              </div>
              <Badge variant="default">Learner Workspace</Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Role 1: Learners (Project Leaders & Trainees)
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Designed for project directors, committee deputies, and executive trainees progressing through capability tracks.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Interactive classroom: Video lectures, presentation slides, and notes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Objective knowledge quizzes: Automated scoring and detailed explanations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Scenario assignment submission: SBI model and file attachments.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Competency tracking: Skill radar and official verified LMS credentials.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6">
            <Button
              className="w-full justify-between"
              onClick={() => onSelectRole('learner')}
            >
              <span>Enter Learner Interface</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Instructor Card */}
        <Card className="p-6 border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ChalkboardTeacher weight="duotone" className="h-7 w-7" />
              </div>
              <Badge variant="success">Facilitator Workspace</Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Role 2: Trainers & L&D Facilitators
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Designed for club mentors, advisory board members, and L&D leads managing curriculum and monitoring team pacing.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Curriculum governance: Build and configure new leadership modules.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Grading desk: 100-point rubric, automatic tier ranking, and quick prompts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Coaching feedback: Structured constructive comments delivered to members.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Team analytics: Committee completion rates and pacing reminder triggers.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => onSelectRole('instructor')}
            >
              <span>Enter Facilitator Interface</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Interactive Scenarios for Testing */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Quick Evaluation Scenarios
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Key Business Flows for Immediate Hands-On Testing
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Click any scenario below to jump straight into the corresponding interactive feature
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onQuickStartCourse('course-1')}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer space-y-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Exam className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">1. Take Interactive Quiz</h4>
            <p className="text-xs text-slate-500">
              Open HRD-102, complete the SBI multiple-choice quiz, and see instant grading feedback.
            </p>
          </div>

          <div
            onClick={() => onQuickStartCourse('course-1')}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer space-y-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <Lightning className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">2. Submit Practical Task</h4>
            <p className="text-xs text-slate-500">
              Draft an SBI scenario response, attach deliverable file, and submit to facilitator.
            </p>
          </div>

          <div
            onClick={() => onSelectRole('instructor')}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all cursor-pointer space-y-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <CheckSquare className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">3. Grade & Provide Feedback</h4>
            <p className="text-xs text-slate-500">
              Enter the facilitator grading desk, adjust score slider, and publish coaching comments.
            </p>
          </div>

          <div
            onClick={onOpenCertificate}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/50 hover:border-amber-300 transition-all cursor-pointer space-y-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <Medal className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">4. Inspect LMS Certificate</h4>
            <p className="text-xs text-slate-500">
              Preview official verified completion certificate with download and print capabilities.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Specifications Footer Note */}
      <div className="rounded-xl border border-slate-200 bg-slate-100/70 p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-slate-500" />
          <span>Technical Architecture: React 19 • Tailwind CSS v4 • Shadcn UI Architecture • Zero Backend Dependency</span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          RMIT Finance Club • Project Leader Learning Hub
        </div>
      </div>
    </div>
  )
}
