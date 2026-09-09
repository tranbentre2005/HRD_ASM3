import { useState } from "react"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  ArrowRight,
  Sparkle,
  Compass
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
      particleCount: 50,
      spread: 65,
      origin: { y: 0.6 }
    })
    const name = role === 'learner' ? 'Nguyen Minh Tuan' : 'MSc. Hoang Le Tram'
    onLoginAs(role, name)
  }

  const handleContinue = () => {
    handleSelectRole(selectedRole)
  }

  return (
    <div className="min-h-[100dvh] bg-[#EDEDED] flex items-center justify-center p-3 sm:p-6 font-sans">
      {/* Main Container Card */}
      <div className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-[#87AECE]/30 transition-all">
        {/* Clean Top Header (No Search/Address Bar) */}
        <div className="bg-[#EDEDED]/70 border-b border-[#87AECE]/20 px-5 py-3 flex items-center justify-between text-xs select-none">
          {/* Window Traffic Light Dots */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#437118] inline-block" />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#1D2A62]">
            <span>RMIT FINANCE CLUB</span>
            <span className="text-[#87AECE]">•</span>
            <span>PROJECT LEADER LEARNING HUB</span>
          </div>

          <button
            type="button"
            onClick={onExploreOverview}
            className="text-xs font-semibold text-[#1D2A62] hover:text-[#437118] transition-colors cursor-pointer flex items-center gap-1"
          >
            <Compass className="h-3.5 w-3.5 text-[#437118]" />
            <span>Overview</span>
          </button>
        </div>

        {/* Split Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          {/* Left Column: Role Selection (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Logo Area: Transparent Background, Dark Green Bull Logo */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-auto flex items-center justify-center bg-transparent">
                    <img
                      src="/finance-club-logo-green.png"
                      alt="RMIT Finance Club Logo"
                      className="h-16 w-auto object-contain drop-shadow-xs"
                    />
                  </div>
                  <div className="border-l-2 border-[#87AECE]/40 pl-3">
                    <span className="text-sm font-extrabold text-[#1D2A62] tracking-tight uppercase block leading-tight">
                      RMIT Finance Club
                    </span>
                    <span className="text-xs font-semibold text-[#437118] block leading-tight mt-0.5">
                      Learning Hub
                    </span>
                  </div>
                </div>

                <span className="rounded-full bg-[#1D2A62] text-white text-[10px] font-bold px-2.5 py-1 shadow-2xs">
                  RFC • ASM3
                </span>
              </div>

              {/* Main Welcome Heading */}
              <div className="space-y-2 pt-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1D2A62] leading-tight">
                  Welcome to RMIT FINANCE CLUB PROJECT LEADER LEARNING HUB !
                </h1>
              </div>

              {/* You Are Section */}
              <div className="space-y-3 pt-2">
                <p className="text-sm font-extrabold text-[#1D2A62] tracking-wider uppercase">
                  You are
                </p>

                {/* Two Clean Role Cards - ONLY Learner and Facilitator/Trainer without extra notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Option 1: Learner */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRole('learner')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedRole('learner')
                    }}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                      selectedRole === 'learner'
                        ? 'border-[#1D2A62] bg-[#87AECE]/15 shadow-md ring-2 ring-[#1D2A62]/20'
                        : 'border-[#EDEDED] bg-white hover:border-[#87AECE] hover:bg-[#EDEDED]/40'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                          selectedRole === 'learner' ? 'bg-[#1D2A62] text-white shadow-xs' : 'bg-[#EDEDED] text-[#1D2A62]'
                        }`}>
                          <GraduationCap weight="duotone" className="h-7 w-7" />
                        </div>
                        {selectedRole === 'learner' && (
                          <span className="text-[10px] font-bold text-[#1D2A62] bg-[#87AECE]/30 px-2 py-0.5 rounded-full">
                            Selected
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-[#1D2A62] leading-snug">
                        Learner
                      </h2>
                    </div>

                    <div className="pt-3 border-t border-[#87AECE]/20 mt-3 text-xs text-[#1D2A62] font-semibold flex items-center gap-1">
                      <span>Select</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Option 2: Facilitator/Trainer */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRole('instructor')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedRole('instructor')
                    }}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                      selectedRole === 'instructor'
                        ? 'border-[#437118] bg-[#AFD06E]/15 shadow-md ring-2 ring-[#437118]/20'
                        : 'border-[#EDEDED] bg-white hover:border-[#AFD06E] hover:bg-[#EDEDED]/40'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                          selectedRole === 'instructor' ? 'bg-[#437118] text-white shadow-xs' : 'bg-[#EDEDED] text-[#437118]'
                        }`}>
                          <ChalkboardTeacher weight="duotone" className="h-7 w-7" />
                        </div>
                        {selectedRole === 'instructor' && (
                          <span className="text-[10px] font-bold text-[#437118] bg-[#AFD06E]/40 px-2 py-0.5 rounded-full">
                            Selected
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-[#1D2A62] leading-snug">
                        Facilitator/Trainer
                      </h2>
                    </div>

                    <div className="pt-3 border-t border-[#87AECE]/20 mt-3 text-xs text-[#437118] font-semibold flex items-center gap-1">
                      <span>Select</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Solid Pill Action Button in Brand Colors */}
              <button
                type="button"
                onClick={handleContinue}
                className="w-full h-12 rounded-full bg-[#1D2A62] hover:bg-[#437118] text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {selectedRole === 'learner' ? 'Continue as Learner' : 'Continue as Facilitator/Trainer'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Bottom Footer Link */}
            <div className="pt-4 text-center text-xs text-[#1D2A62]/70 border-t border-[#87AECE]/20 flex items-center justify-between gap-3">
              <span>RMIT Finance Club • Zero-Login Architecture</span>
              <button
                type="button"
                onClick={onExploreOverview}
                className="text-[#437118] font-bold hover:underline cursor-pointer"
              >
                Explore ASM3 Overview
              </button>
            </div>
          </div>

          {/* Right Column: Soft Tinted Showcase Panel with Brand Palette (6 cols) */}
          <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-[#EDEDED]/40">
            <div className="w-full h-full rounded-3xl bg-linear-to-b from-[#87AECE]/20 via-[#EDEDED]/30 to-[#AFD06E]/20 border border-[#87AECE]/30 p-6 sm:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-inner">
              {/* Illustration Area */}
              <div className="w-full flex-1 flex flex-col items-center justify-center relative py-4">
                <div className="relative w-full max-w-[320px] aspect-4/3 flex items-center justify-center">
                  <svg
                    viewBox="0 0 400 340"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-xs select-none"
                  >
                    {/* Background Soft Thought Cloud in #AFD06E / #87AECE */}
                    <path
                      d="M120 110 C90 100 80 70 110 50 C130 30 170 30 190 45 C210 20 260 20 280 50 C310 40 330 70 310 95 C335 120 315 155 285 155 C275 180 230 180 210 165 C190 180 150 175 140 150 C110 150 100 125 120 110 Z"
                      stroke="#AFD06E"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      fill="#ffffff"
                      fillOpacity="0.75"
                    />

                    {/* Floating Avatar 1 in #1D2A62 */}
                    <g transform="translate(60, 60)">
                      <circle cx="24" cy="24" r="22" fill="#ffffff" stroke="#1D2A62" strokeWidth="2.5" />
                      <path d="M16 16 Q24 8 32 16" stroke="#1D2A62" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="19" cy="22" r="2" fill="#1D2A62" />
                      <circle cx="29" cy="22" r="2" fill="#1D2A62" />
                      <path d="M19 28 Q24 34 29 28" stroke="#437118" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </g>

                    {/* Floating Avatar 2 in #437118 */}
                    <g transform="translate(310, 130)">
                      <circle cx="22" cy="22" r="20" fill="#ffffff" stroke="#437118" strokeWidth="2.5" />
                      <path d="M12 18 Q22 10 32 18" stroke="#437118" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="17" cy="22" r="2" fill="#437118" />
                      <circle cx="27" cy="22" r="2" fill="#437118" />
                      <ellipse cx="22" cy="28" rx="3" ry="4" fill="#1D2A62" />
                    </g>

                    {/* Central Meditating Character */}
                    <ellipse cx="200" cy="115" rx="20" ry="24" fill="#ffffff" stroke="#1D2A62" strokeWidth="2.5" />
                    <path
                      d="M180 110 C175 90 200 80 220 85 C225 100 220 115 220 125 C215 110 205 105 195 105 C185 105 180 115 180 110 Z"
                      fill="#1D2A62"
                    />
                    <path d="M190 116 Q194 120 197 116" stroke="#1D2A62" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M203 116 Q206 120 210 116" stroke="#1D2A62" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M197 126 Q200 128 203 126" stroke="#437118" strokeWidth="2" strokeLinecap="round" fill="none" />

                    {/* Fresh Lime Green Sweater in #AFD06E */}
                    <path
                      d="M175 140 C165 145 150 160 140 180 C155 185 170 190 185 190 L185 200 L215 200 L215 190 C230 190 245 185 260 180 C250 160 235 145 225 140 Z"
                      fill="#AFD06E"
                      stroke="#1D2A62"
                      strokeWidth="2.5"
                    />

                    {/* White Heart on Sweater */}
                    <path
                      d="M200 168 C200 168 190 160 190 153 C190 148 194 145 198 147 C200 149 200 150 200 150 C200 150 200 149 202 147 C206 145 210 148 210 153 C210 160 200 168 200 168 Z"
                      fill="#ffffff"
                    />

                    {/* Arms in meditation pose */}
                    <path
                      d="M150 165 C135 150 130 130 138 120 C143 115 148 122 148 127 C150 135 160 155 170 165"
                      stroke="#1D2A62"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M250 165 C265 150 270 130 262 120 C257 115 252 122 252 127 C250 135 240 155 230 165"
                      stroke="#1D2A62"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Cross-legged Pants in White & Deep Navy outlines */}
                    <path
                      d="M175 195 C145 200 120 215 140 240 C160 250 180 245 200 235 C220 245 240 250 260 240 C280 215 255 200 225 195 Z"
                      fill="#ffffff"
                      stroke="#1D2A62"
                      strokeWidth="2.5"
                    />

                    <path d="M175 235 Q180 248 190 245 Q195 240 188 232" fill="#ffffff" stroke="#1D2A62" strokeWidth="2" />
                    <path d="M225 235 Q220 248 210 245 Q205 240 212 232" fill="#ffffff" stroke="#1D2A62" strokeWidth="2" />
                  </svg>

                  {/* Floating Status Card with Palette Accent */}
                  <div className="absolute left-1 bottom-0 sm:-bottom-2 bg-white rounded-2xl p-3 sm:p-3.5 shadow-lg border border-[#87AECE]/40 text-left min-w-[145px] sm:min-w-[170px]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-extrabold text-[#1D2A62] text-xs sm:text-sm leading-tight">
                          Project Leader
                        </p>
                        <p className="text-[10px] text-[#437118] font-semibold mt-0.5">HRD-102 • 10 Task</p>
                      </div>

                      {/* Circular Progress in #437118 */}
                      <div className="relative h-8 w-8 flex items-center justify-center shrink-0">
                        <svg className="h-8 w-8 -rotate-90" viewBox="0 0 36 36">
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
                            strokeDashoffset="15"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute text-[8px] font-bold text-[#1D2A62] font-mono">
                          84%
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5">
                      <span className="inline-block rounded-full border border-[#AFD06E] px-2.5 py-0.5 text-[9px] font-bold text-[#437118] bg-[#AFD06E]/20">
                        SBI Model
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Dots with Palette Accents */}
              <div className="flex items-center justify-center gap-1.5 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#87AECE]" />
                <span className="h-1.5 w-5 rounded-full bg-[#1D2A62]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#87AECE]" />
              </div>

              {/* Bottom Tagline */}
              <div className="space-y-1 pt-1 max-w-sm">
                <p className="text-sm sm:text-base font-bold text-[#1D2A62] leading-snug">
                  Make your leadership easier and organized with RFC Hub
                </p>
                <p className="text-[11px] text-[#437118] font-semibold">
                  RMIT Finance Club • Dual Role Architecture
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
