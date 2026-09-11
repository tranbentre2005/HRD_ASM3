import { useState } from "react"
import { UserRole, Course, CertificateItem, AssignmentSubmission, LearnerProgressItem } from "@/data/types"
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
import { CoursesView } from "@/components/learner/CoursesView"
import { MyLearningView } from "@/components/learner/MyLearningView"
import { AnnouncementsView } from "@/components/learner/AnnouncementsView"
import { AccountView } from "@/components/learner/AccountView"
import { InstructorDashboard } from "@/components/instructor/InstructorDashboard"

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('login')
  const [customUserName, setCustomUserName] = useState<string>('')
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES)
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(INITIAL_SUBMISSIONS)
  const [learners, setLearners] = useState<LearnerProgressItem[]>(INITIAL_LEARNERS)
  const [certificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES)

  // Top-level Navigation Page State
  const [currentPage, setCurrentPage] = useState<'home' | 'courses' | 'my-learning' | 'announcements' | 'account'>('home')
  const [coursesCategoryFilter, setCoursesCategoryFilter] = useState<string>('all')
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
    setCurrentPage('home')
    setLearnerTab('my-courses')
  }

  // Handler: Logout back to Welcome Gateway
  const handleLogout = () => {
    setCurrentRole('login')
    setActiveCourseId(null)
    setCurrentPage('home')
  }

  // Handler: Return to Home (Dashboard)
  const handleGoHome = () => {
    setActiveCourseId(null)
    setCurrentPage('home')
    setLearnerTab('my-courses')
  }

  // Handler: Navigate to Courses with category filter and scroll to top
  const handleNavigateToCourses = (category: string = 'all') => {
    setActiveCourseId(null)
    setCoursesCategoryFilter(category)
    setCurrentPage('courses')
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  // Handler: Open Support Modal
  const handleOpenSupport = () => {
    setIsSupportModalOpen(true)
  }

  // Handler: Role Switch within portal
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role)
    setActiveCourseId(null)
    setCurrentPage('home')
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
    const lesson = course?.modules.flatMap(m => m.lessons).find(l => l.id === lessonId)

    const newSubmission: AssignmentSubmission = {
      id: `sub-${Date.now()}`,
      courseId,
      courseTitle: course?.title || "Leadership Course",
      lessonId,
      lessonTitle: lesson?.title || "Practical Assignment",
      learnerId: "lrn-1",
      learnerName: customUserName || "Nguyen Minh Tuan",
      learnerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      department: "Finance & Investment",
      submittedAt: new Date().toISOString(),
      content: text,
      attachmentName: fileName || "Event_Execution_Template.docx",
      status: "pending"
    }

    setSubmissions(prev => [newSubmission, ...prev])
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

  const activeCourse = courses.find(c => c.id === activeCourseId || (activeCourseId === 'course-1' && c.id === 'event-readiness'))

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
    <div className="min-h-[100dvh] bg-[var(--page-canvas,#FFFFFF)] text-slate-900 flex flex-col font-sans antialiased relative overflow-x-hidden">
      {/* Navigation Bar with Logo Home, COURSES, MY LEARNING, SUPPORT, Bell, and 1-letter avatar */}
      <div className="relative z-20">
        <Navbar
          currentRole={currentRole}
          currentPage={currentPage}
          onNavigate={(page) => {
            setActiveCourseId(null)
            setCurrentPage(page)
          }}
          onRoleChange={handleRoleChange}
          onLogout={handleLogout}
          onOpenSupport={handleOpenSupport}
          userName={customUserName}
          unreadCount={submissions.filter(s => s.status === 'pending').length}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-2 sm:pt-2.5 pb-12">
        {/* If an active course is open, prioritize ActiveCourseViewer regardless of page */}
        {activeCourse ? (
          <ActiveCourseViewer
            course={activeCourse}
            onBack={handleBackToDashboard}
            onUpdateCourseProgress={handleUpdateCourseProgress}
            onSubmitAssignment={handleSubmitAssignment}
          />
        ) : (
          <>
            {/* Page 1: Home View */}
            {currentPage === 'home' && (
              <>
                {currentRole === 'learner' && (
                  <LearnerDashboard
                    courses={courses}
                    certificates={certificates}
                    onSelectCourse={handleSelectCourse}
                    onViewCertificate={handleViewCertificate}
                    onNavigateCourses={handleNavigateToCourses}
                    onNavigateMyLearning={() => {
                      setActiveCourseId(null)
                      setCurrentPage('my-learning')
                    }}
                    activeTab={learnerTab}
                    onTabChange={setLearnerTab}
                  />
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
              </>
            )}

            {/* Page 2: Courses Catalog View */}
            {currentPage === 'courses' && (
              <CoursesView
                courses={courses}
                onSelectCourse={handleSelectCourse}
                onBackToHome={handleGoHome}
                initialCategory={coursesCategoryFilter}
              />
            )}

            {/* Page 3: My Learning View */}
            {currentPage === 'my-learning' && (
              <MyLearningView
                courses={courses}
                certificates={certificates}
                onSelectCourse={handleSelectCourse}
                onViewCertificate={handleViewCertificate}
                onBackToHome={handleGoHome}
              />
            )}

            {/* Page 4: Announcements View */}
            {currentPage === 'announcements' && (
              <AnnouncementsView
                onBackToHome={handleGoHome}
              />
            )}

            {/* Page 5: Account View */}
            {currentPage === 'account' && (
              <AccountView
                currentRole={currentRole}
                userName={customUserName}
                onRoleChange={handleRoleChange}
                onLogout={handleLogout}
                onBackToHome={handleGoHome}
              />
            )}
          </>
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
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center text-center">
          <p>
            © 2026 RMIT Finance Club (RFC) • Project Leader Learning Hub
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
