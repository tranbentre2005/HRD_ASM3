import { SignOut, ArrowLeft } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AccountViewProps {
  userName?: string
  onLogout: () => void
  onBackToHome: () => void
}

export function AccountView({
  userName,
  onLogout,
  onBackToHome,
}: AccountViewProps) {
  const displayName = userName?.trim() || 'Nguyen Minh Tuan'
  const initial = (displayName.split(' ').pop()?.[0] || 'T').toUpperCase()

  return (
    <div className="space-y-6 pb-12 font-sans max-w-4xl">
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBackToHome} className="cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Home
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1D2A62]">
            Account & Leadership Profile
          </h1>
        </div>
      </div>

      <Card className="p-6 sm:p-8 border-slate-200/90 shadow-sm bg-white space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[#1D2A62] text-white flex items-center justify-center font-extrabold text-2xl shadow-sm border-2 border-[#87AECE]/50 shrink-0">
              {initial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#1D2A62]">{displayName}</h2>
                <Badge variant="default" className="bg-[#1D2A62] text-white">
                  Project Leader
                </Badge>
              </div>
              <p className="text-xs text-[#68707D] mt-0.5">RMIT Vietnam Finance Club • Leadership Cohort 2026</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 cursor-pointer h-9 px-4 text-xs font-semibold"
          >
            <SignOut className="h-4 w-4 mr-1.5" />
            Switch Role / Logout
          </Button>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] text-[#68707D] font-medium">Student / Staff ID</span>
            <p className="font-bold font-mono text-[#1D2A62] text-sm">s3982104</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] text-[#68707D] font-medium">Club Email Address</span>
            <p className="font-bold text-[#1D2A62] text-sm">tuan.nguyen@rmit.edu.vn</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] text-[#68707D] font-medium">Committee</span>
            <p className="font-bold text-[#1D2A62] text-sm">Project Management & Event Execution</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] text-[#68707D] font-medium">Current Learning Status</span>
            <p className="font-bold text-[#437118] text-sm">On Track • 2 Courses Completed</p>
          </div>
        </div>

      </Card>
    </div>
  )
}
