import SeccionDashboardAlta from "./SeccionDashboardAlta/SeccionDashboardAlta";
import SeccionDashboardGrafico from "./SeccionDashboardGrafico/SeccionDashboardGrafico";
import SeccionDashboardListado from "./SeccionDashboardListado/SeccionDashboardListado";
import SeccionMain from "./SeccionMain/SeccionMain";

const MainDashboard = () => {
  return (
    <main className="dashboard">
      <SeccionMain />
      <SeccionDashboardAlta />
      <SeccionDashboardListado />
      <SeccionDashboardGrafico />
    </main>
  );
};

export default MainDashboard;
