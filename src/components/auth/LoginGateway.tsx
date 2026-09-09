import { useState } from "react"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  ArrowRight,
  Lock,
  ArrowClockwise,
  CheckCircle,
  Sparkle
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
    <div className="min-h-[100dvh] bg-[#eef0f2] flex items-center justify-center p-3 sm:p-6 font-sans">
      {/* Browser Window Mockup Frame */}
      <div className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200/80 transition-all">
        {/* Browser Top Navigation Bar */}
        <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between gap-4 text-xs text-slate-500 select-none">
          {/* Window Traffic Light Dots */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
          </div>

          {/* Browser Address Bar */}
          <div className="flex-1 max-w-md mx-auto bg-white border border-slate-200 rounded-full px-4 py-1 flex items-center justify-center gap-2 shadow-2xs text-[11px] text-slate-600 font-mono">
            <Lock className="h-3 w-3 text-slate-400" />
            <span className="truncate">https://rfc-learninghub.rmit.edu.vn</span>
            <ArrowClockwise className="h-3 w-3 text-slate-400 ml-auto" />
          </div>

          {/* Right Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>RMIT Finance Club</span>
          </div>
        </div>

        {/* Split Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Role Selection & Identity (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Club Bull Logo & Badge */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-auto flex items-center justify-center">
                    <img
                      src="/finance-club-logo.png"
                      alt="RMIT Finance Club Bull Logo"
                      className="h-14 w-auto object-contain drop-shadow-xs"
                    />
                  </div>
                  <div className="border-l border-slate-200 pl-3">
                    <span className="text-xs font-extrabold text-slate-900 tracking-tight uppercase block leading-tight">
                      RMIT Finance Club
                    </span>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      Project Leader Learning Hub
                    </span>
                  </div>
                </div>

                <span className="rounded-full bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 shadow-2xs">
                  RFC • ASM3
                </span>
              </div>

              {/* Main Welcome Heading */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Welcome to RMIT FINANCE CLUB PROJECT LEADER LEARNING HUB !
                </h1>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select your role below to navigate straight into your leadership training or management workspace.
                </p>
              </div>

              {/* You Are Section */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-widest text-blue-700">
                  You are
                </label>

                {/* Two Distinct Clickable Role Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Learners */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRole('learner')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedRole('learner')
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                      selectedRole === 'learner'
                        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                          selectedRole === 'learner' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <GraduationCap weight="duotone" className="h-6 w-6" />
                        </div>
                        {selectedRole === 'learner' && (
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>

                      <div>
                        <h2 className="text-base font-bold text-slate-900 leading-tight">
                          Learners
                        </h2>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          Project Leaders & Committee Trainees
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] text-blue-700 font-semibold flex items-center gap-1">
                      <span>Enter as Learner</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Option 2: Trainers/Facilitators */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRole('instructor')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedRole('instructor')
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                      selectedRole === 'instructor'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                          selectedRole === 'instructor' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <ChalkboardTeacher weight="duotone" className="h-6 w-6" />
                        </div>
                        {selectedRole === 'instructor' && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>

                      <div>
                        <h2 className="text-base font-bold text-slate-900 leading-tight">
                          Trainers/Facilitators
                        </h2>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          Mentors, Coaches & L&D Leads
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <span>Enter as Facilitator</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Quick Details Pill */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">
                    {selectedRole === 'learner' ? 'Profile: Nguyen Minh Tuan' : 'Profile: MSc. Hoang Le Tram'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {selectedRole === 'learner' ? 'ID: RFC-PL-2026' : 'ID: RFC-LND-LEAD'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {selectedRole === 'learner'
                    ? 'Access video modules, interactive quizzes, SBI assignments, and certification.'
                    : 'Manage course curriculum, grade SBI submissions, and monitor member progress.'}
                </p>
              </div>

              {/* Solid Black Pill Continue Button */}
              <button
                type="button"
                onClick={handleContinue}
                className="w-full h-12 rounded-full bg-black text-white font-semibold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {selectedRole === 'learner' ? 'Continue as Learner' : 'Continue as Trainer/Facilitator'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Bottom Footer Link */}
            <div className="pt-4 text-center text-xs text-slate-500 border-t border-slate-100 flex items-center justify-between gap-3">
              <span>Zero-Login Architecture • No Password Required</span>
              <button
                type="button"
                onClick={onExploreOverview}
                className="text-blue-700 font-semibold hover:underline cursor-pointer"
              >
                Explore ASM3 Overview
              </button>
            </div>
          </div>

          {/* Right Column: Soft Sage Illustration & Card Showcase (6 cols) */}
          <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-slate-50/50">
            <div className="w-full h-full rounded-3xl bg-[#f0f8f3] border border-emerald-100/60 p-6 sm:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-inner">
              {/* Illustration Top Area */}
              <div className="w-full flex-1 flex flex-col items-center justify-center relative py-4">
                {/* SVG Meditating / Working Character Illustration */}
                <div className="relative w-full max-w-[320px] aspect-4/3 flex items-center justify-center">
                  <svg
                    viewBox="0 0 400 340"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-xs select-none"
                  >
                    {/* Background Soft Thought Cloud Lines */}
                    <path
                      d="M120 110 C90 100 80 70 110 50 C130 30 170 30 190 45 C210 20 260 20 280 50 C310 40 330 70 310 95 C335 120 315 155 285 155 C275 180 230 180 210 165 C190 180 150 175 140 150 C110 150 100 125 120 110 Z"
                      stroke="#86efac"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      fill="#ffffff"
                      fillOpacity="0.6"
                    />

                    {/* Floating Avatar 1 (Left Guy) */}
                    <g transform="translate(60, 60)">
                      <circle cx="24" cy="24" r="22" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                      <path d="M16 16 Q24 8 32 16" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="19" cy="22" r="2" fill="#0f172a" />
                      <circle cx="29" cy="22" r="2" fill="#0f172a" />
                      <path d="M19 28 Q24 34 29 28" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </g>

                    {/* Floating Avatar 2 (Right Girl) */}
                    <g transform="translate(310, 130)">
                      <circle cx="22" cy="22" r="20" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                      <path d="M12 18 Q22 10 32 18" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="17" cy="22" r="2" fill="#0f172a" />
                      <circle cx="27" cy="22" r="2" fill="#0f172a" />
                      <ellipse cx="22" cy="28" rx="3" ry="4" fill="#0f172a" />
                    </g>

                    {/* Central Meditating Character */}
                    <ellipse cx="200" cy="115" rx="20" ry="24" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                    <path
                      d="M180 110 C175 90 200 80 220 85 C225 100 220 115 220 125 C215 110 205 105 195 105 C185 105 180 115 180 110 Z"
                      fill="#0f172a"
                    />
                    <path d="M190 116 Q194 120 197 116" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M203 116 Q206 120 210 116" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M197 126 Q200 128 203 126" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

                    {/* Green Sweater / Body */}
                    <path
                      d="M175 140 C165 145 150 160 140 180 C155 185 170 190 185 190 L185 200 L215 200 L215 190 C230 190 245 185 260 180 C250 160 235 145 225 140 Z"
                      fill="#86efac"
                      stroke="#0f172a"
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
                      stroke="#0f172a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M250 165 C265 150 270 130 262 120 C257 115 252 122 252 127 C250 135 240 155 230 165"
                      stroke="#0f172a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Cross-legged Pants (White) */}
                    <path
                      d="M175 195 C145 200 120 215 140 240 C160 250 180 245 200 235 C220 245 240 250 260 240 C280 215 255 200 225 195 Z"
                      fill="#ffffff"
                      stroke="#0f172a"
                      strokeWidth="2.5"
                    />

                    <path d="M175 235 Q180 248 190 245 Q195 240 188 232" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                    <path d="M225 235 Q220 248 210 245 Q205 240 212 232" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                  </svg>

                  {/* Floating Status Card */}
                  <div className="absolute left-1 bottom-0 sm:-bottom-2 bg-white rounded-2xl p-3 sm:p-3.5 shadow-lg border border-slate-200/80 text-left min-w-[145px] sm:min-w-[170px]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight">
                          Project Leader
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">HRD-102 • 10 Task</p>
                      </div>

                      {/* Circular Progress Gauge */}
                      <div className="relative h-8 w-8 flex items-center justify-center shrink-0">
                        <svg className="h-8 w-8 -rotate-90" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r="15"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="3"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="15"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            strokeDasharray="94.2"
                            strokeDashoffset="15"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute text-[8px] font-bold text-slate-900 font-mono">
                          84%
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5">
                      <span className="inline-block rounded-full border border-slate-300 px-2.5 py-0.5 text-[9px] font-semibold text-slate-700 bg-slate-50">
                        SBI Model
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span className="h-1.5 w-5 rounded-full bg-black" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              </div>

              {/* Bottom Tagline */}
              <div className="space-y-1 pt-1 max-w-sm">
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Make your leadership easier and organized with RFC Hub
                </p>
                <p className="text-[11px] text-slate-500">
                  TalentCore LMS • Dual Role Architecture
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
