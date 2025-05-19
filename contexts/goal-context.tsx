"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Goal, Task, LifeArea, Contact, GoalType, RecurrenceType } from "@/types/goals"
import { getTemplateById, adjustDateForSuggestedDay } from "@/utils/relationship-templates"
import { getTemplateById as getGoalTemplateById, calculateTaskDueDates } from "@/utils/goal-templates"

interface GoalContextType {
  goals: Goal[]
  tasks: Task[]
  contacts: Contact[]
  addGoal: (goal: Omit<Goal, "id" | "createdAt" | "updatedAt" | "progress">) => string
  updateGoal: (goal: Goal) => void
  deleteGoal: (goalId: string) => void
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => string
  updateTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  completeTask: (taskId: string) => void
  postponeTask: (taskId: string) => void
  getGoalsByLifeArea: (lifeArea: LifeArea) => Goal[]
  getTodaysTasks: () => Task[]
  getTopPriorityTasks: () => Task[]
  getTasksByDate: (date: string) => Task[]
  addContact: (contact: Omit<Contact, "id">) => void
  updateContact: (contact: Contact) => void
  deleteContact: (contactId: string) => void
  generateTasksFromTemplates: () => void
  applyTemplateToContact: (contactId: string, templateId: string) => void
  pauseRelationshipGoal: (goalId: string, isPaused: boolean) => void
  toggleCulturalTasks: (contactId: string, showCulturalTasks: boolean) => void
  applyGoalTemplate: (templateId: string, lifeArea: LifeArea, startDate?: Date) => string
  reorderTemplateTasks: (goalId: string, taskIds: string[]) => void
}

const GoalContext = createContext<GoalContextType | undefined>(undefined)

export const useGoals = () => {
  const context = useContext(GoalContext)
  if (!context) {
    throw new Error("useGoals must be used within a GoalProvider")
  }
  return context
}

interface GoalProviderProps {
  children: ReactNode
}

export const GoalProvider = ({ children }: GoalProviderProps) => {
  const [goals, setGoals] = useState<Goal[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const storedGoals = localStorage.getItem("goals")
    const storedTasks = localStorage.getItem("tasks")
    const storedContacts = localStorage.getItem("contacts")

    if (storedGoals) setGoals(JSON.parse(storedGoals))
    if (storedTasks) setTasks(JSON.parse(storedTasks))
    if (storedContacts) setContacts(JSON.parse(storedContacts))
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals))
  }, [goals])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts])

  // Goal CRUD operations
  const addGoal = (goalData: Omit<Goal, "id" | "createdAt" | "updatedAt" | "progress">): string => {
    const now = new Date().toISOString()
    const newGoal: Goal = {
      ...goalData,
      id: uuidv4(),
      progress: 0,
      isCompleted: false,
      createdAt: now,
      updatedAt: now,
    }
    setGoals([...goals, newGoal])
    return newGoal.id
  }

  const updateGoal = (updatedGoal: Goal) => {
    setGoals(
      goals.map((goal) =>
        goal.id === updatedGoal.id ? { ...updatedGoal, updatedAt: new Date().toISOString() } : goal,
      ),
    )
  }

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter((goal) => goal.id !== goalId))
    // Also delete associated tasks
    setTasks(tasks.filter((task) => task.goalId !== goalId))
  }

  // Task CRUD operations
  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">): string => {
    const now = new Date().toISOString()
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    }
    setTasks([...tasks, newTask])
    return newTask.id
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? { ...updatedTask, updatedAt: new Date().toISOString() } : task,
      ),
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  // Postpone a task to the next day
  const postponeTask = (taskId: string) => {
    const taskToPostpone = tasks.find((task) => task.id === taskId)
    if (!taskToPostpone || !taskToPostpone.dueDate) return

    // Calculate tomorrow's date
    const currentDate = new Date(taskToPostpone.dueDate)
    const tomorrow = new Date(currentDate)
    tomorrow.setDate(currentDate.getDate() + 1)

    // Update the task with the new due date
    const updatedTask = {
      ...taskToPostpone,
      dueDate: tomorrow.toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // If this is a template task, also postpone all related future tasks
    if (taskToPostpone.fromTemplate) {
      // Get all related template tasks for the same goal
      const relatedTasks = tasks.filter(
        (task) =>
          task.goalId === taskToPostpone.goalId &&
          task.fromTemplate &&
          task.title === taskToPostpone.title &&
          !task.isCompleted &&
          task.id !== taskId && // Exclude the current task
          new Date(task.dueDate) > currentDate, // Only future tasks
      )

      // Postpone all related tasks by one day
      const updatedTasks = tasks.map((task) => {
        if (relatedTasks.some((relatedTask) => relatedTask.id === task.id)) {
          const taskDate = new Date(task.dueDate)
          taskDate.setDate(taskDate.getDate() + 1)
          return {
            ...task,
            dueDate: taskDate.toISOString(),
            updatedAt: new Date().toISOString(),
          }
        }
        return task.id === taskId ? updatedTask : task
      })

      setTasks(updatedTasks)
    } else {
      // Just update this single task
      updateTask(updatedTask)
    }
  }

  const completeTask = (taskId: string) => {
    const taskToComplete = tasks.find((task) => task.id === taskId)
    if (!taskToComplete) return

    // Mark the task as completed
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: true, updatedAt: new Date().toISOString() } : task,
      ),
    )

    // Update goal progress
    const goalId = taskToComplete.goalId
    const goalTasks = tasks.filter((task) => task.goalId === goalId)
    const completedTasks = goalTasks.filter((task) => task.isCompleted || task.id === taskId).length
    const progress = Math.round((completedTasks / goalTasks.length) * 100)

    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              progress,
              isCompleted: progress === 100,
              updatedAt: new Date().toISOString(),
            }
          : goal,
      ),
    )

    // If this is a template task, generate a new task to replace it
    if (taskToComplete.fromTemplate && taskToComplete.recurrence) {
      const goal = goals.find((g) => g.id === goalId)
      if (goal && goal.contactId && goal.templateId && !goal.isPaused) {
        // Get the template
        const template = getTemplateById(goal.templateId)
        if (!template) return

        // Find the template task that matches this completed task
        const templateTask = template.tasks.find((tt) => tt.title === taskToComplete.title)
        if (!templateTask) return

        // Skip cultural tasks if they're disabled
        const contact = contacts.find((c) => c.id === goal.contactId)
        if (templateTask.cultural && contact && contact.showCulturalTasks === false) return

        // Calculate the next due date based on recurrence
        const nextDueDate = calculateNextDueDate(taskToComplete.recurrence, templateTask.suggestedDay)

        // Create a new task
        addTask({
          goalId,
          title: templateTask.title,
          description: templateTask.description,
          dueDate: nextDueDate.toISOString(),
          isCompleted: false,
          priority: "Medium",
          category: "Relationships",
          isTopPriority: false,
          estimatedMins: templateTask.estimatedMins,
          suggestedDay: templateTask.suggestedDay,
          fromTemplate: true,
          recurrence: taskToComplete.recurrence,
          cultural: templateTask.cultural,
        })
      }
    }
  }

  // Calculate the next due date based on recurrence pattern
  const calculateNextDueDate = (recurrence: string, suggestedDay: string): Date => {
    const today = new Date()
    let nextDate = new Date()

    switch (recurrence) {
      case "Daily":
        nextDate.setDate(today.getDate() + 1)
        break
      case "Weekly":
        nextDate = adjustDateForSuggestedDay(suggestedDay)
        nextDate.setDate(nextDate.getDate() + 7) // Move to next week
        break
      case "Bi-weekly":
        nextDate = adjustDateForSuggestedDay(suggestedDay)
        nextDate.setDate(nextDate.getDate() + 14) // Move to two weeks later
        break
      case "Monthly":
        nextDate.setMonth(today.getMonth() + 1)
        nextDate = adjustDateForSuggestedDay(suggestedDay)
        break
      case "Quarterly":
        nextDate.setMonth(today.getMonth() + 3)
        nextDate = adjustDateForSuggestedDay(suggestedDay)
        break
      case "Yearly":
        nextDate.setFullYear(today.getFullYear() + 1)
        nextDate = adjustDateForSuggestedDay(suggestedDay)
        break
      case "3x per week":
        // For 3x per week, we'll space them out evenly
        const dayOfWeek = today.getDay()
        let daysToAdd = 2 // Default to 2 days

        // Adjust based on current day to space out 3x per week
        if (dayOfWeek === 0 || dayOfWeek === 3) {
          // Sunday or Wednesday
          daysToAdd = 2
        } else if (dayOfWeek === 2 || dayOfWeek === 5) {
          // Tuesday or Friday
          daysToAdd = 3
        } else {
          daysToAdd = 2
        }

        nextDate.setDate(today.getDate() + daysToAdd)
        break
      default:
        // For any other recurrence or "None", use the suggested day next week
        nextDate = adjustDateForSuggestedDay(suggestedDay)
        break
    }

    return nextDate
  }

  // Apply a goal template
  const applyGoalTemplate = (templateId: string, lifeArea: LifeArea, startDate: Date = new Date()): string => {
    // Get the template
    const template = getGoalTemplateById(templateId)
    if (!template) return ""

    // Create a new goal from the template
    const goalId = addGoal({
      title: template.title,
      description: template.description,
      lifeArea,
      type: "Checklist",
      recurrence: template.defaultFrequency,
      fromTemplate: true,
      templateId,
    })

    // Calculate task due dates
    const taskDueDates = calculateTaskDueDates(template.tasks, startDate)

    // Create tasks for the goal
    for (const { task, dueDate } of taskDueDates) {
      // Determine if this task should be a top priority
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)

      const isTopPriority =
        (dueDate.getDate() === today.getDate() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getFullYear() === today.getFullYear()) ||
        (dueDate.getDate() === tomorrow.getDate() &&
          dueDate.getMonth() === tomorrow.getMonth() &&
          dueDate.getFullYear() === tomorrow.getFullYear())

      // Add the task
      addTask({
        goalId,
        title: task.title,
        description: task.description,
        dueDate: dueDate.toISOString(),
        isCompleted: false,
        priority: "Medium",
        category: lifeArea,
        isTopPriority,
        estimatedMins: task.estimatedMins,
        suggestedDay: task.suggestedDay,
        fromTemplate: true,
        recurrence: task.recurring ? task.recurrenceFrequency : undefined,
        sequence: task.sequence,
      })

      // If the task is recurring, create additional instances
      if (task.recurring && task.recurrenceFrequency && task.recurrenceCount) {
        let lastDueDate = dueDate

        for (let i = 1; i < task.recurrenceCount; i++) {
          // Calculate the next due date
          const nextDueDate = new Date(lastDueDate)

          switch (task.recurrenceFrequency) {
            case "Daily":
              nextDueDate.setDate(nextDueDate.getDate() + 1)
              break
            case "Weekly":
              nextDueDate.setDate(nextDueDate.getDate() + 7)
              break
            case "Bi-weekly":
              nextDueDate.setDate(nextDueDate.getDate() + 14)
              break
            case "Monthly":
              nextDueDate.setMonth(nextDueDate.getMonth() + 1)
              break
            case "Quarterly":
              nextDueDate.setMonth(nextDueDate.getMonth() + 3)
              break
            case "Yearly":
              nextDueDate.setFullYear(nextDueDate.getFullYear() + 1)
              break
            case "3x per week":
              nextDueDate.setDate(nextDueDate.getDate() + 2) // Simplified for this example
              break
          }

          // Add the recurring task
          addTask({
            goalId,
            title: task.title,
            description: task.description,
            dueDate: nextDueDate.toISOString(),
            isCompleted: false,
            priority: "Medium",
            category: lifeArea,
            isTopPriority: false,
            estimatedMins: task.estimatedMins,
            suggestedDay: task.suggestedDay,
            fromTemplate: true,
            recurrence: task.recurrenceFrequency,
            sequence: task.sequence,
          })

          lastDueDate = nextDueDate
        }
      }
    }

    return goalId
  }

  // Reorder template tasks
  const reorderTemplateTasks = (goalId: string, taskIds: string[]) => {
    // Get all tasks for this goal
    const goalTasks = tasks.filter((task) => task.goalId === goalId)

    // Create a map of task IDs to their current sequence
    const taskSequences: { [key: string]: number } = {}
    goalTasks.forEach((task) => {
      taskSequences[task.id] = task.sequence || 0
    })

    // Update the sequence of each task based on the new order
    const updatedTasks = tasks.map((task) => {
      if (task.goalId === goalId) {
        const newIndex = taskIds.indexOf(task.id)
        if (newIndex !== -1) {
          return { ...task, sequence: newIndex + 1 }
        }
      }
      return task
    })

    setTasks(updatedTasks)
  }

  // Query functions
  const getGoalsByLifeArea = (lifeArea: LifeArea) => {
    return goals.filter((goal) => goal.lifeArea === lifeArea)
  }

  const getTodaysTasks = () => {
    const today = new Date().toISOString().split("T")[0]
    return tasks.filter((task) => {
      if (!task.dueDate) return false
      return task.dueDate.startsWith(today)
    })
  }

  const getTopPriorityTasks = () => {
    return tasks.filter((task) => task.isTopPriority && !task.isCompleted)
  }

  const getTasksByDate = (date: string) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false
      // Normalize both dates to YYYY-MM-DD format for comparison
      const taskDate = new Date(task.dueDate).toISOString().split("T")[0]
      return taskDate === date
    })
  }

  // Contact and relationship goal functions
  const addContact = (contactData: Omit<Contact, "id">) => {
    const newContact: Contact = {
      ...contactData,
      id: uuidv4(),
      showCulturalTasks: contactData.showCulturalTasks ?? true, // Default to showing cultural tasks
    }

    // Update contacts state
    const updatedContacts = [...contacts, newContact]
    setContacts(updatedContacts)

    // Save to localStorage immediately
    localStorage.setItem("contacts", JSON.stringify(updatedContacts))

    // Create a relationship goal for this contact
    const newGoal = {
      title: `Maintain relationship with ${contactData.name}`,
      description: `Regular engagement with ${contactData.name}`,
      lifeArea: "Relationships" as LifeArea,
      type: "Checklist" as GoalType,
      recurrence: "None" as RecurrenceType,
      contactId: newContact.id,
      engagementLevel: contactData.engagementLevel,
      templateId: contactData.activeTemplateId,
      culturalPreferences: {
        showCulturalTasks: contactData.showCulturalTasks ?? true,
      },
    }

    // Add the goal
    const now = new Date().toISOString()
    const goalWithId: Goal = {
      ...newGoal,
      id: uuidv4(),
      progress: 0,
      isCompleted: false,
      createdAt: now,
      updatedAt: now,
    }

    // Update goals state
    const updatedGoals = [...goals, goalWithId]
    setGoals(updatedGoals)

    // Save to localStorage immediately
    localStorage.setItem("goals", JSON.stringify(updatedGoals))

    // If a template is selected, generate tasks
    if (contactData.activeTemplateId) {
      // We need to wait for the goal to be added before generating tasks
      setTimeout(() => {
        generateTasksForContact(newContact.id, contactData.activeTemplateId!, goalWithId.id)
      }, 100)
    }
  }

  const updateContact = (updatedContact: Contact) => {
    setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)))

    // Update the associated relationship goal
    const relationshipGoal = goals.find((goal) => goal.contactId === updatedContact.id)
    if (relationshipGoal) {
      updateGoal({
        ...relationshipGoal,
        title: `Maintain relationship with ${updatedContact.name}`,
        engagementLevel: updatedContact.engagementLevel,
        templateId: updatedContact.activeTemplateId,
        culturalPreferences: {
          showCulturalTasks: updatedContact.showCulturalTasks ?? true,
        },
      })
    }
  }

  const deleteContact = (contactId: string) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId))

    // Delete the associated relationship goal and tasks
    const goalToDelete = goals.find((goal) => goal.contactId === contactId)
    if (goalToDelete) {
      deleteGoal(goalToDelete.id)
    }
  }

  // Toggle cultural tasks visibility
  const toggleCulturalTasks = (contactId: string, showCulturalTasks: boolean) => {
    // Update the contact
    setContacts(contacts.map((contact) => (contact.id === contactId ? { ...contact, showCulturalTasks } : contact)))

    // Update the associated goal
    const goal = goals.find((g) => g.contactId === contactId)
    if (goal) {
      updateGoal({
        ...goal,
        culturalPreferences: {
          ...goal.culturalPreferences,
          showCulturalTasks,
        },
      })

      // If turning off cultural tasks, remove any existing cultural tasks
      if (!showCulturalTasks) {
        setTasks(tasks.filter((task) => !(task.goalId === goal.id && task.cultural === true && !task.isCompleted)))
      } else {
        // If turning on cultural tasks, regenerate tasks
        if (goal.templateId) {
          // Delete existing template tasks
          setTasks(tasks.filter((task) => !(task.goalId === goal.id && task.fromTemplate)))
          // Generate new tasks including cultural ones
          generateTasksForContact(contactId, goal.templateId, goal.id)
        }
      }
    }
  }

  // Apply a template to a contact
  const applyTemplateToContact = (contactId: string, templateId: string) => {
    // Update the contact with the new template
    const updatedContact = contacts.find((c) => c.id === contactId)
    if (!updatedContact) return

    updatedContact.activeTemplateId = templateId
    setContacts(
      contacts.map((contact) => (contact.id === contactId ? { ...contact, activeTemplateId: templateId } : contact)),
    )

    // Update the associated goal
    const relationshipGoal = goals.find((goal) => goal.contactId === contactId)
    if (relationshipGoal) {
      updateGoal({
        ...relationshipGoal,
        templateId,
        isPaused: false,
      })
    }

    // Delete existing template tasks for this goal
    if (relationshipGoal) {
      setTasks(tasks.filter((task) => !(task.goalId === relationshipGoal.id && task.fromTemplate)))
    }

    // Generate new tasks from the template
    if (relationshipGoal) {
      generateTasksForContact(contactId, templateId, relationshipGoal.id)
    }
  }

  // Pause or unpause a relationship goal
  const pauseRelationshipGoal = (goalId: string, isPaused: boolean) => {
    const goal = goals.find((g) => g.id === goalId)
    if (!goal || goal.lifeArea !== "Relationships") return

    updateGoal({
      ...goal,
      isPaused,
    })

    // If unpausing, regenerate tasks
    if (!isPaused && goal.contactId && goal.templateId) {
      // Delete existing template tasks
      setTasks(tasks.filter((task) => !(task.goalId === goalId && task.fromTemplate)))

      // Generate new tasks
      generateTasksForContact(goal.contactId, goal.templateId, goalId)
    }
  }

  // Generate tasks from a template for a specific contact
  const generateTasksForContact = (contactId: string, templateId: string, goalId: string) => {
    const contact = contacts.find((c) => c.id === contactId)
    if (!contact) return

    const goal = goals.find((g) => g.id === goalId)
    if (!goal || goal.isPaused) return

    const template = getTemplateById(templateId)
    if (!template) return

    // Generate tasks for the template
    template.tasks.forEach((templateTask) => {
      // Skip cultural tasks if they're disabled
      if (templateTask.cultural && contact.showCulturalTasks === false) return

      // Calculate due date based on suggested day
      const dueDate = adjustDateForSuggestedDay(templateTask.suggestedDay)

      // Determine if this task should be a top priority
      // Make tasks due today or tomorrow top priority
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)

      const taskDate = new Date(dueDate)
      const isTopPriority =
        (taskDate.getDate() === today.getDate() &&
          taskDate.getMonth() === today.getMonth() &&
          taskDate.getFullYear() === today.getFullYear()) ||
        (taskDate.getDate() === tomorrow.getDate() &&
          taskDate.getMonth() === tomorrow.getMonth() &&
          taskDate.getFullYear() === tomorrow.getFullYear())

      // Create the task
      addTask({
        goalId: goal.id,
        title: templateTask.title,
        description: templateTask.description,
        dueDate: dueDate.toISOString(),
        isCompleted: false,
        priority: "Medium",
        category: "Relationships",
        isTopPriority,
        estimatedMins: templateTask.estimatedMins,
        suggestedDay: templateTask.suggestedDay,
        fromTemplate: true,
        recurrence: template.defaultFrequency,
        cultural: templateTask.cultural,
      })
    })
  }

  // Generate tasks from templates for relationship goals
  const generateTasksFromTemplates = () => {
    // Get all relationship goals with contacts and templates
    const relationshipGoals = goals.filter(
      (goal) => goal.lifeArea === "Relationships" && goal.contactId && goal.templateId && !goal.isPaused,
    )

    // For each relationship goal, generate tasks based on templates
    relationshipGoals.forEach((goal) => {
      const contact = contacts.find((c) => c.id === goal.contactId)
      if (!contact || !contact.activeTemplateId) return

      // Check if we need to regenerate tasks
      const goalTasks = tasks.filter((task) => task.goalId === goal.id && task.fromTemplate && !task.isCompleted)

      // If there are no active template tasks, generate new ones
      if (goalTasks.length === 0) {
        generateTasksForContact(contact.id, contact.activeTemplateId, goal.id)
      }
    })
  }

  const value = {
    goals,
    tasks,
    contacts,
    addGoal,
    updateGoal,
    deleteGoal,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    postponeTask,
    getGoalsByLifeArea,
    getTodaysTasks,
    getTopPriorityTasks,
    getTasksByDate,
    addContact,
    updateContact,
    deleteContact,
    generateTasksFromTemplates,
    applyTemplateToContact,
    pauseRelationshipGoal,
    toggleCulturalTasks,
    applyGoalTemplate,
    reorderTemplateTasks,
  }

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>
}
