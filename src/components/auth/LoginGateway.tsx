import { useState } from "react"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  ArrowRight,
  Compass,
  Check
} from "@phosphor-icons/react"
import confetti from "canvas-confetti"

interface LoginGatewayProps {
  onLoginAs: (role: 'learner' | 'instructor', customName?: string) => void
  onExploreOverview: () => void
}

export function LoginGateway({ onLoginAs, onExploreOverview }: LoginGatewayProps) {
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
    <div className="min-h-[100dvh] bg-[#EDEDED] flex items-center justify-center p-3 sm:p-6 font-sans text-[#252A35]">
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

          <button
            type="button"
            onClick={onExploreOverview}
            className="text-xs font-semibold text-[#1D2A62] hover:text-[#437118] transition-colors cursor-pointer flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] rounded-md px-1.5 py-0.5"
          >
            <Compass className="h-3.5 w-3.5 text-[#437118]" />
            <span>Overview</span>
          </button>
        </div>

        {/* Split Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Role Selection & Identity (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* 2. Brand Cleanup: One compact logo lockup & quiet metadata */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-auto flex items-center justify-center bg-transparent">
                    <img
                      src="/finance-club-logo-green.png"
                      alt="RMIT Finance Club Logo"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="border-l border-[#EDEDED] pl-3">
                    <span className="text-xs font-bold text-[#1D2A62] tracking-tight uppercase block leading-tight">
                      RMIT FINANCE CLUB
                    </span>
                    <span className="text-[11px] font-medium text-[#68707D] block leading-tight mt-0.5">
                      Project Leader Learning Hub
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-medium text-[#68707D] bg-[#EDEDED]/70 border border-[#87AECE]/30 rounded-full px-2.5 py-0.5">
                  Cohort · ASM3
                </span>
              </div>

              {/* 1. Headline & Hierarchy: Reduced size, less heavy weight, short supporting text */}
              <div className="space-y-2 pt-1">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D2A62] leading-snug">
                  Welcome to your Project Leader Learning Hub
                </h1>
                <p className="text-xs sm:text-sm text-[#68707D] leading-relaxed">
                  Choose how you will use the Hub to access the right tools and learning experience.
                </p>
              </div>

              {/* 3. Role Cards: Equal height, informative, radio/check indicator */}
              <div className="space-y-3 pt-1">
                <p className="text-xs font-bold text-[#1D2A62] tracking-wider uppercase">
                  You are
                </p>

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

                    <div className="pt-3 border-t border-[#87AECE]/20 mt-3 text-xs text-[#1D2A62] font-semibold flex items-center gap-1">
                      <span>Select</span>
                      <ArrowRight className="h-3 w-3" />
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

                    <div className="pt-3 border-t border-[#87AECE]/20 mt-3 text-xs text-[#1D2A62] font-semibold flex items-center gap-1">
                      <span>Select</span>
                      <ArrowRight className="h-3 w-3" />
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
            <div className="pt-4 text-center text-xs text-[#68707D] border-t border-[#EDEDED] flex items-center justify-between gap-3">
              <span>Zero-Login Session • In-Memory Architecture</span>
              <button
                type="button"
                onClick={onExploreOverview}
                className="text-[#1D2A62] font-semibold hover:text-[#437118] hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] rounded"
              >
                Explore ASM3 Overview
              </button>
            </div>
          </div>

          {/* 5. Right Visual Panel: Subtle wash, vertically centered, Event Readiness focus */}
          <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-[#EDEDED]/30">
            <div className="w-full h-full rounded-3xl bg-linear-to-b from-[#87AECE]/10 via-[#EDEDED]/15 to-[#AFD06E]/10 border border-[#87AECE]/20 p-6 sm:p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {/* Vertically Centered Illustration & Event Readiness Group */}
              <div className="w-full flex flex-col items-center justify-center py-2">
                <div className="relative w-full max-w-[300px] aspect-4/3 flex items-center justify-center">
                  <svg
                    viewBox="0 0 400 340"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full select-none drop-shadow-2xs"
                  >
                    {/* Background Thought Contour in Soft Azure & Lime */}
                    <path
                      d="M120 110 C90 100 80 70 110 50 C130 30 170 30 190 45 C210 20 260 20 280 50 C310 40 330 70 310 95 C335 120 315 155 285 155 C275 180 230 180 210 165 C190 180 150 175 140 150 C110 150 100 125 120 110 Z"
                      stroke="#87AECE"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="#ffffff"
                      fillOpacity="0.8"
                    />

                    {/* Floating Avatar 1 in #1D2A62 */}
                    <g transform="translate(65, 65)">
                      <circle cx="20" cy="20" r="18" fill="#ffffff" stroke="#1D2A62" strokeWidth="2" />
                      <path d="M13 14 Q20 8 27 14" stroke="#1D2A62" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="16" cy="18" r="1.5" fill="#1D2A62" />
                      <circle cx="24" cy="18" r="1.5" fill="#1D2A62" />
                      <path d="M16 23 Q20 28 24 23" stroke="#437118" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    </g>

                    {/* Floating Avatar 2 in #437118 */}
                    <g transform="translate(315, 125)">
                      <circle cx="20" cy="20" r="18" fill="#ffffff" stroke="#437118" strokeWidth="2" />
                      <path d="M12 16 Q20 9 28 16" stroke="#437118" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="16" cy="19" r="1.5" fill="#437118" />
                      <circle cx="24" cy="19" r="1.5" fill="#437118" />
                      <ellipse cx="20" cy="24" rx="2.5" ry="3" fill="#1D2A62" />
                    </g>

                    {/* Central Meditating Character */}
                    <ellipse cx="200" cy="115" rx="19" ry="23" fill="#ffffff" stroke="#1D2A62" strokeWidth="2.2" />
                    <path
                      d="M181 110 C176 92 199 82 218 87 C223 101 218 115 218 124 C213 110 204 105 195 105 C186 105 181 115 181 110 Z"
                      fill="#1D2A62"
                    />
                    <path d="M191 116 Q194 119 197 116" stroke="#1D2A62" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <path d="M203 116 Q206 119 209 116" stroke="#1D2A62" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <path d="M197 125 Q200 127 203 125" stroke="#437118" strokeWidth="1.8" strokeLinecap="round" fill="none" />

                    {/* Fresh Lime Green Sweater in #AFD06E */}
                    <path
                      d="M176 138 C166 143 152 157 143 175 C157 180 171 185 185 185 L185 195 L215 195 L215 185 C229 185 243 180 257 175 C248 157 234 143 224 138 Z"
                      fill="#AFD06E"
                      stroke="#1D2A62"
                      strokeWidth="2.2"
                    />

                    {/* White Heart on Sweater */}
                    <path
                      d="M200 165 C200 165 191 157 191 151 C191 146 195 143 198 145 C200 147 200 148 200 148 C200 148 200 147 202 145 C205 143 209 146 209 151 C209 157 200 165 200 165 Z"
                      fill="#ffffff"
                    />

                    {/* Arms in meditation pose */}
                    <path
                      d="M152 163 C138 149 133 131 140 122 C145 117 149 123 150 128 C151 135 161 153 170 163"
                      stroke="#1D2A62"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M248 163 C262 149 267 131 260 122 C255 117 251 123 250 128 C249 135 239 153 230 163"
                      stroke="#1D2A62"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Cross-legged Pants in White & Deep Navy */}
                    <path
                      d="M176 191 C148 196 125 210 143 233 C161 242 180 238 200 229 C220 238 239 242 257 233 C275 210 252 196 224 191 Z"
                      fill="#ffffff"
                      stroke="#1D2A62"
                      strokeWidth="2.2"
                    />

                    <path d="M176 229 Q181 241 190 238 Q194 233 188 226" fill="#ffffff" stroke="#1D2A62" strokeWidth="1.8" />
                    <path d="M224 229 Q219 241 210 238 Q206 233 212 226" fill="#ffffff" stroke="#1D2A62" strokeWidth="1.8" />
                  </svg>

                  {/* Floating Event Readiness Card */}
                  <div className="absolute left-0 bottom-0 sm:-bottom-1 bg-white rounded-2xl p-3 sm:p-3.5 shadow-md border border-[#87AECE]/35 text-left min-w-[155px] sm:min-w-[175px]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <p className="font-bold text-[#1D2A62] text-xs sm:text-sm leading-tight">
                          Event Readiness
                        </p>
                        <p className="text-[10px] text-[#68707D]">
                          Impact · Evidence · Connection
                        </p>
                      </div>

                      {/* Small Verified Indicator in #437118 */}
                      <div className="h-6 w-6 rounded-full bg-[#437118]/10 text-[#437118] flex items-center justify-center shrink-0">
                        <Check weight="bold" className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <div className="mt-2.5">
                      <span className="inline-block rounded-full border border-[#AFD06E] px-2.5 py-0.5 text-[9px] font-bold text-[#437118] bg-[#AFD06E]/20">
                        3-minute final check
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Event Readiness Message */}
              <div className="space-y-1 pt-4 max-w-sm">
                <p className="text-sm sm:text-base font-bold text-[#1D2A62] leading-snug">
                  Practical tools for confident, participant-ready project leadership.
                </p>
                <p className="text-xs text-[#68707D]">
                  Learn at your pace. Apply it in your next event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
