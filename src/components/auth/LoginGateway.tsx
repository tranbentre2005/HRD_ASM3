import { useState } from "react"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  Eye, 
  EyeSlash, 
  GoogleLogo, 
  AppleLogo, 
  FacebookLogo, 
  ArrowRight,
  Lock,
  ArrowClockwise
} from "@phosphor-icons/react"
import confetti from "canvas-confetti"

interface LoginGatewayProps {
  onLoginAs: (role: 'learner' | 'instructor', customName?: string) => void
  onExploreOverview: () => void
}

export function LoginGateway({ onLoginAs, onExploreOverview }: LoginGatewayProps) {
  const [selectedRole, setSelectedRole] = useState<'learner' | 'instructor'>('learner')
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('tuan.nguyen@rmit.edu.vn')
  const [password, setPassword] = useState('••••••••••••')

  const handleRoleSelect = (role: 'learner' | 'instructor') => {
    setSelectedRole(role)
    if (role === 'learner') {
      setUsername('tuan.nguyen@rmit.edu.vn')
    } else {
      setUsername('tram.hoang@rmit.edu.vn')
    }
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    })
    const name = selectedRole === 'learner' ? 'Nguyễn Minh Tuấn' : 'ThS. Hoàng Lê Trâm'
    onLoginAs(selectedRole, name)
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

          {/* Right Info Chip */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>RMIT Finance Club</span>
          </div>
        </div>

        {/* Split Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Login Form & Role Selection (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Header Titles */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold">
                  <span>RFC</span>
                  <span>•</span>
                  <span>Project Leader Hub</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Welcome to RMIT FINANCE CLUB PROJECT LEADER LEARNING HUB !
                </h1>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Simplify your leadership journey and elevate project management with RFC Hub.
                </p>
              </div>

              {/* Role Selection: You are */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  You are
                </label>

                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-full border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('learner')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedRole === 'learner'
                        ? 'bg-black text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Learners</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('instructor')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedRole === 'instructor'
                        ? 'bg-black text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <ChalkboardTeacher className="h-4 w-4" />
                    <span>Trainers/Facilitators</span>
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 pt-1">
                {/* Username Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className="w-full h-12 rounded-full border border-slate-300 bg-white px-5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors shadow-2xs"
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full h-12 rounded-full border border-slate-300 bg-white px-5 pr-12 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                    aria-label="Hiện mật khẩu"
                  >
                    {showPassword ? (
                      <EyeSlash className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end pr-2">
                  <button
                    type="button"
                    onClick={() => alert("Hệ thống kiểm thử không yêu cầu mật khẩu. Bạn có thể nhấn Login để vào ngay.")}
                    className="text-[11px] text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Solid Black Pill Login Button */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-black text-white font-semibold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Login</span>
                </button>
              </form>

              {/* Divider: or continue with */}
              <div className="relative flex items-center justify-center pt-1">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-slate-400 shrink-0 font-medium">
                  or continue with
                </span>
                <div className="border-t border-slate-200 w-full" />
              </div>

              {/* Social Login Round Buttons */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleLoginSubmit}
                  title="Login with Google"
                  className="h-11 w-11 rounded-full bg-black text-white hover:bg-slate-800 flex items-center justify-center transition-all hover:scale-105 cursor-pointer shadow-2xs"
                >
                  <GoogleLogo className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={handleLoginSubmit}
                  title="Login with Apple ID"
                  className="h-11 w-11 rounded-full bg-black text-white hover:bg-slate-800 flex items-center justify-center transition-all hover:scale-105 cursor-pointer shadow-2xs"
                >
                  <AppleLogo className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={handleLoginSubmit}
                  title="Login with Facebook"
                  className="h-11 w-11 rounded-full bg-black text-white hover:bg-slate-800 flex items-center justify-center transition-all hover:scale-105 cursor-pointer shadow-2xs"
                >
                  <FacebookLogo className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Bottom Footer Links */}
            <div className="pt-4 text-center text-xs text-slate-500 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
              <span>
                Not a member?{" "}
                <button
                  type="button"
                  onClick={() => alert("Hệ thống Demo ASM3. Bạn có thể nhấn Login để vào ngay mà không cần đăng ký.")}
                  className="text-slate-900 font-semibold hover:underline cursor-pointer"
                >
                  Register now
                </button>
              </span>
              <span>•</span>
              <button
                type="button"
                onClick={onExploreOverview}
                className="text-blue-700 font-medium hover:underline cursor-pointer"
              >
                Xem tổng quan đề tài ASM3
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
                      {/* Avatar Hair & Smile */}
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
                    {/* Head & Hair */}
                    <ellipse cx="200" cy="115" rx="20" ry="24" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                    {/* Hair */}
                    <path
                      d="M180 110 C175 90 200 80 220 85 C225 100 220 115 220 125 C215 110 205 105 195 105 C185 105 180 115 180 110 Z"
                      fill="#0f172a"
                    />
                    {/* Face features (eyes closed in zen) */}
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

                    {/* Arms in meditation pose (Hands up) */}
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

                    {/* Feet */}
                    <path d="M175 235 Q180 248 190 245 Q195 240 188 232" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                    <path d="M225 235 Q220 248 210 245 Q205 240 212 232" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                  </svg>

                  {/* Floating Status Card (Like "Canva Design 84%" in reference image) */}
                  <div className="absolute left-1 bottom-0 sm:-bottom-2 bg-white rounded-2xl p-3 sm:p-3.5 shadow-lg border border-slate-200/80 text-left min-w-[145px] sm:min-w-[170px] animate-in fade-in-50 slide-in-from-bottom-2">
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

                    {/* Pill Tag */}
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

              {/* Bottom Tagline (Direct Match with Reference Image Pattern) */}
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
