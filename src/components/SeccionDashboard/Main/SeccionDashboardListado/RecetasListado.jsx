import TarjetaReceta from "./TarjetaReceta";

const RECETAS_DEMO = [
  {
    id: 1,
    titulo: "Tarta rústica de verduras",
    categoria: "Vegetariana",
    dificultad: "Media",
    ingredientes: 6,
    emoji: "🥗",
  },
  {
    id: 2,
    titulo: "Pasta al pesto casero",
    categoria: "Pastas",
    dificultad: "Fácil",
    ingredientes: 5,
    emoji: "🍝",
  },
  {
    id: 3,
    titulo: "Brownies de chocolate negro",
    categoria: "Postres",
    dificultad: "Media",
    ingredientes: 8,
    emoji: "🍫",
  },
];

const RecetasListado = () => {
  return (
    <div className="recipe-list">
      {RECETAS_DEMO.map((receta) => (
        <TarjetaReceta key={receta.id} receta={receta} />
      ))}
    </div>
  );
};

export default RecetasListado;
