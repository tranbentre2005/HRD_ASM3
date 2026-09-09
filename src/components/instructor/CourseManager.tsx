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
  const [category, setCategory] = useState("Soft Skills & Management")
  const [level, setLevel] = useState<'Foundational' | 'Intermediate' | 'Advanced'>("Intermediate")
  const [duration, setDuration] = useState("6 hours 00 mins")
  const [description, setDescription] = useState("")
  const [competencies, setCompetencies] = useState("Data Analytics, People Metrics, Decision Making")

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !code.trim()) {
      alert("Please enter both Course Title and Course Code.")
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
      instructorName: "MSc. Hoang Le Tram",
      instructorTitle: "Head of Learning & Development (Head of L&D)",
      instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      description: description || "Executive leadership development track structured to club operational standards.",
      competencies: competencies.split(",").map(c => c.trim()).filter(Boolean),
      status: "assigned",
      enrolledLearnersCount: 25,
      averageScore: 90.0,
      modules: [
        {
          id: `mod-${Date.now()}-1`,
          title: "Part 1: Foundations and Strategic Frameworks",
          duration: "2 hours 30 mins",
          lessons: [
            {
              id: `les-${Date.now()}-1`,
              title: "Leadership Program Orientation",
              duration: "30 mins",
              type: "video",
              completed: false,
              content: "Introductory module establishing team alignment and core expectations."
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

    setTitle("")
    setCode("")
    setDescription("")
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Curriculum & Program Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Design curriculum tracks, configure module assessments, and track cohort enrollment metrics
          </p>
        </div>

        <Button onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
          <Plus className="h-4 w-4 mr-1.5" />
          Create New Course
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
                    <Badge variant="outline">
                      {course.level}
                    </Badge>
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
                  <p className="text-[10px] text-slate-400">Enrolled Leaders</p>
                  <p className="font-bold text-slate-800 font-mono mt-0.5">
                    {course.enrolledLearnersCount || 40} members
                  </p>
                </div>
                <div className="border-x border-slate-200">
                  <p className="text-[10px] text-slate-400">Duration</p>
                  <p className="font-bold text-slate-800 font-mono mt-0.5">
                    {course.duration}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Average Score</p>
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
                  {course.modules.length} Modules • {course.totalLessons} Lessons
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => onSelectCourse(course)}>
                    Inspect Course Content
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
            <span className="text-xs font-semibold uppercase tracking-wider">New Course Configuration</span>
          </div>
          <DialogTitle>Configure Leadership Curriculum Track</DialogTitle>
          <DialogDescription>
            Input program parameters to publish this module directly into the RMIT Finance Club catalog.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Course Code
              </label>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. HRD-401"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Estimated Duration
              </label>
              <Input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 hours 30 mins"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              Program Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Financial Modeling & Project Decision Making"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Subject Track
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Soft Skills & Management">Soft Skills & Management</option>
                <option value="Leadership & Strategy">Leadership & Strategy</option>
                <option value="Digital & AI">Digital & AI</option>
                <option value="Culture & Onboarding">Culture & Onboarding</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">
                Difficulty Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as 'Foundational' | 'Intermediate' | 'Advanced')}
                className="w-full h-10 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Foundational">Foundational</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              Course Objectives & Overview
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summarize the core capabilities and competencies delivered by this track..."
              className="min-h-[80px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              Target Competencies (comma separated)
            </label>
            <Input
              value={competencies}
              onChange={(e) => setCompetencies(e.target.value)}
              placeholder="e.g. Risk Management, Stakeholder Alignment, Budgeting"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Publish Course to Hub
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  )
}
