export type LifeArea = "Career" | "Health" | "Relationships" | "Personal Growth" | "Finance" | "Recreation" | "Home"

export type GoalType = "Checklist" | "Time-based" | "Numeric"

export type RecurrenceType = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Yearly" | "None"

export interface Goal {
  id: string
  title: string
  description: string
  lifeArea: LifeArea
  type: GoalType
  targetDate?: string // ISO date string
  recurrence: RecurrenceType
  isCompleted: boolean
  progress: number // 0-100
  createdAt: string // ISO date string
  updatedAt: string // ISO date string

  // Fields specific to goal types
  checklistItems?: ChecklistItem[]
  timeTarget?: number // in minutes
  timeSpent?: number // in minutes
  numericTarget?: number
  numericCurrent?: number
  numericUnit?: string

  // For relationship goals
  contactId?: string
  engagementLevel?: "Low" | "Medium" | "High"
}

export interface ChecklistItem {
  id: string
  text: string
  isCompleted: boolean
}

export interface Task {
  id: string
  goalId: string
  title: string
  description?: string
  dueDate?: string // ISO date string
  isCompleted: boolean
  priority: "Low" | "Medium" | "High"
  category: LifeArea
  isTopPriority: boolean // For Today's Focus
  scheduledTime?: string // For Today's Plan and Calendar
  recurrence?: RecurrenceType
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  name: string
  relationship: string
  engagementLevel: "Low" | "Medium" | "High"
  lastContact?: string // ISO date string
  notes?: string
  taskTemplates: TaskTemplate[]
}

export interface TaskTemplate {
  id: string
  title: string
  description?: string
  frequency: "Weekly" | "Bi-weekly" | "Monthly" | "Quarterly"
}
