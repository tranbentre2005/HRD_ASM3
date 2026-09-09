import { UserRole, Course, CertificateItem } from "@/data/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  Compass, 
  Lightning, 
  ShieldCheck, 
  ArrowRight, 
  Exam, 
  CheckSquare, 
  FolderSimplePlus, 
  Medal,
  Sparkle,
  Code
} from "@phosphor-icons/react"

interface PlatformOverviewProps {
  onSelectRole: (role: UserRole) => void
  onQuickStartCourse: (courseId: string) => void
  onOpenCertificate: () => void
}

export function PlatformOverview({
  onSelectRole,
  onQuickStartCourse,
  onOpenCertificate,
}: PlatformOverviewProps) {
  return (
    <div className="space-y-10 pb-16">
      {/* Hero Presentation Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200">
              Đề tài ASM3: Nền tảng Đào tạo Doanh nghiệp
            </span>
            <Badge variant="outline">React 19 + Tailwind v4 + Shadcn UI</Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Hệ Thống Đào Tạo & Phát Triển Nguồn Nhân Lực HRD
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Mô hình nền tảng LMS doanh nghiệp tương tác toàn diện với hai phân quyền độc lập: Người học (Learner) và Người dạy (Instructor / L&D Lead). Không yêu cầu cài đặt cơ sở dữ liệu hay đăng nhập phức tạp, cho phép trải nghiệm và đánh giá nghiệp vụ đào tạo tức thì.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Button size="lg" onClick={() => onSelectRole('learner')} className="cursor-pointer">
              <GraduationCap weight="fill" className="h-5 w-5 mr-2" />
              Khám phá Góc nhìn Người học
            </Button>
            <Button size="lg" variant="outline" onClick={() => onSelectRole('instructor')} className="cursor-pointer">
              <ChalkboardTeacher weight="fill" className="h-5 w-5 mr-2 text-blue-700" />
              Khám phá Góc nhìn Người dạy
            </Button>
          </div>
        </div>
      </div>

      {/* Two-Role Interactive Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learner Card */}
        <Card className="p-6 border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <GraduationCap weight="duotone" className="h-7 w-7" />
              </div>
              <Badge variant="default">Góc nhìn Học viên</Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Quyền 1: Người Học (Learner / Trainee)
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dành cho nhân viên tham gia các chương trình đào tạo bắt buộc và phát triển năng lực định kỳ theo chuẩn khung năng lực 2026.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Lớp học tương tác: Video bài giảng, slide thuyết minh và ghi chú.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Bài kiểm tra trắc nghiệm: Chấm điểm tức thì, giải thích đáp án chi tiết.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Nộp bài tập thực hành theo mô hình SBI và đính kèm tài liệu.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Theo dõi lộ trình năng lực cá nhân và chứng chỉ LMS đạt được.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6">
            <Button
              className="w-full justify-between"
              onClick={() => onSelectRole('learner')}
            >
              <span>Trải nghiệm màn hình Người học</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Instructor Card */}
        <Card className="p-6 border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ChalkboardTeacher weight="duotone" className="h-7 w-7" />
              </div>
              <Badge variant="success">Góc nhìn Giảng viên</Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Quyền 2: Người Dạy & Quản Lý L&D
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dành cho Giảng viên nội bộ và Trưởng bộ phận Đào tạo (Head of L&D) quản lý chương trình và theo dõi kết quả toàn công ty.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Quản lý chương trình đào tạo và thiết lập khóa học mới trực tiếp.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Sổ chấm điểm bài tập: Thang điểm 100, xếp loại học lực tự động.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Soạn nhận xét chi tiết với kho gợi ý phản hồi nhanh (Quick chips).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Báo cáo tiến độ học viên theo phòng ban và gửi email nhắc nhở học tập.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => onSelectRole('instructor')}
            >
              <span>Trải nghiệm màn hình Người dạy</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Interactive Scenarios for Testing */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Kịch bản đánh giá nhanh
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Các Thao Tác Trọng Tâm Để Trải Nghiệm & Chấm Điểm
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Bấm vào bất kỳ kịch bản nào dưới đây để được chuyển thẳng đến tính năng tương ứng
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onQuickStartCourse('course-1')}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer space-y-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Exam className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">1. Làm bài trắc nghiệm</h4>
            <p className="text-xs text-slate-500">
              Vào khóa HRD-102, làm bài quiz tương tác kiểm tra mô hình SBI và xem kết quả tức thì.
            </p>
          </div>

          <div
            onClick={() => onQuickStartCourse('course-1')}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer space-y-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <Lightning className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">2. Nộp bài tập thực hành</h4>
            <p className="text-xs text-slate-500">
              Nhập kịch bản phản hồi tình huống, đính kèm file và nộp bài cho giảng viên chấm.
            </p>
          </div>

          <div
            onClick={() => onSelectRole('instructor')}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all cursor-pointer space-y-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <CheckSquare className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">3. Chấm bài & Cho nhận xét</h4>
            <p className="text-xs text-slate-500">
              Vào Sổ chấm điểm của giảng viên, kéo thang điểm và lưu nhận xét cho học viên.
            </p>
          </div>

          <div
            onClick={onOpenCertificate}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/50 hover:border-amber-300 transition-all cursor-pointer space-y-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <Medal className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">4. Xem chứng chỉ LMS</h4>
            <p className="text-xs text-slate-500">
              Xem mẫu chứng chỉ chuẩn hóa có mã định danh xác thực và tính năng in/tải file.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Specifications Footer Note */}
      <div className="rounded-xl border border-slate-200 bg-slate-100/70 p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-slate-500" />
          <span>Kiến trúc Kỹ thuật: React 19 • Tailwind CSS v4 • Shadcn UI Token Architecture • Không phụ thuộc Backend</span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          Phiên bản: HRD-ASM3-2026.09
        </div>
      </div>
    </div>
  )
}
