"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Goal, Task, LifeArea, Contact } from "@/types/goals"

interface GoalContextType {
  goals: Goal[]
  tasks: Task[]
  contacts: Contact[]
  addGoal: (goal: Omit<Goal, "id" | "createdAt" | "updatedAt" | "progress">) => void
  updateGoal: (goal: Goal) => void
  deleteGoal: (goalId: string) => void
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  updateTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  completeTask: (taskId: string) => void
  getGoalsByLifeArea: (lifeArea: LifeArea) => Goal[]
  getTodaysTasks: () => Task[]
  getTopPriorityTasks: () => Task[]
  getTasksByDate: (date: string) => Task[]
  addContact: (contact: Omit<Contact, "id">) => void
  updateContact: (contact: Contact) => void
  deleteContact: (contactId: string) => void
  generateTasksFromTemplates: () => void
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
  const addGoal = (goalData: Omit<Goal, "id" | "createdAt" | "updatedAt" | "progress">) => {
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
  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString()
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    }
    setTasks([...tasks, newTask])
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

  const completeTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: true, updatedAt: new Date().toISOString() } : task,
      ),
    )

    // Update goal progress
    const completedTask = tasks.find((task) => task.id === taskId)
    if (completedTask) {
      const goalId = completedTask.goalId
      const goalTasks = tasks.filter((task) => task.goalId === goalId)
      const completedTasks = goalTasks.filter((task) => task.isCompleted).length + 1 // +1 for the task we just completed
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
    }
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
      return task.dueDate.startsWith(date)
    })
  }

  // Contact and relationship goal functions
  const addContact = (contactData: Omit<Contact, "id">) => {
    const newContact: Contact = {
      ...contactData,
      id: uuidv4(),
    }
    setContacts([...contacts, newContact])

    // Create a relationship goal for this contact
    addGoal({
      title: `Maintain relationship with ${contactData.name}`,
      description: `Regular engagement with ${contactData.name}`,
      lifeArea: "Relationships",
      type: "Checklist",
      recurrence: "None",
      contactId: newContact.id,
      engagementLevel: contactData.engagementLevel,
    })
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

  // Generate tasks from templates for relationship goals
  const generateTasksFromTemplates = () => {
    // Get all relationship goals with contacts
    const relationshipGoals = goals.filter((goal) => goal.lifeArea === "Relationships" && goal.contactId)

    // For each relationship goal, generate tasks based on templates
    relationshipGoals.forEach((goal) => {
      const contact = contacts.find((c) => c.id === goal.contactId)
      if (!contact || !contact.taskTemplates.length) return

      // Check engagement level to determine frequency
      const today = new Date()

      contact.taskTemplates.forEach((template) => {
        // Check if a similar task already exists for this week
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay())
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)

        const existingTask = tasks.find(
          (task) =>
            task.goalId === goal.id &&
            task.title === template.title &&
            task.dueDate &&
            new Date(task.dueDate) >= startOfWeek &&
            new Date(task.dueDate) <= endOfWeek,
        )

        // If no existing task, create one
        if (!existingTask) {
          // Set due date based on engagement level
          const dueDate = new Date()
          switch (contact.engagementLevel) {
            case "High":
              // Due in 1-2 days
              dueDate.setDate(today.getDate() + Math.floor(Math.random() * 2) + 1)
              break
            case "Medium":
              // Due in 3-5 days
              dueDate.setDate(today.getDate() + Math.floor(Math.random() * 3) + 3)
              break
            case "Low":
              // Due in 5-7 days
              dueDate.setDate(today.getDate() + Math.floor(Math.random() * 3) + 5)
              break
          }

          addTask({
            goalId: goal.id,
            title: template.title,
            description: template.description,
            dueDate: dueDate.toISOString(),
            isCompleted: false,
            priority: "Medium",
            category: "Relationships",
            isTopPriority: false,
          })
        }
      })
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
    getGoalsByLifeArea,
    getTodaysTasks,
    getTopPriorityTasks,
    getTasksByDate,
    addContact,
    updateContact,
    deleteContact,
    generateTasksFromTemplates,
  }

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>
}
