import { CertificateItem } from "@/data/types"
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SealCheck, DownloadSimple, ShareNetwork, Medal } from "@phosphor-icons/react"

interface CertificateModalProps {
  certificate: CertificateItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CertificateModal({ certificate, open, onOpenChange }: CertificateModalProps) {
  if (!certificate) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2 text-blue-700">
          <Medal className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Official Credential Verification</span>
        </div>
        <DialogTitle className="text-xl">Executive Leadership Certificate</DialogTitle>
        <DialogDescription>
          Online Credential ID: <span className="font-mono font-medium text-slate-800">{certificate.credentialId}</span>
        </DialogDescription>
      </DialogHeader>

      {/* Printable Certificate Frame */}
      <div className="relative mt-3 rounded-xl border-4 border-double border-slate-300 bg-linear-to-b from-white to-slate-50 p-6 text-center shadow-inner">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-4 ring-blue-100 mb-3">
          <SealCheck weight="fill" className="h-8 w-8" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          RMIT FINANCE CLUB • LEADERSHIP DEVELOPMENT INITIATIVE
        </p>

        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
          CERTIFICATE OF COMPLETION
        </h3>

        <p className="mt-2 text-xs text-slate-500">Proudly presented to project leader</p>
        <p className="mt-1 text-lg font-bold text-blue-900 tracking-wide underline decoration-blue-300 underline-offset-4">
          {certificate.learnerName}
        </p>

        <p className="mt-3 text-xs text-slate-600">For successfully mastering the executive curriculum track:</p>
        <p className="mt-1 text-sm font-semibold text-slate-900 max-w-sm mx-auto">
          {certificate.courseTitle} ({certificate.courseCode})
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          {certificate.competencies.map((comp) => (
            <span
              key={comp}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 border border-slate-200"
            >
              {comp}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-200 pt-4 text-left text-xs">
          <div>
            <p className="text-[11px] text-slate-400">Hours & Assessment</p>
            <p className="font-medium text-slate-800">{certificate.hours} Development Hours</p>
            <p className="text-emerald-700 font-semibold">{certificate.grade}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400">Certifying Authority</p>
            <p className="font-semibold text-slate-900">{certificate.instructorName}</p>
            <p className="text-[10px] text-slate-500">{certificate.instructorTitle}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-slate-200 pt-3 text-[10px] text-slate-400">
          <span>Issue Date: {certificate.issueDate}</span>
          <span className="font-mono">RFC Verified LMS Credential</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
          Close
        </Button>
        <Button variant="outline" size="sm" onClick={() => alert("Certificate verification link copied to clipboard.")}>
          <ShareNetwork className="h-4 w-4 mr-1.5" />
          Share Link
        </Button>
        <Button size="sm" onClick={handlePrint}>
          <DownloadSimple className="h-4 w-4 mr-1.5" />
          Print / Download PDF
        </Button>
      </div>
    </Dialog>
  )
}
