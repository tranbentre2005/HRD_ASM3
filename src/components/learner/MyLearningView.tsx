import { Course, CertificateItem } from "@/data/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, ArrowLeft, Medal, Certificate, Eye, CheckCircle, ArrowRight } from "@phosphor-icons/react"

interface MyLearningViewProps {
  courses: Course[]
  certificates: CertificateItem[]
  onSelectCourse: (course: Course) => void
  onViewCertificate: (cert: CertificateItem) => void
  onBackToHome: () => void
}

export function MyLearningView({
  courses,
  certificates,
  onSelectCourse,
  onViewCertificate,
  onBackToHome,
}: MyLearningViewProps) {
  const inProgressCourses = courses.filter((c) => c.status === "in-progress")
  const completedCourses = courses.filter((c) => c.status === "completed")
  const eventReadinessCourse = courses.find(
    (c) => c.id === "event-readiness" || c.id === "course-1" || c.title.includes("Event Readiness")
  ) || inProgressCourses[0] || courses[0]
  return (
    <div className="space-y-8 pb-12 font-sans text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBackToHome} className="cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1D2A62]">
              My Learning Dashboard & Progress
            </h1>
            <p className="text-xs text-[#68707D] mt-0.5">
              Personal leadership training records, active courses, and certificates
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#1D2A62] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
          {inProgressCourses.length} Active • {completedCourses.length} Completed
        </span>
      </div>

      {/* In Progress Courses */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#1D2A62]">
          Courses in Progress ({inProgressCourses.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inProgressCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden border-slate-200/90 shadow-sm bg-white p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-bold text-blue-700">{course.code}</span>
                    <span>•</span>
                    <Badge variant="default" className="text-[10px] bg-[#1D2A62]">{course.category}</Badge>
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{course.title}</h3>
                </div>
                <Badge variant="info">In Progress</Badge>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#68707D]">Completion Progress</span>
                  <span className="font-bold text-[#1D2A62]">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">{course.instructorName}</span>
                <Button size="sm" onClick={() => onSelectCourse(course)}>
                  <Play weight="fill" className="h-3.5 w-3.5 mr-1" />
                  Resume Learning
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 1. YOUR NEXT MILESTONE */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#437118] uppercase tracking-wider block">
              YOUR NEXT MILESTONE
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-[#437118]">
              {eventReadinessCourse?.progress || 40}% complete
            </span>
          </div>
          <h3 className="text-base font-bold text-[#1D2A62] leading-snug">
            Complete Event Readiness
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strengthen your delivery readiness before rehearsal.
          </p>
        </div>

        <div className="shrink-0 pt-1 sm:pt-0">
          <button
            type="button"
            onClick={() => eventReadinessCourse && onSelectCourse(eventReadinessCourse)}
            className="h-8 px-3.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[#1D2A62] font-semibold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2A62]"
          >
            <span>Continue Course</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Completed Certificates Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-base font-bold text-[#1D2A62]">
          Earned Certificates ({certificates.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden border-slate-200 shadow-xs hover:shadow-md transition-all bg-white p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#437118]">
                  <Certificate weight="fill" className="h-5 w-5" />
                  <span className="text-xs font-bold">{cert.credentialId}</span>
                </div>
                <Badge variant="success" className="text-[10px]">Verified Credential</Badge>
              </div>

              <h3 className="font-bold text-slate-900 text-base">{cert.courseTitle}</h3>

              <div className="text-xs text-[#68707D] space-y-1">
                <p>Awarded to: <span className="font-semibold text-slate-900">{cert.learnerName}</span></p>
                <p>Grade: <span className="text-emerald-700 font-semibold">{cert.grade}</span></p>
                <p>Date: {cert.issueDate}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => onViewCertificate(cert)}>
                  <Eye className="h-4 w-4 mr-1.5" />
                  View Certificate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 2. APPLY IT NEXT */}
      <div className="rounded-xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#FCFDFE] to-[#F2F7FA] p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left relative overflow-hidden">
        {/* Small moss-green accent strip on the left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#437118]" />

        <div className="space-y-1.5 flex-1 pl-1">
          <span className="text-[10px] font-bold text-[#437118] uppercase tracking-wider block">
            APPLY IT NEXT
          </span>
          <h3 className="text-base font-bold text-[#1D2A62] leading-snug">
            Before your final rehearsal
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
            Preview the 3-Minute Event Readiness Check to verify participant-critical information and event flow.
          </p>
        </div>

        <div className="shrink-0 pt-1 sm:pt-0 pl-1 sm:pl-0">
          <button
            type="button"
            onClick={() => eventReadinessCourse && onSelectCourse(eventReadinessCourse)}
            className="h-8 px-3.5 rounded-lg border border-[#87AECE]/50 bg-white hover:bg-[#F2F7FA] text-[#1D2A62] font-semibold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2A62]"
          >
            <span>View Ready Check</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
