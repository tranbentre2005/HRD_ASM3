import { useState, type ReactNode } from "react"
import {
  ArrowRight,
  CheckCircle,
  GearSix,
  ShieldCheck,
  SignOut,
  UserCircle
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AccountViewProps {
  onLogout: () => void
  onBackToHome: () => void
  onOpenSupport?: () => void
}

interface PreferenceToggleProps {
  label: string
  description: ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
}

function PreferenceToggle({ label, description, checked, onChange }: PreferenceToggleProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-bold text-[#1D2A62]">{label}</p>
        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-600">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-semibold ${checked ? "text-[#437118]" : "text-slate-500"}`}>
          {checked ? "On" : "Off"}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={`${label}: ${checked ? "On" : "Off"}`}
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D2A62] focus-visible:ring-offset-2 ${
            checked ? "bg-[#437118]" : "bg-slate-300"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              checked ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  )
}

interface PreferenceSelectProps {
  label: string
  description: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

function PreferenceSelect({ label, description, value, options, onChange }: PreferenceSelectProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-bold text-[#1D2A62]">{label}</p>
        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-600">{description}</p>
      </div>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 min-w-40 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-[#1D2A62] shadow-2xs outline-none transition-colors focus:border-[#1D2A62] focus:ring-2 focus:ring-[#87AECE]/40 cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export function AccountView({ onLogout, onBackToHome, onOpenSupport }: AccountViewProps) {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [learningReminders, setLearningReminders] = useState(true)
  const [clubUpdates, setClubUpdates] = useState(true)
  const [language, setLanguage] = useState("English")
  const [appearance, setAppearance] = useState("Light Mode")
  const [textSize, setTextSize] = useState("Default")
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false)

  const handleEditProfile = () => {
    document.getElementById("personal-information")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="space-y-6 pb-16 font-sans text-left max-w-5xl mx-auto">
      <section className="relative rounded-2xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fcfdfe] to-[#f2f7fa] p-5 sm:p-6 lg:py-6 lg:px-8 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] overflow-hidden flex items-center justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(#87AECE_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none -z-0" />

        <div className="relative z-10 flex w-full items-center justify-between gap-6">
          <div className="space-y-1.5 text-left">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <button
                type="button"
                onClick={onBackToHome}
                className="cursor-pointer text-slate-600 transition-colors hover:text-[#1D2A62] hover:underline"
              >
                Home
              </button>
              <span className="text-slate-300">/</span>
              <span className="font-semibold text-[#1D2A62]">Account</span>
            </nav>
            <h1 className="inline-block bg-gradient-to-r from-[#386b24] via-[#437118] to-[#1D2A62] bg-clip-text pt-0.5 text-2xl font-extrabold leading-tight tracking-tight text-transparent sm:text-3xl lg:text-4xl">
              My Account
            </h1>
            <p className="text-xs font-medium leading-relaxed text-slate-600 sm:text-sm">
              Manage your profile, preferences, and account settings.
            </p>
          </div>
          <div className="relative z-10 hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#87AECE]/35 bg-gradient-to-br from-[#AFD06E]/20 to-[#87AECE]/20 shadow-xs sm:flex">
            <UserCircle className="h-10 w-10 text-[#1D2A62]" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="space-y-5 border-slate-200/90 bg-white p-5 text-left shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-[#437118]" />
                <h2 className="text-lg font-extrabold tracking-tight text-[#1D2A62]">Profile Overview</h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">Your identity and learning membership details.</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleEditProfile} className="shrink-0 cursor-pointer">
              Edit Profile
            </Button>
          </div>

          <div className="flex items-center gap-4 border-t border-slate-100 pt-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#87AECE]/50 bg-[#1D2A62] text-xl font-extrabold text-white shadow-sm">
              T
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1D2A62]">Tran Le Bao Tran</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-[10px] text-[#1D2A62]">• Project Leader</Badge>
                <Badge variant="outline" className="text-[10px] text-[#437118]">• Active Learner</Badge>
                <Badge variant="outline" className="text-[10px] text-slate-600">• HR Department</Badge>
                <Badge variant="outline" className="text-[10px] text-slate-600">• RMIT Finance Club</Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Building the skills to lead better events with clarity, confidence, and readiness.
              </p>
            </div>
          <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-[10px]">
            <div>
              <p className="font-medium text-slate-500">Member since</p>
              <p className="mt-1 font-bold text-[#1D2A62]">Aug 2025</p>
            </div>
            <div>
              <p className="font-medium text-slate-500">Learning pathway</p>
              <p className="mt-1 font-bold text-[#1D2A62]">Event Readiness</p>
            </div>
            <div>
              <p className="font-medium text-slate-500">Department</p>
              <p className="mt-1 font-bold text-[#1D2A62]">Human Resources</p>
            </div>
          </div>
          </div>
        </Card>

        <Card id="personal-information" className="border-slate-200/90 bg-white p-5 text-left shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#437118]" />
                <h2 className="text-lg font-extrabold tracking-tight text-[#1D2A62]">Personal Information</h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">The profile details associated with your account.</p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 cursor-pointer">
              Edit Information
            </Button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-medium text-slate-500">Full Name</p>
              <p className="mt-1 text-sm font-bold text-[#1D2A62]">Tran Le Bao Tran</p>
            </div>
            <div className="sm:ml-[30%]">
              <p className="text-[11px] font-medium text-slate-500">Display Name</p>
              <p className="mt-1 text-sm font-bold text-[#1D2A62]">Bao Tran</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500">Mail Address</p>
              <p className="mt-1 text-sm font-bold text-[#1D2A62]">s4063545@rmit.edu.vn</p>
            </div>
            <div className="sm:ml-[30%]">
              <p className="text-[11px] font-medium text-slate-500">Current Role</p>
              <p className="mt-1 text-sm font-bold text-[#1D2A62]">HR Member</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500">Organisation</p>
              <p className="mt-1 text-sm font-bold text-[#1D2A62]">RMIT Vietnam Finance Club</p>
            </div>
            <div className="sm:ml-[30%]">
              <p className="text-[11px] font-medium text-slate-500">Learning Status</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-[#437118]">
                <CheckCircle weight="fill" className="h-4 w-4" />
                Active Learner
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-slate-200/90 bg-white p-5 text-left shadow-sm sm:p-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <GearSix className="h-5 w-5 text-[#437118]" />
            <h2 className="text-lg font-extrabold tracking-tight text-[#1D2A62]">Settings & Preferences</h2>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Customise your learning experience and notification preferences.
          </p>
        </div>

        <div className="relative mt-5 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 md:after:pointer-events-none md:after:absolute md:after:inset-y-0 md:after:left-1/2 md:after:w-px md:after:bg-slate-100 md:after:content-['']">
          <div className="min-w-0">
            <PreferenceToggle
              label="Email Notifications"
              description="Receive important course updates, reminders, and learning announcements."
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
          </div>
          <div className="min-w-0">
            <PreferenceSelect
              label="Language"
              description="Choose your preferred platform language."
              value={language}
              options={["English", "Vietnamese"]}
              onChange={setLanguage}
            />
          </div>
          <div className="min-w-0">
            <PreferenceToggle
              label="Learning Reminders"
              description="Get reminders to help you stay on track with your learning."
              checked={learningReminders}
              onChange={setLearningReminders}
            />
          </div>
          <div className="min-w-0">
            <PreferenceSelect
              label="Appearance"
              description="Choose how the Learning Hub looks on your device."
              value={appearance}
              options={["Light Mode", "Dark Mode", "Use Device Setting"]}
              onChange={setAppearance}
            />
          </div>
          <div className="min-w-0">
            <PreferenceToggle
              label="Club Updates"
              description={
                <>
                  Receive selected updates about new learning resources, tools,{" "}
                  <br />
                  and Project Leader development opportunities.
                </>
              }
              checked={clubUpdates}
              onChange={setClubUpdates}
            />
          </div>
          <div className="min-w-0">
            <PreferenceSelect
              label="Text Size"
              description="Adjust the interface text size for more comfortable reading."
              value={textSize}
              options={["Small", "Default", "Large"]}
              onChange={setTextSize}
            />
          </div>
        </div>
      </Card>

      <Card className="border-slate-200/90 bg-white p-5 text-left shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <SignOut className="h-5 w-5 text-rose-600" />
              <h2 className="text-lg font-extrabold tracking-tight text-[#1D2A62]">Account Management</h2>
            </div>
          </div>
          {!showSignOutConfirmation && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowSignOutConfirmation(true)}
              className="shrink-0 cursor-pointer"
            >
              Sign Out
            </Button>
          )}
        </div>

        {showSignOutConfirmation && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold leading-relaxed text-rose-800">
              Are you sure you want to sign out of this device?
            </p>
            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSignOutConfirmation(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={onLogout} className="cursor-pointer">
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </Card>

      {onOpenSupport && (
        <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-[#F0F7FC] via-white to-[#EEF7E8] p-5 text-left shadow-2xs sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm font-extrabold text-[#1D2A62]">Need help with your account?</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Visit Support for assistance with access, settings, or technical issues.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onOpenSupport} className="shrink-0 cursor-pointer">
            Open Support
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  )
}
