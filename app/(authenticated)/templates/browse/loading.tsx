export default function TemplatesBrowseLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="h-8 w-48 bg-gray-700 rounded-md animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-64">
          <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-full md:w-2/3 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="hidden md:block h-10 w-24 bg-gray-700 rounded-md animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <div className="h-40 bg-gray-700 animate-pulse"></div>
              <div className="p-6">
                <div className="h-6 w-3/4 bg-gray-700 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-gray-700 rounded-md animate-pulse mb-4"></div>
                <div className="h-4 w-1/3 bg-gray-700 rounded-md animate-pulse mb-4"></div>
                <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
