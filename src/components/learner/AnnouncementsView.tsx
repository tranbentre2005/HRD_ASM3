import { Bell, CheckCircle, Clock, ArrowLeft, Megaphone } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface AnnouncementsViewProps {
  onBackToHome: () => void
}

export function AnnouncementsView({ onBackToHome }: AnnouncementsViewProps) {
  const announcements = [
    {
      id: "ann-1",
      title: "SBI Practical Assignment HRD-102 Graded",
      category: "Grading",
      time: "10 mins ago",
      author: "MSc. Hoang Le Tram (Lead Facilitator)",
      content: "Facilitator feedback has been published for your SBI communication script. Review your personalized developmental suggestions on the Learning Portal.",
      important: true,
    },
    {
      id: "ann-2",
      title: "Event Readiness Sprint 03 Deadline Reminder",
      category: "Deadline",
      time: "Today at 09:30",
      author: "L&D Committee",
      content: "All Project Leaders delivering Q3 student events must complete the 3-minute final readiness checklist before Sunday 23:59.",
      important: true,
    },
    {
      id: "ann-3",
      title: "Weekly Facilitator Office Hours - Room 2.4.08",
      category: "Coaching",
      time: "Yesterday at 14:00",
      author: "MSc. Hoang Le Tram",
      content: "Drop-in coaching session this Friday 16:00 - 18:00 for milestone planning, budgeting questions, and volunteer team alignment.",
      important: false,
    },
    {
      id: "ann-4",
      title: "New Event Toolkit Templates Uploaded to OneDrive",
      category: "Resources",
      time: "2 days ago",
      author: "Executive Committee",
      content: "Updated event budget templates, run-of-show spreadsheets, and risk register files are now accessible in the shared club OneDrive.",
      important: false,
    }
  ]

  return (
    <div className="space-y-6 pb-12 font-sans">
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBackToHome} className="cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#437118]" />
            <h1 className="text-xl sm:text-2xl font-bold text-[#1D2A62]">
              Club Announcements & Notices
            </h1>
          </div>
        </div>
        <Badge variant="secondary">4 Updates</Badge>
      </div>

      <div className="space-y-4 max-w-4xl">
        {announcements.map((item) => (
          <Card key={item.id} className="p-5 border-slate-200/90 shadow-2xs hover:border-[#87AECE] hover:shadow-xs transition-all text-left">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.category === 'Grading' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                    item.category === 'Deadline' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                    'bg-blue-50 text-blue-800 border border-blue-200'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-[#68707D]">{item.author}</span>
                </div>
                <h3 className="text-base font-bold text-[#1D2A62]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#68707D] leading-relaxed pt-1">{item.content}</p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 shrink-0">{item.time}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
