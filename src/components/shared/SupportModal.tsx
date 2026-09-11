import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { 
  Lifebuoy, 
  EnvelopeSimple, 
  CalendarCheck, 
  Question, 
  ChatsTeardrop,
  CheckCircle
} from "@phosphor-icons/react"

interface SupportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupportModal({ open, onOpenChange }: SupportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2 text-[#437118]">
          <Lifebuoy className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Help Desk & Mentoring</span>
        </div>
        <DialogTitle className="text-xl text-[#1D2A62]">
          Project Leader Support & Resources
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4 pt-2 text-xs sm:text-sm text-[#252A35]">
        {/* Office Hours Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex items-center gap-2 text-[#1D2A62] font-bold text-xs">
            <CalendarCheck className="h-4 w-4 text-[#437118]" />
            <span>Project Leader Support Hours</span>
          </div>
          <p className="text-xs text-[#68707D] leading-relaxed">
            Drop in for guidance on course activities, event preparation, team coordination, or applying learning tools to your project.
          </p>
          <p className="text-xs text-[#68707D] leading-relaxed">
            Every Friday · 16:00–18:00
            <br />
            Room 2.4.08, Saigon South Campus or via MS Teams
          </p>
        </div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1D2A62]">
              <EnvelopeSimple className="h-4 w-4 text-[#1D2A62]" />
              <span>Email Support</span>
            </div>
            <p className="text-xs font-mono text-[#68707D]">lnd.rfc@rmit.edu.vn</p>
            <p className="text-[11px] text-slate-500">Response time: within 24 hours</p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1D2A62]">
              <ChatsTeardrop className="h-4 w-4 text-[#437118]" />
              <span>Project Leader Teams Channel</span>
            </div>
            <p className="text-xs font-mono text-[#68707D]">#rfc-project-leads-2026</p>
            <p className="text-[11px] text-slate-500">Ask questions, share updates, and get quick support from peers and mentors.</p>
          </div>
        </div>

        {/* FAQ Highlights */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <p className="text-xs font-bold text-[#1D2A62] flex items-center gap-1.5">
            <Question className="h-4 w-4 text-[#437118]" />
            <span>Frequently Asked Questions</span>
          </p>

          <div className="space-y-2 text-xs text-[#68707D]">
            <details className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <summary className="font-semibold text-[#1D2A62]">
                How are practical SBI scenario assignments evaluated?
              </summary>
              <p className="mt-1.5 pl-2 border-l-2 border-[#87AECE] text-[11px] leading-relaxed">
                Facilitators grade assignments against the 4-part rubric (Context, Objective Behavior, Impact, Coaching Questions) on a 100-point scale. Feedback is delivered directly to your student portal.
              </p>
            </details>

            <details className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <summary className="font-semibold text-[#1D2A62]">
                How can I share or verify my certificate?
              </summary>
              <p className="mt-1.5 pl-2 border-l-2 border-[#87AECE] text-[11px] leading-relaxed">
                Every certificate issued carries an authenticated credential ID verifiable by student leadership and club executive boards. You can download the PDF or copy the share link directly.
              </p>
            </details>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end mt-4">
        <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </div>
    </Dialog>
  )
}
