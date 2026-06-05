import { createContext, useContext, useState } from "react";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState("resumen");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <DashboardContext.Provider value={{ currentSection, setCurrentSection, sidebarOpen, toggleSidebar, closeSidebar }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
};
