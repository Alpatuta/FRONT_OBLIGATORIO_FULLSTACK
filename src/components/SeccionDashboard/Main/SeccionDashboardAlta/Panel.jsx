import FormularioAltaReceta from "./FormularioAltaReceta";
import HeaderPanel from "./HeaderPanel";

const Panel = () => {
  return (
    <article className="card">
      <HeaderPanel />
      <FormularioAltaReceta />
    </article>
  );
};

export default Panel;
