import { useState } from "react"
import { 
  UserRole, 
  Course, 
  AssignmentSubmission, 
  LearnerProgressItem, 
  CertificateItem 
} from "@/data/types"
import { 
  INITIAL_COURSES, 
  INITIAL_SUBMISSIONS, 
  INITIAL_LEARNERS, 
  INITIAL_CERTIFICATES 
} from "@/data/mockData"
import { LoginGateway } from "@/components/auth/LoginGateway"
import { Navbar } from "@/components/shared/Navbar"
import { CertificateModal } from "@/components/shared/CertificateModal"
import { SupportModal } from "@/components/shared/SupportModal"
import { LearnerDashboard } from "@/components/learner/LearnerDashboard"
import { ActiveCourseViewer } from "@/components/learner/ActiveCourseViewer"
import { InstructorDashboard } from "@/components/instructor/InstructorDashboard"

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('login')
  const [customUserName, setCustomUserName] = useState<string>('')
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES)
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(INITIAL_SUBMISSIONS)
  const [learners, setLearners] = useState<LearnerProgressItem[]>(INITIAL_LEARNERS)
  const [certificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES)

  // Sub-navigation within learner view
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null)
  const [learnerTab, setLearnerTab] = useState<'my-courses' | 'catalog' | 'skills' | 'certificates'>('my-courses')

  // Certificate & Support Modal States
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null)
  const [isCertModalOpen, setIsCertModalOpen] = useState(false)
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false)

  // Handler: Login as chosen role
  const handleLoginAs = (role: 'learner' | 'instructor', customName?: string) => {
    setCurrentRole(role)
    if (customName) {
      setCustomUserName(customName)
    }
    setActiveCourseId(null)
    setLearnerTab('my-courses')
  }

  // Handler: Logout back to Welcome Gateway
  const handleLogout = () => {
    setCurrentRole('login')
    setActiveCourseId(null)
  }

  // Handler: Return to Home (Dashboard)
  const handleGoHome = () => {
    setActiveCourseId(null)
    setLearnerTab('my-courses')
  }

  // Handler: Navigate Tabs from Header
  const handleNavigateLearnerTab = (tab: 'my-courses' | 'catalog') => {
    setActiveCourseId(null)
    setLearnerTab(tab)
  }

  // Handler: Open Support Modal
  const handleOpenSupport = () => {
    setIsSupportModalOpen(true)
  }

  // Handler: Role Switch within portal
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role)
    setActiveCourseId(null)
  }

  // Handler: Learner Select Course to enter classroom
  const handleSelectCourse = (course: Course) => {
    setActiveCourseId(course.id)
  }

  // Handler: Learner Back to Dashboard
  const handleBackToDashboard = () => {
    setActiveCourseId(null)
  }

  // Handler: Update Course Lesson completion
  const handleUpdateCourseProgress = (courseId: string, lessonId: string, completed: boolean) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id !== courseId) return course

        const updatedModules = course.modules.map(module => ({
          ...module,
          lessons: module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, completed }
            }
            return lesson
          })
        }))

        const allLessons = updatedModules.flatMap(m => m.lessons)
        const completedCount = allLessons.filter(l => l.completed).length
        const total = allLessons.length
        const newProgress = total > 0 ? Math.round((completedCount / total) * 100) : course.progress

        return {
          ...course,
          modules: updatedModules,
          completedLessons: completedCount,
          progress: newProgress,
          status: newProgress === 100 ? 'completed' : 'in-progress'
        }
      })
    )
  }

  // Handler: Learner submits assignment
  const handleSubmitAssignment = (
    courseId: string,
    lessonId: string,
    text: string,
    fileName?: string
  ) => {
    const course = courses.find(c => c.id === courseId)
    const allLessons = course?.modules.flatMap(m => m.lessons) || []
    const lesson = allLessons.find(l => l.id === lessonId)

    const newSub: AssignmentSubmission = {
      id: `sub-${Date.now()}`,
      courseId,
      courseTitle: course?.title || "Leadership Capability Track",
      lessonId,
      lessonTitle: lesson?.title || "Practical Assignment Task",
      learnerId: "lrn-1",
      learnerName: customUserName || "Nguyen Minh Tuan",
      learnerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      department: "Executive Committee - Project Lead",
      submittedAt: "Just now",
      content: text,
      attachmentName: fileName,
      status: "pending"
    }

    setSubmissions(prev => [newSub, ...prev])
  }

  // Handler: Instructor creates new course
  const handleCreateCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev])
  }

  // Handler: Instructor grades assignment
  const handleGradeSubmission = (submissionId: string, score: number, feedback: string) => {
    setSubmissions(prev =>
      prev.map(sub => {
        if (sub.id === submissionId) {
          return {
            ...sub,
            score,
            feedback,
            status: "graded",
            gradedBy: customUserName || "MSc. Hoang Le Tram"
          }
        }
        return sub
      })
    )
  }

  // Handler: Open Certificate View
  const handleViewCertificate = (cert: CertificateItem) => {
    setSelectedCert(cert)
    setIsCertModalOpen(true)
  }

  const activeCourse = courses.find(c => c.id === activeCourseId)

  // 1. Welcome / Login Gateway View
  if (currentRole === 'login') {
    return (
      <LoginGateway
        onLoginAs={handleLoginAs}
      />
    )
  }

  // 2. Main Portal view
  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Navigation Bar with Logo Home, COURSES, MY LEARNING, SUPPORT, Bell, and 1-letter avatar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
        onGoHome={handleGoHome}
        onNavigateTab={handleNavigateLearnerTab}
        onOpenSupport={handleOpenSupport}
        activeLearnerTab={learnerTab}
        userName={customUserName}
        unreadCount={submissions.filter(s => s.status === 'pending').length}
      />
      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-3 sm:pt-3.5">
        {currentRole === 'learner' && (
          <>
            {activeCourse ? (
              <ActiveCourseViewer
                course={activeCourse}
                onBack={handleBackToDashboard}
                onUpdateCourseProgress={handleUpdateCourseProgress}
                onSubmitAssignment={handleSubmitAssignment}
              />
            ) : (
              <LearnerDashboard
                courses={courses}
                certificates={certificates}
                onSelectCourse={handleSelectCourse}
                onViewCertificate={handleViewCertificate}
                activeTab={learnerTab}
                onTabChange={setLearnerTab}
              />
            )}
          </>
        )}

        {currentRole === 'instructor' && (
          <InstructorDashboard
            courses={courses}
            submissions={submissions}
            learners={learners}
            onCreateCourse={handleCreateCourse}
            onGradeSubmission={handleGradeSubmission}
            onSelectCourse={(course) => {
              setActiveCourseId(course.id)
              setCurrentRole('learner')
            }}
          />
        )}
      </main>

      {/* Verified Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        open={isCertModalOpen}
        onOpenChange={setIsCertModalOpen}
      />

      {/* Support & Help Desk Modal */}
      <SupportModal
        open={isSupportModalOpen}
        onOpenChange={setIsSupportModalOpen}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © 2026 RMIT Finance Club (RFC) • Project Leader Learning Hub. HRD Capstone ASM3.
          </p>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <button
              type="button"
              onClick={handleLogout}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Return to Role Selection
            </button>
            <span>•</span>
            <span>Zero-Login Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
