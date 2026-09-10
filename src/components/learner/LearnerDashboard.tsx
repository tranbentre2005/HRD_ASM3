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
  ArrowLeft,
  ArrowDown,
  ArrowSquareOut,
  DiamondsFour,
  PlayCircle,
  BookmarkSimple,
  Timer,
  Compass,
  Users,
  RocketLaunch,
  Brain,
  CalendarCheck,
  ShieldCheck,
  ArrowsClockwise
} from "@phosphor-icons/react"

interface LearnerDashboardProps {
  courses: Course[]
  certificates: CertificateItem[]
  onSelectCourse: (course: Course) => void
  onViewCertificate: (cert: CertificateItem) => void
  onNavigateCourses?: (category?: string) => void
  onNavigateMyLearning?: () => void
  activeTab?: 'my-courses' | 'catalog' | 'skills' | 'certificates'
  onTabChange?: (tab: 'my-courses' | 'catalog' | 'skills' | 'certificates') => void
}

export function LearnerDashboard({
  courses,
  certificates,
  onSelectCourse,
  onViewCertificate,
  onNavigateCourses,
  onNavigateMyLearning,
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
  const [isPathwayRevealed, setIsPathwayRevealed] = useState(false)
  const [isHoveringPathway, setIsHoveringPathway] = useState(false)
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
    <div className="space-y-5 pb-6 font-sans">
      {/* Learner Hero Banner with Dynamic Background & Aligned Proportions */}
      <div className="relative rounded-2xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fcfdfe] to-[#f2f7fa] p-6 sm:p-8 lg:p-10 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] overflow-hidden">
        {/* Subtle Architectural Dot Matrix Grid */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#87AECE_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none -z-0" 
        />

        {/* Ambient Radial Halo Blooms */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 w-[450px] h-[450px] rounded-full bg-radial from-[#AFD06E]/20 via-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-2xl" />
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-radial from-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-xl" />

        {/* Subtle Concentric Leadership Arcs framing the enlarged artwork */}
        <svg 
          className="absolute right-0 top-0 h-full w-[48%] pointer-events-none -z-0 opacity-45 select-none overflow-visible hidden md:block"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="260" cy="180" r="95" stroke="#87AECE" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="260" cy="180" r="160" stroke="#87AECE" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="260" cy="180" r="230" stroke="#AFD06E" strokeWidth="1.2" strokeDasharray="5 5" />
          <circle cx="165" cy="180" r="3.5" fill="#437118" />
          <circle cx="260" cy="20" r="3.5" fill="#1D2A62" />
          <circle cx="355" cy="180" r="3.5" fill="#87AECE" />
          <circle cx="260" cy="340" r="3.5" fill="#AFD06E" />
        </svg>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Welcome Headline, Subtitle & Primary CTA */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="h-2 w-2 rounded-full bg-[#437118]" />
              <span className="font-semibold text-slate-900">Project Leader</span>
              <span className="text-slate-400">•</span>
              <span>Management Committee</span>
              <span className="text-slate-300">|</span>
              <span className="font-mono text-[#5A6578]">RFC-PL-2026</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight bg-gradient-to-r from-[#437118] via-[#1D2A62] to-[#1D2A62] bg-clip-text text-transparent leading-[1.15]">
              Welcome back, Project Leader!
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Build the practical skills to lead club projects and events with clarity and confidence.
            </p>

            <div className="pt-2">
              <Button
                size="lg"
                onClick={() => onNavigateCourses ? onNavigateCourses("all") : setActiveTab('catalog')}
                className="h-11 px-6 rounded-xl bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2 group active:scale-[0.98]"
              >
                <span>Continue Learning</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Column: Harmonized Illustration with Smooth Floating Motion */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <img
              src="/learner-hero-palette.png"
              alt="Project Leader with Event Checklist and Deliverables"
              loading="eager"
              className="max-h-[280px] sm:max-h-[310px] lg:max-h-[320px] w-auto object-contain select-none animate-hero-float drop-shadow-md hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3 Executive Metric Cards: Scaled down 10%, Navy borders on white cards, aligned title row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1: YOUR LEARNING PROGRESS (Deep Navy Gradient style matching Card 2) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#121B3F] via-[#1D2A62] to-[#253A78] border border-[#87AECE]/30 text-white p-4 sm:p-5 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-md relative overflow-hidden">
          {/* Ambient light layers */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-radial from-white/10 via-transparent to-transparent pointer-events-none blur-xl" />
          <div className="absolute -bottom-8 left-1/4 w-32 h-32 rounded-full bg-radial from-[#87AECE]/15 via-transparent to-transparent pointer-events-none blur-xl" />

          <div className="relative z-10">
            {/* Aligned Top Title Row */}
            <div className="h-7 flex items-center">
              <h3 className="text-xs font-bold text-[#87AECE] tracking-wider uppercase">
                YOUR LEARNING PROGRESS
              </h3>
            </div>

            <div className="flex items-center gap-3.5 my-auto py-1.5">
              {/* Circular Gauge */}
              <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
                <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.18)"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#87AECE"
                    strokeWidth="3.5"
                    strokeDasharray="94.2"
                    strokeDashoffset={94.2 * (1 - 0.60)}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-white font-mono">
                  60%
                </span>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  60% of your pathway complete
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-200 font-medium">
                  3 courses completed · 2 in progress
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 relative z-10">
            <button
              type="button"
              onClick={() => onNavigateMyLearning ? onNavigateMyLearning() : (onNavigateCourses ? onNavigateCourses("all") : setActiveTab('catalog'))}
              className="w-full py-2 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#1D2A62] font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
            >
              <span>View My Learning</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#1D2A62]" />
            </button>
          </div>
        </div>

        {/* Card 2: CURRENT COURSE (Gradient Forest Green matching "Leading an event soon") */}
        <div className="rounded-2xl bg-gradient-to-br from-[#274818] via-[#386b24] to-[#4d8f31] border border-[#AFD06E]/25 text-white p-4 sm:p-5 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-md relative overflow-hidden">
          {/* Ambient light layers */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-radial from-white/10 via-transparent to-transparent pointer-events-none blur-xl" />
          <div className="absolute -bottom-8 left-1/4 w-32 h-32 rounded-full bg-radial from-[#AFD06E]/15 via-transparent to-transparent pointer-events-none blur-xl" />

          <div className="relative z-10">
            {/* Aligned Top Title Row: Title on Left, 'In Progress' Badge on Top Right */}
            <div className="h-7 flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold text-[#AFD06E] tracking-wider uppercase">
                CURRENT COURSE
              </h3>
              <span className="inline-flex items-center gap-1.5 bg-white text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-[#386b24]" />
                In Progress
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white leading-snug mt-2">
              Event Readiness | From 'Done' to Participant-Ready
            </h4>
          </div>
          <div className="space-y-2.5 pt-2 relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-black/25 rounded-full overflow-hidden">
                <div className="h-full bg-[#AFD06E] rounded-full w-[40%]" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-white font-mono shrink-0">
                40%
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelectCourse(heroCourse)}
              className="w-full py-2 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#386b24] font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
            >
              <span>Continue Course</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: NEXT UP (Deep Navy Gradient style matching Card 2) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#121B3F] via-[#1D2A62] to-[#253A78] border border-[#87AECE]/30 text-white p-4 sm:p-5 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-md relative overflow-hidden">
          {/* Ambient light layers */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-radial from-white/10 via-transparent to-transparent pointer-events-none blur-xl" />
          <div className="absolute -bottom-8 left-1/4 w-32 h-32 rounded-full bg-radial from-[#87AECE]/15 via-transparent to-transparent pointer-events-none blur-xl" />

          <div className="relative z-10">
            {/* Aligned Top Title Row */}
            <div className="h-7 flex items-center">
              <h3 className="text-xs font-bold text-[#87AECE] tracking-wider uppercase">
                NEXT UP
              </h3>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white leading-snug mt-2">
              Event Ready Simulation
            </h4>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-200 mt-1">
              <Timer className="h-3.5 w-3.5 text-[#87AECE]" />
              <span className="font-medium">1.4 | ~ 2 min</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-200 font-medium leading-relaxed mt-1.5">
              Put your skills into practice with a realistic scenario.
            </p>

          <div className="pt-2 relative z-10">
            <button
              type="button"
              onClick={() => onSelectCourse(heroCourse)}
              className="w-full py-2 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#1D2A62] font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-[0.98] text-center"
            >
              <span>Start Next Activity</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#1D2A62]" />
            </button>
          </div>
        </div>
      </div>

      {/* About Learning Hub & Interactive Learning Pathway Section - Styled like Hero Banner (without concentric circles) */}
      <div 
        className="relative rounded-2xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fcfdfe] to-[#f2f7fa] p-6 sm:p-8 lg:p-10 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] overflow-hidden transition-all duration-300"
      >
        {/* Subtle Architectural Dot Matrix Grid */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#87AECE_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none -z-0" 
        />

        {/* Ambient Radial Halo Blooms */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 w-[450px] h-[450px] rounded-full bg-radial from-[#AFD06E]/20 via-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-2xl" />
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-radial from-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-xl" />

        <div className="relative z-10 space-y-6 text-center">
          {/* Centered Single Header Block */}
          <div className="space-y-3 max-w-3xl mx-auto text-center">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#437118] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#437118]"></span>
                </span>
                <span className="text-[11px] font-bold text-[#437118] tracking-wider uppercase font-mono">
                  PROJECT LEADER LEARNING HUB
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#437118] via-[#1D2A62] to-[#1D2A62] bg-clip-text text-transparent leading-tight block">
              Build your Project Leader capability
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              The RMIT Vietnam Finance Club Project Leader Learning Hub brings together short courses, interactive practice, simulations, and practical tools to help you strengthen the capabilities needed across the event lifecycle - from thinking strategically and coordinating plans to leading people, delivering with readiness, and learning from experience.
            </p>
          </div>

          {/* 5-Step Process Flow with Wavy Undulating Dashed Connector - Centered with equal spacing */}
          <div className="pt-6 pb-2 relative max-w-5xl mx-auto">
            {/* Undulating Wavy Dashed Connector Curve passing through icon centers */}
            <div className="hidden lg:block absolute top-[28px] left-[8%] right-[8%] h-[40px] pointer-events-none z-0">
              <svg 
                className="w-full h-full overflow-visible" 
                viewBox="0 0 1000 60" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path
                  d="M 20 30 Q 140 2, 260 30 T 500 30 T 740 30 T 980 30"
                  stroke="#87AECE"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  className="opacity-70 animate-flow-line"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 text-center relative z-10 items-start justify-items-center">
              {/* Step 1: Think Strategically */}
              <div className="flex flex-col items-center space-y-2 group w-full max-w-[200px]">
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#AFD06E]/60 shadow-xs flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:shadow-md group-hover:border-[#437118]">
                  <div className="w-10 h-10 rounded-full bg-[#AFD06E]/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#437118]">
                    <Brain weight="duotone" className="h-5 w-5 text-[#437118] transition-colors duration-300 group-hover:text-white" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#68707D] uppercase tracking-wider font-mono">
                  Step 01
                </span>
                <h3 className="text-sm sm:text-[15px] font-bold text-[#1D2A62] leading-snug h-9 flex items-center justify-center">
                  Think Strategically
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[54px] flex items-start justify-center">
                  Understand event purpose, participants, and priorities.
                </p>
              </div>

              {/* Step 2: Plan & Coordinate */}
              <div className="flex flex-col items-center space-y-2 group w-full max-w-[200px]">
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#AFD06E]/60 shadow-xs flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:shadow-md group-hover:border-[#437118]">
                  <div className="w-10 h-10 rounded-full bg-[#AFD06E]/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#437118]">
                    <CalendarCheck weight="duotone" className="h-5 w-5 text-[#437118] transition-colors duration-300 group-hover:text-white" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#68707D] uppercase tracking-wider font-mono">
                  Step 02
                </span>
                <h3 className="text-sm sm:text-[15px] font-bold text-[#1D2A62] leading-snug h-9 flex items-center justify-center">
                  Plan & Coordinate
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[54px] flex items-start justify-center">
                  Turn ideas into clear tasks, timelines, ownership, and dependencies.
                </p>
              </div>

              {/* Step 3: Lead People */}
              <div className="flex flex-col items-center space-y-2 group w-full max-w-[200px]">
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#AFD06E]/60 shadow-xs flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:shadow-md group-hover:border-[#437118]">
                  <div className="w-10 h-10 rounded-full bg-[#AFD06E]/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#437118]">
                    <Users weight="duotone" className="h-5 w-5 text-[#437118] transition-colors duration-300 group-hover:text-white" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#68707D] uppercase tracking-wider font-mono">
                  Step 03
                </span>
                <h3 className="text-sm sm:text-[15px] font-bold text-[#1D2A62] leading-snug h-9 flex items-center justify-center">
                  Lead People
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[54px] flex items-start justify-center">
                  Communicate, delegate, collaborate, and support your team.
                </p>
              </div>

              {/* Step 4: Deliver With Readiness */}
              <div className="flex flex-col items-center space-y-2 group w-full max-w-[200px]">
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#AFD06E]/60 shadow-xs flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:shadow-md group-hover:border-[#437118]">
                  <div className="w-10 h-10 rounded-full bg-[#AFD06E]/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#437118]">
                    <ShieldCheck weight="duotone" className="h-5 w-5 text-[#437118] transition-colors duration-300 group-hover:text-white" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#68707D] uppercase tracking-wider font-mono">
                  Step 04
                </span>
                <h3 className="text-sm sm:text-[15px] font-bold text-[#1D2A62] leading-snug h-9 flex items-center justify-center">
                  Deliver With Readiness
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[54px] flex items-start justify-center">
                  Verify critical information, test event flow, and manage issues.
                </p>
              </div>

              {/* Step 5: Reflect & Improve */}
              <div className="flex flex-col items-center space-y-2 group w-full max-w-[200px]">
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#AFD06E]/60 shadow-xs flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:shadow-md group-hover:border-[#437118]">
                  <div className="w-10 h-10 rounded-full bg-[#AFD06E]/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#437118]">
                    <ArrowsClockwise weight="bold" className="h-5 w-5 text-[#437118] transition-colors duration-300 group-hover:text-white" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#68707D] uppercase tracking-wider font-mono">
                  Step 05
                </span>
                <h3 className="text-sm sm:text-[15px] font-bold text-[#1D2A62] leading-snug h-9 flex items-center justify-center">
                  Reflect & Improve
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[54px] flex items-start justify-center">
                  Learn from feedback and strengthen future events.
                </p>
              </div>
            </div>
          </div>

          {/* CTA & Interactive Pathway Section: Revealed on Hover over CTA or Cards, or on Click */}
          <div 
            className="pt-4 space-y-2"
            onMouseEnter={() => setIsHoveringPathway(true)}
            onMouseLeave={() => setIsHoveringPathway(false)}
          >
            <div className="flex flex-col items-center justify-center">
              <button
                type="button"
                onMouseEnter={() => setIsHoveringPathway(true)}
                onClick={() => setIsPathwayRevealed(!isPathwayRevealed)}
                className="h-14 px-8 rounded-full bg-[#1D2A62] hover:bg-[#16204a] text-white text-sm font-semibold flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.98] group"
              >
                <span>Explore the Learning Pathway</span>
                <ArrowDown className={`h-4 w-4 mt-0.5 text-[#AFD06E] animate-gentle-bob transition-transform duration-200 ${isHoveringPathway || isPathwayRevealed ? 'translate-y-1' : ''}`} />
              </button>
            </div>
          {/* 4 Interactive Pathway Cards: Equal height, consistent spacing, strong text CTA */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch transition-all duration-300 ease-in-out ${
              isHoveringPathway || isPathwayRevealed
                ? 'opacity-100 max-h-[500px] mt-6 pointer-events-auto'
                : 'opacity-0 max-h-0 pointer-events-none overflow-hidden mt-0'
            }`}
          >
            {/* Card 1: Foundation (Pale light blue background) */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => onNavigateCourses ? onNavigateCourses('Foundation') : setActiveTab('catalog')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (onNavigateCourses) onNavigateCourses('Foundation')
                  else setActiveTab('catalog')
                }
              }}
              className="h-full p-5 rounded-2xl bg-white border border-[#87AECE]/40 shadow-2xs hover:shadow-md hover:border-[#1D2A62] hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#437118] shadow-2xs group-hover:bg-[#437118] group-hover:text-white transition-colors">
                      <Compass weight="duotone" className="h-5 w-5 text-[#437118] group-hover:text-white" />
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#437118] border border-emerald-300 shadow-2xs font-mono tracking-wide">
                      START HERE
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#1D2A62]/70 font-mono shrink-0">
                    STAGE 01
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1D2A62] group-hover:text-[#1D2A62] transition-colors leading-snug">
                    Foundation
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1 min-h-[36px]">
                    Understand your role and event direction.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#87AECE]/30 mt-4 flex items-center justify-between text-xs font-bold text-[#1D2A62] group-hover:text-[#437118] transition-colors">
                <span className="group-hover:underline underline-offset-4 flex items-center gap-1.5">
                  View Courses
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Card 2: Plan & Lead (Pale light blue background) */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => onNavigateCourses ? onNavigateCourses('Plan & Lead') : setActiveTab('catalog')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (onNavigateCourses) onNavigateCourses('Plan & Lead')
                  else setActiveTab('catalog')
                }
              }}
              className="h-full p-5 rounded-2xl bg-white border border-[#87AECE]/40 shadow-2xs hover:shadow-md hover:border-[#1D2A62] hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#437118] shadow-2xs group-hover:bg-[#437118] group-hover:text-white transition-colors">
                    <Users weight="duotone" className="h-5 w-5 text-[#437118] group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#1D2A62]/70 font-mono">
                    STAGE 02
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1D2A62] group-hover:text-[#1D2A62] transition-colors leading-snug">
                    Plan & Lead
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1 min-h-[36px]">
                    Coordinate work and lead the team.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#87AECE]/30 mt-4 flex items-center justify-between text-xs font-bold text-[#1D2A62] group-hover:text-[#437118] transition-colors">
                <span className="group-hover:underline underline-offset-4 flex items-center gap-1.5">
                  View Courses
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
            {/* Card 3: Deliver */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => onNavigateCourses ? onNavigateCourses('Deliver') : setActiveTab('catalog')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (onNavigateCourses) onNavigateCourses('Deliver')
                  else setActiveTab('catalog')
                }
              }}
              className="h-full p-5 rounded-2xl bg-white border border-[#87AECE]/40 shadow-2xs hover:shadow-md hover:border-[#1D2A62] hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#437118] border border-[#87AECE]/35 shadow-xs group-hover:bg-[#437118] group-hover:text-white transition-colors">
                    <RocketLaunch weight="bold" className="h-5 w-5 text-[#437118] group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#1D2A62]/70 font-mono">
                    STAGE 03
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1D2A62] group-hover:text-[#1D2A62] transition-colors leading-snug">
                    Deliver
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1 min-h-[36px]">
                    Prepare, rehearse, and execute with confidence.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#87AECE]/30 mt-4 flex items-center justify-between text-xs font-bold text-[#1D2A62] group-hover:text-[#437118] transition-colors">
                <span className="group-hover:underline underline-offset-4 flex items-center gap-1.5">
                  View Courses
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Card 4: Reflect & Grow (Pale light blue background) */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => onNavigateCourses ? onNavigateCourses('Reflect & Grow') : setActiveTab('catalog')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (onNavigateCourses) onNavigateCourses('Reflect & Grow')
                  else setActiveTab('catalog')
                }
              }}
              className="h-full p-5 rounded-2xl bg-white border border-[#87AECE]/40 shadow-2xs hover:shadow-md hover:border-[#1D2A62] hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#437118] border border-[#87AECE]/35 shadow-xs group-hover:bg-[#437118] group-hover:text-white transition-colors">
                    <ArrowsClockwise weight="bold" className="h-5 w-5 text-[#437118] group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#1D2A62]/70 font-mono">
                    STAGE 04
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1D2A62] group-hover:text-[#1D2A62] transition-colors leading-snug">
                    Reflect & Grow
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1 min-h-[36px]">
                    Turn experience into better future practice.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#87AECE]/30 mt-4 flex items-center justify-between text-xs font-bold text-[#1D2A62] group-hover:text-[#437118] transition-colors">
                <span className="group-hover:underline underline-offset-4 flex items-center gap-1.5">
                  View Courses
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      {/* Event Toolkit Resource Section (OneDrive Link) - Enhanced Gradient Forest Green #386b24 */}
      <div className="rounded-2xl bg-gradient-to-br from-[#274818] via-[#386b24] to-[#4d8f31] border border-[#AFD06E]/25 text-white p-8 sm:p-10 lg:p-12 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-8 sm:gap-10 text-left relative overflow-hidden">
        {/* Subtle Ambient Lighting Layers */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-radial from-white/10 via-transparent to-transparent pointer-events-none blur-2xl" />
        <div className="absolute -bottom-10 left-1/4 w-72 h-72 rounded-full bg-radial from-[#AFD06E]/15 via-transparent to-transparent pointer-events-none blur-2xl" />

        {/* Left Content */}
        <div className="space-y-3 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-[#AFD06E] text-xs font-mono font-bold tracking-wide shadow-2xs">
            <Sparkle weight="fill" className="h-3.5 w-3.5 text-[#AFD06E]" />
            <span>EVENT TOOLKIT</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Leading an event soon?
          </h3>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            Use practical tools for final preparation and delivery.
          </p>
        </div>

        {/* Right CTA Button: White button with #386b24 text matching "Current Course" */}
        <div className="z-10 shrink-0">
          <a
            href="https://rmiteduau-my.sharepoint.com/:f:/g/personal/s4063545_rmit_edu_vn/IgDxRh5pupKaRL_0n7tpIJmwAd17HHL2UKdpAGAvvEenSkg?e=Y4ZQ76"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-7 rounded-xl bg-white hover:bg-slate-50 text-[#386b24] font-bold text-sm shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-[0.98] inline-flex no-underline group/btn"
          >
            <span>Open Event Toolkit</span>
            <ArrowRight className="h-4 w-4 text-[#386b24] group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
      {/* Sub-Views when navigated away from Home (e.g. clicking COURSES in header) */}
      {activeTab !== 'my-courses' && (
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('my-courses')}
                className="cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to Home Dashboard
              </Button>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-bold text-[#1D2A62] uppercase tracking-wider">
                {activeTab === 'catalog' ? 'Curriculum Catalog' : activeTab === 'skills' ? 'Competency Framework' : 'Certificates'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'catalog'
                    ? 'bg-[#1D2A62] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Catalog ({courses.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('skills')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'skills'
                    ? 'bg-[#1D2A62] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Competency Framework
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('certificates')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'certificates'
                    ? 'bg-[#1D2A62] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Certificates ({certificates.length})
              </button>
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
