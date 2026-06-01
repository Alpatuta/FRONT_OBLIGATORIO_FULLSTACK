import HeaderListado from "./HeaderListado";
import RecetasListado from "./RecetasListado";

const SeccionDashboardListado = () => {
  return (
    <section className="card">
      <HeaderListado />
      <RecetasListado />
    </section>
  );
};

export default SeccionDashboardListado;
