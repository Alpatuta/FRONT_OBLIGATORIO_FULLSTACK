import { DashboardProvider } from "../../context/DashboardContext";
import MainDashboard from "./Main/MainDashboard";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <section
        className="screen screen-dashboard"
        aria-labelledby="dashboard-title"
      >
        <div className="app-layout">
          <Sidebar />
          <MainDashboard />
        </div>
      </section>
    </DashboardProvider>
  );
};

export default Dashboard;
