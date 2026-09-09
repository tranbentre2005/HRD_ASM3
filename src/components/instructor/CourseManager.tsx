import { useState } from "react"
import { Course } from "@/data/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { 
  Plus, 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  CheckCircle,
  FolderSimplePlus,
  PencilSimple,
  Sparkle
} from "@phosphor-icons/react"
import confetti from "canvas-confetti"

interface CourseManagerProps {
  courses: Course[]
  onCreateCourse: (newCourse: Course) => void
  onSelectCourse: (course: Course) => void
}

export function CourseManager({ courses, onCreateCourse, onSelectCourse }: CourseManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [code, setCode] = useState("")
  const [category, setCategory] = useState("Kỹ năng mềm & Quản trị")
  const [level, setLevel] = useState<'Cơ bản' | 'Trung cấp' | 'Nâng cao'>("Trung cấp")
  const [duration, setDuration] = useState("6 giờ 00 phút")
  const [description, setDescription] = useState("")
  const [competencies, setCompetencies] = useState("Phân tích dữ liệu, Báo cáo nhân sự, Quản trị quyết định")

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !code.trim()) {
      alert("Vui lòng nhập tên khóa học và mã khóa học.")
      return
    }

    const newCourseObj: Course = {
      id: `course-${Date.now()}`,
      title: title.trim(),
      code: code.trim().toUpperCase(),
      category,
      level,
      duration,
      totalLessons: 4,
      completedLessons: 0,
      progress: 0,
      instructorName: "ThS. Hoàng Lê Trâm",
      instructorTitle: "Trưởng bộ phận Đào tạo & Phát triển (Head of L&D)",
      instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      description: description || "Chương trình đào tạo chuyên môn được xây dựng theo tiêu chuẩn phát triển năng lực nội bộ.",
      competencies: competencies.split(",").map(c => c.trim()).filter(Boolean),
      status: "assigned",
      enrolledLearnersCount: 25,
      averageScore: 90.0,
      modules: [
        {
          id: `mod-${Date.now()}-1`,
          title: "Phần 1: Giới thiệu và Nguyên lý cốt lõi",
          duration: "2 giờ 30 phút",
          lessons: [
            {
              id: `les-${Date.now()}-1`,
              title: "Tổng quan chương trình đào tạo",
              duration: "30 phút",
              type: "video",
              completed: false,
              content: "Nội dung bài học khởi động chương trình."
            }
          ]
        }
      ]
    }

    onCreateCourse(newCourseObj)
    setIsDialogOpen(false)
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    })

    // Reset fields
    setTitle("")
    setCode("")
    setDescription("")
  }

  return (
    <div className="space-y-6">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Quản Lý Chương Trình & Khóa Học Phụ Trách
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Biên tập giáo trình, cấu hình bài giảng và theo dõi hiệu suất các lớp đào tạo
          </p>
        </div>

        <Button onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
          <Plus className="h-4 w-4 mr-1.5" />
          Tạo khóa học mới
        </Button>
      </div>

      {/* Course List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {course.code}
                    </span>
                    <Badge variant="outline">{course.level}</Badge>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{course.category}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {course.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-center text-xs">
                <div>
                  <p className="text-[10px] text-slate-400">Học viên ghi danh</p>
                  <p className="font-bold text-slate-800 font-mono mt-0.5">
                    {course.enrolledLearnersCount || 40} người
                  </p>
                </div>
                <div className="border-x border-slate-200">
                  <p className="text-[10px] text-slate-400">Thời lượng</p>
                  <p className="font-bold text-slate-800 font-mono mt-0.5">
                    {course.duration}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Điểm TB học viên</p>
                  <p className="font-bold text-emerald-700 font-mono mt-0.5">
                    {course.averageScore || 90.0} / 100
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {course.competencies.map((comp) => (
                  <span
                    key={comp}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                  >
                    {comp}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {course.modules.length} Module • {course.totalLessons} Bài học
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => onSelectCourse(course)}>
                    Xem nội dung bài giảng
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Dialog: Create Course Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <div className="flex items-center gap-2 text-blue-700">
            <FolderSimplePlus className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Tạo mới khóa học</span>
          </div>
          <DialogTitle>Thiết lập Chương trình Đào tạo Mới</DialogTitle>
          <DialogDescription>
            Điền các thông số chuyên môn để đưa khóa học vào danh mục đào tạo của học viện.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Mã khóa học (Code)
              </label>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="VD: HRD-401"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Thời lượng dự kiến
              </label>
              <Input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="VD: 6 giờ 30 phút"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              Tên chương trình đào tạo
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Kỹ năng Phân tích Dữ liệu và Ra Quyết định Dựa trên Dữ liệu Nhân sự"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Chủ đề / Nhóm kỹ năng
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Kỹ năng mềm & Quản trị">Kỹ năng mềm & Quản trị</option>
                <option value="Lãnh đạo & Chiến lược">Lãnh đạo & Chiến lược</option>
                <option value="Kỹ thuật số & AI">Kỹ thuật số & AI</option>
                <option value="Văn hóa & Hội nhập">Văn hóa & Hội nhập</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Cấp độ đào tạo
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as 'Cơ bản' | 'Trung cấp' | 'Nâng cao')}
                className="w-full h-10 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Cơ bản">Cơ bản</option>
                <option value="Trung cấp">Trung cấp</option>
                <option value="Nâng cao">Nâng cao</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              Mục tiêu & Mô tả chương trình
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả tóm tắt giá trị khóa học mang lại cho nhân viên và doanh nghiệp..."
              className="min-h-[80px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              Khung năng lực đầu ra (phân cách bằng dấu phẩy)
            </label>
            <Input
              value={competencies}
              onChange={(e) => setCompetencies(e.target.value)}
              placeholder="VD: Phân tích dữ liệu, Trực quan hóa, Báo cáo nhân sự"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy bỏ
            </Button>
            <Button type="submit">
              Lưu & Xuất bản khóa học
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  )
}
