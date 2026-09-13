export const EVENT_READINESS_PROGRESS_KEY = "rmit-finance-club:event-readiness-progress"
export const EVENT_READINESS_TOTAL_ITEMS = 9
export const EVENT_READINESS_DEFAULT_COMPLETED_IDS = ["course-overview", "course-outcomes", "1.0-done-ready"]

export function getEventReadinessProgress(): number {
  const fallbackProgress = Math.round((EVENT_READINESS_DEFAULT_COMPLETED_IDS.length / EVENT_READINESS_TOTAL_ITEMS) * 100)
  if (typeof window === "undefined") return fallbackProgress

  try {
    const raw = window.localStorage.getItem(EVENT_READINESS_PROGRESS_KEY)
    if (!raw) return fallbackProgress
    const parsed = JSON.parse(raw) as { completedLessonIds?: unknown }
    if (!Array.isArray(parsed.completedLessonIds)) return fallbackProgress
    const completedCount = new Set(parsed.completedLessonIds.filter((id): id is string => typeof id === "string")).size
    return Math.round((completedCount / EVENT_READINESS_TOTAL_ITEMS) * 100)
  } catch {
    return fallbackProgress
  }
}
