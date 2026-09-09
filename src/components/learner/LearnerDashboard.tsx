import { useState } from "react"
import { Course, CertificateItem } from "@/data/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { 
  GraduationCap, 
  BookOpen, 
  Hourglass, 
  Medal, 
  MagnifyingGlass, 
  Play, 
  CheckCircle,
  Sparkle,
  TrendUp,
  Target,
  Certificate,
  Eye,
  ArrowRight
} from "@phosphor-icons/react"

interface LearnerDashboardProps {
  courses: Course[]
  certificates: CertificateItem[]
  onSelectCourse: (course: Course) => void
  onViewCertificate: (cert: CertificateItem) => void
  activeTab?: 'my-courses' | 'catalog' | 'skills' | 'certificates'
  onTabChange?: (tab: 'my-courses' | 'catalog' | 'skills' | 'certificates') => void
}

export function LearnerDashboard({
  courses,
  certificates,
  onSelectCourse,
  onViewCertificate,
  activeTab: controlledTab,
  onTabChange,
}: LearnerDashboardProps) {
  const [internalTab, setInternalTab] = useState<'my-courses' | 'catalog' | 'skills' | 'certificates'>('my-courses')
  const activeTab = controlledTab ?? internalTab

  const setActiveTab = (tab: 'my-courses' | 'catalog' | 'skills' | 'certificates') => {
    if (onTabChange) {
      onTabChange(tab)
    } else {
      setInternalTab(tab)
    }
  }
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'Soft Skills & Management', label: 'Soft Skills & Management' },
    { id: 'Leadership & Strategy', label: 'Leadership & Strategy' },
    { id: 'Digital & AI', label: 'Digital & AI' },
    { id: 'Culture & Onboarding', label: 'Culture & Onboarding' }
  ]

  const inProgressCourses = courses.filter(c => c.status === 'in-progress')
  const completedCourses = courses.filter(c => c.status === 'completed')

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  const heroCourse = inProgressCourses[0] || courses[0]
  const avgProgress = courses.length > 0 ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length) : 50

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Learner Hero Banner with Recolored Event Leader Illustration */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Welcome Headline, Subtitle & CTA */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-50 border border-blue-200 text-[#1D2A62] text-[11px] font-bold px-3 py-0.5">
                Project Leader • Management Committee
              </span>
              <span className="text-xs text-slate-500 font-mono">ID: RFC-PL-2026</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#437118] via-[#1D2A62] to-[#1D2A62] bg-clip-text text-transparent leading-tight">
              Welcome back, Project Leader!
            </h1>

            <p className="text-sm sm:text-base text-[#68707D] leading-relaxed max-w-xl">
              Build the practical skills to lead club's projects and events with more clarity, confident and readiness
            </p>

            <div className="pt-2">
              <Button
                size="lg"
                onClick={() => setActiveTab('catalog')}
                className="h-12 px-6 rounded-full bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-sm shadow-sm cursor-pointer flex items-center gap-2"
              >
                <span>Continue Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* 3 Executive Learning Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-slate-100">
              {/* 1. Your Learning Progress */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
                {/* Circular Progress Gauge */}
                <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
                  <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#EDEDED"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#437118"
                      strokeWidth="3"
                      strokeDasharray="94.2"
                      strokeDashoffset={94.2 * (1 - avgProgress / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-extrabold text-[#1D2A62] font-mono">
                    {avgProgress}%
                  </span>
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-[#68707D] uppercase tracking-wider">
                    Your Learning Progress
                  </p>
                  <p className="text-sm font-extrabold text-[#1D2A62] leading-tight">
                    {completedCourses.length} of {courses.length} Completed
                  </p>
                  <p className="text-[10px] text-[#437118] font-semibold">
                    {avgProgress}% overall progress
                  </p>
                </div>
              </div>

              {/* 2. Current Course */}
              <div 
                role="button"
                tabIndex={0}
                onClick={() => onSelectCourse(heroCourse)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectCourse(heroCourse)
                }}
                className="p-3.5 rounded-2xl bg-blue-50/40 border border-[#87AECE]/40 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-[#1D2A62]/60 hover:bg-blue-50/70 transition-all text-left group"
                title="Click to resume Event Readiness"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#437118] animate-pulse" />
                      Current Course
                    </p>
                    <span className="text-[9px] font-bold font-mono text-blue-700 bg-blue-100/70 px-1.5 py-0.2 rounded">
                      In Progress
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1D2A62] group-hover:text-blue-700 transition-colors truncate">
                    Event Readiness
                  </h4>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[#68707D]">
                  <span className="font-mono text-[10px]">HRD-102 • 75% complete</span>
                  <span className="text-[#1D2A62] font-semibold text-[10px] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Resume →
                  </span>
                </div>
              </div>

              {/* 3. Next Up */}
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <p className="text-[10px] font-bold text-[#68707D] uppercase tracking-wider">
                      Next Up
                    </p>
                    <span className="text-[9px] font-semibold text-slate-500 bg-slate-200/70 px-1.5 py-0.2 rounded">
                      Upcoming
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1D2A62] truncate">
                    Event Audit
                  </h4>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[#68707D]">
                  <span className="font-mono text-[10px]">HRD-204 • Post-Event Review</span>
                  <span className="text-[10px] font-medium text-slate-400">
                    Locked
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Recolored Event Leader Illustration */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-[340px] sm:max-w-[380px] rounded-3xl bg-gradient-to-b from-[#87AECE]/15 via-[#EDEDED]/20 to-[#AFD06E]/15 border border-[#87AECE]/25 p-4 sm:p-6 flex items-center justify-center relative shadow-inner">
              <img
                src="/learner-hero-palette.png"
                alt="Project Leader with Event Checklist and Deliverables"
                loading="eager"
                className="w-full max-h-[300px] sm:max-h-[340px] object-contain drop-shadow-sm select-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('my-courses')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'my-courses'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            My Courses ({inProgressCourses.length + completedCourses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Curriculum Catalog ({courses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Competency Framework
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Certificates ({certificates.length})
          </button>
        </div>
      </div>

      {/* Tab: My Courses */}
      {activeTab === 'my-courses' && (
        <div className="space-y-6">
          {/* Spotlight Hero Course: Currently in Progress */}
          {heroCourse && (
            <Card className="overflow-hidden border-blue-200 bg-linear-to-r from-blue-50/40 via-white to-slate-50 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                <div className="md:col-span-4 relative rounded-lg overflow-hidden aspect-video md:aspect-auto">
                  <img
                    src={heroCourse.thumbnail}
                    alt={heroCourse.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="default" className="bg-blue-800 text-white">In Progress</Badge>
                  </div>
                </div>

                <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-blue-700">{heroCourse.code}</span>
                      <span>•</span>
                      <span>{heroCourse.category}</span>
                      <span>•</span>
                      <span>Level: {heroCourse.level}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{heroCourse.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {heroCourse.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200/60">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Lesson Completion</span>
                      <span className="font-bold text-blue-900 font-mono">{heroCourse.progress}%</span>
                    </div>
                    <Progress value={heroCourse.progress} className="h-2" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={heroCourse.instructorAvatar}
                        alt={heroCourse.instructorName}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                      <span className="text-xs text-slate-700 font-medium">
                        {heroCourse.instructorName}
                      </span>
                    </div>

                    <Button onClick={() => onSelectCourse(heroCourse)} className="cursor-pointer">
                      <Play weight="fill" className="h-4 w-4 mr-1.5" />
                      Enter Classroom
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Enrolled Courses Grid */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Enrolled Leadership Programs ({courses.filter(c => c.status !== 'assigned').length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(c => c.id !== heroCourse?.id).map((course) => (
                <Card key={course.id} className="flex flex-col justify-between overflow-hidden border-slate-200 hover:shadow-md transition-all">
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        {course.status === 'completed' ? (
                          <Badge variant="success">Completed</Badge>
                        ) : course.status === 'in-progress' ? (
                          <Badge variant="default">In Progress</Badge>
                        ) : (
                          <Badge variant="secondary">Assigned</Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-semibold text-blue-700">{course.code}</span>
                        <span>{course.duration}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="pt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">Progress</span>
                          <span className="font-bold text-slate-900 font-mono">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{course.instructorName}</span>
                    <Button
                      variant={course.status === 'completed' ? "outline" : "default"}
                      size="sm"
                      onClick={() => onSelectCourse(course)}
                    >
                      {course.status === 'completed' ? "Review Lessons" : "Resume Learning"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Course Catalog */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search curriculum by title, code, or competencies..."
                className="pl-9 text-xs sm:text-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-700 text-white font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="flex flex-col justify-between overflow-hidden border-slate-200 hover:shadow-md transition-all">
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-white/90 font-medium">
                        {course.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold text-blue-700">{course.code}</span>
                      <span>Duration: {course.duration}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {course.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {course.competencies.map((comp) => (
                        <span
                          key={comp}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400">Facilitator</p>
                    <p className="text-xs font-semibold text-slate-800">{course.instructorName}</p>
                  </div>
                  <Button size="sm" onClick={() => onSelectCourse(course)}>
                    View & Study
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Competency & Skill Matrix */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Personal Competency Framework 2026 - Project Leader Track
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Periodic leadership capability benchmarks standardized by the RMIT Finance Club L&D Committee. Core proficiencies are evaluated via practical assignments, objective quizzes, and facilitator feedback.
            </p>

            {/* Skill Bars */}
            <div className="mt-6 space-y-5">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 text-sm">Empathetic Communication & Constructive Feedback</span>
                  <span className="font-mono font-bold text-blue-700">85% / Benchmark: 80%</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-[11px] text-slate-500">
                  Completed HRD-102. Mastered the SBI model and 4-tier empathetic listening techniques.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 text-sm">Transformational Leadership & Strategic OKRs</span>
                  <span className="font-mono font-bold text-emerald-700">94% / Benchmark: 85%</span>
                </div>
                <Progress value={94} className="h-2" indicatorClassName="bg-emerald-600" />
                <p className="text-[11px] text-slate-500">
                  Awarded Distinction in HRD-204 certified by Dr. Vu Dinh Khang.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 text-sm">AI Applications & Workflow Automation</span>
                  <span className="font-mono font-bold text-amber-700">33% / Benchmark: 75%</span>
                </div>
                <Progress value={33} className="h-2" indicatorClassName="bg-amber-500" />
                <p className="text-[11px] text-slate-500">
                  Currently enrolled in HRD-305. Hands-on Prompt Engineering module due this month.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 text-sm">Organizational Culture & Member Experience</span>
                  <span className="font-mono font-bold text-slate-500">Not Started / Benchmark: 70%</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-[11px] text-slate-500">
                  Assigned HRD-101. Scheduled for onboarding in Quarter 4.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Certificates */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Verified Executive Certificates ({certificates.length})
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Official verified credentials certified across the RMIT Finance Club LMS network
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden border-slate-200 shadow-xs hover:shadow-md transition-all">
                <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Certificate weight="fill" className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="text-xs font-mono text-slate-400">{cert.credentialId}</p>
                      <h4 className="text-sm font-bold text-white">{cert.courseCode}</h4>
                    </div>
                  </div>
                  <Badge variant="success" className="bg-emerald-900/80 text-emerald-200 border-none">
                    Verified
                  </Badge>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 text-base">{cert.courseTitle}</h3>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>Awarded to: <span className="font-semibold text-slate-900">{cert.learnerName}</span></p>
                    <p>Certifying Lead: {cert.instructorName}</p>
                    <p>Issue Date: {cert.issueDate} • Grade: <span className="text-emerald-700 font-semibold">{cert.grade}</span></p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {cert.competencies.map((comp) => (
                      <span key={comp} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {comp}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => onViewCertificate(cert)}>
                      <Eye className="h-4 w-4 mr-1.5" />
                      View Certificate Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
