import { Course, AssignmentSubmission, LearnerProgressItem, CertificateItem } from "./types"

export const INITIAL_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Event Readiness: Empathetic Communication & SBI Feedback",
    code: "HRD-102",
    category: "Soft Skills & Management",
    level: "Intermediate",
    duration: "6 hours 30 mins",
    totalLessons: 8,
    completedLessons: 6,
    progress: 75,
    instructorName: "MSc. Hoang Le Tram",
    instructorTitle: "Head of Learning & Development (Head of L&D)",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    description: "Equips leaders with active listening techniques and the SBI (Situation - Behavior - Impact) model to improve cross-functional collaboration and resolve team conflicts.",
    competencies: ["Empathetic Listening", "SBI Framework", "Constructive Feedback", "Emotional Intelligence"],
    status: "in-progress",
    enrolledLearnersCount: 48,
    averageScore: 91.5,
    modules: [
      {
        id: "mod-1",
        title: "Part 1: Active Listening and Communication Psychology",
        duration: "2 hours 15 mins",
        lessons: [
          {
            id: "les-1-1",
            title: "1.1 Overview of Empathetic Communication in Organizations",
            duration: "25 mins",
            type: "video",
            completed: true,
            content: "Explore the four levels of listening: Ignoring, Pretend listening, Selective listening, and Empathetic listening.",
          },
          {
            id: "les-1-2",
            title: "1.2 Recognizing Cognitive Biases and Personal Assumptions",
            duration: "30 mins",
            type: "reading",
            completed: true,
            content: "Confirmation bias and the halo effect frequently distort managerial messaging and project collaboration.",
          },
          {
            id: "les-1-3",
            title: "1.3 Assessment: Evaluating Personal Listening Levels",
            duration: "20 mins",
            type: "quiz",
            completed: true,
            quiz: [
              {
                id: "q-1",
                question: "Which listening level requires placing yourself entirely in the speaker's perspective rather than framing a response?",
                options: [
                  "Selective listening",
                  "Empathetic listening",
                  "Critical rebuttal listening",
                  "Surface content listening"
                ],
                correctAnswer: 1,
                explanation: "Empathetic listening focuses wholeheartedly on the speaker's emotions, unstated needs, and cognitive worldview."
              }
            ]
          }
        ]
      },
      {
        id: "mod-2",
        title: "Part 2: The SBI Constructive Feedback Model",
        duration: "2 hours 45 mins",
        lessons: [
          {
            id: "les-2-1",
            title: "2.1 Deconstructing SBI: Situation, Behavior, Impact",
            duration: "35 mins",
            type: "video",
            completed: true,
            content: "The SBI model eliminates subjective judgment by grounding feedback in specific situations, observable behaviors, and concrete impacts.",
          },
          {
            id: "les-2-2",
            title: "2.2 Coaching Techniques and Action Commitments",
            duration: "40 mins",
            type: "video",
            completed: true,
            content: "Learn how to formulate open-ended coaching questions that empower team members to discover and commit to their own solutions.",
          },
          {
            id: "les-2-3",
            title: "2.3 Case Study: Applying the SBI Model in Practice",
            duration: "25 mins",
            type: "quiz",
            completed: false,
            quiz: [
              {
                id: "q-2",
                question: "When delivering feedback using the SBI framework, which practice prevents defensive escalation?",
                options: [
                  "Criticizing personal attitude before discussing project results",
                  "Describing observable factual behavior instead of labeling character traits",
                  "Comparing the individual directly against top performers",
                  "Issuing disciplinary warnings in the introductory sentence"
                ],
                correctAnswer: 1,
                explanation: "Describing observable behaviors (Behavior) keeps feedback focused on objective facts without triggering defensiveness."
              },
              {
                id: "q-3",
                question: "What does the 'I' (Impact) component represent in the SBI model?",
                options: [
                  "Information: Providing additional reading material",
                  "Impact: The tangible effect of the behavior on the team, client, and project timeline",
                  "Instruction: Giving a direct top-down command",
                  "Improvement: Demanding an immediate 24-hour turnaround"
                ],
                correctAnswer: 1,
                explanation: "Impact clarifies the actual positive or negative outcome that the behavior had on the broader mission."
              }
            ]
          },
          {
            id: "les-2-4",
            title: "2.4 Practical Assignment: Drafting a Managerial SBI Feedback Script",
            duration: "45 mins",
            type: "assignment",
            completed: false,
            assignment: {
              id: "assign-1",
              title: "Drafting an SBI Feedback Script for a Project Delay Scenario",
              instructions: "Select a realistic project scenario from your club committee (for example: a project lead missing two consecutive milestone deliverables). Write a structured feedback dialogue covering Situation (S), Behavior (B), Impact (I), and conclude with 2 open-ended coaching questions.",
              rubric: [
                "Clearly defined context, date, and specific setting (20 pts)",
                "Objective description of observable actions without subjective labeling (30 pts)",
                "Articulated impact on team delivery and stakeholder trust (30 pts)",
                "Formulated two supportive coaching questions (20 pts)"
              ],
              dueDaysText: "Due date: 23:59 Sunday",
              maxScore: 100
            }
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "Event Audit: Transformational Leadership & Post-Event Review",
    code: "HRD-204",
    category: "Leadership & Strategy",
    level: "Advanced",
    duration: "8 hours 00 mins",
    totalLessons: 10,
    completedLessons: 10,
    progress: 100,
    instructorName: "Dr. Vu Dinh Khang",
    instructorTitle: "Senior Strategic Talent Advisory Consultant",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    description: "An executive masterclass on transformational leadership, psychological empowerment, and aligning OKRs/KPIs across high-performing student club teams.",
    competencies: ["Transformational Leadership", "OKR Alignment", "Delegation & Empowerment", "Intrinsic Motivation"],
    status: "completed",
    enrolledLearnersCount: 32,
    averageScore: 94.0,
    modules: [
      {
        id: "mod-2-1",
        title: "Part 1: Leadership Mindsets in Dynamic Environments",
        duration: "3 hours 30 mins",
        lessons: [
          {
            id: "les-21-1",
            title: "Transactional Management vs Transformational Leadership",
            duration: "40 mins",
            type: "video",
            completed: true,
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "AI Applications in Project Workflow Automation",
    code: "HRD-305",
    category: "Digital & AI",
    level: "Intermediate",
    duration: "5 hours 15 mins",
    totalLessons: 6,
    completedLessons: 2,
    progress: 33,
    instructorName: "Eng. Tran Anh Quan",
    instructorTitle: "Digital Transformation & Workflow Automation Specialist",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    description: "Learn how to leverage Large Language Models (LLMs), design automated project tracking prompts, and optimize resource allocation for student committees.",
    competencies: ["Prompt Engineering", "Workflow Automation", "Data Analysis", "AI Ethics"],
    status: "in-progress",
    enrolledLearnersCount: 65,
    averageScore: 88.0,
    modules: [
      {
        id: "mod-3-1",
        title: "Part 1: AI Foundations for Project Operations",
        duration: "2 hours 00 mins",
        lessons: [
          {
            id: "les-31-1",
            title: "Mapping Artificial Intelligence across the Project Lifecycle",
            duration: "35 mins",
            type: "video",
            completed: true
          }
        ]
      }
    ]
  },
  {
    id: "course-4",
    title: "Organizational Culture and Member Experience",
    code: "HRD-101",
    category: "Culture & Onboarding",
    level: "Foundational",
    duration: "4 hours 00 mins",
    totalLessons: 5,
    completedLessons: 0,
    progress: 0,
    instructorName: "MSc. Hoang Le Tram",
    instructorTitle: "Head of Learning & Development (Head of L&D)",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    description: "Master core values, ethical leadership conduct, and building psychological safety across project workstreams.",
    competencies: ["Core Values", "Professional Conduct", "Member Experience", "Psychological Safety"],
    status: "assigned",
    enrolledLearnersCount: 110,
    averageScore: 92.0,
    modules: []
  }
]

export const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: "sub-101",
    courseId: "course-1",
    courseTitle: "Empathetic Communication and SBI Feedback Model",
    lessonId: "les-2-4",
    lessonTitle: "Practical Assignment: Drafting a Managerial SBI Feedback Script",
    learnerId: "lrn-1",
    learnerName: "Nguyen Minh Tuan",
    learnerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Executive Committee - Project Lead",
    submittedAt: "Yesterday at 16:45",
    content: "SBI Feedback Script for Delayed Project Milestone Delivery:\n\n1. Situation: 'Hi Hung, during our Friday sync at 15:00 regarding the FinTech initiative deliverables...'\n2. Behavior: '...you were unable to submit the completed vendor shortlist as agreed upon, without prior notice to the organizing team.'\n3. Impact: 'This forced the technical leads to postpone first-round interviews, which introduces a delay to our onboarding timeline.'\n4. Coaching Questions: 'What specific roadblocks did you encounter with candidate sourcing this week? How can we restructure the review cadence to ensure we stay on track?'",
    attachmentName: "SBI_Feedback_Script_TuanNM.docx",
    status: "pending"
  },
  {
    id: "sub-102",
    courseId: "course-1",
    courseTitle: "Empathetic Communication and SBI Feedback Model",
    lessonId: "les-2-4",
    lessonTitle: "Practical Assignment: Drafting a Managerial SBI Feedback Script",
    learnerId: "lrn-2",
    learnerName: "Do Mai Phuong",
    learnerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    department: "Marketing & Public Relations",
    submittedAt: "Sep 08, 2026 at 10:15",
    content: "Scenario addressing a team lead frequently speaking over peers during campaign brainstorming. Applied SBI to foster inclusive dialogue.",
    attachmentName: "PhuongDM_Feedback_Scenario.pdf",
    status: "graded",
    score: 95,
    feedback: "Outstanding script! You cleanly isolated observable behaviors without triggering defensive posturing. The coaching questions show genuine maturity.",
    gradedBy: "MSc. Hoang Le Tram"
  },
  {
    id: "sub-103",
    courseId: "course-1",
    courseTitle: "Empathetic Communication and SBI Feedback Model",
    lessonId: "les-2-4",
    lessonTitle: "Practical Assignment: Drafting a Managerial SBI Feedback Script",
    learnerId: "lrn-3",
    learnerName: "Le Quang Huy",
    learnerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    department: "Technology & Infrastructure",
    submittedAt: "Sep 07, 2026 at 21:30",
    content: "Constructive feedback script addressed to a technical lead regarding public code review feedback on shared communication channels.",
    attachmentName: "SBI_Feedback_TechTeam_HuyLQ.pdf",
    status: "pending"
  }
]

export const INITIAL_LEARNERS: LearnerProgressItem[] = [
  {
    id: "lrn-1",
    name: "Nguyen Minh Tuan",
    email: "tuan.nguyen@rmit.edu.vn",
    department: "Project Management Committee",
    roleTitle: "Senior Project Lead",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    coursesEnrolled: 4,
    completedCourses: 2,
    overallProgress: 68,
    lastActive: "15 mins ago",
    status: "on-track",
    scoreAverage: 92.5
  },
  {
    id: "lrn-2",
    name: "Do Mai Phuong",
    email: "phuong.do@rmit.edu.vn",
    department: "Marketing & Public Relations",
    roleTitle: "Brand & Content Lead",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    coursesEnrolled: 3,
    completedCourses: 3,
    overallProgress: 100,
    lastActive: "2 hours ago",
    status: "completed",
    scoreAverage: 96.0
  },
  {
    id: "lrn-3",
    name: "Le Quang Huy",
    email: "huy.le@rmit.edu.vn",
    department: "Technology & Data Operations",
    roleTitle: "Lead Software Architect",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    coursesEnrolled: 4,
    completedCourses: 1,
    overallProgress: 45,
    lastActive: "Yesterday",
    status: "needs-attention",
    scoreAverage: 81.0
  },
  {
    id: "lrn-4",
    name: "Pham Thuy Hang",
    email: "hang.pham@rmit.edu.vn",
    department: "Finance & Sponsorship Committee",
    roleTitle: "Financial Planning Analyst",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    coursesEnrolled: 3,
    completedCourses: 2,
    overallProgress: 78,
    lastActive: "3 days ago",
    status: "on-track",
    scoreAverage: 90.0
  },
  {
    id: "lrn-5",
    name: "Bui Quoc Bao",
    email: "bao.bui@rmit.edu.vn",
    department: "Product & Research Committee",
    roleTitle: "Product Innovation Manager",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    coursesEnrolled: 5,
    completedCourses: 4,
    overallProgress: 88,
    lastActive: "4 hours ago",
    status: "on-track",
    scoreAverage: 93.5
  }
]

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-204",
    courseId: "course-2",
    courseTitle: "Transformational Leadership and Performance OKRs",
    courseCode: "HRD-204",
    issueDate: "Aug 28, 2026",
    credentialId: "CERT-HRD-2026-0892",
    learnerName: "Nguyen Minh Tuan",
    instructorName: "Dr. Vu Dinh Khang",
    instructorTitle: "Senior Strategic Talent Advisory Consultant",
    hours: 8,
    grade: "Distinction (94/100)",
    competencies: ["Transformational Leadership", "OKR Alignment", "Delegation & Empowerment", "Intrinsic Motivation"]
  },
  {
    id: "cert-101",
    courseId: "course-prev",
    courseTitle: "Cross-Functional Collaboration and Problem Solving",
    courseCode: "HRD-098",
    issueDate: "Jun 15, 2026",
    credentialId: "CERT-HRD-2026-0417",
    learnerName: "Nguyen Minh Tuan",
    instructorName: "MSc. Hoang Le Tram",
    instructorTitle: "Head of Learning & Development (Head of L&D)",
    hours: 6,
    grade: "High Distinction (91/100)",
    competencies: ["Design Thinking", "Cross-Functional Alignment", "Root Cause Analysis"]
  }
]
