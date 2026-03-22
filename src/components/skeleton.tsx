export default function Skeleton() {
  return (
    <div className="pt-7.5">
      <div className="animate-pulse space-y-8 mt-8">
        <div className="h-24 md:h-8 md:flex md:justify-between space-y-4 md:space-y-0">
          <div className="bg-gray-300 rounded-xl h-8 md:w-1/2" />
          <div className="bg-gray-300 rounded-xl h-8 md:block-0" />
        </div>

        <div className="space-y-3">
          <div className="flex">
            <div className="flex-1 space-y-4 space-x-4">
              <div className="h-8 bg-gray-300 rounded-xl w-24" />
              <div className="h-20 bg-gray-300 rounded-xl" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-20 md:h-8 justify-between">
            <div className="bg-gray-300 rounded-xl h-8 w-full md:w-24" />
            <div className="flex justify-between space-x-2 space-y-2">
              <div className="bg-gray-300 rounded-full h-8 w-24" />
              <div className="bg-gray-300 rounded-full h-8 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}