import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { Course } from "@/data/types"
import { EVENT_READINESS_DEFAULT_COMPLETED_IDS, EVENT_READINESS_PROGRESS_KEY, EVENT_READINESS_TOTAL_ITEMS } from "@/lib/eventReadinessProgress"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle,
  Clock,
  FileText,
  Flag,
  Gear,
  Lightbulb,
  LinkSimple,
  ListNumbers,
  LockSimple,
  MagnifyingGlass,
  Microphone,
  PlayCircle,
  Presentation,
  ShieldCheck,
  Sparkle,
  Target,
  UsersThree,
  XCircle
} from "@phosphor-icons/react"

interface EventReadinessCoursePageProps {
  course: Course
  onNavigateHome: () => void
  onNavigateCourses: () => void
  onNavigateMyLearning: () => void
  onProgressChange?: (progress: number) => void
}

type OutlineItem = {
  id: string
  title: string
  section: string
}

type OutlineSection = {
  title: string
  items: OutlineItem[]
}

type SavedCourseState = {
  activeLessonId: string
  completedLessonIds: string[]
  viewedLessonIds: string[]
  openingQuestionAnswer: string
  feedbackConfidence: string
  feedbackUsefulness: string
  feedbackTransfer: string
  feedbackOpenResponse: string
  feedbackRating: number
  assessmentAnswers: string[]
  assessmentSubmitted: boolean
}
type ReadinessCategory = "DONE" | "READY"

type OpeningDecision = "A" | "B"
type AssessmentConcept = "DONE vs READY" | "IMPACT" | "EVIDENCE" | "CONNECTION" | "READINESS JUDGMENT"

type AssessmentQuestion = {
  prompt: string
  concept: AssessmentConcept
  correctOption: string
  options: { id: string; text: string }[]
}

const READINESS_ASSESSMENT: AssessmentQuestion[] = [
  {
    prompt: "A task is marked Done. What does that tell you?",
    concept: "DONE vs READY",
    correctOption: "B",
    options: [
      { id: "A", text: "It has been fully verified." },
      { id: "B", text: "It has been completed or reported complete." },
      { id: "C", text: "It is automatically event-ready." },
      { id: "D", text: "The Project Leader no longer needs visibility." }
    ]
  },
  {
    prompt: "Twenty minutes before rehearsal, which issue should the Project Leader investigate first?",
    concept: "IMPACT",
    correctOption: "B",
    options: [
      { id: "A", text: "One team member has not updated their internal task status in the tracker." },
      { id: "B", text: "The guest speaker’s title differs between the final confirmation email and the presentation slide." },
      { id: "C", text: "The registration desk still needs an extra stationery box." },
      { id: "D", text: "One backstage timing note has inconsistent formatting." }
    ]
  },
  {
    prompt: "A speaker’s title changed this morning. What provides the strongest evidence that the presentation slide is Ready?",
    concept: "EVIDENCE",
    correctOption: "B",
    options: [
      { id: "A", text: "Ask another team member if the title looks correct." },
      { id: "B", text: "Compare the slide with the latest confirmed speaker information." },
      { id: "C", text: "Check yesterday’s proposal." },
      { id: "D", text: "Use the version that was already rehearsed." }
    ]
  },
  {
    prompt: "Which rehearsal gives you the strongest evidence that the check-in process is Ready?",
    concept: "CONNECTION",
    correctOption: "C",
    options: [
      { id: "A", text: "Review the attendee list one more time." },
      { id: "B", text: "Brief the registration team separately." },
      { id: "C", text: "Run a mock check-in using the current attendee list, team roles and actual participant flow together." },
      { id: "D", text: "Ask each team member whether they feel ready." }
    ]
  },
  {
    prompt: "During rehearsal, the main microphone cuts out twice. The team cannot confirm the cause, and AV support is available nearby. What should the Project Leader do before sign-off?",
    concept: "READINESS JUDGMENT",
    correctOption: "C",
    options: [
      { id: "A", text: "Sign it off because every component is correct." },
      { id: "B", text: "Ask each owner whether their task is Done." },
      { id: "C", text: "Escalate the issue to AV support and confirm a reliable solution or backup before sign-off." },
      { id: "D", text: "Wait until event day to confirm whether the sequence works." }
    ]
  }
]

const READINESS_CONCEPT_FEEDBACK: Record<AssessmentConcept, { prompt: string; explanation: string }> = {
  "DONE vs READY": {
    prompt: "Does completion prove readiness?",
    explanation: "“Done” describes task status. It does not automatically prove that critical information is correct, current or working with connected parts."
  },
  IMPACT: {
    prompt: "What matters most if it goes wrong live?",
    explanation: "Prioritise according to likely participant or delivery impact — not simply according to what is unfinished."
  },
  EVIDENCE: {
    prompt: "What proves this is correct and current?",
    explanation: "Readiness should be supported by the most current and appropriate confirmed source, not memory or an older version."
  },
  CONNECTION: {
    prompt: "Does it work together in practice?",
    explanation: "Correct components still need to be tested together when the participant experience depends on their handoff."
  },
  "READINESS JUDGMENT": {
    prompt: "WHEN DOES AN UNRESOLVED ISSUE NEED TO BE ESCALATED BEFORE SIGN-OFF?",
    explanation: "The microphone is participant-critical, the problem has occurred more than once, and the cause is still unresolved. Before sign-off, the Project Leader needs evidence that the risk has been resolved or controlled, rather than relying on the microphone simply working at that moment."
  }
}


type ReadinessStatement = {
  id: string
  text: string
  category: ReadinessCategory
}

const READINESS_STATEMENTS: ReadinessStatement[] = [
  { id: "output-exists", text: "The output exists.", category: "DONE" },
  { id: "owner-finished", text: "The owner says it is finished.", category: "DONE" },
  { id: "participant-information-verified", text: "The latest participant information has been verified.", category: "READY" },
  { id: "connected-assets-tested", text: "The MC script, participant list, and slides have been tested together.", category: "READY" },
  { id: "slide-deck-completed", text: "The slide deck has been completed.", category: "DONE" },
  { id: "event-sequence-checked", text: "The final event sequence has been checked for delivery.", category: "READY" }
]
const CONNECTION_PARTICIPANT_ORDER = ["Nguyễn Minh Anh", "Trần Gia Hân", "Lê Hoàng Nam"]
const CONNECTION_DIAGRAM_NODES = ["source", "mc-script", "slides", "sync-check", "sequence", "live"]
const INITIAL_CONNECTION_SLIDE_ORDER = ["Nguyễn Minh Anh", "Lê Hoàng Nam", "Trần Gia Hân"]

const SIMULATION_SCENES = [
  {
    id: "materials",
    label: "SCENE 1 OF 3",
    title: "Check the connected materials",
    description: "Start by checking the materials participants will experience together, not just whether each file exists.",
    prompt: "The participant list, MC script, and slides must tell the same story.",
    items: [
      ["Participant list", "Latest confirmed information"],
      ["MC script", "Final delivery wording"],
      ["Slides", "Final participant sequence"]
    ]
  },
  {
    id: "handoffs",
    label: "SCENE 2 OF 3",
    title: "Follow the team hand-offs",
    description: "Trace what happens when the event moves from one owner to the next, including the moments participants cannot see.",
    prompt: "A ready event depends on clear ownership, timing, and working hand-offs.",
    items: [
      ["Opening", "MC welcomes participants"],
      ["Handover", "Project Leader cues the next owner"],
      ["Close", "Final action is clear"]
    ]
  },
  {
    id: "decision",
    label: "SCENE 3 OF 3",
    title: "Make the readiness decision",
    description: "Use the evidence from the rehearsal to decide whether the full participant-facing sequence is ready to deliver.",
    prompt: "Done means the work exists. Ready means the connected experience has been verified and tested.",
    items: [
      ["Evidence", "Details are verified"],
      ["Connection", "Assets work together"],
      ["Decision", "Ready for participants"]
    ]
  }
] as const



const OUTLINE_SECTIONS: OutlineSection[] = [
  {
    title: "GETTING STARTED",
    items: [
      { id: "course-overview", title: "0.0 | Course Overview", section: "GETTING STARTED" },
      { id: "course-outcomes", title: "0.1 | Course Learning Outcomes", section: "GETTING STARTED" }
    ]
  },
  {
    title: "LEARN",
    items: [
      { id: "1.0-done-ready", title: "1.0 | What Does “Event Ready” Actually Mean?", section: "LEARN" },
      { id: "1.1-ready-framework", title: "1.1 | The Event Ready Framework", section: "LEARN" }
    ]
  },
  {
    title: "PRACTISE",
    items: [
      { id: "1.2-ready-simulation", title: "2.0 | Event Ready Simulation", section: "PRACTISE" }
    ]
  },
  {
    title: "CHECK & APPLY",
    items: [
      { id: "2.0-quick-check", title: "3.0 | Check Your Readiness", section: "CHECK & APPLY" },
      { id: "3.0-event-check", title: "3.1 | Key Takeaways & Supporting Tools", section: "CHECK & APPLY" }
    ]
  },
  {
    title: "WRAP UP",
    items: [
      { id: "4.0-course-feedback", title: "4.0 | Reflection & Feedback", section: "WRAP UP" }
    ]
  }
]

const OUTLINE_ITEMS = OUTLINE_SECTIONS.flatMap(section => section.items)

function getSavedCourseState(): SavedCourseState {
  const fallback: SavedCourseState = {
    activeLessonId: "course-overview",
    completedLessonIds: EVENT_READINESS_DEFAULT_COMPLETED_IDS,
    viewedLessonIds: [],
    assessmentAnswers: Array.from({ length: READINESS_ASSESSMENT.length }, () => ""),
    openingQuestionAnswer: "",
    feedbackConfidence: "",
    feedbackUsefulness: "",
    feedbackTransfer: "",
    feedbackOpenResponse: "",
    feedbackRating: 0,
    assessmentSubmitted: false
  }

  if (typeof window === "undefined") return fallback

  try {
    const raw = window.localStorage.getItem(EVENT_READINESS_PROGRESS_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<SavedCourseState>
    const completedLessonIds = Array.isArray(parsed.completedLessonIds)
      ? parsed.completedLessonIds.filter(id => OUTLINE_ITEMS.some(item => item.id === id))
      : fallback.completedLessonIds
    const activeLessonId = OUTLINE_ITEMS.some(item => item.id === parsed.activeLessonId)
      ? parsed.activeLessonId || fallback.activeLessonId
      : fallback.activeLessonId

    const viewedLessonIds = Array.isArray(parsed.viewedLessonIds)
      ? parsed.viewedLessonIds.filter(id => OUTLINE_ITEMS.some(item => item.id === id))
      : fallback.viewedLessonIds

    return {
      activeLessonId,
      completedLessonIds,
      viewedLessonIds,
      assessmentAnswers: Array.isArray(parsed.assessmentAnswers)
        ? READINESS_ASSESSMENT.map((_, index) => typeof parsed.assessmentAnswers?.[index] === "string" ? parsed.assessmentAnswers[index] : "")
        : fallback.assessmentAnswers,
      openingQuestionAnswer: typeof parsed.openingQuestionAnswer === "string" ? parsed.openingQuestionAnswer : "",
      feedbackConfidence: typeof parsed.feedbackConfidence === "string" ? parsed.feedbackConfidence : "",
      feedbackUsefulness: typeof parsed.feedbackUsefulness === "string" ? parsed.feedbackUsefulness : "",
      feedbackTransfer: typeof parsed.feedbackTransfer === "string" ? parsed.feedbackTransfer : "",
      feedbackOpenResponse: typeof parsed.feedbackOpenResponse === "string" ? parsed.feedbackOpenResponse : "",
      feedbackRating: typeof parsed.feedbackRating === "number" && Number.isInteger(parsed.feedbackRating) && parsed.feedbackRating >= 1 && parsed.feedbackRating <= 5 ? parsed.feedbackRating : 0,
      assessmentSubmitted: parsed.assessmentSubmitted === true && Array.isArray(parsed.assessmentAnswers) && READINESS_ASSESSMENT.every((_, index) => typeof parsed.assessmentAnswers?.[index] === "string" && parsed.assessmentAnswers[index])
    }
  } catch {
    return fallback
  }
}

export function EventReadinessCoursePage({
  course,
  onNavigateHome,
  onNavigateCourses,
  onNavigateMyLearning,
  onProgressChange
}: EventReadinessCoursePageProps) {
  const initialState = useMemo(() => getSavedCourseState(), [])
  const lessonCardRef = useRef<HTMLDivElement>(null)
  const [activeLessonId, setActiveLessonId] = useState(initialState.activeLessonId)
  const [completedLessonIds, setCompletedLessonIds] = useState(initialState.completedLessonIds)
  const [viewedLessonIds, setViewedLessonIds] = useState(initialState.viewedLessonIds)
  const [assessmentAnswers, setAssessmentAnswers] = useState(initialState.assessmentAnswers)
  const [openingQuestionAnswer, setOpeningQuestionAnswer] = useState(initialState.openingQuestionAnswer)
  const [simulationStarted, setSimulationStarted] = useState(false)
  const [simulationScene, setSimulationScene] = useState(-1)
  const [openingDecision, setOpeningDecision] = useState<OpeningDecision | null>(null)
  const [openingDecisionConfirmed, setOpeningDecisionConfirmed] = useState(false)
  const [selectedAssetCard, setSelectedAssetCard] = useState<string | null>(null)
  const [isPathwayHovered, setIsPathwayHovered] = useState(false)
  const [readinessPlacements, setReadinessPlacements] = useState<Record<string, ReadinessCategory>>({})
  const [readinessSubmitted, setReadinessSubmitted] = useState(false)
  const [impactPriorityAnswer, setImpactPriorityAnswer] = useState("")
  const [impactPrioritySubmitted, setImpactPrioritySubmitted] = useState(false)
  const [selectedEvidenceQuestion, setSelectedEvidenceQuestion] = useState<string | null>(null)
  const [verificationMismatchAnswers, setVerificationMismatchAnswers] = useState<string[]>([])
  const [verificationChallengeSubmitted, setVerificationChallengeSubmitted] = useState(false)
  const [verificationSourceAnswer, setVerificationSourceAnswer] = useState("")
  const [verificationSourceSubmitted, setVerificationSourceSubmitted] = useState(false)
  const [connectionDiagramNodes, setConnectionDiagramNodes] = useState<string[]>([])
  const [connectionSlideOrder, setConnectionSlideOrder] = useState<string[]>(INITIAL_CONNECTION_SLIDE_ORDER)
  const [connectionChallengeSubmitted, setConnectionChallengeSubmitted] = useState(false)
  const [connectionIntegratedTestAnswer, setConnectionIntegratedTestAnswer] = useState("")
  const [connectionIntegratedTestSubmitted, setConnectionIntegratedTestSubmitted] = useState(false)
  const [feedbackConfidence, setFeedbackConfidence] = useState(initialState.feedbackConfidence)
  const [feedbackUsefulness, setFeedbackUsefulness] = useState(initialState.feedbackUsefulness)
  const [feedbackTransfer, setFeedbackTransfer] = useState(initialState.feedbackTransfer)
  const [feedbackOpenResponse, setFeedbackOpenResponse] = useState(initialState.feedbackOpenResponse)
  const [feedbackRating, setFeedbackRating] = useState(initialState.feedbackRating)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [checklistFields, setChecklistFields] = useState<Record<string, string>>({})
  const [checklistChecks, setChecklistChecks] = useState<Record<string, boolean>>({})
  const [checklistOpen, setChecklistOpen] = useState(false)
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(initialState.assessmentSubmitted)
  const [assessmentReviewOpen, setAssessmentReviewOpen] = useState(false)

  const activeLesson = OUTLINE_ITEMS.find(item => item.id === activeLessonId) || OUTLINE_ITEMS[0]
  const activeLessonIndex = OUTLINE_ITEMS.findIndex(item => item.id === activeLesson.id)
  const activeSimulationScene = SIMULATION_SCENES[Math.max(simulationScene, 0)]
  const simulationComplete = simulationStarted && simulationScene === SIMULATION_SCENES.length - 1
  const completedCount = completedLessonIds.length
  const readinessAllPlaced = READINESS_STATEMENTS.every(statement => readinessPlacements[statement.id])
  const readinessAllCorrect = readinessSubmitted && readinessAllPlaced && READINESS_STATEMENTS.every(statement => readinessPlacements[statement.id] === statement.category)
  const impactPriorityAllCorrect = impactPrioritySubmitted && impactPriorityAnswer === "B"
  const verificationChallengeAllCorrect = verificationChallengeSubmitted && verificationMismatchAnswers.length === 2 && ["name", "photo"].every(answer => verificationMismatchAnswers.includes(answer))
  const verificationChallengePartiallyCorrect = verificationChallengeSubmitted && verificationMismatchAnswers.length === 1 && ["name", "photo"].some(answer => verificationMismatchAnswers.includes(answer))
  const verificationSourceAllCorrect = verificationSourceSubmitted && verificationSourceAnswer === "C"
  const connectionSourceClicked = connectionDiagramNodes.includes("source")
  const connectionBranchesClicked = connectionDiagramNodes.includes("mc-script") && connectionDiagramNodes.includes("slides")
  const connectionSyncCheckClicked = connectionDiagramNodes.includes("sync-check")
  const connectionSequenceClicked = connectionDiagramNodes.includes("sequence")
  const connectionLiveClicked = connectionDiagramNodes.includes("live")
  const connectionCoreVisible = connectionSourceClicked && connectionBranchesClicked && connectionSyncCheckClicked && connectionSequenceClicked && connectionLiveClicked
  const connectionChallengeAllCorrect = connectionChallengeSubmitted && connectionSlideOrder.every((participant, index) => participant === CONNECTION_PARTICIPANT_ORDER[index])
  const connectionIntegratedTestAllCorrect = connectionIntegratedTestSubmitted && connectionIntegratedTestAnswer === "C"
  const connectionComplete = connectionCoreVisible && connectionChallengeAllCorrect && connectionIntegratedTestAllCorrect
  const evidenceVerificationComplete = verificationChallengeAllCorrect && verificationSourceAllCorrect
  const progress = Math.round((completedCount / EVENT_READINESS_TOTAL_ITEMS) * 100)
  const assessmentScore = READINESS_ASSESSMENT.reduce((score, question, index) => score + (assessmentAnswers[index] === question.correctOption ? 1 : 0), 0)
  const assessmentAllAnswered = assessmentAnswers.length === READINESS_ASSESSMENT.length && assessmentAnswers.every(Boolean)
  const assessmentMissedQuestions = READINESS_ASSESSMENT.filter((question, index) => assessmentAnswers[index] !== question.correctOption)
  const assessmentMissedConcepts = Array.from(new Set(assessmentMissedQuestions.map(question => question.concept)))

  useEffect(() => {
    window.localStorage.setItem(EVENT_READINESS_PROGRESS_KEY, JSON.stringify({
      activeLessonId,
      completedLessonIds,
      viewedLessonIds,
      assessmentAnswers,
      assessmentSubmitted,
      openingQuestionAnswer,
      feedbackConfidence,
      feedbackUsefulness,
      feedbackTransfer,
      feedbackOpenResponse,
      feedbackRating
    }))
  }, [activeLessonId, completedLessonIds, viewedLessonIds, assessmentAnswers, assessmentSubmitted, openingQuestionAnswer, feedbackConfidence, feedbackUsefulness, feedbackTransfer, feedbackOpenResponse, feedbackRating])
  useEffect(() => {
    onProgressChange?.(progress)
  }, [progress])
  useEffect(() => {
    if (!feedbackSubmitted) return
    const redirectTimer = window.setTimeout(() => onNavigateMyLearning(), 30000)
    return () => window.clearTimeout(redirectTimer)
  }, [feedbackSubmitted, onNavigateMyLearning])

  useEffect(() => {
    setViewedLessonIds(previous => previous.includes(activeLesson.id) ? previous : [...previous, activeLesson.id])
  }, [activeLesson.id])

  const isLessonUnlocked = (lessonIndex: number) => {
    if (lessonIndex <= 0) return true
    const previousLesson = OUTLINE_ITEMS[lessonIndex - 1]
    return completedLessonIds.includes(previousLesson.id) || viewedLessonIds.includes(previousLesson.id)
  }

  const handleLessonSelect = (lessonId: string) => {
    const lessonIndex = OUTLINE_ITEMS.findIndex(item => item.id === lessonId)
    if (lessonIndex === -1 || !isLessonUnlocked(lessonIndex)) return
    setActiveLessonId(lessonId)
  }
  const handleSimulationBackToRehearsal = () => {
    setSimulationStarted(false)
    setSimulationScene(-1)
    setOpeningDecisionConfirmed(false)
    setOpeningDecision(null)
  }
  const handleImpactPrioritySelect = (value: string) => {
    setImpactPrioritySubmitted(false)
    setImpactPriorityAnswer(value)
  }

  const handleImpactPrioritySubmit = () => {
    if (impactPriorityAnswer) setImpactPrioritySubmitted(true)
  }

  const handleImpactPriorityTryAgain = () => {
    setImpactPriorityAnswer("")
    setImpactPrioritySubmitted(false)
  }
  const handleVerificationMismatchToggle = (value: string) => {
    setVerificationChallengeSubmitted(false)
    setVerificationMismatchAnswers(previous => previous.includes(value)
      ? previous.filter(answer => answer !== value)
      : [...previous, value])
  }

  const handleVerificationChallengeSubmit = () => {
    if (verificationMismatchAnswers.length > 0) setVerificationChallengeSubmitted(true)
  }

  const handleVerificationChallengeTryAgain = () => {
    setVerificationMismatchAnswers([])
    setVerificationChallengeSubmitted(false)
    setVerificationSourceAnswer("")
    setVerificationSourceSubmitted(false)
  }


  const handleVerificationSourceTryAgain = () => {
    setVerificationSourceAnswer("")
    setVerificationSourceSubmitted(false)
  }

  const markComplete = (lessonId: string) => {
    setCompletedLessonIds(previous => previous.includes(lessonId) ? previous : [...previous, lessonId])
  }

  const handleConnectionNodeClick = (node: string) => {
    if ((node === "mc-script" || node === "slides") && !connectionSourceClicked) return
    if (node === "sync-check" && !connectionBranchesClicked) return
    if (node === "sequence" && !connectionSyncCheckClicked) return
    if (node === "live" && !connectionSequenceClicked) return
    setConnectionDiagramNodes(previous => previous.includes(node) ? previous : [...previous, node])
  }
  const handleConnectionDiagramHover = () => {
    setConnectionDiagramNodes(CONNECTION_DIAGRAM_NODES)
  }
  const handleConnectionSlideNameClick = (participant: string) => {
    const currentIndex = connectionSlideOrder.indexOf(participant)
    const targetIndex = CONNECTION_PARTICIPANT_ORDER.indexOf(participant)
    if (currentIndex < 0 || targetIndex < 0 || currentIndex === targetIndex) return
    const nextOrder = [...connectionSlideOrder]
    nextOrder.splice(currentIndex, 1)
    nextOrder.splice(targetIndex, 0, participant)
    setConnectionSlideOrder(nextOrder)
    setConnectionChallengeSubmitted(nextOrder.every((item, index) => item === CONNECTION_PARTICIPANT_ORDER[index]))
  }
  const handleIntegratedTestTryAgain = () => {
    setConnectionIntegratedTestAnswer("")
    setConnectionIntegratedTestSubmitted(false)
  }


  const handleAssessmentAnswer = (questionIndex: number, answerId: string) => {
    if (assessmentSubmitted) return
    setAssessmentAnswers(previous => previous.map((answer, index) => index === questionIndex ? answerId : answer))
  }
  const handleAssessmentSubmit = () => {
    if (assessmentSubmitted || !assessmentAllAnswered) return
    markComplete("2.0-quick-check")
    setAssessmentSubmitted(true)
    setAssessmentReviewOpen(false)
    window.requestAnimationFrame(() => {
      document.getElementById("assessment-results")?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }
  const navigateToLesson = (lessonId: string) => {
    setAssessmentReviewOpen(false)
    setActiveLessonId(lessonId)
    window.requestAnimationFrame(() => {
      lessonCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }
  const handleAssessmentReview = () => {
    setAssessmentReviewOpen(true)
  }
  const handleAssessmentBackToResult = () => {
    setAssessmentReviewOpen(false)
  }
  const handleAssessmentRetake = () => {
    setAssessmentAnswers(Array.from({ length: READINESS_ASSESSMENT.length }, () => ""))
    setAssessmentSubmitted(false)
    setAssessmentReviewOpen(false)
  }
  const handlePrimaryAction = () => {
    if (activeLesson.id === "1.1-ready-framework" && !connectionComplete) return

    markComplete(activeLesson.id)

    const nextLesson = OUTLINE_ITEMS[activeLessonIndex + 1]
    if (nextLesson) {
      setActiveLessonId(nextLesson.id)
      window.requestAnimationFrame(() => {
        lessonCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
  }
  const updateChecklistField = (field: string, value: string) => {
    setChecklistFields(previous => ({ ...previous, [field]: value }))
  }
  const updateChecklistCheck = (check: string, checked: boolean) => {
    setChecklistChecks(previous => ({ ...previous, [check]: checked }))
  }
  const handleReadyCallChange = (call: "ready" | "notReady", checked: boolean) => {
    setChecklistChecks(previous => ({
      ...previous,
      readyCallReady: call === "ready" ? checked : false,
      readyCallNotReady: call === "notReady" ? checked : false
    }))
  }
  const getChecklistText = () => {
    const mark = (check: string) => checklistChecks[check] ? "☒" : "☐"
    return [
      "EVENT READINESS CHECKLIST",
      `Event / Sequence: ${checklistFields.eventSequence || ""}`,
      `Project Leader: ${checklistFields.projectLeader || ""}`,
      `Date: ${checklistFields.date || ""}`,
      "",
      "1. IMPACT",
      `${mark("impact")} We have identified all elements most likely to affect participants or live delivery if they fail.`,
      `Critical element(s): ${checklistFields.criticalElements || ""}`,
      "",
      "2. EVIDENCE",
      `${mark("evidenceCurrent")} Critical information has been checked against the current, reliable source.`,
      `${mark("evidenceVersion")} The team is working from the final/current version of critical materials.`,
      `Evidence/source checked: ${checklistFields.evidenceSource || ""}`,
      "",
      "3. OWNERSHIP",
      `${mark("ownership")} Every unresolved critical issue has a clear owner and next action.`,
      `Owner: ${checklistFields.owner || ""}`,
      `Next action: ${checklistFields.nextAction || ""}`,
      "",
      "4. CONNECTION",
      `${mark("connectionEndToEnd")} Critical handoffs have been tested end-to-end using final materials.`,
      `${mark("connectionSetup")} Where relevant, the sequence has been tested in the actual event setup or conditions.`,
      `What was tested: ${checklistFields.whatWasTested || ""}`,
      "",
      "5. SUPPORT",
      `${mark("support")} No high-impact issue remains unresolved without a clear decision or escalation.`,
      `If support is needed: ${checklistFields.supportNeeded || ""}`,
      `Escalate to: ${checklistFields.escalateTo || ""}`,
      `Decision needed: ${checklistFields.decisionNeeded || ""}`,
      "",
      "FINAL READY CALL",
      `${mark("readyCallReady")} READY: The critical elements are verified, owned and tested well enough to proceed.`,
      `${mark("readyCallNotReady")} NOT READY YET: A critical issue still needs action before sign-off.`,
      `Issue: ${checklistFields.issue || ""}`,
      `Owner: ${checklistFields.finalOwner || ""}`,
      `Next action: ${checklistFields.finalNextAction || ""}`,
      `Re-check by: ${checklistFields.recheckBy || ""}`
    ].join("\n")
  }
  const checklistHasContent = Object.values(checklistFields).some(value => value.trim().length > 0) || Object.values(checklistChecks).some(Boolean)
  const downloadFile = (content: BlobPart, type: string, filename: string) => {
    const url = URL.createObjectURL(new Blob([content], { type }))
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
  }
  const handleChecklistDownloadPdf = () => {
    const pdfText = getChecklistText().replace(/☒/g, "[x]").replace(/☐/g, "[ ]").replace(/→/g, "->")
    const lines = pdfText.split("\n")
    const linesPerPage = 48
    const pageCount = Math.max(1, Math.ceil(lines.length / linesPerPage))
    const objects: string[] = []
    objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`
    objects[3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`
    const pageReferences: string[] = []
    for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
      const pageNumber = 4 + pageIndex * 2
      const contentNumber = pageNumber + 1
      const pageLines = lines.slice(pageIndex * linesPerPage, (pageIndex + 1) * linesPerPage)
      const stream = [
        "BT",
        "/F1 10 Tf",
        "50 760 Td",
        "13 TL",
        ...pageLines.map(line => `(${line.replace(/([\\()])/g, "\\$1")}) Tj\nT*`),
        "ET"
      ].join("\n")
      objects[pageNumber] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentNumber} 0 R >>`
      objects[contentNumber] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
      pageReferences.push(`${pageNumber} 0 R`)
    }
    objects[2] = `<< /Type /Pages /Kids [${pageReferences.join(" ")}] /Count ${pageCount} >>`
    let pdf = "%PDF-1.4\n"
    const offsets: number[] = [0]
    for (let index = 1; index < objects.length; index += 1) {
      if (!objects[index]) continue
      offsets[index] = pdf.length
      pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`
    }
    const xrefOffset = pdf.length
    pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`
    for (let index = 1; index < objects.length; index += 1) {
      pdf += `${String(offsets[index] || 0).padStart(10, "0")} 00000 n \n`
    }
    pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
    downloadFile(pdf, "application/pdf", "event-readiness-checklist.pdf")
  }
  const handleFeedbackSubmit = () => {
    markComplete(activeLesson.id)
    setFeedbackSubmitted(true)
    window.requestAnimationFrame(() => {
      document.getElementById("feedback-results")?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }
  const handleReadinessPlacement = (statementId: string, category: ReadinessCategory) => {
    setReadinessPlacements(previous => ({ ...previous, [statementId]: category }))
    setReadinessSubmitted(false)
  }
  const handleChecklistOpen = () => {
    setChecklistOpen(true)
    window.requestAnimationFrame(() => {
      document.getElementById("event-readiness-checklist-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  const handleReadinessDrop = (event: React.DragEvent<HTMLDivElement>, category: ReadinessCategory) => {
    event.preventDefault()
    const statementId = event.dataTransfer.getData("text/plain")
    if (READINESS_STATEMENTS.some(statement => statement.id === statementId)) {
      handleReadinessPlacement(statementId, category)
    }
  }

  const handleReadinessSubmit = () => {
    if (readinessAllPlaced) setReadinessSubmitted(true)
  }

  const handleReadinessTryAgain = () => {
    setReadinessPlacements({})
    setReadinessSubmitted(false)
  }
  const handlePrevious = () => {
    const previousLesson = OUTLINE_ITEMS[activeLessonIndex - 1]
    if (previousLesson) setActiveLessonId(previousLesson.id)
  }

  const isCompleted = completedLessonIds.includes(activeLesson.id)
  const isGettingStarted = activeLesson.section === "GETTING STARTED"
  const isLearn = activeLesson.section === "LEARN"
  const isPractise = activeLesson.section === "PRACTISE"
  const isCheckAndApply = activeLesson.section === "CHECK & APPLY"
  const isFeedback = activeLesson.section === "WRAP UP"
  const isDarkHeader = isGettingStarted || isLearn || isPractise || isCheckAndApply || isFeedback
  const primaryLabel = "Next"

  return (
    <div className="space-y-5 pb-16 font-sans text-left">

      <section className="relative overflow-hidden rounded-2xl border border-[#87AECE]/35 bg-gradient-to-br from-white via-[#fcfdfe] to-[#f2f7fa] p-4 shadow-[0_16px_50px_-20px_rgba(29,42,98,0.08)] sm:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#87AECE_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        <nav aria-label="Breadcrumb" className="relative z-10 mb-5 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
          <button type="button" onClick={onNavigateHome} className="cursor-pointer transition-colors hover:text-[#1D2A62] hover:underline">
            Home
          </button>
          <span className="text-slate-300">/</span>
          <button type="button" onClick={onNavigateCourses} className="cursor-pointer transition-colors hover:text-[#1D2A62] hover:underline">
            Courses
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-[#1D2A62]">Event Readiness</span>
        </nav>
        <div className="mb-3 flex flex-wrap items-center gap-2 lg:absolute lg:right-7 lg:top-7 lg:justify-end">
          <span className="rounded-full border border-[#AFD06E]/35 bg-[#EEF7E8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#437118]">
            06 · DELIVER STAGE
          </span>
          <span className="rounded-full border border-[#87AECE]/45 bg-[#EAF4FA] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1D2A62]">
            Core Pathway
          </span>
        </div>
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-3xl flex-1 lg:max-w-4xl lg:pr-40">
            <div className="flex items-end gap-[15.6px]">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#AFD06E]/40 bg-[#EEF7E8] p-1.5 text-[#437118] sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                <img
                  src="/core-pathway-clipboard.png"
                  alt="Event Readiness Checklist"
                  className="h-full w-full object-contain select-none"
                />
              </div>
              <div className="min-w-0">
                <h1 className="inline-block text-2xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-[#386b24] via-[#437118] to-[#1D2A62] bg-clip-text text-transparent sm:text-3xl lg:whitespace-nowrap">
                  <span>Event Readiness</span>{" | "}
                  <span>From “Done” to Participant-Ready</span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600" style={{ transform: "translateY(-10%)" }}>
                  Learn the practical checks that turn a completed event plan into a delivery-ready experience.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#1D2A62]">
                  <Clock className="h-3.5 w-3.5 text-[#437118]" />
                  <span>{course.duration} · Interactive</span>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-[220px] lg:text-right">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold text-[#1D2A62] lg:justify-end">
              <span>Overall progress</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/80 ring-1 ring-[#87AECE]/25">
              <div className="h-full rounded-full bg-[#437118] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">{completedCount} of {OUTLINE_ITEMS.length} outline items completed</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-20">
          <Card className="border-slate-200/90 p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#437118]" />
                <h2 className="text-sm font-extrabold text-[#1D2A62]">Course Syllabus</h2>
              </div>
              <span className="text-[11px] font-bold text-slate-500">{completedCount}/{OUTLINE_ITEMS.length}</span>
            </div>
            <div className="space-y-4">
              {OUTLINE_SECTIONS.map(section => {
                return (
                  <div key={section.title} className="space-y-1.5">
                    <h3 className="px-2 text-[10px] font-extrabold tracking-wider text-[#437118]">{section.title}</h3>
                    <div className="space-y-1">
                      {section.items.map(item => {
                        const itemCompleted = completedLessonIds.includes(item.id)
                        const itemActive = activeLesson.id === item.id
                        const itemIndex = OUTLINE_ITEMS.findIndex(outlineItem => outlineItem.id === item.id)
                        const itemUnlocked = isLessonUnlocked(itemIndex)
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleLessonSelect(item.id)}
                            disabled={!itemUnlocked}
                            aria-disabled={!itemUnlocked}
                            title={!itemUnlocked ? "View the previous module first" : undefined}
                            className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${
                              itemUnlocked ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                            } ${
                              itemActive
                                ? "bg-[#EAF4FA] font-bold text-[#1D2A62] ring-1 ring-[#87AECE]/45"
                                : itemUnlocked
                                  ? "text-slate-600 hover:bg-slate-50"
                                  : "text-slate-400"
                            }`}
                        >
                          {!itemUnlocked ? (
                            <LockSimple className="h-4 w-4 shrink-0 text-slate-400" />
                          ) : itemCompleted ? (
                            <CheckCircle weight="fill" className="h-4 w-4 shrink-0 text-[#437118]" />
                          ) : item.id.includes("1.") ? (
                            <PlayCircle className="h-4 w-4 shrink-0 text-slate-400" />
                          ) : (
                            <span className="h-4 w-4 shrink-0 rounded-full border border-slate-300" />
                          )}
                          <span className="min-w-0 flex-1">{item.title}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                )
              })}
            </div>
          </Card>
        </aside>

        <main className="min-w-0 space-y-5">
          <Card ref={lessonCardRef} className="overflow-hidden border-slate-200/90 shadow-sm">
            <div className={`flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7 ${
              isGettingStarted || isPractise || isFeedback
                ? "border-[#AFD06E]/30 bg-gradient-to-br from-[#274818] via-[#386b24] to-[#4d8f31]"
                : isLearn || isCheckAndApply
                  ? "border-[#87AECE]/35 bg-gradient-to-br from-[#132552] via-[#1D4B85] to-[#2F6FA3]"
                  : "border-slate-100 bg-[#F8FCF6]"
            }`}>
              <div>
                <p className={`text-[10px] font-extrabold uppercase tracking-wider ${isDarkHeader ? "text-[#C8E3F5]" : "text-[#437118]"}`}>{activeLesson.section}</p>
                <h2 className={`mt-1 text-xl font-extrabold leading-tight ${isDarkHeader ? "text-white" : "text-[#1D2A62]"} sm:text-2xl`}>{activeLesson.title}</h2>
              </div>
              <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${isDarkHeader ? "bg-white/15 text-white ring-white/25" : "bg-white text-slate-500 ring-slate-200"}`}>
                {isCompleted ? <CheckCircle weight="fill" className={`h-3.5 w-3.5 ${isDarkHeader ? "text-[#AFD06E]" : "text-[#437118]"}`} /> : <Target className={`h-3.5 w-3.5 ${isDarkHeader ? "text-[#C8E3F5]" : "text-[#1D2A62]"}`} />}
                {isCompleted ? "Completed" : `Item ${activeLessonIndex + 1} of ${OUTLINE_ITEMS.length}`}
              </span>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              {activeLesson.id === "course-overview" && (
                <div className="space-y-5 text-sm leading-relaxed text-slate-700">
                  <p className="text-[#1D2A62]">
                    <strong>Event Readiness</strong> is the final check before delivery. It shifts the focus from what the team has completed behind the scenes to what participants will actually experience. In this course, Project Leaders explore what being event ready really means and practise moving an event from done to <strong>participant-ready</strong> by:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { title: "Prioritise", copy: "what matters most to the participant experience and event delivery", cardClass: "border-[#AFD06E]/35 bg-[#EEF7E8]", Icon: Lightbulb },
                      { title: "Verify", copy: "critical information with reliable, up-to-date evidence", cardClass: "border-[#87AECE]/35 bg-[#F0F7FC]", Icon: ShieldCheck },
                      { title: "Test", copy: "how key elements work together before final sign-off", cardClass: "border-[#F3C979]/45 bg-[#FFF7E5]", Icon: PlayCircle }
                    ].map(({ title, copy, cardClass, Icon }) => (
                      <div key={title} className={`rounded-2xl border p-4 text-center ${cardClass}`}>
                        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-[#437118] ring-1 ring-black/5">
                          <Icon weight="fill" className="h-5 w-5" />
                        </div>
                        <p className="font-bold text-[#1D2A62]">{title}</p>
                        <p className="mt-1 text-xs text-slate-600">{copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeLesson.id === "course-outcomes" && (
                <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                  <p>By the end of this course, you will be able to:</p>
                  <ul className="space-y-3">
                    {[
                      { text: "Prioritise event elements based on their potential impact on participants and event flow.", colorClass: "text-[#437118]" },
                      { text: "Use reliable, up-to-date sources to verify that critical information is accurate and ready for use.", colorClass: "text-[#2F668B]" },
                      { text: "Identify readiness gaps when completed elements are tested together, and select appropriate follow-up actions before sign-off.", colorClass: "text-[#A66C00]" }
                    ].map(({ text, colorClass }) => (
                      <li key={text} className="flex items-center gap-2">
                        <CheckCircle weight="fill" className={`h-4 w-4 shrink-0 ${colorClass}`} />
                        <span className={`font-medium ${colorClass}`}>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeLesson.id === "1.0-done-ready" && (
                <div className="space-y-5 text-sm leading-relaxed text-slate-700">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#437118]">
                      <Clock weight="fill" className="h-5 w-5 text-[#668B45]" />
                      Opening Question
                    </div>
                    <p className="pt-2 font-semibold text-[#1D2A62]">48 hours before the event</p>
                    <p className="text-sm leading-relaxed text-slate-600">The venue is booked. Speakers are confirmed. Volunteers are assigned. The run sheet is complete. The participant list, slides, and MC script are all marked done.</p>
                    <p className="pt-1 font-semibold text-[#1D2A62]">Everything looks ready. But is it?</p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      { title: "MC Script", status: "Rehearsed yesterday", owner: "Program Team", Icon: Microphone },
                      { title: "Participant Slides", status: "Completed yesterday", owner: "Content Team", Icon: Presentation },
                      { title: "Participant List", status: "Updated today · 10:00 AM", owner: "Registration Team", Icon: UsersThree }
                    ].map(({ title, status, owner, Icon }) => (
                      <button
                        key={title}
                        type="button"
                        aria-pressed={selectedAssetCard === title}
                        onClick={() => setSelectedAssetCard(current => current === title ? null : title)}
                        className={`min-h-48 cursor-pointer rounded-2xl border bg-white p-4 text-left shadow-2xs transition-all hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87AECE] sm:p-5 ${
                          selectedAssetCard === title
                            ? "border-[#437118] ring-2 ring-[#AFD06E]/50"
                            : title === "Participant Slides"
                              ? "border-[#6E9D75]"
                              : "border-[#D5E4D7]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF7F0] text-[#668B45]">
                            <Icon weight="regular" className="h-6 w-6" />
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5E4D7] bg-[#F2F7F3] px-2.5 py-1 text-xs font-medium text-slate-600">
                            <Check className="h-3.5 w-3.5 text-[#668B72]" />
                            Done
                          </span>
                        </div>
                        <div className="mt-5">
                          <p className="text-lg font-bold leading-tight text-[#151A17]">{title}</p>
                          <p className="mt-1.5 text-xs font-medium text-[#437118]">{status}</p>
                          <p className="mt-1 text-xs text-slate-600">Owner: {owner}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-[#87AECE]/35 bg-[#EAF4FA] p-5">
                    <p className="font-bold text-[#1D2A62]">All three are marked “Done”. Is the participant-introduction sequence ready?</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {[
                        { value: "yes", label: "Yes, all three tasks are complete." },
                        { value: "not-necessarily", label: "Not necessarily, the information may be out of sync." }
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setOpeningQuestionAnswer(value)}
                          className={`rounded-xl border p-3 text-center text-sm font-semibold transition-colors cursor-pointer ${openingQuestionAnswer === value ? "border-[#2F668B] bg-[#2F668B] text-white ring-1 ring-[#2F668B]" : "border-[#87AECE]/40 bg-white text-[#1D2A62] hover:bg-[#F0F7FC]"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {openingQuestionAnswer && (
                    <div className={`rounded-2xl border p-5 ${openingQuestionAnswer === "yes" ? "border-[#F3C979]/45 bg-[#FFF7E5]" : "border-[#AFD06E]/40 bg-[#EEF7E8]"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {openingQuestionAnswer === "yes" ? (
                            <>
                              <p className="font-bold text-[#A66C00]">NOT QUITE.</p>
                              <p className="mt-1 text-xs leading-relaxed text-slate-600">All three tasks may be complete, but they were completed or updated at different times. The information may no longer be aligned.</p>
                              <p className="mt-2 text-xs leading-relaxed text-slate-600">Look again at when each item was completed or updated.</p>
                            </>
                          ) : (
                            <>
                              <p className="font-bold text-[#437118]">EXACTLY.</p>
                              <p className="mt-1 text-xs leading-relaxed text-slate-600">Completion tells you that a task has been finished. It does not prove that the information is still current, that connected assets match, or that the full sequence will work in practice.</p>
                              <p className="mt-2 text-xs leading-relaxed text-slate-600">An event is participant-ready only when the connected experience can work as intended.</p>
                            </>
                          )}
                        </div>
                        {openingQuestionAnswer === "yes" && (
                          <button type="button" onClick={() => setOpeningQuestionAnswer("")} className="shrink-0 cursor-pointer rounded-lg border border-[#D8B457] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#8B5E00] transition-colors hover:bg-white">
                            Try Again
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  {openingQuestionAnswer === "not-necessarily" && (
                  <div className="space-y-5">
                    <div className="rounded-2xl bg-gradient-to-br from-[#F0F7FC] via-white to-[#EEF7E8] p-5">
                      <div className="flex items-center gap-2 font-bold text-[#437118]">
                        <Lightbulb weight="fill" className="h-5 w-5" />
                        Mindset Shift
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-[#1D2A62]">Understanding the difference</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">Why completed tasks do not automatically mean the event is ready for delivery.</p>
                    </div>

                    <div>
                      <h3 className="mt-3 text-center text-lg font-bold uppercase text-[#1D2A62]">Readiness Pathway - The critical transition</h3>
                      <div
                        className="mt-[21px] flex flex-col items-stretch gap-2 outline-none sm:flex-row sm:items-end sm:gap-0"
                        tabIndex={0}
                        onMouseEnter={() => setIsPathwayHovered(true)}
                        onMouseLeave={() => setIsPathwayHovered(false)}
                        onFocus={() => setIsPathwayHovered(true)}
                        onBlur={event => {
                          if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsPathwayHovered(false)
                        }}
                      >
                        {[
                          { label: "Done", detail: "Output exists", Icon: FileText, circleClass: "bg-[#EAF4FA] text-[#1D4B85]", panelClass: "bg-[#F0F7FC]", numberClass: "bg-[#2F668B]" },
                          { label: "Verify", detail: "Information checked", Icon: MagnifyingGlass, circleClass: "bg-[#EAF4FA] text-[#1D4B85]", panelClass: "bg-[#F0F7FC]", numberClass: "bg-[#2F668B]" },
                          { label: "Test", detail: "Connections tested", Icon: Gear, circleClass: "bg-[#FFF7E5] text-[#B77711]", panelClass: "bg-[#FFF7E5]", numberClass: "bg-[#B77711]" },
                          { label: "Ready", detail: "Participant-ready", Icon: Flag, circleClass: "bg-[#EEF7E8] text-[#437118]", panelClass: "bg-[#EEF7E8]", numberClass: "bg-[#437118]" }
                        ].map(({ label, detail, Icon, circleClass, panelClass, numberClass }, index) => {
                          const isVisible = index === 0 || isPathwayHovered
                          const isArrowVisible = isPathwayHovered && index < 3
                          return (
                            <Fragment key={label}>
                              <div
                                className="min-w-0 overflow-hidden sm:flex-1 sm:overflow-visible"
                                style={{
                                  opacity: isVisible ? 1 : 0,
                                  transform: isVisible ? "translateX(0)" : "translateX(-12px)",
                                  transition: "opacity 300ms ease, transform 450ms ease",
                                  transitionDelay: isVisible ? `${index * 120}ms` : "0ms"
                                }}
                              >
                                <div className={`relative mx-auto flex h-20 w-20 items-center justify-center rounded-full ${circleClass}`}>
                                  <span className={`absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${numberClass}`}>{index + 1}</span>
                                  <Icon weight="regular" className="h-9 w-9" />
                                </div>
                                <div className={`mt-2 rounded-2xl p-3 text-center ${panelClass}`}>
                                  <p className="font-bold text-[#1D2A62]">{label}</p>
                                  <p className="mt-1 text-xs text-slate-600">{detail}</p>
                                </div>
                              </div>
                              {index < 3 && (
                                <ArrowRight
                                  className="mx-auto h-5 w-5 max-h-0 shrink-0 rotate-90 text-[#87AECE] sm:mx-3 sm:mb-7 sm:max-h-5 sm:rotate-0"
                                  style={{
                                    width: isArrowVisible ? "1.25rem" : "0px",
                                    opacity: isArrowVisible ? 1 : 0,
                                    transition: "width 350ms ease, opacity 250ms ease",
                                    transitionDelay: isArrowVisible ? `${(index + 1) * 120 - 60}ms` : "0ms"
                                  }}
                                />
                              )}
                            </Fragment>
                          )
                        })}
                      </div>
                    </div>
                <div className="space-y-5 text-sm leading-relaxed text-slate-700">
                  <h3 className="mt-[15px] text-center text-lg font-bold uppercase text-[#386b24]">DONE VS READY</h3>

                  <div className="rounded-2xl border border-[#87AECE]/35 bg-[#F8FCF6] p-4">
                    <div className="flex items-center gap-2 font-bold text-[#437118]">
                      <Target className="h-5 w-5" />
                      Mini Activity
                    </div>
                    <p className="mt-2 font-semibold text-[#1D2A62]">Drag each statement into the correct category.</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {READINESS_STATEMENTS.filter(statement => !readinessPlacements[statement.id]).map(statement => (
                        <div
                          key={statement.id}
                          draggable
                          onDragStart={event => {
                            event.dataTransfer.effectAllowed = "move"
                            event.dataTransfer.setData("text/plain", statement.id)
                          }}
                          aria-label={`Drag statement: ${statement.text}`}
                          className="cursor-grab rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-700 shadow-2xs transition hover:-translate-y-0.5 hover:border-[#87AECE] hover:shadow-sm active:cursor-grabbing"
                        >
                          {statement.text}
                        </div>
                      ))}
                      {readinessAllPlaced && (
                        <p className="text-xs font-medium text-[#437118] sm:col-span-2">All cards are in a category. Review your choices, then submit.</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {(["DONE", "READY"] as ReadinessCategory[]).map(category => {
                      const categoryStatements = READINESS_STATEMENTS.filter(statement => readinessPlacements[statement.id] === category)
                      const isDoneCategory = category === "DONE"
                      return (
                        <div
                          key={category}
                          onDragOver={event => event.preventDefault()}
                          onDrop={event => handleReadinessDrop(event, category)}
                          className={`min-h-52 rounded-2xl border p-4 transition-colors ${isDoneCategory ? "border-[#87AECE]/45 bg-[#F0F7FC]" : "border-[#AFD06E]/45 bg-[#EEF7E8]"}`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <h3 className={`text-base font-extrabold tracking-wide ${isDoneCategory ? "text-[#2F668B]" : "text-[#437118]"}`}>{category}</h3>
                            <span className="rounded-full bg-white/75 px-2 py-1 text-[11px] font-semibold text-slate-500">{categoryStatements.length}/3</span>
                          </div>
                          {readinessAllCorrect && (
                            <p className={`mt-1 text-xs font-semibold ${isDoneCategory ? "text-[#2F668B]" : "text-[#437118]"}`}>
                              {isDoneCategory ? "A task-level status" : "An event-level judgement"}
                            </p>
                          )}
                          <div className="mt-3 space-y-2">
                            {categoryStatements.map(statement => {
                              const isCorrect = readinessSubmitted && statement.category === category
                              const isIncorrect = readinessSubmitted && statement.category !== category
                              return (
                                <div
                                  key={statement.id}
                                  draggable
                                  onDragStart={event => {
                                    event.dataTransfer.effectAllowed = "move"
                                    event.dataTransfer.setData("text/plain", statement.id)
                                  }}
                                  className={`cursor-grab rounded-xl border bg-white p-3 text-xs font-medium shadow-2xs transition active:cursor-grabbing ${
                                    isCorrect
                                      ? "border-[#70A64B] ring-1 ring-[#70A64B]/40"
                                      : isIncorrect
                                        ? "border-[#D66B5D] ring-1 ring-[#D66B5D]/30"
                                        : "border-white/80 hover:-translate-y-0.5 hover:shadow-sm"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="text-slate-700">{statement.text}</span>
                                    {readinessSubmitted && (
                                      isCorrect
                                        ? <CheckCircle weight="fill" className="h-4 w-4 shrink-0 text-[#437118]" />
                                        : <XCircle weight="fill" className="h-4 w-4 shrink-0 text-[#B7473C]" />
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                            {categoryStatements.length === 0 && (
                              <p className="rounded-xl border border-dashed border-slate-300 bg-white/50 p-4 text-center text-xs text-slate-500">Drop statements here</p>
                            )}
                          </div>
                          {readinessAllCorrect && (
                            <p className="mt-3 text-xs font-semibold italic text-[#1D2A62]">
                              <span className="font-bold">Outcome:</span>{" "}
                              {isDoneCategory ? "You have an output" : "You have confidence the output is current, verified, and ready for live use."}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-start sm:justify-between">
                    {readinessSubmitted && (
                      <div className="min-w-0 flex-1">
                        {readinessAllCorrect ? (
                          <>
                            <p className="font-bold text-[#437118]">Great work.</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">You identified the difference between task completion and event readiness.</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">A task can be Done without being Ready. Readiness requires evidence that critical information is current and that connected elements can work together in delivery.</p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold text-[#A66C00]">Almost there.</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600"><span className="font-semibold text-[#1D2A62]">Ask yourself:</span> Does this statement only show that a task has been completed, or does it provide evidence that the event can work as intended?</p>
                          </>
                        )}
                      </div>
                    )}
                    <div className="flex shrink-0 justify-end gap-2">
                      {readinessSubmitted && !readinessAllCorrect && (
                        <Button type="button" variant="outline" onClick={handleReadinessTryAgain} className="cursor-pointer border-[#D8B457] bg-white/70 text-[#8B5E00] hover:bg-white">
                          Try Again
                        </Button>
                      )}
                      <Button type="button" onClick={handleReadinessSubmit} disabled={!readinessAllPlaced || readinessAllCorrect} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a] sm:min-w-28">
                        Submit
                      </Button>
                    </div>
                  </div>


                  {readinessAllCorrect && (
                    <div className="rounded-2xl bg-gradient-to-br from-[#F0F7FC] via-white to-[#EEF7E8] p-5">
                      <div className="flex items-center gap-2 font-bold text-[#437118]">
                        <Lightbulb weight="fill" className="h-5 w-5" />
                        Key Takeaway
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-[#1D2A62]">Readiness is an event-level judgement, not a collection of completed tasks.</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">Completion tells you what is finished. Readiness tells you whether it can work reliably in the real event.</p>
                    </div>
                  )}
                </div>
                  </div>
                  )}
                </div>
              )}


              {activeLesson.id === "1.1-ready-framework" && (
                <div className="space-y-5 text-sm leading-relaxed text-slate-700">
                  <div className="rounded-2xl border border-[#87AECE]/35 bg-[#F8FCF6] p-5">
                    <p className="text-base font-semibold leading-relaxed text-[#1D2A62]">
                      Event readiness is not about checking everything yourself. It is about knowing where to focus your attention. In the next section, you’ll explore three practical checks in more detail:
                    </p>
                    <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                      <p><span className="font-extrabold text-[#2F668B]">IMPACT</span> — What matters most?</p>
                      <p><span className="font-extrabold text-[#437118]">EVIDENCE</span> — What proves it is correct?</p>
                      <p><span className="font-extrabold text-[#8B5E00]">CONNECTION</span> — What needs to work together?</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#87AECE]/35 bg-white p-5">
                    <div className="flex items-center gap-2 font-bold text-[#2F668B]">
                      <ShieldCheck weight="fill" className="h-5 w-5" />
                      A. IMPACT
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-[#1D2A62]">What Should a Project Leader Pay Attention To?</h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">As a Project Leader, you do not need to check every detail yourself. What matters is recognising which issues could most directly affect participants, important stakeholders, or event delivery.</p>

                    <div className="mt-5">
                    <div>
                      <h3 className="text-center text-lg font-bold uppercase text-[#437118]">Participant-critical elements</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">Participant-critical elements are parts of the event where an error could directly affect participants, key stakeholders, or an important part of delivery.</p>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="flex h-full flex-col rounded-2xl border border-[#437118]/45 bg-gradient-to-br from-[#EEF7E8] via-[#F8FCF6] to-[#DFF0D8] p-5 shadow-sm ring-1 ring-[#AFD06E]/35">
                        <h3 className="text-center text-base font-extrabold text-[#386b24]">Higher Attention Examples</h3>
                        <ul className="mt-3 flex-1 space-y-2 text-sm leading-relaxed text-slate-600">
                          {[
                            "Participant names, photos, and registration data",
                            "Speaker information and arrival requirements",
                            "Event timing and participant communication",
                            "Check-in process and key transitions",
                            "Critical AV and delivery hand-offs"
                          ].map(item => <li key={item}>• {item}</li>)}
                        </ul>
                      </div>
                      <div className="flex h-full flex-col rounded-2xl border border-[#F3C979]/55 bg-[#FFF7E5] p-5">
                        <h3 className="text-center text-base font-extrabold text-[#8B5E00]">Lower Immediate Priority</h3>
                        <ul className="mt-3 flex-1 space-y-2 text-sm leading-relaxed text-slate-600">
                          {[
                            "Small formatting inconsistency",
                            "Minor decorative typo on background banner",
                            "Optional aesthetic improvement",
                            "Non-critical layout details"
                          ].map(item => <li key={item}>• {item}</li>)}
                        </ul>
                        <p className="mt-3 text-sm italic text-[#B7473C]">Can be handled once critical paths are secured.</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm italic leading-relaxed text-[#1D2A62]"><span className="font-bold">Important:</span> Lower priority does not mean ‘unimportant’. It means another issue deserves attention first when time or resources are limited.</p>
                    </div>
                  </div>

                  {impactPriorityAllCorrect && (
                    <div className="rounded-2xl bg-gradient-to-br from-[#F0F7FC] via-white to-[#EEF7E8] p-5">
                      <div className="flex items-center gap-2 font-bold text-[#2F668B]">
                        <Lightbulb weight="fill" className="h-5 w-5" />
                        IMPACT RULE
                      </div>
                      <p className="mt-3 text-lg font-bold leading-relaxed text-[#1D2A62]">Prioritise by potential impact, not by what is easiest to fix.</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">Ask yourself: If this goes wrong live, who is affected and how seriously?</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">In practice: When time is limited, focus first on issues that could most directly affect participants or event delivery.</p>
                    </div>
                  )}
                  <div className="rounded-2xl border border-[#87AECE]/35 bg-[#F8FCF6] p-5">
                    <div className="flex items-center gap-2 font-bold text-[#437118]">
                      <Target weight="fill" className="h-5 w-5" />
                      Mini Activity
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-[#1D2A62]">You have 15 minutes before rehearsal. Which issue deserves the highest priority?</h3>
                    <div className="mt-3 grid gap-2">
                      {[
                        { value: "A", label: "A speaker’s title differs between the latest confirmation email and the slide deck." },
                        { value: "B", label: "A participant’s name and photo have not been cross-checked against the latest confirmed list." },
                        { value: "C", label: "A small formatting inconsistency appears in an internal planning file." },
                        { value: "D", label: "A minor typo appears on the backdrop." }
                      ].map(({ value, label }) => {
                        const isSelected = impactPriorityAnswer === value
                        const isCorrectOption = value === "B"
                        return (
                          <button
                            key={value}
                            type="button"
                            disabled={impactPrioritySubmitted}
                            aria-pressed={isSelected}
                            onClick={() => handleImpactPrioritySelect(value)}
                            className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                              impactPrioritySubmitted
                                ? impactPriorityAllCorrect && isCorrectOption
                                  ? "border-[#70A64B] bg-[#EEF7E8] ring-1 ring-[#70A64B]/40"
                                  : isSelected
                                    ? "border-[#D66B5D] bg-[#FFF1EF] ring-1 ring-[#D66B5D]/30"
                                    : "border-slate-200 bg-white"
                                : isSelected
                                  ? "border-[#1D2A62] bg-[#EAF4FA] ring-1 ring-[#1D2A62]"
                                  : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                          >
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              impactPrioritySubmitted && impactPriorityAllCorrect && isCorrectOption
                                ? "bg-[#437118] text-white"
                                : impactPrioritySubmitted && isSelected
                                  ? "bg-[#B7473C] text-white"
                                  : isSelected
                                    ? "bg-[#1D2A62] text-white"
                                    : "bg-[#EAF4FA] text-[#1D4B85]"
                            }`}>{value}</span>
                            <span className="text-sm leading-relaxed text-slate-700">{label}</span>
                          </button>
                        )
                      })}
                    </div>
                    <div className={`mt-4 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-start sm:justify-between ${
                      impactPrioritySubmitted
                        ? impactPriorityAllCorrect ? "border-[#AFD06E]/50 bg-white" : "border-[#F3C979]/60 bg-white"
                        : "border-slate-200 bg-white"
                    }`}>
                      {impactPrioritySubmitted && (
                        <div className="min-w-0 flex-1">
                          <p className={`font-bold ${impactPriorityAllCorrect ? "text-[#437118]" : "text-[#8B5E00]"}`}>{impactPriorityAllCorrect ? "Exactly." : "Not quite."}</p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">{impactPriorityAllCorrect ? "Not every unfinished detail creates the same level of risk." : "That issue may still need attention, but another option has a more direct impact on the participant experience."}</p>
                          {impactPriorityAllCorrect && (
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">A participant’s name and photo will be experienced directly during the event, so this issue deserves attention before lower-impact internal or decorative details.</p>
                          )}
                        </div>
                      )}
                      <div className="flex shrink-0 justify-end gap-2">
                        {impactPrioritySubmitted && !impactPriorityAllCorrect && (
                          <Button type="button" variant="outline" onClick={handleImpactPriorityTryAgain} className="cursor-pointer border-[#D8B457] bg-white/70 text-[#8B5E00] hover:bg-white">
                            Try Again
                          </Button>
                        )}
                        <Button type="button" onClick={handleImpactPrioritySubmit} disabled={!impactPriorityAnswer || impactPrioritySubmitted} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a] sm:min-w-28">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>

                  {impactPriorityAllCorrect && (
                    <div className="rounded-2xl border border-[#87AECE]/35 bg-white p-5">
                      <div className="flex items-center gap-2 font-bold text-[#437118]">
                        <ShieldCheck weight="fill" className="h-5 w-5" />
                        B. EVIDENCE
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-[#1D2A62]">How do I know it is correct?</h3>
                      <p className="mt-3 text-base leading-relaxed text-slate-600">A team member saying that a task is complete tells you the work has been finished. But for participant-critical information, completion alone does not prove that the information is accurate, current, and approved for use.</p>
                      <p className="mt-3 text-center text-base leading-relaxed text-[#437118]"><span className="font-bold">“Done” is a status. “Verified” requires evidence.</span></p>
                      <p className="mt-4 text-sm italic leading-relaxed text-[#1D2A62]">Before confirming readiness, ask three questions:</p>
                      <ol className="mt-3 space-y-3">
                        {[
                          { id: "source", number: "1.", question: "What is the latest reliable source?", answer: "Which source should be used to confirm this information?", tone: "border-[#B8D7EA]/70 bg-[#F0F7FC]" },
                          { id: "version", number: "2.", question: "Am I checking the latest confirmed version?", answer: "Has anything changed since this asset was created?", tone: "border-[#C9B9E6]/70 bg-[#F6F2FC]" },
                          { id: "match", number: "3.", question: "Does the critical information match?", answer: "Do names, photos, dates, roles, speaker details, and other participant-facing information match the latest reliable source?", tone: "border-[#F1C7A6]/70 bg-[#FFF5EC]" }
                        ].map(({ id, number, question, answer, tone }) => (
                          <li key={id}>
                            <button
                              type="button"
                              aria-pressed={selectedEvidenceQuestion === id}
                              onClick={() => setSelectedEvidenceQuestion(previous => previous === id ? null : id)}
                              className={`w-full rounded-xl border p-4 text-left transition ${
                                tone
                              } ${selectedEvidenceQuestion === id ? "ring-2 ring-[#1D2A62]/25" : "hover:-translate-y-0.5 hover:shadow-sm"}`}
                            >
                              <p className="text-sm font-bold text-[#1D2A62]">{number} {question}</p>
                              <p className="mt-1 text-sm leading-relaxed text-slate-600">{answer}</p>
                            </button>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {impactPriorityAllCorrect && (
                    <div className="rounded-2xl border border-[#87AECE]/35 bg-[#F0F7FC] p-5">
                      <div className="flex items-center gap-2 font-bold text-[#2F668B]">
                        <MagnifyingGlass weight="bold" className="h-5 w-5" />
                        Verification Challenge
                      </div>
                      <h3 className="mt-3 text-sm font-semibold text-[#1D2A62]">Can you spot what is not ready? Click all details that do not match the confirmed participant information.</h3>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="rounded-xl border border-[#87AECE]/55 bg-white p-4">
                          <h3 className="text-base font-bold text-[#1D2A62]">Latest confirmed participant list</h3>
                          <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                            <p><span className="font-bold text-[#1D2A62]">Name:</span> Nguyễn Minh Anh</p>
                            <p><span className="font-bold text-[#1D2A62]">Photo:</span> Photo A</p>
                            <p><span className="font-bold text-[#1D2A62]">Role:</span> Probationary Member</p>
                          </div>
                        </div>
                        <div className="rounded-xl border border-[#87AECE]/55 bg-[#F6F2FC] p-4">
                          <h3 className="text-base font-bold text-[#1D2A62]">Participant introduction slide</h3>
                          <div className="mt-3 space-y-2">
                            {[
                              { id: "name", label: "Name", value: "Nguyễn Anh Minh" },
                              { id: "photo", label: "Photo", value: "Photo B" },
                              { id: "role", label: "Role", value: "Probationary Member" }
                            ].map(({ id, label, value }) => {
                              const isSelected = verificationMismatchAnswers.includes(id)
                              const isCorrectOption = id === "name" || id === "photo"
                              return (
                                <button
                                  key={id}
                                  type="button"
                                  disabled={verificationChallengeSubmitted}
                                  aria-pressed={isSelected}
                                  onClick={() => handleVerificationMismatchToggle(id)}
                                  className={`flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left text-sm transition ${
                                    verificationChallengeSubmitted
                                      ? isCorrectOption
                                        ? "border-[#70A64B] bg-[#EEF7E8]"
                                        : isSelected
                                          ? "border-[#D66B5D] bg-[#FFF1EF]"
                                          : "border-slate-200 bg-white"
                                      : isSelected
                                        ? "border-[#1D2A62] bg-white ring-1 ring-[#1D2A62]"
                                        : "border-white/80 bg-white hover:border-[#87AECE] hover:shadow-sm"
                                  }`}
                                >
                                  <span><span className="font-bold text-[#1D2A62]">{label}:</span> {value}</span>
                                  {verificationChallengeSubmitted && (
                                    isCorrectOption
                                      ? <CheckCircle weight="fill" className="h-4 w-4 shrink-0 text-[#437118]" />
                                      : isSelected
                                        ? <XCircle weight="fill" className="h-4 w-4 shrink-0 text-[#B7473C]" />
                                        : null
                                  )}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      <div className={`mt-4 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-start sm:justify-between ${
                        verificationChallengeSubmitted
                          ? verificationChallengeAllCorrect ? "border-[#AFD06E]/50 bg-white" : "border-[#F3C979]/60 bg-white"
                          : "border-slate-200 bg-white"
                      }`}>
                        {verificationChallengeSubmitted && (
                          <div className="min-w-0 flex-1">
                            {verificationChallengeAllCorrect ? (
                              <>
                                <p className="font-bold text-[#437118]">GOOD CATCH.</p>
                                <p className="mt-1 text-sm leading-relaxed text-slate-600">The name and photo on the slide do not match the confirmed participant information.</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">Because these details will be shown directly to participants, the mismatch needs to be resolved before the event is signed off as ready.</p>
                              </>
                            ) : verificationChallengePartiallyCorrect ? (
                              <>
                                <p className="font-bold text-[#8B5E00]">Not enough.</p>
                                <p className="mt-1 text-sm leading-relaxed text-slate-600">Select the name and photo on the slide. The role matches the confirmed participant information.</p>
                              </>
                            ) : (
                              <>
                                <p className="font-bold text-[#8B5E00]">Check the mismatched details.</p>
                                <p className="mt-1 text-sm leading-relaxed text-slate-600">Select the name and photo on the slide. The role matches the confirmed participant information.</p>
                              </>
                            )}
                          </div>
                        )}
                        <div className="flex shrink-0 justify-end gap-2">
                          {verificationChallengeSubmitted && !verificationChallengeAllCorrect && (
                            <Button type="button" variant="outline" onClick={handleVerificationChallengeTryAgain} className="cursor-pointer border-[#D8B457] bg-white/70 text-[#8B5E00] hover:bg-white">
                              Try Again
                            </Button>
                          )}
                          <Button type="button" onClick={handleVerificationChallengeSubmit} disabled={verificationMismatchAnswers.length === 0 || verificationChallengeSubmitted} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a] sm:min-w-28">
                            Submit
                          </Button>
                        </div>
                      </div>
                  {verificationChallengeAllCorrect && (
                    <div className="mt-4">
                      <h3 className="text-center text-base leading-relaxed text-[#1D2A62]"><span className="font-bold">What should you use to verify the correction?</span></h3>
                      <div className="mt-4 space-y-2">
                        {[
                          { value: "A", label: "The slide, because it was completed first" },
                          { value: "B", label: "The MC’s memory" },
                          { value: "C", label: "The latest confirmed participant list" },
                          { value: "D", label: "The message saying “done”" }
                        ].map(({ value, label }) => {
                          const isSelected = verificationSourceAnswer === value
                          const isCorrectOption = value === "C"
                          return (
                            <button
                              key={value}
                              type="button"
                              disabled={verificationSourceSubmitted}
                              aria-pressed={isSelected}
                              onClick={() => {
                                setVerificationSourceAnswer(value)
                                setVerificationSourceSubmitted(true)
                              }}
                              className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition ${
                                verificationSourceSubmitted
                                  ? verificationSourceAllCorrect && isCorrectOption
                                    ? "border-[#70A64B] bg-[#EEF7E8]"
                                    : isSelected
                                      ? "border-[#D66B5D] bg-[#FFF1EF]"
                                      : "border-slate-200 bg-white"
                                  : isSelected
                                    ? "border-[#1D2A62] bg-[#EAF4FA] ring-1 ring-[#1D2A62]"
                                    : "border-slate-200 bg-white hover:bg-slate-50"
                              }`}
                            >
                              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${verificationSourceSubmitted && verificationSourceAllCorrect && isCorrectOption ? "bg-[#437118] text-white" : isSelected ? "bg-[#1D2A62] text-white" : "bg-[#EAF4FA] text-[#1D4B85]"}`}>{value}</span>
                              <span className="text-slate-700">{label}</span>
                            </button>
                          )
                        })}
                      </div>
                      {verificationSourceSubmitted && (
                        <div className={`mt-4 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-start sm:justify-between ${verificationSourceAllCorrect ? "border-[#AFD06E]/50 bg-white" : "border-[#F3C979]/60 bg-white"}`}>
                          <div className="min-w-0 flex-1">
                            {verificationSourceAllCorrect ? (
                              <>
                                <p className="font-bold text-[#437118]">CORRECT.</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">In this scenario, the latest confirmed participant list is the approved source of truth.</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">The slide should therefore be corrected to match that source — not memory, an older file, or the fact that someone has already marked the task as done.</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">For other event information, use the latest approved source for that specific item.</p>
                              </>
                            ) : (
                              <>
                                <p className="font-bold text-[#8B5E00]">Not quite.</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">Review the information and choose the source that is confirmed and most current.</p>
                              </>
                            )}
                          </div>
                          {verificationSourceSubmitted && !verificationSourceAllCorrect && (
                            <div className="flex shrink-0 justify-end">
                              <Button type="button" variant="outline" onClick={handleVerificationSourceTryAgain} className="cursor-pointer border-[#D8B457] bg-white/70 text-[#8B5E00] hover:bg-white">
                                Try Again
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                    </div>
                  )}
                  {evidenceVerificationComplete && (
                    <div className="rounded-2xl bg-gradient-to-br from-[#F0F7FC] via-white to-[#EEF7E8] p-5">
                      <div className="flex items-center gap-2 font-bold text-[#437118]">
                        <Lightbulb weight="fill" className="h-5 w-5" />
                        EVIDENCE RULE
                      </div>
                      <p className="mt-3 text-lg font-bold leading-relaxed text-[#1D2A62]">Ask: “What was it checked against?”</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">Don’t ask only: “Is it done?”</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">For participant-critical information, readiness requires evidence that the information is current and accurate.</p>
                    </div>
                  )}
                  {evidenceVerificationComplete && (
                    <>
                      <div className="rounded-2xl border border-[#87AECE]/35 bg-white p-5" onMouseEnter={handleConnectionDiagramHover} onFocus={handleConnectionDiagramHover}>
                      <div className="flex items-center gap-2 font-bold text-[#8B5E00]">
                        <ShieldCheck weight="fill" className="h-5 w-5" />
                        C. CONNECTION
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-[#1D2A62]">Does it work together?</h3>
                      <p className="mt-3 text-base leading-relaxed text-slate-600">A component can be correct on its own and still fail when the event comes together. Once the critical information has been verified, the next question is: <span className="font-semibold text-[#1D2A62]">Do the connected elements still work together in the way participants will actually experience them?</span></p>

                      <div className="mt-5 space-y-2">
                        <button
                          type="button"
                          aria-pressed={connectionSourceClicked}
                          onClick={() => handleConnectionNodeClick("source")}
                          className={`mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-xl border p-3 text-center text-sm font-semibold text-[#1D2A62] transition ${
                            connectionSourceClicked ? "border-[#2F668B] bg-[#EAF4FA] ring-2 ring-[#2F668B]/20" : "border-[#B8D7EA]/70 bg-[#F0F7FC] hover:-translate-y-0.5 hover:shadow-sm"
                          }`}
                        >
                          <UsersThree weight="fill" className="h-5 w-5 text-[#2F668B]" />
                          Latest confirmed participant information
                        </button>

                        {connectionSourceClicked && (
                          <>
                            <div className="grid grid-cols-2 gap-3 py-1 text-center text-xl font-bold text-[#2F668B]">
                              <span className="relative left-6 animate-bounce">↓</span>
                              <span className="relative -left-6 animate-bounce">↓</span>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                              <button
                                type="button"
                                aria-pressed={connectionDiagramNodes.includes("mc-script")}
                                onClick={() => handleConnectionNodeClick("mc-script")}
                                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-center text-sm font-semibold text-[#1D2A62] transition ${
                                  connectionDiagramNodes.includes("mc-script") ? "border-[#70A64B] bg-[#EEF7E8] ring-2 ring-[#70A64B]/20" : "border-[#AFD06E]/70 bg-[#F2FAED] hover:-translate-y-0.5 hover:shadow-sm"
                                }`}
                              >
                                <Microphone weight="fill" className="h-5 w-5 text-[#437118]" />
                                Final MC script
                              </button>
                              <button
                                type="button"
                                aria-pressed={connectionDiagramNodes.includes("slides")}
                                onClick={() => handleConnectionNodeClick("slides")}
                                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-center text-sm font-semibold text-[#1D2A62] transition ${
                                  connectionDiagramNodes.includes("slides") ? "border-[#D8B457] bg-[#FFF7E5] ring-2 ring-[#D8B457]/20" : "border-[#F3C979]/70 bg-[#FFF9ED] hover:-translate-y-0.5 hover:shadow-sm"
                                }`}
                              >
                                <Presentation weight="fill" className="h-5 w-5 text-[#8B5E00]" />
                                Final slides
                              </button>
                            </div>
                          </>
                        )}

                        {connectionBranchesClicked && (
                          <>
                            <div className="grid grid-cols-2 gap-3 py-1 text-center text-xl font-bold text-[#2F668B]">
                              <span className="relative left-6 animate-bounce">↓</span>
                              <span className="relative -left-6 animate-bounce">↓</span>
                            </div>
                            <button
                              type="button"
                              aria-pressed={connectionSyncCheckClicked}
                              onClick={() => handleConnectionNodeClick("sync-check")}
                              className={`mx-auto flex w-full max-w-sm flex-col items-center justify-center rounded-xl border p-3 text-center transition ${
                                connectionSyncCheckClicked ? "border-[#2F668B] bg-[#EAF4FA] ring-2 ring-[#2F668B]/20" : "border-[#87AECE]/70 bg-[#F0F7FC] hover:-translate-y-0.5 hover:shadow-sm"
                              }`}
                            >
                              <span className="flex items-center gap-2 text-sm font-bold text-[#1D2A62]">
                                <Gear weight="fill" className="h-5 w-5 text-[#2F668B]" />
                                SYNC CHECK
                              </span>
                              <span className="mt-2 grid w-full max-w-md grid-cols-2 gap-1.5 sm:grid-cols-4">
                                {["Same person", "Same order", "Same version", "Right timing"].map(label => (
                                  <span key={label} className="rounded-full bg-white/75 px-2 py-1 text-[10px] font-semibold text-[#2F668B]">{label}</span>
                                ))}
                              </span>
                            </button>
                          </>
                        )}

                        {connectionSyncCheckClicked && (
                          <>
                            <div className="flex justify-center py-1 text-xl font-bold text-[#2F668B]">
                              <span className="animate-bounce">↓</span>
                            </div>
                            <button
                              type="button"
                              aria-pressed={connectionSequenceClicked}
                              onClick={() => handleConnectionNodeClick("sequence")}
                              className={`mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-xl border p-3 text-center text-sm font-semibold text-[#1D2A62] transition ${
                                connectionSequenceClicked ? "border-[#9D83C7] bg-[#F6F2FC] ring-2 ring-[#9D83C7]/20" : "border-[#C9B9E6]/70 bg-[#F8F5FD] hover:-translate-y-0.5 hover:shadow-sm"
                              }`}
                            >
                              <ListNumbers weight="fill" className="h-5 w-5 text-[#9D83C7]" />
                              Participant-introduction sequence
                            </button>
                          </>
                        )}

                        {connectionSequenceClicked && (
                          <>
                            <div className="flex justify-center py-1 text-xl font-bold text-[#2F668B]">
                              <span className="animate-bounce">↓</span>
                            </div>
                            <button
                              type="button"
                              aria-pressed={connectionLiveClicked}
                              onClick={() => handleConnectionNodeClick("live")}
                              className={`mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-xl border p-3 text-center text-sm font-semibold text-[#1D2A62] transition ${
                                connectionLiveClicked ? "border-[#D88D5F] bg-[#FFF5EC] ring-2 ring-[#D88D5F]/20" : "border-[#F1C7A6]/70 bg-[#FFF8F2] hover:-translate-y-0.5 hover:shadow-sm"
                              }`}
                            >
                              <UsersThree weight="fill" className="h-5 w-5 text-[#D88D5F]" />
                              Live participant experience
                            </button>
                          </>
                        )}
                      </div>

                      {connectionCoreVisible && (
                        <>
                          <div className="mt-2 flex justify-center text-xl font-bold text-[#2F668B]">
                            <span className="animate-bounce">↓</span>
                          </div>
                          <div className="mx-auto mt-2 w-full max-w-full rounded-2xl border border-[#AFD06E]/45 bg-[#EEF7E8] p-5">
                            <p className="text-center text-base italic leading-relaxed text-[#1D2A62]">Each file may be correct on its own. But participants experience the <span className="font-bold text-[#437118]">whole sequence</span> — the script, visuals, timing, information, and hand-offs working together.</p>
                      {connectionCoreVisible && (
                        <>
                          <div className="mt-5">
                            <p className="text-center text-sm font-semibold tracking-wide text-[#437118]">From Separate Checks to Real Readiness</p>
                            <h3 className="mt-2 text-center text-xl font-bold text-[#437118]">COMPONENT CHECK VS. INTEGRATED READINESS TEST</h3>
                            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
                              <div className="h-full rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="flex items-start gap-3">
                                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0F7FC] text-[#6F7591]">
                                    <FileText weight="fill" className="h-6 w-6" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">COMPONENT CHECK</p>
                                    <p className="mt-1 text-lg font-bold leading-snug text-[#1D2A62]">MC reads the final script alone</p>
                                  </div>
                                </div>
                                <div className="mt-6 rounded-xl bg-slate-50 p-4">
                                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">THIS CONFIRMS</p>
                                  <p className="mt-2 flex items-start gap-2 text-base font-semibold leading-relaxed text-[#1D2A62]">
                                    <Check weight="bold" className="mt-1 h-4 w-4 shrink-0 text-[#437118]" />
                                    <span>The script can be read.</span>
                                  </p>
                                </div>
                                <p className="mt-5 font-bold text-[#1D2A62]">But it does not confirm:</p>
                                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                                  <li className="flex items-start gap-2"><XCircle weight="regular" className="mt-1 h-4 w-4 shrink-0 text-slate-400" /><span>The correct slide appears at the right moment.</span></li>
                                  <li className="flex items-start gap-2"><XCircle weight="regular" className="mt-1 h-4 w-4 shrink-0 text-slate-400" /><span>Participant information stays aligned.</span></li>
                                  <li className="flex items-start gap-2"><XCircle weight="regular" className="mt-1 h-4 w-4 shrink-0 text-slate-400" /><span>All materials use the same version.</span></li>
                                  <li className="flex items-start gap-2"><XCircle weight="regular" className="mt-1 h-4 w-4 shrink-0 text-slate-400" /><span>The live hand-off actually works.</span></li>
                                </ul>
                              </div>
                              <div className="flex h-10 w-10 items-center justify-center self-center justify-self-center rounded-full border border-slate-200 bg-white text-slate-500 lg:h-12 lg:w-12">
                                <ArrowRight weight="bold" className="h-4 w-4 rotate-90 lg:rotate-0" />
                              </div>
                              <div className="h-full rounded-2xl border-2 border-[#4B8AE8] bg-white p-5">
                                <div className="flex items-start gap-3">
                                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0F7FC] text-[#4B8AE8]">
                                    <LinkSimple weight="bold" className="h-6 w-6" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold uppercase tracking-wide text-[#4B8AE8]">INTEGRATED READINESS TEST</p>
                                    <p className="mt-1 text-lg font-bold leading-snug text-[#1D2A62]">Run the actual introduction sequence</p>
                                  </div>
                                </div>
                                <div className="mt-6 grid grid-cols-2 gap-2 text-center text-sm text-slate-600">
                                  {["Latest list", "Final script", "Final slides", "Actual order"].map(item => (
                                    <div key={item} className="rounded-lg bg-slate-50 px-3 py-2">{item}</div>
                                  ))}
                                </div>
                                <p className="mt-5 font-bold text-[#1D2A62]">This checks whether:</p>
                                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                                  <li className="flex items-start gap-2"><Check weight="bold" className="mt-1 h-4 w-4 shrink-0 text-[#4B8AE8]" /><span>The right information and visual appear together.</span></li>
                                  <li className="flex items-start gap-2"><Check weight="bold" className="mt-1 h-4 w-4 shrink-0 text-[#4B8AE8]" /><span>The sequence and timing stay aligned.</span></li>
                                  <li className="flex items-start gap-2"><Check weight="bold" className="mt-1 h-4 w-4 shrink-0 text-[#4B8AE8]" /><span>All components use the same final version.</span></li>
                                  <li className="flex items-start gap-2"><Check weight="bold" className="mt-1 h-4 w-4 shrink-0 text-[#4B8AE8]" /><span>The participant-facing flow works as intended.</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <p className="mt-4 text-sm italic leading-relaxed text-[#1D2A62]"><span className="font-bold">Key difference:</span> A component check proves one part works. An integrated readiness test proves the connection works.</p>
                        </>
                      )}
                          </div>
                        </>
                      )}
                  </div>
                      {connectionCoreVisible && (
                        <div className="mt-5 rounded-2xl border border-[#87AECE]/35 bg-[#EAF4FA] p-5">
                          <div className="flex items-center gap-2 font-bold text-[#2F668B]">
                            <MagnifyingGlass weight="bold" className="h-5 w-5" />
                            Connection Challenge
                          </div>
                          <h3 className="mt-3 text-sm font-semibold text-[#1D2A62]">Every participant detail is correct. But is the sequence ready? Click where the connection breaks.</h3>
                          <div className="mt-4 grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border border-[#D8B457]/55 bg-[#FFFDF5] p-4 text-center">
                              <h3 className="text-sm font-bold text-[#1D2A62]">Latest confirmed participant list</h3>
                              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                                <li>Nguyễn Minh Anh</li>
                                <li>Trần Gia Hân</li>
                                <li>Lê Hoàng Nam</li>
                              </ul>
                            </div>
                            <div className="rounded-xl border border-[#D8B457]/55 bg-[#FFFDF5] p-4 text-center">
                              <h3 className="text-sm font-bold text-[#1D2A62]">Final MC script</h3>
                              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                                <li>Nguyễn Minh Anh</li>
                                <li>Trần Gia Hân</li>
                                <li>Lê Hoàng Nam</li>
                              </ul>
                            </div>
                            <div className={`rounded-xl border p-4 text-center transition ${
                              connectionChallengeAllCorrect ? "border-[#D8B457] bg-[#FFF7E5] ring-2 ring-[#D8B457]/20" : "border-[#D8B457]/70 bg-[#FFFDF5]"
                            }`}>
                              <h3 className="text-sm font-bold text-[#1D2A62]">Final slide sequence</h3>
                              <ul className="mt-3 space-y-2">
                                {connectionSlideOrder.map(participant => (
                                  <li key={participant}>
                                    <button
                                      type="button"
                                      disabled={connectionChallengeAllCorrect}
                                      onClick={() => handleConnectionSlideNameClick(participant)}
                                      className="w-full rounded-lg px-2 py-1 text-center text-sm leading-relaxed text-slate-600 transition hover:bg-white/70 hover:text-[#1D2A62] active:scale-[0.98] disabled:cursor-default disabled:hover:bg-transparent"
                                    >
                                      {participant}
                                    </button>
                                  </li>
                                ))}
                              </ul>

                            </div>
                          </div>
                          {connectionChallengeSubmitted && (
                            <div className="mt-4 rounded-xl border border-[#AFD06E]/50 bg-white p-4">
                              <p className="font-bold text-[#437118]">GOOD CATCH.</p>
                              <p className="mt-1 text-sm leading-relaxed text-slate-600">Every participant detail is correct, but the MC script and slide sequence are not aligned.</p>
                              <p className="mt-2 text-sm leading-relaxed text-slate-600">A component check could miss this because neither file contains incorrect participant information. The problem only appears when the two components are used together.</p>
                            </div>
                          )}
                          {connectionChallengeAllCorrect && (
                            <div className="mt-4 rounded-xl bg-[#EAF4FA] p-4">
                              <h3 className="text-center text-base font-bold leading-relaxed text-[#1D2A62]">What would give you the strongest evidence that this connection has been fixed?</h3>
                              <div className="mt-4 space-y-2">
                                {[
                                  { value: "A", label: "The MC reads the final script again." },
                                  { value: "B", label: "The slides are checked separately one more time." },
                                  { value: "C", label: "The MC runs the complete participant-introduction sequence using the latest confirmed participant information, final script, final slides, and actual delivery order." }
                                ].map(({ value, label }) => {
                                  const isSelected = connectionIntegratedTestAnswer === value
                                  const isCorrectOption = value === "C"
                                  return (
                                    <button
                                      key={value}
                                      type="button"
                                      disabled={connectionIntegratedTestSubmitted}
                                      onClick={() => {
                                        setConnectionIntegratedTestAnswer(value)
                                        setConnectionIntegratedTestSubmitted(true)
                                      }}
                                      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition ${
                                        connectionIntegratedTestSubmitted
                                          ? connectionIntegratedTestAllCorrect && isCorrectOption
                                            ? "border-[#70A64B] bg-[#EEF7E8]"
                                            : isSelected
                                              ? "border-[#D66B5D] bg-[#FFF1EF]"
                                              : "border-slate-200 bg-white"
                                          : "border-slate-200 bg-white hover:bg-slate-50"
                                      }`}
                                    >
                                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                        connectionIntegratedTestSubmitted && connectionIntegratedTestAllCorrect && isCorrectOption
                                          ? "bg-[#437118] text-white"
                                          : connectionIntegratedTestSubmitted && isSelected
                                            ? "bg-[#B7473C] text-white"
                                            : "bg-[#EAF4FA] text-[#1D4B85]"
                                      }`}>{value}</span>
                                      <span className="text-slate-700">{label}</span>
                                    </button>
                                  )
                                })}
                              </div>
                              {connectionIntegratedTestSubmitted && (
                                <div className={`mt-4 border-l-4 p-4 ${
                                  connectionIntegratedTestAllCorrect ? "border-[#70A64B] bg-white" : "border-[#D8B457] bg-[#FFF8E8]"
                                }`}>
                                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0 flex-1">
                                      {connectionIntegratedTestAllCorrect ? (
                                        <>
                                          <p className="font-bold text-[#437118]">CORRECT.</p>
                                          <p className="mt-2 text-sm leading-relaxed text-slate-600">Because the problem exists between components, it must be tested between components.</p>
                                          <p className="mt-2 text-sm leading-relaxed text-slate-600">Running the actual participant-introduction sequence can reveal problems that separate checks may miss, such as:</p>
                                          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600">
                                            <li>the wrong slide appearing with the right name;</li>
                                            <li>mismatched participant order;</li>
                                            <li>timing problems;</li>
                                            <li>different versions being used at the same time.</li>
                                          </ul>
                                        </>
                                      ) : (
                                        <>
                                          <p className="font-bold text-[#8B5E00]">Not quite.</p>
                                          <p className="mt-2 text-sm leading-relaxed text-slate-600">Choose the rehearsal that tests the final script, final slides, latest participant information, and actual delivery order together.</p>
                                        </>
                                      )}
                                    </div>
                                    {!connectionIntegratedTestAllCorrect && (
                                      <div className="flex shrink-0 justify-end">
                                        <Button type="button" variant="outline" onClick={handleIntegratedTestTryAgain} className="cursor-pointer border-[#D8B457] bg-white/70 text-[#8B5E00] hover:bg-white">
                                          Try Again
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      {connectionComplete && (
                        <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#F0F7FC] via-white to-[#EEF7E8] p-5">
                          <div className="flex items-center gap-2 font-bold text-[#8B5E00]">
                            <Lightbulb weight="fill" className="h-5 w-5" />
                            CONNECTION RULE
                          </div>
                          <p className="mt-3 text-lg font-bold leading-relaxed text-[#1D2A62]">Test the critical hand-offs participants experience, not only the tasks teams complete.</p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">If the integrated test reveals a mismatch: Fix it → re-test the affected connection → then confirm readiness.</p>
                        </div>
                      )}
                  </>
                  )}
                </div>
              )}
              {activeLesson.id === "1.2-ready-simulation" && (
                <div className="space-y-5 text-sm leading-relaxed text-slate-700">
                  {simulationStarted ? (
                    simulationScene === -1 ? (
                      <div key="simulation-opening" className="animate-scene-reveal space-y-5" aria-live="polite">
                        <div className="rounded-2xl border border-[#87AECE]/35 bg-[#F0F7FC] p-5">
                          <div className="flex items-center gap-2 font-bold text-[#2F668B]">
                            <PlayCircle weight="fill" className="h-5 w-5" />
                            OPENING SCENE
                          </div>
                          <p className="mt-4 text-base font-semibold leading-relaxed text-[#1D2A62]">In the event final rehearsal, your team says the participant-introduction sequence is ready.</p>
                        </div>
                        {openingDecision === "A" && openingDecisionConfirmed ? (
                          <img src="/final-rehearsal-not-quite.webp?v=1" alt="The sequence is not quite ready because individual task completion does not confirm correct, current, connected information" className="mx-auto block w-[85%] rounded-2xl object-cover" />
                        ) : openingDecision === "A" ? (
                          <img src="/final-rehearsal-signoff.webp?v=1" alt="The team has completed its individual tasks while questioning whether the participant-introduction sequence is ready to sign off" className="mx-auto block w-[85%] rounded-2xl object-cover" />
                        ) : (
                          <img src="/final-rehearsal-opening.webp?v=4" alt="Vy, An, and Mai preparing an event rehearsal in a preparation room" className="mx-auto block w-[85%] rounded-2xl object-cover" />
                        )}
                        {openingDecision === null ? (
                          <div key="opening-decision" className="animate-scene-reveal rounded-2xl border border-[#87AECE]/35 bg-[#F0F7FC] p-5">
                            <p className="text-base font-semibold leading-relaxed text-[#1D2A62]">As the Project Leader, would you sign off this sequence as ready for live delivery based on what you know so far?</p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              <Button type="button" variant="outline" onClick={() => setOpeningDecision("A")} className="h-auto justify-start whitespace-normal border-[#87AECE]/60 bg-white p-4 text-left text-sm text-[#1D2A62] hover:bg-white">
                                A. Yes. Everyone has completed their part.
                              </Button>
                              <Button type="button" variant="outline" onClick={() => setOpeningDecision("B")} className="h-auto justify-start whitespace-normal border-[#87AECE]/60 bg-white p-4 text-left text-sm text-[#1D2A62] hover:bg-white">
                                B. Not yet. I need to see the critical elements work together in rehearsal.
                              </Button>
                            </div>
                          </div>
                        ) : openingDecision === "A" && openingDecisionConfirmed ? (
                          <div key="opening-a-confirmed" className="animate-scene-reveal rounded-2xl border border-[#D8B457]/60 bg-[#FFF9E9] p-5">
                            <div className="flex justify-end">
                              <Button type="button" variant="outline" onClick={() => { setOpeningDecisionConfirmed(false); setOpeningDecision(null) }} className="cursor-pointer border-[#D8B457]/70 text-[#8B5E00] hover:bg-white">
                                Review the decision
                              </Button>
                            </div>
                          </div>
                        ) : openingDecision === "A" ? (
                          <div key="opening-a-feedback" className="animate-scene-reveal rounded-2xl border border-[#D8B457]/60 bg-[#FFF9E9] p-5">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <p className="text-base font-semibold leading-relaxed text-[#1D2A62]">Are you sure?</p>
                              <div className="flex flex-wrap justify-end gap-3">
                                <Button type="button" onClick={() => setOpeningDecisionConfirmed(true)} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a]">
                                  Yes, sign it off
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setOpeningDecision(null)} className="cursor-pointer border-[#D8B457]/70 text-[#8B5E00] hover:bg-white">
                                  Take another look
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div key="opening-b-feedback" className="animate-scene-reveal rounded-2xl border border-[#AFD06E]/50 bg-[#EEF7E8] p-5">
                              <p className="text-lg font-bold text-[#437118]">Good call.</p>
                              <p className="mt-3 text-base leading-relaxed text-slate-700">Before signing off, focus on what matters most, what evidence confirms it is ready, and whether the critical elements work together as participants will experience them.</p>
                            </div>
                            <div className="flex justify-end">
                              <Button type="button" onClick={() => setSimulationScene(0)} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a]">
                                Let’s check the sequence
                                <ArrowRight className="ml-1.5 h-4 w-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div key={activeSimulationScene.id} className="animate-scene-reveal space-y-5" aria-live="polite">
                        <div className="rounded-2xl border border-[#87AECE]/35 bg-[#F0F7FC] p-5">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2 font-bold text-[#2F668B]">
                              <PlayCircle weight="fill" className="h-5 w-5" />
                              SIMULATION IN PROGRESS
                            </div>
                            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-wide text-[#2F668B] ring-1 ring-[#87AECE]/40">{activeSimulationScene.label}</span>
                          </div>
                          <h3 className="mt-3 text-xl font-bold text-[#1D2A62]">{activeSimulationScene.title}</h3>
                          <p className="mt-3 text-base leading-relaxed text-slate-600">{activeSimulationScene.description}</p>
                        </div>
                        <div className="rounded-2xl border border-[#87AECE]/35 bg-white p-5">
                          <p className="text-base font-semibold leading-relaxed text-[#1D2A62]">{activeSimulationScene.prompt}</p>
                          <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            {activeSimulationScene.items.map(([title, detail]) => (
                              <div key={title} className="rounded-xl border border-[#87AECE]/35 bg-[#F0F7FC] p-4">
                                <p className="font-bold text-[#1D2A62]">{title}</p>
                                <p className="mt-1 text-xs leading-relaxed text-slate-600">{detail}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                              {simulationScene >= 0 ? (
                                <Button type="button" variant="outline" onClick={() => setSimulationScene(previous => previous - 1)} className="cursor-pointer border-[#87AECE]/60 text-[#2F668B] hover:bg-[#F0F7FC]">
                                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                                  Previous scene
                                </Button>
                              ) : (
                                <span />
                              )}
                            </div>
                            {simulationScene < SIMULATION_SCENES.length - 1 ? (
                              <Button type="button" onClick={() => setSimulationScene(previous => previous + 1)} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a]">
                                Next scene
                                <ArrowRight className="ml-1.5 h-4 w-4" />
                              </Button>
                            ) : (
                              <span className="text-xs font-semibold text-[#437118]">Simulation complete</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="rounded-2xl border border-[#87AECE]/35 bg-[#F0F7FC] p-5">
                      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
                        <div>
                          <h3 className="bg-gradient-to-r from-[#386b24] via-[#437118] to-[#1D2A62] bg-clip-text text-lg font-bold text-transparent">THE FINAL REHEARSAL</h3>
                          <p className="mt-3 text-base leading-relaxed text-slate-600">You are the Project Leader for tomorrow’s Finance Club General Meeting. Your team says everything is Done.</p>
                          <p className="mt-3 text-base font-semibold leading-relaxed text-[#1D2A62]">But will everything work together when the event goes live?</p>
                          <p className="mt-5 text-base leading-relaxed text-slate-600">Use the <span className="font-bold text-[#1D2A62]">Event Ready Framework</span> throughout the final rehearsal to investigate what is happening, respond to readiness issues, and decide whether the event is ready to proceed.</p>
                          <div className="mt-4 flex justify-end">
                            <Button type="button" onClick={() => { setSimulationScene(-1); setSimulationStarted(true) }} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a]">
                              Start Simulation
                              <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <img src="/final-rehearsal.png?v=3" alt="Project team preparing for the final rehearsal" className="w-full rounded-xl object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeLesson.id === "2.0-quick-check" && (
                assessmentSubmitted ? (
                  assessmentReviewOpen ? (
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#437118]">REVIEW MY ANSWERS</p>
                        <h3 className="mt-2 text-2xl font-extrabold text-[#1D2A62]">Assessment feedback</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">Your submitted answers and the correct answer are shown below.</p>
                      </div>
                      <div className="space-y-4">
                        {READINESS_ASSESSMENT.map((question, index) => {
                          const selectedOption = question.options.find(option => option.id === assessmentAnswers[index])
                          const correctOption = question.options.find(option => option.id === question.correctOption)
                          const isCorrect = assessmentAnswers[index] === question.correctOption
                          return (
                            <div key={question.prompt} className={`rounded-2xl border p-5 ${index % 2 === 0 ? "border-[#87AECE]/45 bg-[#F0F7FC]" : "border-[#AFD06E]/50 bg-[#EEF7E8]"}`}>
                              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#437118]">Question {index + 1}</p>
                              <h4 className="mt-2 text-base font-bold leading-relaxed text-[#1D2A62]">{question.prompt}</h4>
                              <p className="mt-4 text-sm font-semibold text-slate-700">Your answer:</p>
                              <p className={`mt-1 text-sm leading-relaxed ${isCorrect ? "text-[#437118]" : "text-[#B44F3C]"}`}>
                                {selectedOption ? `${selectedOption.id}. ${selectedOption.text}` : "No answer"} {isCorrect ? "✓" : "✕"}
                              </p>
                              {!isCorrect && correctOption && (
                                <>
                                  <p className="mt-4 text-sm font-semibold text-slate-700">Best answer:</p>
                                  <p className="mt-1 text-sm leading-relaxed text-[#437118]">{correctOption.id}. {correctOption.text} ✓</p>
                                </>
                              )}
                              <p className="mt-4 text-sm font-semibold text-slate-700">Why?</p>
                              <p className="mt-1 text-sm leading-relaxed text-slate-600">{READINESS_CONCEPT_FEEDBACK[question.concept].explanation}</p>
                              <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[#1D2A62]">
                                {question.concept}{question.concept === "DONE vs READY" ? " — DONE ≠ automatically READY" : ` — ${READINESS_CONCEPT_FEEDBACK[question.concept].prompt}`}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                      <Button type="button" variant="outline" onClick={handleAssessmentBackToResult} className="cursor-pointer">
                        Back to Results
                      </Button>
                    </div>
                  ) : (
                    <div id="assessment-results" className="scroll-mt-6 space-y-7">
                      <div className="rounded-2xl border border-[#87AECE]/45 bg-[#F0F7FC] p-5">
                        <h3 className="text-3xl font-extrabold text-[#1D2A62]">YOUR RESULT</h3>
                        {assessmentScore === 5 ? (
                          <>
                            <p className="mt-5 text-xl font-extrabold text-[#437118]">5 / 5</p>
                            <p className="mt-1 text-lg font-bold text-[#1D2A62]">READY TO APPLY</p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-700">Great work.</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-700">You demonstrated a strong understanding of the Event Ready approach and applied it correctly across different event situations.</p>
                          </>
                        ) : assessmentScore === 4 ? (
                          <>
                            <p className="mt-5 text-xl font-extrabold text-[#A66C00]">4 / 5</p>
                            <p className="mt-1 text-lg font-bold text-[#1D2A62]">ALMOST READY</p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-700">You understand the overall Event Ready approach and applied most of the readiness checks correctly.</p>
                          </>
                        ) : assessmentScore === 3 ? (
                          <>
                            <p className="mt-5 text-xl font-extrabold text-[#A66C00]">3 / 5</p>
                            <p className="mt-1 text-lg font-bold text-[#1D2A62]">BUILDING READINESS</p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-700">You’ve understood the core idea, but some readiness decisions still need practice.</p>
                          </>
                        ) : (
                          <>
                            <p className="mt-5 text-xl font-extrabold text-[#B44F3C]">{assessmentScore} / 5</p>
                            <p className="mt-1 text-lg font-bold text-[#1D2A62]">REVIEW BEFORE APPLYING</p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-700">You’re beginning to recognise the Event Ready approach, but some important readiness checks are not yet consistent.</p>
                          </>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-lg font-extrabold text-[#1D2A62]">Your assessment</h4>
                        {assessmentScore === 5 ? (
                          <>
                            <p className="text-sm leading-relaxed text-slate-700">You can distinguish Done from Ready, prioritise issues by Impact, identify appropriate Evidence, and recognise when critical Connections need to be tested together.</p>
                            <p className="text-sm leading-relaxed text-slate-700">You are ready to take this thinking into real event preparation.</p>
                          </>
                        ) : assessmentScore === 4 ? (
                          <p className="text-sm leading-relaxed text-slate-700">You can make sound readiness decisions in most situations. One area would benefit from another quick review before you apply the framework independently.</p>
                        ) : assessmentScore === 3 ? (
                          <>
                            <p className="text-sm leading-relaxed text-slate-700">You can recognise some signs of readiness, but you may still rely on task completion or individual checks when stronger evidence is needed.</p>
                            <p className="text-sm leading-relaxed text-slate-700">Before using the framework independently, review the areas below.</p>
                          </>
                        ) : (
                          <p className="text-sm leading-relaxed text-slate-700">Before using the framework to make a live readiness decision, revisit the key difference between finishing a task and having enough evidence to call it Ready.</p>
                        )}
                      </div>

                      {assessmentScore === 5 && (
                        <div className="space-y-3 rounded-2xl border border-[#AFD06E]/50 bg-[#EEF7E8] p-5">
                          <h4 className="text-lg font-extrabold text-[#1D2A62]">Your Ready Check</h4>
                          {READINESS_ASSESSMENT.map(question => (
                            <div key={question.concept} className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-700">
                              <span>{question.concept}</span>
                              <span className="text-[#437118]">✓ Strong</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {assessmentScore === 4 && (
                        <div className="space-y-3 rounded-2xl border border-[#F3C979]/60 bg-[#FFF7E5] p-5">
                          <h4 className="text-lg font-extrabold text-[#1D2A62]">Breakdown</h4>
                          {READINESS_ASSESSMENT.map((question, index) => {
                            const isCorrect = assessmentAnswers[index] === question.correctOption
                            return (
                              <div key={question.concept} className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-700">
                                <span>{question.concept}</span>
                                <span className={isCorrect ? "text-[#437118]" : "text-[#A66C00]"}>{isCorrect ? "✓" : "↻ Review"}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {assessmentScore === 4 && assessmentMissedConcepts[0] && (
                        <div className="rounded-2xl border border-[#F3C979]/60 bg-[#FFF7E5] p-5">
                          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#A66C00]">Review next: {assessmentMissedConcepts[0]}</p>
                          <p className="mt-3 text-base font-bold text-[#1D2A62]">{READINESS_CONCEPT_FEEDBACK[assessmentMissedConcepts[0]].prompt}</p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700">{READINESS_CONCEPT_FEEDBACK[assessmentMissedConcepts[0]].explanation}</p>
                        </div>
                      )}

                      {assessmentScore === 3 && (
                        <div className="space-y-3">
                          {assessmentMissedConcepts.map(concept => (
                            <div key={concept} className="rounded-2xl border border-[#F3C979]/60 bg-[#FFF7E5] p-5">
                              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#A66C00]">Review: {concept}</p>
                              <p className="mt-3 text-base font-bold text-[#1D2A62]">{READINESS_CONCEPT_FEEDBACK[concept].prompt}</p>
                              <p className="mt-2 text-sm leading-relaxed text-slate-700">{READINESS_CONCEPT_FEEDBACK[concept].explanation}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {assessmentScore <= 2 && (
                        <div className="space-y-3">
                          <h4 className="text-lg font-extrabold text-[#1D2A62]">Start with the areas you missed</h4>
                          {assessmentMissedConcepts.map(concept => (
                            <div key={concept} className="rounded-2xl border border-[#E7A27A]/60 bg-[#FFF4EA] p-5">
                              <p className="text-base font-extrabold text-[#1D2A62]">{concept}</p>
                              <p className="mt-2 text-sm font-semibold text-slate-700">{READINESS_CONCEPT_FEEDBACK[concept].prompt}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {assessmentScore === 5 && (
                        <div className="space-y-3 rounded-2xl border border-[#87AECE]/35 bg-[#F0F7FC] p-5">
                          <h4 className="text-lg font-extrabold text-[#1D2A62]">Keep these three questions with you</h4>
                          <p className="text-sm font-bold text-[#437118]">IMPACT</p>
                          <p className="text-sm text-slate-700">What matters most?</p>
                          <p className="text-sm font-bold text-[#437118]">EVIDENCE</p>
                          <p className="text-sm text-slate-700">What proves it?</p>
                          <p className="text-sm font-bold text-[#437118]">CONNECTION</p>
                          <p className="text-sm text-slate-700">Does it work together?</p>
                        </div>
                      )}

                      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                        {(assessmentScore >= 4) ? (
                          <Button type="button" onClick={() => navigateToLesson("3.0-event-check")} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a]">
                            Continue to module 3.1
                            <ArrowRight className="ml-1.5 h-4 w-4" />
                          </Button>
                        ) : (
                          <Button type="button" onClick={() => navigateToLesson("1.1-ready-framework")} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a]">
                            {assessmentScore === 3 ? "Review the Event Ready Framework" : "Review the Event Ready Framework"}
                            <ArrowRight className="ml-1.5 h-4 w-4" />
                          </Button>
                        )}
                        <Button type="button" variant="outline" onClick={handleAssessmentReview} className="cursor-pointer">
                          Review My Answers
                        </Button>
                        <button type="button" onClick={handleAssessmentRetake} className="cursor-pointer text-sm font-semibold text-[#2F668B] underline-offset-2 hover:underline">
                          Retake Assessment
                        </button>
                    </div>
                      </div>
                  )
                ) : (
                  <div className="space-y-5">
                    <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                      <p>You’ve learned the Event Ready Framework and applied it during a final rehearsal. Now see whether you can use the same thinking in different event situations.</p>
                      <p>For each question, choose the best answer. You’ll receive your result and assessment feedback after completing all five.</p>
                    </div>
                    <div className="space-y-5">
                      {READINESS_ASSESSMENT.map((question, index) => (
                        <div key={question.prompt} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                          <div className="flex items-start justify-between gap-3">
                            <p className="min-w-0 flex-1 text-base font-bold leading-relaxed text-[#1D2A62]">{question.prompt}</p>
                            <span aria-hidden="true" className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#437118] ring-1 ring-[#AFD06E]/60">QUESTION {index + 1} OF {READINESS_ASSESSMENT.length}</span>
                          </div>
                          <div className="mt-4 space-y-2">
                            {question.options.map(option => {
                              const selected = assessmentAnswers[index] === option.id
                              return (
                                <button
                                  key={option.id}
                                  type="button"
                                  onClick={() => handleAssessmentAnswer(index, option.id)}
                                  className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors cursor-pointer ${selected ? "border-[#437118] bg-[#EEF7E8] text-[#1D2A62] ring-1 ring-[#437118]" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
                                >
                                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${selected ? "border-[#437118] bg-[#437118] text-white" : "border-slate-300"}`}>{selected ? <Check className="h-3.5 w-3.5" /> : option.id}</span>
                                  <span>{option.text}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}


              {activeLesson.id === "3.0-event-check" && (
                <div className="space-y-7 text-sm leading-relaxed text-slate-700">
                  <div className="space-y-6 rounded-2xl border border-[#87AECE]/40 bg-gradient-to-br from-[#F0F7FC] via-white to-[#EEF7E8] p-5 sm:p-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-extrabold text-[#1D2A62]">What should you take away?</h3>
                    <p className="text-[1.1em] font-normal text-[#437118]">Event readiness is not about checking more things. It is about making better readiness decisions before the event goes live.</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-center text-lg font-extrabold uppercase text-[#1D2A62]">Three shifts to take into your next event</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl border border-[#AFD06E]/50 bg-[#EEF7E8] p-5">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-[#437118] ring-1 ring-black/5">
                          <CheckCircle weight="fill" className="h-5 w-5" />
                        </div>
                        <p className="text-base font-extrabold text-[#437118]">From Done → Ready</p>
                        <p className="mt-3">Don’t stop at completion. Look for evidence that the live outcome can be trusted.</p>
                      </div>
                      <div className="rounded-2xl border border-[#87AECE]/45 bg-[#F0F7FC] p-5">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-[#2F668B] ring-1 ring-black/5">
                          <LinkSimple weight="bold" className="h-5 w-5" />
                        </div>
                        <p className="text-base font-extrabold text-[#2F668B]">From checking parts → testing the experience</p>
                        <p className="mt-3">Test how critical elements work together, not only whether each one works alone.</p>
                      </div>
                      <div className="rounded-2xl border border-[#F3C979]/60 bg-[#FFF7E5] p-5">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-[#A66C00] ring-1 ring-black/5">
                          <ShieldCheck weight="fill" className="h-5 w-5" />
                        </div>
                        <p className="text-base font-extrabold text-[#A66C00]">From finding problems → resolving them before delivery</p>
                        <p className="mt-3">Use rehearsal to find, fix and re-test issues before they reach participants.</p>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div id="event-readiness-checklist" className="space-y-5 rounded-2xl border border-[#AFD06E]/50 bg-gradient-to-br from-[#EEF7E8] via-white to-[#F0F7FC] p-5">
                    <h4 className="text-center text-lg font-extrabold uppercase text-[#1D2A62]">YOUR TOOLS</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-[#87AECE]/45 bg-[#F0F7FC] p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#2F668B] ring-1 ring-[#87AECE]/40">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-[#1D2A62]">Event Readiness Checklist</h5>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">Your take-away tool for final rehearsal and sign-off.</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          <button type="button" onClick={handleChecklistOpen} aria-expanded={checklistOpen} className="inline-flex h-10 items-center justify-center rounded-lg border border-[#2F668B] bg-white px-4 py-2 text-sm font-medium text-[#2F668B] shadow-sm transition-colors hover:bg-[#F0F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F668B] focus-visible:ring-offset-2">Open Checklist</button>
                          <Button type="button" onClick={handleChecklistDownloadPdf} disabled={!checklistHasContent} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a] disabled:cursor-not-allowed disabled:opacity-50">Download PDF</Button>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-[#AFD06E]/45 bg-white p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF7E8] text-[#437118] ring-1 ring-[#AFD06E]/40">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-[#1D2A62]">Supporting Event Tools</h5>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">Event Planning Checklist · Risk Management · Task Allocation Board</p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                          <a href="https://rmiteduau-my.sharepoint.com/:f:/g/personal/s4063545_rmit_edu_vn/IgDxRh5pupKaRL_0n7tpIJmwAd17HHL2UKdpAGAvvEenSkg?e=Y4ZQ76" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#386B24] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#274818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386B24] focus-visible:ring-offset-2">
                            Open Event Toolkit
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {checklistOpen && (
                      <>
                    <div id="event-readiness-checklist-form" className="border-t border-[#AFD06E]/50 pt-5">
                      <p className="text-sm font-semibold text-[#1D2A62]">Complete the checklist below.</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        ["eventSequence", "Event / Sequence:", "Enter event or sequence"],
                        ["projectLeader", "Project Leader:", "Enter project leader"],
                        ["date", "Date:", ""]
                      ].map(([field, label, placeholder]) => (
                        <label key={field} className="space-y-1.5 text-xs font-bold text-[#1D2A62]">
                          <span>{label}</span>
                          <input type={field === "date" ? "date" : "text"} value={checklistFields[field] || ""} onChange={event => updateChecklistField(field, event.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-[#87AECE]/50 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#2F668B] focus:ring-2 focus:ring-[#87AECE]/30" />
                        </label>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl border border-[#87AECE]/40 bg-white p-4">
                        <h5 className="font-extrabold text-[#2F668B]">1. IMPACT</h5>
                        <label className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                          <input type="checkbox" checked={Boolean(checklistChecks.impact)} onChange={event => updateChecklistCheck("impact", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#2F668B]" />
                          <span>We have identified all elements most likely to affect participants or live delivery if they fail.</span>
                        </label>
                        <label className="mt-3 block text-xs font-bold text-[#1D2A62]">
                          <span>Critical element(s):</span>
                          <input type="text" value={checklistFields.criticalElements || ""} onChange={event => updateChecklistField("criticalElements", event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#87AECE]/50 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#2F668B] focus:ring-2 focus:ring-[#87AECE]/30" />
                        </label>
                      </div>

                      <div className="rounded-2xl border border-[#87AECE]/40 bg-[#F0F7FC] p-4">
                        <h5 className="font-extrabold text-[#2F668B]">2. EVIDENCE</h5>
                        <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                          <label className="flex items-start gap-2">
                            <input type="checkbox" checked={Boolean(checklistChecks.evidenceCurrent)} onChange={event => updateChecklistCheck("evidenceCurrent", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#2F668B]" />
                            <span>Critical information has been checked against the current, reliable source.</span>
                          </label>
                          <label className="flex items-start gap-2">
                            <input type="checkbox" checked={Boolean(checklistChecks.evidenceVersion)} onChange={event => updateChecklistCheck("evidenceVersion", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#2F668B]" />
                            <span>The team is working from the final/current version of critical materials.</span>
                          </label>
                        </div>
                        <label className="mt-3 block text-xs font-bold text-[#1D2A62]">
                          <span>Evidence/source checked:</span>
                          <input type="text" value={checklistFields.evidenceSource || ""} onChange={event => updateChecklistField("evidenceSource", event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#87AECE]/50 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#2F668B] focus:ring-2 focus:ring-[#87AECE]/30" />
                        </label>
                      </div>

                      <div className="rounded-2xl border border-[#B9A4E8]/60 bg-[#F6F2FF] p-4">
                        <h5 className="font-extrabold text-[#6B4C9A]">3. OWNERSHIP</h5>
                        <label className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                          <input type="checkbox" checked={Boolean(checklistChecks.ownership)} onChange={event => updateChecklistCheck("ownership", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#6B4C9A]" />
                          <span>Every unresolved critical issue has a clear owner and next action.</span>
                        </label>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <label className="block text-xs font-bold text-[#1D2A62]">
                            <span>Owner:</span>
                            <input type="text" value={checklistFields.owner || ""} onChange={event => updateChecklistField("owner", event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#B9A4E8]/60 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#6B4C9A] focus:ring-2 focus:ring-[#B9A4E8]/30" />
                          </label>
                          <label className="block text-xs font-bold text-[#1D2A62]">
                            <span>Next action:</span>
                            <input type="text" value={checklistFields.nextAction || ""} onChange={event => updateChecklistField("nextAction", event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#B9A4E8]/60 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#6B4C9A] focus:ring-2 focus:ring-[#B9A4E8]/30" />
                          </label>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#F3C979]/60 bg-[#FFF7E5] p-4">
                        <h5 className="font-extrabold text-[#A66C00]">4. CONNECTION</h5>
                        <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                          <label className="flex items-start gap-2">
                            <input type="checkbox" checked={Boolean(checklistChecks.connectionEndToEnd)} onChange={event => updateChecklistCheck("connectionEndToEnd", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#A66C00]" />
                            <span>Critical handoffs have been tested end-to-end using final materials.</span>
                          </label>
                          <label className="flex items-start gap-2">
                            <input type="checkbox" checked={Boolean(checklistChecks.connectionSetup)} onChange={event => updateChecklistCheck("connectionSetup", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#A66C00]" />
                            <span>Where relevant, the sequence has been tested in the actual event setup or conditions.</span>
                          </label>
                        </div>
                        <label className="mt-3 block text-xs font-bold text-[#1D2A62]">
                          <span>What was tested:</span>
                          <textarea value={checklistFields.whatWasTested || ""} onChange={event => updateChecklistField("whatWasTested", event.target.value)} className="mt-1.5 min-h-20 w-full rounded-lg border border-[#F3C979]/60 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#A66C00] focus:ring-2 focus:ring-[#F3C979]/30" />
                        </label>
                      </div>

                      <div className="rounded-2xl border border-[#E7A27A]/60 bg-[#FFF4EA] p-4">
                        <h5 className="font-extrabold text-[#B45F3C]">5. SUPPORT</h5>
                        <label className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                          <input type="checkbox" checked={Boolean(checklistChecks.support)} onChange={event => updateChecklistCheck("support", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#B45F3C]" />
                          <span>No high-impact issue remains unresolved without a clear decision or escalation.</span>
                        </label>
                        <p className="mt-3 text-xs font-bold text-[#1D2A62]">If support is needed:</p>
                        <div className="mt-2 grid gap-3 sm:grid-cols-2">
                          <label className="block text-xs font-bold text-[#1D2A62]">
                            <span>Escalate to:</span>
                            <input type="text" value={checklistFields.escalateTo || ""} onChange={event => updateChecklistField("escalateTo", event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#E7A27A]/60 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#B45F3C] focus:ring-2 focus:ring-[#E7A27A]/30" />
                          </label>
                          <label className="block text-xs font-bold text-[#1D2A62]">
                            <span>Decision needed:</span>
                            <input type="text" value={checklistFields.decisionNeeded || ""} onChange={event => updateChecklistField("decisionNeeded", event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#E7A27A]/60 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#B45F3C] focus:ring-2 focus:ring-[#E7A27A]/30" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#1D2A62]/25 bg-white p-4">
                      <h5 className="font-extrabold text-[#1D2A62]">FINAL READY CALL</h5>
                      <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                        <label className="flex items-start gap-2">
                          <input type="checkbox" checked={Boolean(checklistChecks.readyCallReady)} onChange={event => handleReadyCallChange("ready", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#437118]" />
                          <span><strong>READY:</strong> The critical elements are verified, owned and tested well enough to proceed.</span>
                        </label>
                        <label className="flex items-start gap-2">
                          <input type="checkbox" checked={Boolean(checklistChecks.readyCallNotReady)} onChange={event => handleReadyCallChange("notReady", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#B45F3C]" />
                          <span><strong>NOT READY YET:</strong> A critical issue still needs action before sign-off.</span>
                        </label>
                      </div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <label className="block text-xs font-bold text-[#1D2A62]">
                          <span>Issue:</span>
                          <input type="text" value={checklistFields.issue || ""} onChange={event => updateChecklistField("issue", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#1D2A62] focus:ring-2 focus:ring-[#87AECE]/30" />
                        </label>
                        <label className="block text-xs font-bold text-[#1D2A62]">
                          <span>Owner:</span>
                          <input type="text" value={checklistFields.finalOwner || ""} onChange={event => updateChecklistField("finalOwner", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#1D2A62] focus:ring-2 focus:ring-[#87AECE]/30" />
                        </label>
                        <label className="block text-xs font-bold text-[#1D2A62]">
                          <span>Next action:</span>
                          <input type="text" value={checklistFields.finalNextAction || ""} onChange={event => updateChecklistField("finalNextAction", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#1D2A62] focus:ring-2 focus:ring-[#87AECE]/30" />
                        </label>
                        <label className="block text-xs font-bold text-[#1D2A62]">
                          <span>Re-check by:</span>
                          <input type="text" value={checklistFields.recheckBy || ""} onChange={event => updateChecklistField("recheckBy", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-[#1D2A62] focus:ring-2 focus:ring-[#87AECE]/30" />
                        </label>
                      </div>
                    </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {activeLesson.id === "4.0-course-feedback" && (
                feedbackSubmitted ? (
                  <div id="feedback-results" className="scroll-mt-6 animate-scene-reveal rounded-2xl border border-[#87AECE]/45 bg-gradient-to-br from-[#F0F7FC] via-white to-[#EEF7E8] p-5" aria-live="polite">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#437118] shadow-sm ring-1 ring-[#AFD06E]/50">
                        <CheckCircle weight="fill" className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#437118]">Thank you for your feedback.</h3>
                        <p className="mt-2 text-base font-semibold text-[#1D2A62]">You’ve completed Event Readiness course</p>
                      </div>
                    </div>
                    <div className="mt-6 rounded-2xl border border-[#AFD06E]/40 bg-white/80 p-5">
                      <h4 className="text-base font-bold text-[#1D2A62]">Before Your Future Event</h4>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">Keep the <strong>Event Readiness Checklist</strong> handy when you need to review a critical sequence or make a final readiness decision.</p>
                      <p className="mt-4 text-sm leading-relaxed text-slate-700">Remember that <strong>Event Readiness</strong> comes down to <strong>making better decisions</strong> before the event goes live, requiring you to <em className="font-semibold italic text-[#2F668B]">prioritise by Impact, verify with Evidence, and test the Connection.</em></p>
                      <p className="mt-4 text-sm font-semibold leading-relaxed text-[#1D2A62]">Use these three questions whenever you need to make a readiness decision:</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-[#AFD06E]/35 bg-[#EEF7E8] p-4">
                          <p className="font-bold text-[#437118]">IMPACT: What matters most?</p>
                          <p className="mt-2 text-xs italic leading-relaxed text-slate-600">Tells you where to focus.</p>
                        </div>
                        <div className="rounded-2xl border border-[#87AECE]/35 bg-[#F0F7FC] p-4">
                          <p className="font-bold text-[#2F668B]">EVIDENCE: What proves it is correct?</p>
                          <p className="mt-2 text-xs italic leading-relaxed text-slate-600">Tells you what to trust.</p>
                        </div>
                        <div className="rounded-2xl border border-[#F3C979]/45 bg-[#FFF7E5] p-4">
                          <p className="font-bold text-[#A66C00]">CONNECTION: Does it work together?</p>
                          <p className="mt-2 text-xs italic leading-relaxed text-slate-600">Tells you whether the sequence will work in practice.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-slate-500">Returning automatically in 30 seconds.</p>
                      <Button type="button" onClick={onNavigateMyLearning} className="cursor-pointer bg-[#1D2A62] hover:bg-[#16204a]">
                        Return to My Learning
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#1D2A62]">Before You Go</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">You’ve practised making event-readiness decisions using Impact, Evidence and Connection. Take a moment to reflect on how ready you feel to use these checks in a real event.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4 rounded-2xl border border-[#87AECE]/50 bg-[#F0F7FC] p-5">
                      <p className="text-base font-bold leading-relaxed text-[#1D2A62]">1. How confident are you that you can decide whether a participant-critical event element is Ready, rather than simply Done?</p>
                      <div role="radiogroup" aria-label="Confidence in deciding whether an element is Ready" className="space-y-2">
                        {["I can do this confidently.", "I think I can do this.", "I’m not sure yet.", "I would need more guidance."].map(option => (
                          <button key={option} type="button" role="radio" aria-checked={feedbackConfidence === option} onClick={() => setFeedbackConfidence(option)} className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors cursor-pointer ${feedbackConfidence === option ? "border-[#2F668B] bg-white text-[#1D2A62] ring-1 ring-[#2F668B]" : "border-[#87AECE]/40 bg-white/80 text-slate-700 hover:bg-white"}`}>
                            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${feedbackConfidence === option ? "border-[#2F668B] bg-[#2F668B] text-white" : "border-[#87AECE]/70"}`}>{feedbackConfidence === option ? <Check className="h-3.5 w-3.5" /> : ""}</span>
                            <span>{option}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-[#AFD06E]/50 bg-[#EEF7E8] p-5">
                      <p className="text-base font-bold leading-relaxed text-[#1D2A62]">2. How useful would the Event Ready Framework be during real event preparation?</p>
                      <div role="radiogroup" aria-label="Usefulness of Event Ready Framework" className="space-y-2">
                        {["Very useful", "Useful", "Somewhat useful", "Not useful yet"].map(option => (
                          <button key={option} type="button" role="radio" aria-checked={feedbackUsefulness === option} onClick={() => setFeedbackUsefulness(option)} className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors cursor-pointer ${feedbackUsefulness === option ? "border-[#437118] bg-white text-[#1D2A62] ring-1 ring-[#437118]" : "border-[#AFD06E]/50 bg-white/80 text-slate-700 hover:bg-white"}`}>
                            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${feedbackUsefulness === option ? "border-[#437118] bg-[#437118] text-white" : "border-[#AFD06E]"}`}>{feedbackUsefulness === option ? <Check className="h-3.5 w-3.5" /> : ""}</span>
                            <span>{option}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-[#D8B457]/60 bg-[#FFF9E9] p-5">
                      <p className="text-base font-bold leading-relaxed text-[#1D2A62]">3. Which resource are you most likely to use at your next event?</p>
                      <div role="radiogroup" aria-label="Resource most likely to use at next event" className="space-y-2">
                        {["Impact–Evidence–Connection rules", "3-Minute Event Readiness Checklist", "Both", "I’m not sure yet"].map(option => (
                          <button key={option} type="button" role="radio" aria-checked={feedbackTransfer === option} onClick={() => setFeedbackTransfer(option)} className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors cursor-pointer ${feedbackTransfer === option ? "border-[#8B5E00] bg-white text-[#1D2A62] ring-1 ring-[#8B5E00]" : "border-[#D8B457]/60 bg-white/80 text-slate-700 hover:bg-white"}`}>
                            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${feedbackTransfer === option ? "border-[#8B5E00] bg-[#8B5E00] text-white" : "border-[#D8B457]"}`}>{feedbackTransfer === option ? <Check className="h-3.5 w-3.5" /> : ""}</span>
                            <span>{option}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-5 rounded-2xl border border-[#B9A4E8]/60 bg-[#F6F2FF] p-5">
                      <label htmlFor="feedback-open-response" className="block text-base font-bold leading-relaxed text-[#1D2A62]">What is one thing that would make this training more useful for a real Finance Club event?</label>
                      <textarea id="feedback-open-response" value={feedbackOpenResponse} onChange={event => setFeedbackOpenResponse(event.target.value)} className="min-h-28 w-full rounded-xl border border-[#B9A4E8]/60 bg-white p-3 text-sm font-normal text-slate-700 outline-none transition focus:border-[#6B4C9A] focus:ring-2 focus:ring-[#B9A4E8]/30" placeholder="Enter your response here..." />
                    </div>
                    <div className="rounded-2xl border border-[#E7A27A]/60 bg-[#FFF4EA] p-5 text-center">
                      <p className="text-base font-bold text-[#1D2A62]">How would you rate your overall learning experience?</p>
                      <div className="mt-3 flex justify-center gap-1" role="radiogroup" aria-label="Overall learning experience rating">
                        {Array.from({ length: 5 }, (_, index) => {
                          const rating = index + 1
                          return (
                            <button
                              key={rating}
                              type="button"
                              role="radio"
                              aria-checked={feedbackRating === rating}
                              aria-label={`${rating} out of 5 stars`}
                              onClick={() => setFeedbackRating(rating)}
                              className="cursor-pointer rounded-md px-1 text-3xl leading-none text-[#B45F3C] transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#B45F3C]/40"
                            >
                              {rating <= feedbackRating ? "★" : "☆"}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                )
              )}

              {!(activeLesson.id === "4.0-course-feedback" && feedbackSubmitted) && !(activeLesson.id === "2.0-quick-check" && assessmentSubmitted) && (
                <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex w-full items-center justify-between gap-3">
                    {activeLessonIndex > 0 ? (
                      <Button type="button" variant="outline" onClick={handlePrevious} className="flex-1 cursor-pointer sm:flex-none">
                        <ArrowLeft className="mr-1.5 h-4 w-4" />
                        Previous
                      </Button>
                    ) : (
                      <span />
                    )}
                    {activeLesson.id === "4.0-course-feedback" ? (
                      <Button type="button" onClick={handleFeedbackSubmit} className="flex-1 cursor-pointer bg-[#1D2A62] hover:bg-[#16204a] sm:flex-none">
                        SUBMIT
                      </Button>
                    ) : activeLesson.id === "2.0-quick-check" ? (
                      <Button type="button" onClick={handleAssessmentSubmit} disabled={!assessmentAllAnswered} className="flex-1 cursor-pointer bg-[#1D2A62] hover:bg-[#16204a] sm:flex-none">
                        Submit
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    ) : (
                      (activeLesson.id !== "1.2-ready-simulation" || simulationComplete) && (
                        <Button type="button" onClick={handlePrimaryAction} disabled={(activeLesson.id === "1.0-done-ready" && !readinessAllCorrect) || (activeLesson.id === "1.1-ready-framework" && !connectionComplete)} className="flex-1 cursor-pointer bg-[#1D2A62] hover:bg-[#16204a] sm:flex-none">
                          {primaryLabel}
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="flex items-center gap-2 rounded-2xl border border-[#87AECE]/30 bg-[#F0F7FC] px-4 py-3 text-xs text-slate-600">
            <Sparkle className="h-4 w-4 shrink-0 text-[#437118]" />
            <span>Your progress is saved automatically on this device.</span>
          </div>
        </main>
      </div>
    </div>
  )
}
