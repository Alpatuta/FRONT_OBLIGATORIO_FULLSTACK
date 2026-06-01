import Grafico from "./Grafico";
import HeaderGrafico from "./HeaderGrafico";

const SeccionDashboardGrafico = () => {
  return (
    <section className="panel">
      <HeaderGrafico />
      <Grafico />
    </section>
  );
};

export default SeccionDashboardGrafico;
