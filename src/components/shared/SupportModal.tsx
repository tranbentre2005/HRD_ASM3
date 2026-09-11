import { useState } from "react"
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { 
  Lifebuoy, 
  EnvelopeSimple, 
  CalendarCheck, 
  Question, 
  ChatsTeardrop,
  ArrowRight
} from "@phosphor-icons/react"

interface SupportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupportModal({ open, onOpenChange }: SupportModalProps) {
  const [showAllFaqs, setShowAllFaqs] = useState(false)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="mb-1">
        <div className="flex items-center gap-2 text-[#437118]">
          <Lifebuoy className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Help Desk & Mentoring</span>
        </div>
        <DialogTitle className="text-xl text-center font-extrabold tracking-tight bg-gradient-to-r from-[#437118] via-[#1D2A62] to-[#1D2A62] bg-clip-text text-transparent">
          Project Leader Support & Resources
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4 pt-0 text-xs sm:text-sm text-[#252A35]">
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
        
        {/* Quick Resources */}
        <div className="flex items-center justify-between rounded-xl bg-gradient-to-br from-[#274818] via-[#386b24] to-[#4d8f31] border border-[#AFD06E]/25 p-2.5 text-white shadow-sm">
          <span className="text-xs font-bold text-[#AFD06E]">Quick Resources</span>
          <a
            href="https://rmiteduau-my.sharepoint.com/:f:/g/personal/s4063545_rmit_edu_vn/IgDxRh5pupKaRL_0n7tpIJmwAd17HHL2UKdpAGAvvEenSkg?e=Y4ZQ76"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-[#386b24] shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
          >
            <span>Open Event Toolkit</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#386b24]" />
          </a>
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
            <p className="text-[11px] text-slate-500">Get support from peers and mentors.</p>
          </div>
        </div>

        {/* FAQ Highlights */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold text-[#1D2A62] flex items-center gap-1.5">
              <Question className="h-4 w-4 text-[#437118]" />
              <span>Frequently Asked Questions (5)</span>
            </p>
            <button
              type="button"
              onClick={() => setShowAllFaqs((current) => !current)}
              aria-expanded={showAllFaqs}
              className="shrink-0 text-xs font-semibold text-[#1D2A62] transition-colors hover:text-[#437118] cursor-pointer"
            >
              {showAllFaqs ? 'View less' : 'View all'}
            </button>
          </div>

          <div id="support-faq-list" className="space-y-2 text-xs text-[#68707D]">
            <details className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <summary className="font-semibold text-[#1D2A62]">
                How do I continue a course I started?
              </summary>
              <p className="mt-1.5 pl-2 border-l-2 border-[#87AECE] text-[11px] leading-relaxed">
                Go to My Learning and select Continue Course from your current course card.
              </p>
            </details>

            <details className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <summary className="font-semibold text-[#1D2A62]">
                Where can I find the Event Readiness Checklist?
              </summary>
              <p className="mt-1.5 pl-2 border-l-2 border-[#87AECE] text-[11px] leading-relaxed">
                Open the Event Toolkit from My Learning or the Event Readiness course.
              </p>
            </details>

            {showAllFaqs && (
              <>
                <details className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <summary className="font-semibold text-[#1D2A62]">
                    What should I do if I need help applying a tool to my event?
                  </summary>
                  <p className="mt-1.5 pl-2 border-l-2 border-[#87AECE] text-[11px] leading-relaxed">
                    Join the Project Leader Teams Channel, attend a support session, or contact a mentor for guidance.
                  </p>
                </details>

                <details className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <summary className="font-semibold text-[#1D2A62]">
                    How is my course progress tracked?
                  </summary>
                  <p className="mt-1.5 pl-2 border-l-2 border-[#87AECE] text-[11px] leading-relaxed">
                    Your learning progress updates as your complete lessons, activities, and knowledge checks.
                  </p>
                </details>

                <details className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <summary className="font-semibold text-[#1D2A62]">
                    Can I review a completed course?
                  </summary>
                  <p className="mt-1.5 pl-2 border-l-2 border-[#87AECE] text-[11px] leading-relaxed">
                    Yes. Completed courses remain available in My Learning for review at any time.
                  </p>
                </details>
              </>
            )}

          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end mt-4">
        <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </div>
    </Dialog>
  )
}
