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
          <span className="text-xs font-semibold uppercase tracking-wider">Chứng chỉ Xác thực Doanh nghiệp</span>
        </div>
        <DialogTitle className="text-xl">Chứng chỉ Đào tạo Chuyên môn</DialogTitle>
        <DialogDescription>
          Mã xác thực trực tuyến: <span className="font-mono font-medium text-slate-800">{certificate.credentialId}</span>
        </DialogDescription>
      </DialogHeader>

      {/* Printable Certificate Frame */}
      <div className="relative mt-3 rounded-xl border-4 border-double border-slate-300 bg-linear-to-b from-white to-slate-50 p-6 text-center shadow-inner">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-4 ring-blue-100 mb-3">
          <SealCheck weight="fill" className="h-8 w-8" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          HỌC VIỆN ĐÀO TẠO & PHÁT TRIỂN NGUỒN NHÂN LỰC HRD
        </p>

        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
          CHỨNG NHẬN HOÀN THÀNH
        </h3>

        <p className="mt-2 text-xs text-slate-500">Trân trọng trao tặng cho học viên</p>
        <p className="mt-1 text-lg font-bold text-blue-900 tracking-wide underline decoration-blue-300 underline-offset-4">
          {certificate.learnerName}
        </p>

        <p className="mt-3 text-xs text-slate-600">Đã hoàn thành xuất sắc chương trình đào tạo chuẩn:</p>
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
            <p className="text-[11px] text-slate-400">Thời lượng & Đánh giá</p>
            <p className="font-medium text-slate-800">{certificate.hours} giờ học tích lũy</p>
            <p className="text-emerald-700 font-semibold">{certificate.grade}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400">Người xác nhận</p>
            <p className="font-semibold text-slate-900">{certificate.instructorName}</p>
            <p className="text-[10px] text-slate-500">{certificate.instructorTitle}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-slate-200 pt-3 text-[10px] text-slate-400">
          <span>Ngày cấp: {certificate.issueDate}</span>
          <span className="font-mono">TalentCore Verified LMS</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
          Đóng
        </Button>
        <Button variant="outline" size="sm" onClick={() => alert("Đã sao chép liên kết chứng chỉ vào bộ nhớ tạm.")}>
          <ShareNetwork className="h-4 w-4 mr-1.5" />
          Chia sẻ liên kết
        </Button>
        <Button size="sm" onClick={handlePrint}>
          <DownloadSimple className="h-4 w-4 mr-1.5" />
          In / Tải PDF
        </Button>
      </div>
    </Dialog>
  )
}
