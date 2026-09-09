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
      <div className="relative rounded-3xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fcfdfe] to-[#f2f7fa] p-4 sm:p-5 lg:py-4 lg:px-7 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] overflow-hidden">
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
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          {/* Left Column: Welcome Headline, Subtitle & CTA */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/90 border border-[#87AECE]/40 shadow-2xs backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-[#437118] animate-pulse" />
              <span className="text-[11px] font-bold text-[#1D2A62]">
                Project Leader • Management Committee
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-[#68707D] font-mono">RFC-PL-2026</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#437118] via-[#1D2A62] to-[#1D2A62] bg-clip-text text-transparent leading-tight">
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

          {/* Right Column: 30% Larger Illustration */}
          <div className="lg:col-span-5 flex items-center justify-center py-1 relative">
            <img
              src="/learner-hero-palette.png"
              alt="Project Leader with Event Checklist and Deliverables"
              loading="eager"
              className="max-h-[350px] sm:max-h-[385px] lg:max-h-[395px] w-auto object-contain select-none drop-shadow-md transition-transform hover:scale-102"
            />
          </div>
          {/* Full-Width Bottom Row: 3 Executive Cards Exactly Formatted per Image */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 sm:pt-3.5 border-t border-slate-200/60">
            {/* Card 1: YOUR LEARNING PROGRESS */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs hover:border-[#87AECE] hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left">
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
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs hover:border-[#87AECE] hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left">
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
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs hover:border-[#87AECE] hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between text-left">
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
      {/* About Learning Hub & Interactive Learning Pathway Section */}
      <div 
        className="rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-xs p-6 sm:p-8 shadow-xs relative overflow-hidden transition-all duration-300"
        onMouseEnter={() => setIsHoveringPathway(true)}
        onMouseLeave={() => setIsHoveringPathway(false)}
      >
        {/* Subtle Brand Background Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-radial from-[#87AECE]/12 via-transparent to-transparent pointer-events-none -z-0" />

        <div className="relative z-10 space-y-6 text-center">
          {/* Centered Single Header Block */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#437118] via-[#1D2A62] to-[#1D2A62] bg-clip-text text-transparent leading-tight">
              About Learning Hub
            </h2>
            <p className="text-xs sm:text-sm text-[#68707D] leading-relaxed">
              The Finance Club PL Learning Hub is a practical learning space designed to help Project Leaders build the skills needed to plan, lead, and deliver student events more effectively. Through short courses, interactive practice, simulations, and practical tools, you can develop your capabilities across the event lifecycle - from understanding your role and planning an event to leading teams, preparing for delivery, solving problems, and learning from experience.
            </p>
          </div>

          {/* 5-Step Process Flow with Wavy Undulating Dashed Connector */}
          <div className="pt-6 pb-2 relative">
            {/* Undulating Wavy Dashed Connector Curve (Positioned behind icons at z-0) */}
            <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[40px] pointer-events-none z-0">
              <svg 
                className="w-full h-full overflow-visible" 
                viewBox="0 0 1000 60" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path
                  d="M 40 30 Q 140 2, 240 30 T 440 30 T 640 30 T 840 30 T 960 30"
                  stroke="#87AECE"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  className="opacity-70"
                />
              </svg>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-3 text-center relative z-10">
              {/* Step 1: Think strategically */}
              <div className="flex flex-col items-center space-y-2.5 group">
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#AFD06E]/60 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-11 h-11 rounded-full bg-[#AFD06E]/20 flex items-center justify-center">
                    <Brain weight="duotone" className="h-6 w-6 text-[#437118]" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#68707D] uppercase tracking-wider">
                  Step 01
                </span>
                <h3 className="text-sm font-bold text-[#1D2A62] leading-tight">
                  Think strategically
                </h3>
                <p className="text-xs text-[#68707D] leading-relaxed max-w-[210px]">
                  Understand event purpose, participants, and priorities.
                </p>
              </div>

              {/* Step 2: Plan & coordinate */}
              <div className="flex flex-col items-center space-y-2.5 group">
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#AFD06E]/60 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-11 h-11 rounded-full bg-[#AFD06E]/20 flex items-center justify-center">
                    <CalendarCheck weight="duotone" className="h-6 w-6 text-[#437118]" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#68707D] uppercase tracking-wider">
                  Step 02
                </span>
                <h3 className="text-sm font-bold text-[#1D2A62] leading-tight">
                  Plan & coordinate
                </h3>
                <p className="text-xs text-[#68707D] leading-relaxed max-w-[210px]">
                  Turn ideas into clear tasks, timelines, ownership, and dependencies.
                </p>
              </div>

              {/* Step 3: Lead people */}
              <div className="flex flex-col items-center space-y-2.5 group">
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#AFD06E]/60 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-11 h-11 rounded-full bg-[#AFD06E]/20 flex items-center justify-center">
                    <Users weight="duotone" className="h-6 w-6 text-[#437118]" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#68707D] uppercase tracking-wider">
                  Step 03
                </span>
                <h3 className="text-sm font-bold text-[#1D2A62] leading-tight">
                  Lead people
                </h3>
                <p className="text-xs text-[#68707D] leading-relaxed max-w-[210px]">
                  Communicate, delegate, collaborate, and support your team.
                </p>
              </div>

              {/* Step 4: Deliver with readiness */}
              <div className="flex flex-col items-center space-y-2.5 group">
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#AFD06E]/60 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-11 h-11 rounded-full bg-[#AFD06E]/20 flex items-center justify-center">
                    <ShieldCheck weight="duotone" className="h-6 w-6 text-[#437118]" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#68707D] uppercase tracking-wider">
                  Step 04
                </span>
                <h3 className="text-sm font-bold text-[#1D2A62] leading-tight">
                  Deliver with readiness
                </h3>
                <p className="text-xs text-[#68707D] leading-relaxed max-w-[210px]">
                  Verify critical information, test event flow, and manage important issues before delivery.
                </p>
              </div>

              {/* Step 5: Reflect & improve */}
              <div className="flex flex-col items-center space-y-2.5 group">
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#AFD06E]/60 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-11 h-11 rounded-full bg-[#AFD06E]/20 flex items-center justify-center">
                    <ArrowsClockwise weight="bold" className="h-6 w-6 text-[#437118]" />
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#68707D] uppercase tracking-wider">
                  Step 05
                </span>
                <h3 className="text-sm font-bold text-[#1D2A62] leading-tight">
                  Reflect & improve
                </h3>
                <p className="text-xs text-[#68707D] leading-relaxed max-w-[210px]">
                  Learn from feedback and strengthen future events.
                </p>
              </div>
            </div>
          </div>

          {/* CTA & Interaction Controls */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onMouseEnter={() => setIsHoveringPathway(true)}
              onClick={() => setIsPathwayRevealed(!isPathwayRevealed)}
              className="h-11 px-7 rounded-full bg-[#1D2A62] hover:bg-[#16204a] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
            >
              <span>Explore the Learning Pathway</span>
              <ArrowDown className={`h-4 w-4 transition-transform duration-200 ${isHoveringPathway || isPathwayRevealed ? 'translate-y-1' : ''}`} />
            </button>

            <span className="text-xs text-[#68707D] flex items-center gap-1.5 font-medium">
              <Sparkle weight="fill" className="h-3.5 w-3.5 text-[#437118]" />
              <span>Hover or click to view the 4 stages</span>
            </span>
          </div>
          {/* 4 Interactive Pathway Cards (Revealed on Hover or Click) */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 ease-in-out ${
              isHoveringPathway || isPathwayRevealed
                ? 'opacity-100 max-h-[500px] mt-6 pointer-events-auto'
                : 'opacity-0 max-h-0 pointer-events-none overflow-hidden mt-0'
            }`}
          >
            {/* Card 1: Foundation */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab('skills')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveTab('skills')
              }}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#87AECE]/40 shadow-xs hover:shadow-md hover:border-[#1D2A62] hover:-translate-y-1 transition-all flex flex-col justify-between text-left cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#AFD06E]/30 text-[#437118] group-hover:bg-[#437118] group-hover:text-white transition-colors">
                    <Compass weight="duotone" className="h-5 w-5 text-[#437118] group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#68707D] font-mono">
                    STAGE 01
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1D2A62] group-hover:text-blue-700 transition-colors">
                    Foundation
                  </h3>
                  <p className="text-xs text-[#68707D] leading-relaxed mt-1">
                    Understand your role and event direction.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] font-semibold text-[#437118] flex items-center gap-1">
                <span>View Stage</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 2: Plan & Lead */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab('skills')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveTab('skills')
              }}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#87AECE]/40 shadow-xs hover:shadow-md hover:border-[#1D2A62] hover:-translate-y-1 transition-all flex flex-col justify-between text-left cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#AFD06E]/30 text-[#437118] group-hover:bg-[#437118] group-hover:text-white transition-colors">
                    <Users weight="duotone" className="h-5 w-5 text-[#437118] group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#68707D] font-mono">
                    STAGE 02
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1D2A62] group-hover:text-blue-700 transition-colors">
                    Plan & Lead
                  </h3>
                  <p className="text-xs text-[#68707D] leading-relaxed mt-1">
                    Coordinate work and lead the team.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] font-semibold text-[#437118] flex items-center gap-1">
                <span>View Stage</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 3: Deliver */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab('skills')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveTab('skills')
              }}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#87AECE]/40 shadow-xs hover:shadow-md hover:border-[#1D2A62] hover:-translate-y-1 transition-all flex flex-col justify-between text-left cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#AFD06E]/30 text-[#437118] group-hover:bg-[#437118] group-hover:text-white transition-colors">
                    <RocketLaunch weight="duotone" className="h-5 w-5 text-[#437118] group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#68707D] font-mono">
                    STAGE 03
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1D2A62] group-hover:text-[#437118] transition-colors">
                    Deliver
                  </h3>
                  <p className="text-xs text-[#68707D] leading-relaxed mt-1">
                    Prepare, rehearse, and execute with confidence.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] font-semibold text-[#437118] flex items-center gap-1">
                <span>View Stage</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Card 4: Reflect & Grow */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab('skills')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveTab('skills')
              }}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#87AECE]/40 shadow-xs hover:shadow-md hover:border-[#1D2A62] hover:-translate-y-1 transition-all flex flex-col justify-between text-left cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#AFD06E]/30 text-[#437118] group-hover:bg-[#437118] group-hover:text-white transition-colors">
                    <TrendUp weight="bold" className="h-5 w-5 text-[#437118] group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#68707D] font-mono">
                    STAGE 04
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1D2A62] group-hover:text-[#437118] transition-colors">
                    Reflect & Grow
                  </h3>
                  <p className="text-xs text-[#68707D] leading-relaxed mt-1">
                    Turn experience into better future practice.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] font-semibold text-[#437118] flex items-center gap-1">
                <span>View Stage</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
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
