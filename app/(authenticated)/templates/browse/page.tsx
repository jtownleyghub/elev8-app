"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, BookOpen } from "lucide-react"

export default function TemplateBrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample template categories
  const categories = [
    "All Templates",
    "Aspirational",
    "Career",
    "Finance",
    "Health",
    "Relationships",
    "Personal Growth",
  ]

  // Sample templates
  const templates = [
    {
      id: "japan-travel",
      title: "Travel to Japan",
      description: "Experience the culture, food, and beauty of Japan",
      category: "Aspirational",
      tasks: 8,
      image: "/aspirations/japan-travel.png",
    },
    {
      id: "hot-air-balloon",
      title: "Fly in a Hot Air Balloon",
      description: "Soar above the landscape in a hot air balloon adventure",
      category: "Aspirational",
      tasks: 5,
      image: "/aspirations/hot-air-balloon.png",
    },
    {
      id: "write-book",
      title: "Write a Book",
      description: "Plan, write, and publish your own book",
      category: "Aspirational",
      tasks: 12,
      image: "/aspirations/write-book.png",
    },
    {
      id: "run-10k",
      title: "Run a 10K",
      description: "Train and complete a 10K running event",
      category: "Health",
      tasks: 10,
      image: "/aspirations/run-10k.png",
    },
    {
      id: "meditation",
      title: "Learn to Meditate",
      description: "Develop a consistent meditation practice",
      category: "Personal Growth",
      tasks: 7,
      image: "/aspirations/meditation.png",
    },
    {
      id: "relationship",
      title: "Strengthen a Relationship",
      description: "Deepen your connection with someone important",
      category: "Relationships",
      tasks: 9,
      image: "/aspirations/strengthen-relationship.png",
    },
  ]

  // Filter templates based on search query
  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Goal Library</h1>
          <p className="text-gray-400">Browse and discover templates to achieve your aspirations</p>
        </div>
        <div className="mt-4 md:mt-0 relative w-full md:w-64">
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <Tabs defaultValue="All Templates" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-gray-800">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="data-[state=active]:bg-indigo-600">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates
                .filter((template) => category === "All Templates" || template.category === category)
                .map((template) => (
                  <Card
                    key={template.id}
                    className="bg-gray-800 border-gray-700 overflow-hidden hover:border-indigo-500 transition-all"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={template.image || "/placeholder.svg"}
                        alt={template.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{template.title}</CardTitle>
                      <CardDescription className="text-gray-400">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {template.tasks} tasks
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Use This Template</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
