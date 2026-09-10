import { useState } from "react"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  ArrowRight,
  Check
} from "@phosphor-icons/react"
import confetti from "canvas-confetti"

interface LoginGatewayProps {
  onLoginAs: (role: 'learner' | 'instructor', customName?: string) => void
}

export function LoginGateway({ onLoginAs }: LoginGatewayProps) {
  const [selectedRole, setSelectedRole] = useState<'learner' | 'instructor'>('learner')

  const handleSelectRole = (role: 'learner' | 'instructor') => {
    setSelectedRole(role)
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    })
    const name = role === 'learner' ? 'Nguyen Minh Tuan' : 'MSc. Hoang Le Tram'
    onLoginAs(role, name)
  }

  const handleContinue = () => {
    handleSelectRole(selectedRole)
  }

  return (
    <div className="min-h-[100dvh] bg-[var(--page-canvas,#FFFFFF)] flex items-center justify-center p-3 sm:p-6 font-sans text-[#252A35]">
      {/* Main Container Card */}
      <div className="w-full max-w-5xl rounded-3xl bg-white shadow-xl overflow-hidden border border-[#87AECE]/25 transition-all">
        {/* Subtle Top Window Bar */}
        <div className="bg-[#EDEDED]/50 border-b border-[#EDEDED] px-5 py-2.5 flex items-center justify-between text-xs select-none">
          {/* Subtle Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#437118]/80 inline-block" />
          </div>

          <span className="text-[11px] font-medium text-[#68707D]">
            Project Leader Capability Portal
          </span>
          <span className="text-[11px] font-medium text-[#68707D]">
            Cohort · ASM3
          </span>
        </div>

        {/* Split Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Role Selection & Identity (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Brand Logo & Learner / Trainer Pills in Same Horizontal Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-auto flex items-center justify-center bg-transparent">
                    <img
                      src="/finance-club-logo-green.png"
                      alt="RMIT Finance Club Logo"
                      loading="eager"
                      className="h-11 w-auto object-contain"
                    />
                  </div>
                  <div className="border-l border-[#EDEDED] pl-2.5">
                    <span className="text-xs font-bold text-[#1D2A62] tracking-tight uppercase block leading-tight">
                      RMIT FINANCE CLUB
                    </span>
                    <span className="text-[10px] font-medium text-[#68707D] block leading-tight mt-0.5">
                      Learning Hub
                    </span>
                  </div>
                </div>

                {/* Learner and Trainer buttons on the same row as logo */}
                <div className="flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 gap-1">
                  <button
                    type="button"
                    onClick={() => handleSelectRole('learner')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedRole === 'learner'
                        ? 'bg-[#1D2A62] text-white shadow-xs'
                        : 'text-[#68707D] hover:text-[#1D2A62]'
                    }`}
                  >
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Learner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectRole('instructor')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedRole === 'instructor'
                        ? 'bg-[#1D2A62] text-white shadow-xs'
                        : 'text-[#68707D] hover:text-[#1D2A62]'
                    }`}
                  >
                    <ChalkboardTeacher className="h-3.5 w-3.5" />
                    <span>Trainer</span>
                  </button>
                </div>
              </div>

              {/* Headline */}
              <div className="pt-2 text-center">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#437118] via-[#1D2A62] to-[#1D2A62] bg-clip-text text-transparent leading-tight text-center mx-auto">
                  WELCOME TO PROJECT LEADERS LEARNING HUB!
                </h1>
              </div>

              {/* Role Cards: No "You Are" - Directly Clickable Cards */}
              <div className="space-y-3 pt-1">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Option 1: Learner */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRole('learner')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedRole('learner')
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] ${
                      selectedRole === 'learner'
                        ? 'border-[#1D2A62] bg-[#87AECE]/15 shadow-sm'
                        : 'border-[#EDEDED] bg-white hover:border-[#87AECE]/60 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                          selectedRole === 'learner' ? 'bg-[#1D2A62] text-white shadow-2xs' : 'bg-[#EDEDED] text-[#1D2A62]'
                        }`}>
                          <GraduationCap weight="duotone" className="h-5 w-5" />
                        </div>

                        {/* Compact Radio / Check Indicator */}
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center transition-all ${
                          selectedRole === 'learner'
                            ? 'bg-[#437118] text-white'
                            : 'border-2 border-[#87AECE]/40 bg-transparent'
                        }`}>
                          {selectedRole === 'learner' && <Check weight="bold" className="h-3 w-3" />}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-base font-bold text-[#1D2A62] leading-tight">
                          Learner
                        </h2>
                        <p className="text-[11px] text-[#68707D] leading-relaxed">
                          Build practical Project Leader skills and track your learning progress.
                        </p>
                      </div>
                    </div>


                  </div>

                  {/* Option 2: Trainer / Facilitator */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRole('instructor')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedRole('instructor')
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] ${
                      selectedRole === 'instructor'
                        ? 'border-[#1D2A62] bg-[#87AECE]/15 shadow-sm'
                        : 'border-[#EDEDED] bg-white hover:border-[#87AECE]/60 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                          selectedRole === 'instructor' ? 'bg-[#1D2A62] text-white shadow-2xs' : 'bg-[#EDEDED] text-[#1D2A62]'
                        }`}>
                          <ChalkboardTeacher weight="duotone" className="h-5 w-5" />
                        </div>

                        {/* Compact Radio / Check Indicator */}
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center transition-all ${
                          selectedRole === 'instructor'
                            ? 'bg-[#437118] text-white'
                            : 'border-2 border-[#87AECE]/40 bg-transparent'
                        }`}>
                          {selectedRole === 'instructor' && <Check weight="bold" className="h-3 w-3" />}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-base font-bold text-[#1D2A62] leading-tight">
                          Trainer / Facilitator
                        </h2>
                        <p className="text-[11px] text-[#68707D] leading-relaxed">
                          Guide learners and access tools for workshop and session delivery.
                        </p>
                      </div>
                    </div>


                  </div>
                </div>
              </div>

              {/* 4. Color Consistency: Deep Navy Primary CTA */}
              <button
                type="button"
                onClick={handleContinue}
                className="w-full h-12 rounded-full bg-[#1D2A62] hover:bg-[#16204a] text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-sm cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D2A62]"
              >
                <span>
                  {selectedRole === 'learner' ? 'Continue as Learner' : 'Continue as Trainer / Facilitator'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Quiet Footer Metadata */}
            <div className="pt-4 text-xs text-[#68707D] border-t border-[#EDEDED] flex items-center justify-between gap-3">
              <span>RMIT Finance Club • Zero-Login Architecture</span>
              <span>In-Memory Session</span>
            </div>
          </div>

          {/* Right Visual Panel: Enlarged Illustration with Atmosphere */}
          <div className="lg:col-span-6 p-3 sm:p-5 lg:p-6 flex items-center justify-center bg-[#EDEDED]/30">
            <div className="w-full h-full rounded-3xl bg-linear-to-b from-[#87AECE]/15 via-[#EDEDED]/20 to-[#AFD06E]/15 border border-[#87AECE]/20 p-3 sm:p-5 flex items-center justify-center relative overflow-hidden">
              {/* Ambient Radial Halo Bloom */}
              <div className="absolute top-1/2 -translate-y-1/2 right-4 w-[460px] h-[460px] rounded-full bg-radial from-[#AFD06E]/20 via-[#87AECE]/15 to-transparent pointer-events-none -z-0 blur-2xl" />

              {/* Subtle Concentric Leadership Arcs with gentle rotation */}
              <svg 
                className="absolute inset-0 h-full w-full pointer-events-none -z-0 opacity-45 select-none overflow-visible animate-spin-slow"
                viewBox="0 0 400 400"
                fill="none"
              >
                <circle cx="200" cy="200" r="95" stroke="#87AECE" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="155" stroke="#87AECE" strokeWidth="1" strokeDasharray="6 6" />
                <circle cx="200" cy="200" r="215" stroke="#AFD06E" strokeWidth="1.2" strokeDasharray="5 5" />
                <circle cx="105" cy="200" r="3.5" fill="#437118" />
                <circle cx="200" cy="45" r="3.5" fill="#1D2A62" />
                <circle cx="295" cy="200" r="3.5" fill="#87AECE" />
                <circle cx="200" cy="355" r="3.5" fill="#AFD06E" />
              </svg>

              {/* Enlarged Team Illustration with Smooth Floating Motion */}
              <img
                src="/team-illustration-clean.png"
                alt="RMIT Finance Club Project Leadership Team"
                loading="eager"
                className="relative z-10 w-full max-w-[460px] lg:max-w-[520px] max-h-[480px] sm:max-h-[530px] object-contain drop-shadow-md select-none animate-login-float hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
