export type UserRole = 'login' | 'learner'

export interface Course {
  id: string
  title: string
  cardTitle?: string
  cardIntro?: string
  code: string
  category: string
  level?: 'Foundational' | 'Intermediate' | 'Advanced'
  duration: string
  courseType?: string
  totalLessons?: number
  completedLessons?: number
  progress: number
  instructorName?: string
  instructorTitle?: string
  instructorAvatar?: string
  thumbnail?: string
  briefIntro?: string
  description: string
  competencies: string[]
  status: 'in-progress' | 'completed' | 'assigned' | 'upcoming' | 'coming-soon'
  enrolledLearnersCount?: number
  averageScore?: number
  recommendationNote?: string
  recommendedNote?: string
  modules: CourseModule[]
}

export interface CourseModule {
  id: string
  title: string
  duration: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'reading' | 'quiz' | 'assignment'
  completed: boolean
  content?: string
  videoEmbedUrl?: string
  quiz?: QuizQuestion[]
  assignment?: AssignmentPrompt
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface AssignmentPrompt {
  id: string
  title: string
  instructions: string
  rubric: string[]
  dueDaysText: string
  maxScore: number
}


export interface CertificateItem {
  id: string
  courseId: string
  courseTitle: string
  courseCode: string
  issueDate: string
  credentialId: string
  learnerName: string
  instructorName: string
  instructorTitle: string
  hours: number
  grade: string
  competencies: string[]
}

export type AnnouncementType = 'learning' | 'new-course' | 'club-event' | 'platform-update'

export interface Announcement {
  id: string
  type: AnnouncementType
  title: string
  preview: string
  body: string
  publishedAt: string
  relativeTime: string
  isRead: boolean
  eventDate?: string
  eventTime?: string
  eventLocation?: string
  eventContact?: string
  ctaText?: string
  ctaAction?: 'my-learning' | 'courses' | 'course-detail' | 'external'
  ctaTarget?: string
}
