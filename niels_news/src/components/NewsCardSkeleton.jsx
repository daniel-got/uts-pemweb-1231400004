function NewsCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="mb-4 overflow-hidden rounded-2xl border border-black">
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-gray-300 dark:bg-gray-700 h-5 w-12 rounded-full"></div>
        <div className="bg-gray-300 dark:bg-gray-700 h-4 w-24 rounded-full"></div>
      </div>

      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full mb-2"></div>
      <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-full mb-2"></div>

      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full mb-1"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full mb-1"></div>
      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-full mb-3"></div>

      <div className="flex justify-between text-xs font-medium">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}

export default NewsCardSkeleton;
