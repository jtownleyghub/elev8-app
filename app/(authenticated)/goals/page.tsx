import { Plus } from "lucide-react"

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Goals</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          New Goal
        </button>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <p className="text-center text-gray-400 py-8">
          Your goals will appear here. Click "New Goal" to create your first goal.
        </p>
      </div>
    </div>
  )
}
