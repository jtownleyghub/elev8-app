"use client"

import { useState } from "react"
import { Plus, Edit2, Save, X } from "lucide-react"

interface ScheduleItem {
  id: string
  time: string
  activity: string
  category: string
}

export function DailyPlanSummary() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { id: "1", time: "07:00 AM", activity: "Morning Routine", category: "Personal" },
    { id: "2", time: "08:30 AM", activity: "Team Meeting", category: "Work" },
    { id: "3", time: "10:00 AM", activity: "Project Work", category: "Work" },
    { id: "4", time: "12:00 PM", activity: "Lunch Break", category: "Personal" },
    { id: "5", time: "01:00 PM", activity: "Client Call", category: "Work" },
    { id: "6", time: "03:00 PM", activity: "Gym Session", category: "Health" },
    { id: "7", time: "05:00 PM", activity: "Reading Time", category: "Learning" },
    { id: "8", time: "07:00 PM", activity: "Dinner", category: "Personal" },
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [newActivity, setNewActivity] = useState({ time: "", activity: "", category: "Personal" })
  const [editingId, setEditingId] = useState<string | null>(null)

  const categories = ["Personal", "Work", "Health", "Learning", "Social"]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "bg-blue-500"
      case "Personal":
        return "bg-purple-500"
      case "Health":
        return "bg-green-500"
      case "Learning":
        return "bg-yellow-500"
      case "Social":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleAddActivity = () => {
    if (newActivity.time && newActivity.activity) {
      setSchedule([...schedule, { id: Date.now().toString(), ...newActivity }])
      setNewActivity({ time: "", activity: "", category: "Personal" })
    }
  }

  const startEditing = (item: ScheduleItem) => {
    setEditingId(item.id)
    setNewActivity({
      time: item.time,
      activity: item.activity,
      category: item.category,
    })
  }

  const saveEdit = () => {
    if (editingId && newActivity.time && newActivity.activity) {
      setSchedule(
        schedule.map((item) =>
          item.id === editingId
            ? { ...item, time: newActivity.time, activity: newActivity.activity, category: newActivity.category }
            : item,
        ),
      )
      setEditingId(null)
      setNewActivity({ time: "", activity: "", category: "Personal" })
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setNewActivity({ time: "", activity: "", category: "Personal" })
  }

  const removeActivity = (id: string) => {
    setSchedule(schedule.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Today's Schedule</h3>
        <button className="text-sm text-indigo-400 hover:text-indigo-300" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Done" : "Edit Plan"}
        </button>
      </div>

      {isEditing && (
        <div className="bg-gray-700/50 p-3 rounded-lg space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Time (e.g. 09:00 AM)"
              value={newActivity.time}
              onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Activity"
              value={newActivity.activity}
              onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <select
              value={newActivity.category}
              onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            {editingId ? (
              <div className="space-x-2">
                <button
                  onClick={saveEdit}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm flex items-center"
                >
                  <Save className="h-3 w-3 mr-1" /> Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm flex items-center"
                >
                  <X className="h-3 w-3 mr-1" /> Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddActivity}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm flex items-center"
              >
                <Plus className="h-3 w-3 mr-1" /> Add
              </button>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {schedule
          .sort((a, b) => {
            // Convert time strings to comparable values (assuming 12-hour format)
            const timeA = a.time.replace(/(\d+):(\d+) (AM|PM)/, (_, h, m, ampm) => {
              let hour = Number.parseInt(h)
              if (ampm === "PM" && hour < 12) hour += 12
              if (ampm === "AM" && hour === 12) hour = 0
              return `${hour.toString().padStart(2, "0")}:${m}`
            })

            const timeB = b.time.replace(/(\d+):(\d+) (AM|PM)/, (_, h, m, ampm) => {
              let hour = Number.parseInt(h)
              if (ampm === "PM" && hour < 12) hour += 12
              if (ampm === "AM" && hour === 12) hour = 0
              return `${hour.toString().padStart(2, "0")}:${m}`
            })

            return timeA.localeCompare(timeB)
          })
          .map((item) => (
            <div key={item.id} className="flex items-start group">
              <div className="w-20 text-sm text-gray-400">{item.time}</div>
              <div className="flex-1">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${getCategoryColor(item.category)}`}></div>
                  <span>{item.activity}</span>
                  {isEditing && (
                    <div className="ml-auto flex space-x-1">
                      <button onClick={() => startEditing(item)} className="text-gray-400 hover:text-indigo-400">
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button onClick={() => removeActivity(item.id)} className="text-gray-400 hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-400 ml-4">{item.category}</div>
              </div>
            </div>
          ))}

        {schedule.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            <p>No activities scheduled for today.</p>
          </div>
        )}
      </div>
    </div>
  )
}
