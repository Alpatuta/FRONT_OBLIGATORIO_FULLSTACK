import MainDashboard from "./Main/MainDashboard";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <section
      id="dashboard"
      className="screen screen-dashboard"
      aria-labelledby="dashboard-title"
    >
      <div className="app-layout">
        <Sidebar />
        <MainDashboard />
      </div>
    </section>
  );
};

export default Dashboard;
