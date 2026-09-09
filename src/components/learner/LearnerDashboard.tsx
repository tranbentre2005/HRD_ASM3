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
  ArrowRight,
  DiamondsFour,
  PlayCircle,
  BookmarkSimple,
  Timer
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
      {/* Learner Hero Banner with Enhanced Visual Atmosphere */}
      <div className="relative rounded-3xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fbfdfe] to-[#f2f7fa] p-6 sm:p-8 lg:p-10 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] overflow-hidden">
        {/* Subtle Ambient Decorative Geometry in Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-radial from-[#87AECE]/15 via-[#AFD06E]/10 to-transparent pointer-events-none -z-0" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-radial from-[#87AECE]/10 to-transparent pointer-events-none -z-0" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Welcome Headline, Subtitle & CTA */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/90 border border-[#87AECE]/40 shadow-2xs backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-[#437118] animate-pulse" />
              <span className="text-[11px] font-bold text-[#1D2A62]">
                Project Leader • Management Committee
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-[#68707D] font-mono">RFC-PL-2026</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#437118] via-[#1D2A62] to-[#1D2A62] bg-clip-text text-transparent leading-tight">
              Welcome back, Project Leader!
            </h1>

            <p className="text-sm sm:text-base text-[#68707D] leading-relaxed max-w-xl">
              Build the practical skills to lead club's projects and events with more clarity, confident and readiness
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => setActiveTab('catalog')}
                className="h-12 px-7 rounded-full bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2.5 group active:scale-[0.98]"
              >
                <span>Continue Learning</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="flex items-center gap-1.5 text-xs text-[#68707D] font-medium">
                <Sparkle weight="fill" className="h-3.5 w-3.5 text-[#437118]" />
                <span>Ready for Q3 Event Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Artwork with Floating Status Chips */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              {/* Floating Chip 1: Top Right */}
              <div className="absolute -top-3 -right-2 z-20 bg-white/95 backdrop-blur-xs rounded-full px-3 py-1 shadow-md border border-[#87AECE]/40 flex items-center gap-1.5 text-[10px] font-bold text-[#1D2A62]">
                <Medal weight="fill" className="h-3.5 w-3.5 text-[#437118]" />
                <span>Readiness Verified</span>
              </div>

              {/* Organic Soft-Tinted Backdrop */}
              <div className="w-full rounded-[36px] bg-gradient-to-tr from-[#87AECE]/20 via-[#EDEDED]/30 to-[#AFD06E]/20 border border-[#87AECE]/30 p-5 sm:p-6 flex items-center justify-center relative shadow-inner">
                <img
                  src="/learner-hero-palette.png"
                  alt="Project Leader with Event Checklist and Deliverables"
                  loading="eager"
                  className="w-full max-h-[290px] sm:max-h-[320px] object-contain drop-shadow-sm select-none"
                />
              </div>

              {/* Floating Chip 2: Bottom Left */}
              <div className="absolute -bottom-3 -left-2 z-20 bg-white/95 backdrop-blur-xs rounded-full px-3 py-1 shadow-md border border-[#87AECE]/40 flex items-center gap-1.5 text-[10px] font-bold text-[#1D2A62]">
                <span className="h-2 w-2 rounded-full bg-[#437118] animate-pulse" />
                <span>Live Sprint • Q3</span>
              </div>
            </div>
          </div>

          {/* Full-Width Bottom Row: 3 Executive Cards Exactly Formatted per Image */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200/60">
            {/* Card 1: YOUR LEARNING PROGRESS */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs hover:border-[#87AECE] hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left">
              <div className="flex items-center gap-2 mb-3">
                <DiamondsFour weight="bold" className="h-4 w-4 text-[#437118]" />
                <h3 className="text-xs sm:text-sm font-extrabold text-[#437118] tracking-wider uppercase">
                  YOUR LEARNING PROGRESS
                </h3>
              </div>

              <div className="flex items-center gap-3.5 my-auto">
                {/* Circular Gauge */}
                <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
                  <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#EDEDED"
                      strokeWidth="3.5"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#437118"
                      strokeWidth="3.5"
                      strokeDasharray="94.2"
                      strokeDashoffset="63.1"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-[#1D2A62] font-mono">
                    33%
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  <p className="text-xs font-semibold text-[#1D2A62]">
                    3 of 9 courses started
                  </p>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#437118] rounded-full w-[33%]" />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#68707D] pt-3 leading-snug">
                Keep going! You're building real skills for real impact.
              </p>
            </div>

            {/* Card 2: CURRENT COURSE */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs hover:border-[#87AECE] hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <PlayCircle weight="fill" className="h-4 w-4 text-[#437118]" />
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#437118] tracking-wider uppercase">
                    CURRENT COURSE
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                  In Progress
                </span>
              </div>

              <div className="space-y-2 my-auto">
                <h4 className="text-xs sm:text-sm font-bold text-[#1D2A62] leading-snug">
                  Event Readiness | From "Done" to Participant-Ready
                </h4>

                <div className="flex items-center gap-2.5">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#437118] rounded-full w-[40%]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#68707D] font-mono">
                    40%
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onSelectCourse(heroCourse)}
                  className="bg-[#0f2e24] hover:bg-[#0a2019] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 w-fit transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <span>Continue Course</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: NEXT UP */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs hover:border-[#87AECE] hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left">
              <div className="flex items-center gap-2 mb-2">
                <BookmarkSimple weight="bold" className="h-4 w-4 text-[#437118]" />
                <h3 className="text-xs sm:text-sm font-extrabold text-[#437118] tracking-wider uppercase">
                  NEXT UP
                </h3>
              </div>

              <div className="space-y-1 my-auto">
                <h4 className="text-xs sm:text-sm font-bold text-[#1D2A62] leading-snug">
                  Event Ready Simulation
                </h4>

                <div className="flex items-center gap-1.5 text-[11px] text-[#68707D]">
                  <Timer className="h-3.5 w-3.5 text-slate-400" />
                  <span className="font-medium">1.4 | ~ 2 min</span>
                </div>

                <p className="text-[11px] text-[#68707D] leading-snug pt-0.5">
                  Put your skills into practice with a realistic scenario.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onSelectCourse(heroCourse)}
                  className="bg-slate-100 hover:bg-slate-200 text-[#1D2A62] text-xs font-semibold px-4 py-2 rounded-lg w-fit transition-colors cursor-pointer"
                >
                  Start Next Activity
                </button>
              </div>
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
