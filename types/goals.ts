export type LifeArea =
  | "Career"
  | "Health"
  | "Relationships"
  | "Personal Growth"
  | "Finance"
  | "Recreation"
  | "Home"
  | "Travel"

export type GoalType = "Checklist" | "Time-based" | "Numeric"

export type RecurrenceType =
  | "Daily"
  | "Weekly"
  | "Bi-weekly"
  | "Monthly"
  | "Quarterly"
  | "Yearly"
  | "3x per week"
  | "None"

export type RelationshipType =
  | "Spouse / Partner"
  | "Child"
  | "Parent"
  | "Sibling"
  | "Friend"
  | "Colleague"
  | "Mentor"
  | "Other"

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
  templateId?: string
  isPaused?: boolean
  culturalPreferences?: {
    showCulturalTasks: boolean
  }

  // For template-based goals
  fromTemplate?: boolean
  templateTasks?: TemplateTask[]
  isAspirational?: boolean
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
  estimatedMins?: number
  suggestedDay?: string
  fromTemplate?: boolean
  cultural?: boolean
  sequence?: number // For template-based tasks
}

export interface Contact {
  id: string
  name: string
  relationshipType: RelationshipType
  engagementLevel: "Low" | "Medium" | "High"
  lastContact?: string // ISO date string
  notes?: string
  activeTemplateId?: string
  showCulturalTasks?: boolean
  taskTemplates: TaskTemplate[]
}

export interface TaskTemplate {
  id: string
  title: string
  description?: string
  frequency: "Weekly" | "Bi-weekly" | "Monthly" | "Quarterly"
}

export interface RelationshipTemplate {
  relationshipType: string
  templates: GoalTemplate[]
}

export interface GoalTemplate {
  templateId: string
  title: string
  description: string
  defaultFrequency: RecurrenceType
  duration?: string
  difficulty?: "Easy" | "Medium" | "Hard"
  popular?: boolean
  isAspirational?: boolean
  image?: string
  lifeArea?: string
  tasks: TemplateTask[]
}

export interface TemplateTask {
  title: string
  description: string
  suggestedDay: string
  estimatedMins: number
  cultural?: boolean
  sequence?: number
  recurring?: boolean
  recurrenceFrequency?: RecurrenceType
  recurrenceCount?: number
  offset?: string
}

export type PlanningStyle = "Automated" | "Manual" | "Balanced"

export interface UserPreferences {
  planningStyle: PlanningStyle
  focusedLifeAreas: LifeArea[]
  selectedAspirations: string[]
}
