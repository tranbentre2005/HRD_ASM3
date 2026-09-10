import { Course, AssignmentSubmission, LearnerProgressItem, CertificateItem } from "./types"

export const INITIAL_COURSES: Course[] = [
  // ==========================================
  // 1. CORE PROJECT LEADER PATHWAY (9 Courses)
  // ==========================================
  {
    id: "core-01",
    title: "Stepping into the Project Leader Role",
    code: "01 · FOUNDATION",
    category: "Core Pathway",
    level: "Foundational",
    duration: "5 min · Foundation",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Understand your core responsibilities, key university stakeholders, and leadership mindset as a student club project lead.",
    description: "Understand your core responsibilities, key university stakeholders, and leadership mindset as a student club project lead.",
    competencies: ["Role Clarity", "Stakeholder Governance", "Leadership Mindset"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "core-02",
    title: "Event Fundamentals & Strategic Direction",
    code: "02 · FOUNDATION",
    category: "Core Pathway",
    level: "Foundational",
    duration: "6 min · Foundation",
    totalLessons: 4,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Clarify event purpose, participant personas, measurable success metrics, and strategic alignment with RMIT Finance Club goals.",
    description: "Clarify event purpose, participant personas, measurable success metrics, and strategic alignment with RMIT Finance Club goals.",
    competencies: ["Event Strategy", "Participant Personas", "Success Metrics"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "core-03",
    title: "Event Planning & Coordination",
    code: "03 · CORE",
    category: "Core Pathway",
    level: "Intermediate",
    duration: "8 min · Core",
    totalLessons: 4,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Deconstruct event scopes into work breakdown structures (WBS), realistic timelines, critical paths, and dependency management.",
    description: "Deconstruct event scopes into work breakdown structures (WBS), realistic timelines, critical paths, and dependency management.",
    competencies: ["WBS Scope", "Timeline Governance", "Dependency Mapping"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "core-04",
    title: "Leading the Event Team",
    code: "04 · LEADERSHIP",
    category: "Core Pathway",
    level: "Intermediate",
    duration: "8 min · Leadership",
    totalLessons: 4,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Delegate workstreams with autonomy, conduct effective sync meetings, and build psychological safety across project volunteers.",
    description: "Delegate workstreams with autonomy, conduct effective sync meetings, and build psychological safety across project volunteers.",
    competencies: ["Delegation", "Meeting Cadence", "Psychological Safety"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "core-05",
    title: "Cross-Functional Collaboration",
    code: "05 · COLLABORATION",
    category: "Core Pathway",
    level: "Intermediate",
    duration: "7 min · Collaboration",
    totalLessons: 4,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Align smoothly with Marketing, Logistics, Finance, and external university partners to avoid delivery bottlenecks.",
    description: "Align smoothly with Marketing, Logistics, Finance, and external university partners to avoid delivery bottlenecks.",
    competencies: ["Cross-Functional Alignment", "Vendor Coordination", "Bottleneck Resolution"],
    status: "coming-soon",
    modules: []
  },
  {
    // Course 06: Active Event Readiness course linked to existing interactive player & modules
    id: "course-1",
    title: "Event Readiness | From \"Done\" to Participant-Ready",
    code: "06 · DELIVER WITH READINESS",
    category: "Core Pathway",
    level: "Foundational",
    duration: "8–10 min · Interactive · Core PL Skill",
    totalLessons: 8,
    completedLessons: 3,
    progress: 40,
    briefIntro: "Equips leaders with active listening techniques, the SBI model, and checklist verification to ensure seamless participant experiences.",
    description: "Equips leaders with active listening techniques and the SBI (Situation - Behavior - Impact) model to improve cross-functional collaboration and resolve team conflicts.",
    competencies: ["Empathetic Listening", "SBI Framework", "Constructive Feedback", "Emotional Intelligence"],
    status: "in-progress",
    enrolledLearnersCount: 48,
    averageScore: 91.5,
    recommendationNote: "Recommended before final preparation or rehearsal",
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
            title: "2.1 Framework: Situation, Behavior, and Impact Architecture",
            duration: "30 mins",
            type: "reading",
            completed: true,
            content: "The SBI model eliminates subjective judgment by grounding feedback in specific situations, observable behaviors, and concrete impacts.",
          },
          {
            id: "les-2-2",
            title: "2.2 Coaching Techniques and Action Commitments",
            duration: "40 mins",
            type: "video",
            completed: false,
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
    id: "core-07",
    title: "Rehearsal & Simulation",
    code: "07 · INTERACTIVE PRACTICE",
    category: "Core Pathway",
    level: "Intermediate",
    duration: "7 min · Interactive Practice",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Simulate day-of-event stress scenarios, test run-of-show timing, identify single points of failure, and practice dry runs.",
    description: "Simulate day-of-event stress scenarios, test run-of-show timing, identify single points of failure, and practice dry runs.",
    competencies: ["Run-of-Show Testing", "Contingency Rehearsal", "Failure Mode Analysis"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "core-08",
    title: "Event Execution & Live Delivery",
    code: "08 · EXECUTION",
    category: "Core Pathway",
    level: "Intermediate",
    duration: "8 min · Execution",
    totalLessons: 4,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Coordinate the command center, handle real-time attendee flow, manage guest speakers, and troubleshoot live technical glitches.",
    description: "Coordinate the command center, handle real-time attendee flow, manage guest speakers, and troubleshoot live technical glitches.",
    competencies: ["Command Center Ops", "Live Troubleshooting", "Guest Management"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "core-09",
    title: "Feedback, Reflection & Handover",
    code: "09 · REFLECTION",
    category: "Core Pathway",
    level: "Foundational",
    duration: "5 min · Reflection",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Gather participant feedback, facilitate blame-free retrospective post-mortems, document learnings, and archive event assets.",
    description: "Gather participant feedback, facilitate blame-free retrospective post-mortems, document learnings, and archive event assets.",
    competencies: ["Blame-Free Post-Mortem", "Knowledge Handover", "Feedback Synthesis"],
    status: "coming-soon",
    modules: []
  },

  // ==========================================
  // 2. BUILD YOUR LEADERSHIP SKILLS (3 Courses)
  // ==========================================
  {
    id: "lead-01",
    title: "Difficult Conversations & Constructive Feedback",
    code: "LEADERSHIP",
    category: "Leadership Skills",
    level: "Intermediate",
    duration: "6 min · Leadership",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Deliver candid, supportive feedback using observable behaviors rather than personal critiques to keep team motivation high.",
    description: "Deliver candid, supportive feedback using observable behaviors rather than personal critiques to keep team motivation high.",
    competencies: ["Difficult Conversations", "Supportive Feedback", "Conflict Resolution"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "lead-02",
    title: "Delegation & Workstream Ownership",
    code: "LEADERSHIP",
    category: "Leadership Skills",
    level: "Intermediate",
    duration: "5 min · Leadership",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Hand off project components with clear success criteria and boundaries, empowering members to solve problems independently.",
    description: "Hand off project components with clear success criteria and boundaries, empowering members to solve problems independently.",
    competencies: ["Outcome-Based Delegation", "Autonomy Boundaries", "Accountability"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "lead-03",
    title: "Decision-Making Under Ambiguity",
    code: "LEADERSHIP",
    category: "Leadership Skills",
    level: "Intermediate",
    duration: "7 min · Leadership",
    totalLessons: 4,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Make sound, timely operational calls during fast-moving events when information is incomplete or constraints shift.",
    description: "Make sound, timely operational calls during fast-moving events when information is incomplete or constraints shift.",
    competencies: ["Rapid Decision Making", "Risk Assessment", "Operational Tradeoffs"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "lead-04",
    title: "Coaching & Mentoring Student Leads",
    code: "LEADERSHIP",
    category: "Leadership Skills",
    level: "Intermediate",
    duration: "5 min · Leadership",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Build coaching habits to help junior executive members grow into confident project managers.",
    description: "Build coaching habits to help junior executive members grow into confident project managers.",
    competencies: ["Active Coaching", "Leadership Growth", "Mentorship Cadence"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "lead-05",
    title: "Conflict Resolution & Alignment",
    code: "LEADERSHIP",
    category: "Leadership Skills",
    level: "Intermediate",
    duration: "6 min · Leadership",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "De-escalate inter-departmental friction and align committee heads on shared project milestones.",
    description: "De-escalate inter-departmental friction and align committee heads on shared project milestones.",
    competencies: ["De-escalation", "Stakeholder Alignment", "Conflict Resolution"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "lead-06",
    title: "Influencing Without Authority",
    code: "LEADERSHIP",
    category: "Leadership Skills",
    level: "Intermediate",
    duration: "5 min · Leadership",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Guide cross-functional volunteers through vision clarity, peer empathy, and social capital.",
    description: "Guide cross-functional volunteers through vision clarity, peer empathy, and social capital.",
    competencies: ["Peer Influence", "Shared Ownership", "Motivational Alignment"],
    status: "coming-soon",
    modules: []
  },
  // ==========================================
  // 3. FUNCTIONAL ESSENTIALS (5 Courses)
  // ==========================================
  {
    id: "func-01",
    title: "Marketing & Communications Alignment",
    code: "FUNCTIONAL",
    category: "Functional Essentials",
    level: "Foundational",
    duration: "6 min · Functional",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Coordinate ticket launches, promotion timelines, branding compliance, and participant reminder communication cycles.",
    description: "Coordinate ticket launches, promotion timelines, branding compliance, and participant reminder communication cycles.",
    competencies: ["Promotion Cycles", "Brand Guidelines", "Communication Strategy"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "func-02",
    title: "Finance & Budget Governance",
    code: "FUNCTIONAL",
    category: "Functional Essentials",
    level: "Foundational",
    duration: "5 min · Functional",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Manage line-item expense approvals, university reimbursement rules, quotation verification, and sponsorship allocation.",
    description: "Manage line-item expense approvals, university reimbursement rules, quotation verification, and sponsorship allocation.",
    competencies: ["Expense Verification", "Budget Tracking", "Reimbursement Policy"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "func-03",
    title: "Logistics, Venue & Safety Readiness",
    code: "FUNCTIONAL",
    category: "Functional Essentials",
    level: "Foundational",
    duration: "6 min · Functional",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Secure campus room bookings, test audiovisual hardware, ensure fire safety compliance, and prepare contingency setups.",
    description: "Secure campus room bookings, test audiovisual hardware, ensure fire safety compliance, and prepare contingency setups.",
    competencies: ["Venue Operations", "AV Checklists", "Safety Compliance"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "func-04",
    title: "Sponsorship Pitching & Partner Relations",
    code: "FUNCTIONAL",
    category: "Functional Essentials",
    level: "Foundational",
    duration: "6 min · Functional",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Secure corporate sponsor packages, manage sponsor deliverables, and host partner VIPs.",
    description: "Secure corporate sponsor packages, manage sponsor deliverables, and host partner VIPs.",
    competencies: ["Sponsor Pitching", "Deliverable Tracking", "VIP Hospitality"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "func-05",
    title: "Risk Management & Safety Contingency",
    code: "FUNCTIONAL",
    category: "Functional Essentials",
    level: "Foundational",
    duration: "5 min · Functional",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Develop emergency escalation matrices, medical protocols, and crowd safety contingencies.",
    description: "Develop emergency escalation matrices, medical protocols, and crowd safety contingencies.",
    competencies: ["Risk Matrices", "Emergency Protocols", "Contingency Readiness"],
    status: "coming-soon",
    modules: []
  },
  // ==========================================
  // 4. PERSONAL DEVELOPMENT (3 Courses)
  // ==========================================
  {
    id: "pers-01",
    title: "Managing Stress & Leadership Stamina",
    code: "PERSONAL DEVELOPMENT",
    category: "Personal Development",
    level: "Foundational",
    duration: "5 min · Personal Development",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Recognize early signs of leadership burnout, pace project sprints, and maintain calm presence during high-stakes event weeks.",
    description: "Recognize early signs of leadership burnout, pace project sprints, and maintain calm presence during high-stakes event weeks.",
    competencies: ["Energy Management", "Burnout Prevention", "Emotional Regulation"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "pers-02",
    title: "Time Mastery for Student Leaders",
    code: "PERSONAL DEVELOPMENT",
    category: "Personal Development",
    level: "Foundational",
    duration: "5 min · Personal Development",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Balance university coursework, exam seasons, and heavy club commitments with ruthless task prioritization.",
    description: "Balance university coursework, exam seasons, and heavy club commitments with ruthless task prioritization.",
    competencies: ["Task Prioritization", "Calendar Architecture", "Academic Balance"],
    status: "coming-soon",
    modules: []
  },
  {
    id: "pers-03",
    title: "Building Trust & Psychological Safety",
    code: "PERSONAL DEVELOPMENT",
    category: "Personal Development",
    level: "Foundational",
    duration: "6 min · Personal Development",
    totalLessons: 3,
    completedLessons: 0,
    progress: 0,
    briefIntro: "Cultivate a culture where volunteers feel safe speaking up about mistakes early before they impact event delivery.",
    description: "Cultivate a culture where volunteers feel safe speaking up about mistakes early before they impact event delivery.",
    competencies: ["Psychological Safety", "Vulnerability in Leadership", "Team Trust"],
    status: "coming-soon",
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
