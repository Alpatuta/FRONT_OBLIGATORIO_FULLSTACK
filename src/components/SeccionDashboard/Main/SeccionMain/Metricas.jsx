import TarjetaMetrica from "./TarjetaMetrica";

const Metricas = () => {
  return (
    <section className="metrics-grid" aria-label="Resumen de uso">
      <TarjetaMetrica />
      <TarjetaMetrica />
      <TarjetaMetrica />
      <TarjetaMetrica />
    </section>
  );
};

export default Metricas;
