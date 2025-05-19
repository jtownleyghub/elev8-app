import goalTemplatesData from "@/data/goal-templates-with-aspirational.json"
import type { GoalTemplate, TemplateTask } from "@/types/goals"

// Get all templates
export const getAllTemplates = (): Record<string, GoalTemplate[]> => {
  return goalTemplatesData
}

// Get templates by life area
export const getTemplatesByLifeArea = (lifeArea: string): GoalTemplate[] => {
  return goalTemplatesData[lifeArea as keyof typeof goalTemplatesData] || []
}

// Get all aspirational templates
export const getAspirationalTemplates = (): GoalTemplate[] => {
  const allTemplates: GoalTemplate[] = []

  Object.keys(goalTemplatesData).forEach((lifeArea) => {
    const templates = goalTemplatesData[lifeArea as keyof typeof goalTemplatesData]
    templates.forEach((template) => {
      if (template.isAspirational) {
        allTemplates.push({
          ...template,
          lifeArea,
        })
      }
    })
  })

  return allTemplates
}

// Get template by ID
export const getTemplateById = (templateId: string): GoalTemplate | null => {
  for (const lifeArea in goalTemplatesData) {
    const templates = goalTemplatesData[lifeArea as keyof typeof goalTemplatesData]
    const template = templates.find((t) => t.templateId === templateId)
    if (template) {
      return {
        ...template,
        lifeArea,
      }
    }
  }
  return null
}

// Calculate task due dates based on template tasks and start date
export const calculateTaskDueDates = (
  tasks: TemplateTask[],
  startDate: Date,
): { task: TemplateTask; dueDate: Date }[] => {
  const result: { task: TemplateTask; dueDate: Date }[] = []

  // Sort tasks by sequence
  const sortedTasks = [...tasks].sort((a, b) => (a.sequence || 0) - (b.sequence || 0))

  sortedTasks.forEach((task) => {
    // Calculate the due date based on the suggested day and any offset
    const dueDate = calculateDueDate(task, startDate)
    result.push({ task, dueDate })
  })

  return result
}

// Calculate a due date for a task based on the suggested day and offset
const calculateDueDate = (task: TemplateTask, startDate: Date): Date => {
  const dueDate = new Date(startDate)

  // Apply offset if specified
  if (task.offset) {
    const offsetMatch = task.offset.match(/(\d+)\s+(day|days|week|weeks|month|months)/)
    if (offsetMatch) {
      const amount = Number.parseInt(offsetMatch[1])
      const unit = offsetMatch[2]

      if (unit === "day" || unit === "days") {
        dueDate.setDate(dueDate.getDate() + amount)
      } else if (unit === "week" || unit === "weeks") {
        dueDate.setDate(dueDate.getDate() + amount * 7)
      } else if (unit === "month" || unit === "months") {
        dueDate.setMonth(dueDate.getMonth() + amount)
      }
    }
  }

  // Adjust for suggested day
  if (task.suggestedDay) {
    if (task.suggestedDay === "Daily") {
      // No adjustment needed for daily tasks
    } else if (task.suggestedDay === "Weekday") {
      // Find the next weekday
      while (dueDate.getDay() === 0 || dueDate.getDay() === 6) {
        dueDate.setDate(dueDate.getDate() + 1)
      }
    } else if (task.suggestedDay === "Weekend") {
      // Find the next weekend day
      while (dueDate.getDay() !== 0 && dueDate.getDay() !== 6) {
        dueDate.setDate(dueDate.getDate() + 1)
      }
    } else if (task.suggestedDay === "LastDayOfMonth") {
      // Set to the last day of the current month
      dueDate.setMonth(dueDate.getMonth() + 1)
      dueDate.setDate(0)
    } else if (task.suggestedDay === "FirstDayOfMonth") {
      // Set to the first day of the next month
      dueDate.setMonth(dueDate.getMonth() + 1)
      dueDate.setDate(1)
    } else if (task.suggestedDay === "FirstDayOfQuarter") {
      // Set to the first day of the next quarter
      const month = dueDate.getMonth()
      const nextQuarterMonth = Math.floor(month / 3) * 3 + 3
      dueDate.setMonth(nextQuarterMonth)
      dueDate.setDate(1)
    } else if (task.suggestedDay === "LastDayOfQuarter") {
      // Set to the last day of the current quarter
      const month = dueDate.getMonth()
      const nextQuarterMonth = Math.floor(month / 3) * 3 + 3
      dueDate.setMonth(nextQuarterMonth)
      dueDate.setDate(0)
    } else if (task.suggestedDay === "FirstMondayOfMonth") {
      // Set to the first Monday of the next month
      dueDate.setMonth(dueDate.getMonth() + 1)
      dueDate.setDate(1)
      while (dueDate.getDay() !== 1) {
        dueDate.setDate(dueDate.getDate() + 1)
      }
    } else if (task.suggestedDay === "LastSundayOfMonth") {
      // Set to the last Sunday of the current month
      dueDate.setMonth(dueDate.getMonth() + 1)
      dueDate.setDate(0)
      while (dueDate.getDay() !== 0) {
        dueDate.setDate(dueDate.getDate() - 1)
      }
    } else if (task.suggestedDay.includes(",")) {
      // Handle multiple days like "Monday,Wednesday,Friday"
      const days = task.suggestedDay.split(",")
      const dayMap: Record<string, number> = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
      }

      // Find the next occurrence of any of the specified days
      let found = false
      for (let i = 0; i < 7; i++) {
        const checkDate = new Date(dueDate)
        checkDate.setDate(checkDate.getDate() + i)
        if (days.some((day) => dayMap[day.trim()] === checkDate.getDay())) {
          dueDate.setDate(dueDate.getDate() + i)
          found = true
          break
        }
      }

      if (!found) {
        // Default to the first day in the list
        const firstDay = days[0].trim()
        const targetDay = dayMap[firstDay]
        const currentDay = dueDate.getDay()
        const daysToAdd = (targetDay - currentDay + 7) % 7
        dueDate.setDate(dueDate.getDate() + daysToAdd)
      }
    } else {
      // Handle single day like "Monday"
      const dayMap: Record<string, number> = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
      }

      const targetDay = dayMap[task.suggestedDay]
      if (targetDay !== undefined) {
        const currentDay = dueDate.getDay()
        const daysToAdd = (targetDay - currentDay + 7) % 7
        dueDate.setDate(dueDate.getDate() + daysToAdd)
      }
    }
  }

  return dueDate
}

// Get popular templates
export const getPopularTemplates = (): GoalTemplate[] => {
  const allTemplates: GoalTemplate[] = []

  Object.keys(goalTemplatesData).forEach((lifeArea) => {
    const templates = goalTemplatesData[lifeArea as keyof typeof goalTemplatesData]
    templates.forEach((template) => {
      if (template.popular) {
        allTemplates.push({
          ...template,
          lifeArea,
        })
      }
    })
  })

  return allTemplates
}

// Get templates by difficulty
export const getTemplatesByDifficulty = (difficulty: string): GoalTemplate[] => {
  const allTemplates: GoalTemplate[] = []

  Object.keys(goalTemplatesData).forEach((lifeArea) => {
    const templates = goalTemplatesData[lifeArea as keyof typeof goalTemplatesData]
    templates.forEach((template) => {
      if (template.difficulty === difficulty) {
        allTemplates.push({
          ...template,
          lifeArea,
        })
      }
    })
  })

  return allTemplates
}
