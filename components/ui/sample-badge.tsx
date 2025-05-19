import { Info } from "lucide-react"

interface SampleBadgeProps {
  className?: string
}

export function SampleBadge({ className }: SampleBadgeProps) {
  return (
    <div
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 ${className}`}
    >
      <Info className="h-3 w-3 mr-1" />
      Sample
    </div>
  )
}
