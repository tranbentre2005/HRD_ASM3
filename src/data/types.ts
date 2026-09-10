export type UserRole = 'login' | 'learner' | 'instructor'

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

export interface AssignmentSubmission {
  id: string
  courseId: string
  courseTitle: string
  lessonId: string
  lessonTitle: string
  learnerId: string
  learnerName: string
  learnerAvatar: string
  department: string
  submittedAt: string
  content: string
  attachmentName?: string
  status: 'pending' | 'graded'
  score?: number
  feedback?: string
  gradedBy?: string
}

export interface LearnerProgressItem {
  id: string
  name: string
  email: string
  department: string
  roleTitle: string
  avatar: string
  coursesEnrolled: number
  completedCourses: number
  overallProgress: number
  lastActive: string
  status: 'on-track' | 'needs-attention' | 'completed'
  scoreAverage: number
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
