export default function RecipeDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image Skeleton */}
          <div className="h-64 bg-gray-200 animate-pulse"></div>
          
          <div className="p-8">
            {/* Title Skeleton */}
            <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
            
            {/* Recipe Info Skeleton */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-28"></div>
            </div>

            {/* Summary Skeleton */}
            <div className="mb-8">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-48"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
            </div>

            {/* Ingredients Skeleton */}
            <div className="mb-8">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-32"></div>
              <div className="grid gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 