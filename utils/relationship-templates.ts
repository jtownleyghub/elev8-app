import relationshipTemplatesData from "@/data/relationship-templates.json"
import type { RelationshipTemplate, GoalTemplate } from "@/types/goals"

// Type assertion for the imported JSON
const relationshipTemplates = relationshipTemplatesData as RelationshipTemplate[]

export function getRelationshipTypes(): string[] {
  return relationshipTemplates.map((template) => template.relationshipType)
}

export function getTemplatesForRelationshipType(relationshipType: string): GoalTemplate[] {
  const relationshipTemplate = relationshipTemplates.find((template) => template.relationshipType === relationshipType)
  return relationshipTemplate?.templates || []
}

export function getTemplateById(templateId: string): GoalTemplate | undefined {
  for (const relationshipType of relationshipTemplates) {
    const template = relationshipType.templates.find((t) => t.templateId === templateId)
    if (template) {
      return template
    }
  }
  return undefined
}

export function getRelationshipTypeForTemplate(templateId: string): string | undefined {
  for (const relationshipType of relationshipTemplates) {
    const template = relationshipType.templates.find((t) => t.templateId === templateId)
    if (template) {
      return relationshipType.relationshipType
    }
  }
  return undefined
}

export function getSuggestedDayNumber(suggestedDay: string): number {
  switch (suggestedDay.toLowerCase()) {
    case "monday":
      return 1
    case "tuesday":
      return 2
    case "wednesday":
      return 3
    case "thursday":
      return 4
    case "friday":
      return 5
    case "saturday":
      return 6
    case "sunday":
      return 0
    case "weekend":
      return Math.random() > 0.5 ? 6 : 0 // Randomly choose Saturday or Sunday
    default:
      return Math.floor(Math.random() * 7) // Random day for "Any"
  }
}

export function isHolidaySoon(holidayName?: string): boolean {
  // This is a simplified implementation
  // In a real app, you would check against a calendar of holidays
  // For now, we'll just return false to indicate no holidays are coming up
  return false
}

export function getNextHoliday(): string | null {
  // This is a simplified implementation
  // In a real app, you would check against a calendar of holidays
  // For now, we'll just return null
  return null
}

export function adjustDateForSuggestedDay(suggestedDay: string): Date {
  const today = new Date()

  // Handle special cases
  if (suggestedDay === "Holiday") {
    const nextHoliday = getNextHoliday()
    if (nextHoliday) {
      // In a real implementation, you would parse the holiday date
      // For now, we'll just set it to 2 weeks from now
      const holidayDate = new Date()
      holidayDate.setDate(today.getDate() + 14)
      return holidayDate
    }
  }

  if (suggestedDay === "Week Before Holiday") {
    const nextHoliday = getNextHoliday()
    if (nextHoliday) {
      // In a real implementation, you would parse the holiday date and subtract 7 days
      // For now, we'll just set it to 1 week from now
      const weekBeforeHoliday = new Date()
      weekBeforeHoliday.setDate(today.getDate() + 7)
      return weekBeforeHoliday
    }
  }

  // For regular days of the week
  const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, etc.
  const targetDay = getSuggestedDayNumber(suggestedDay)

  // Calculate days to add
  let daysToAdd = targetDay - currentDay
  if (daysToAdd <= 0) {
    daysToAdd += 7 // Move to next week if the day has passed
  }

  const targetDate = new Date()
  targetDate.setDate(today.getDate() + daysToAdd)
  return targetDate
}
