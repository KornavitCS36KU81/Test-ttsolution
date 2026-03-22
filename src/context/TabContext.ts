import { createContext, useContext } from "react";

type TabsContextType = {
  activeTab: boolean;
  setActiveTab: (tab: boolean) => void;
};

export const TabsContext = createContext<TabsContextType | null>(null);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs must be used within TabsProvider");
  return context;
};