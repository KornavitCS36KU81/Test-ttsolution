import { useState, ReactNode } from "react"
import { useTabs, TabsContext } from "@/context/TabContext"

export function Tab({
  defaultValue,
  children,
}: {
  defaultValue: boolean;
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className="md:max-w-2/3 md:mx-auto">
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="flex space-x-4 mb-4">{children}</div>;
}

export function TabTrigger({value, children}:{value: boolean, children: ReactNode}) {
  const { activeTab, setActiveTab } = useTabs();

  const isActive = activeTab === value;
  
  return (
      <button
        onClick={() => setActiveTab(value)}
        className={`flex-1 rounded-xl px-4 py-2 ${
          isActive ? "bg-black text-white font-bold" : "text-gray-400 border"
        }`}
      >
        {children}
      </button>
  )
}

export function TabContent({ value, children }:{ value:boolean, children: ReactNode }) {
  const { activeTab } = useTabs();

  if (activeTab !== value) return <></>;

  return (
    <div className="space-y-4">{children}</div>
  )
}