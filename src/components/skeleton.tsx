export default function Skeleton() {
  return (
    <div>
      <h1 className="text-3xl font-bold">รายการที่คุณต้องทำ</h1>
      <div className="animate-pulse space-y-8 mt-8">
        <div className="h-24 md:h-8 md:flex md:justify-between space-y-4 md:space-y-0">
          <div className="bg-gray-300 rounded-xl h-8 md:w-36" />
          <div className="bg-gray-300 rounded-xl h-8 md:w-16" />
        </div>

        <div className="space-y-3">
          <div className="flex">
            <div className="flex-1 space-y-4 space-x-4">
              <div className="h-8 bg-gray-300 rounded-xl w-24" />
              <div className="h-20 bg-gray-300 rounded-xl" />
            </div>
            <div className="h-8 w-10 bg-gray-300 rounded-xl"/>
          </div>

          <div className="flex h-8 justify-between">
            <div className="bg-gray-300 rounded-xl w-24" />
            <div className="flex space-x-4">
              <div className="bg-gray-300 rounded-full w-24" />
              <div className="bg-gray-300 rounded-full w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}