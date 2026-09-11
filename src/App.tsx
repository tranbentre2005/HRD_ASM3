import { useState } from "react"
import { UserRole, Course, CertificateItem, Announcement } from "@/data/types"
import { 
  INITIAL_COURSES, 
  INITIAL_CERTIFICATES,
  INITIAL_ANNOUNCEMENTS
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

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('login')
  const [customUserName, setCustomUserName] = useState<string>('')
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES)
  const [certificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES)
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => INITIAL_ANNOUNCEMENTS)
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null)

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
  const handleLoginAs = (role: 'learner', customName?: string) => {
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
    setSelectedAnnouncementId(null)
    setCurrentPage('home')
    setLearnerTab('my-courses')
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  // Handlers for Announcements
  const handleOpenAnnouncement = (id: string) => {
    setActiveCourseId(null)
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a))
    setSelectedAnnouncementId(id)
    setCurrentPage('announcements')
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  const handleViewAllAnnouncements = () => {
    setActiveCourseId(null)
    setSelectedAnnouncementId(null)
    setCurrentPage('announcements')
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  const handleMarkAnnouncementAsRead = (id: string) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a))
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
            setSelectedAnnouncementId(null)
            setCurrentPage(page)
          }}
          onLogout={handleLogout}
          onOpenSupport={handleOpenSupport}
          userName={customUserName}
          announcements={announcements}
          onOpenAnnouncement={handleOpenAnnouncement}
          onViewAllAnnouncements={handleViewAllAnnouncements}
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
                onNavigateCourses={handleNavigateToCourses}
              />
            )}

            {/* Page 4: Announcements View */}
            {currentPage === 'announcements' && (
              <AnnouncementsView
                announcements={announcements}
                selectedAnnouncementId={selectedAnnouncementId}
                onSelectAnnouncement={(id) => setSelectedAnnouncementId(id)}
                onMarkAsRead={handleMarkAnnouncementAsRead}
                onBackToHome={handleGoHome}
                onNavigateMyLearning={() => {
                  setActiveCourseId(null)
                  setCurrentPage('my-learning')
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                }}
                onNavigateCourses={() => {
                  setActiveCourseId(null)
                  setCoursesCategoryFilter('all')
                  setCurrentPage('courses')
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                }}
              />
            )}
            {/* Page 5: Account View */}
            {currentPage === 'account' && (
              <AccountView
                userName={customUserName}
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
