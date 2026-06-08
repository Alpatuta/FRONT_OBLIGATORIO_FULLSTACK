import { useEffect, useState } from "react";
import BadgeGemini from "../ui/BadgeGemini";

const AnimatedStat = ({ value }) => {
  const str = String(value);
  const match = str.match(/^([^\d]*)(\d+)([^\d]*)$/);
  const target = match ? parseInt(match[2], 10) : null;
  const [count, setCount] = useState(target !== null ? 0 : null);

  useEffect(() => {
    if (target === null || target === 0) return;
    const timer = setTimeout(() => {
      const duration = 800;
      const start = performance.now();
      let rafId;
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      rafId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(rafId);
    }, 550);
    return () => clearTimeout(timer);
  }, [target]);

  if (target === null) return <>{value}</>;
  return (
    <>
      {match[1]}
      {count}
      {match[3]}
    </>
  );
};

const AuthVisual = () => {
  return (
    <section className="auth-visual" aria-label="Presentación de Recetario IA">
      <div className="auth-visual-brand">
        <a className="brand" href="/">
          <img
            src="https://res.cloudinary.com/dfa3ts2kx/image/upload/v1780920016/recetario_ia_body_icon_clean_m84obu.svg"
            alt="Recetario IA"
            className="brand-mark"
            style={{ background: "transparent" }}
          />
          <span style={{ color: "#f1f5f9" }}>Recetario IA</span>
        </a>
      </div>

      {/* Podria ser una imagen */}
      <span className="auth-visual-deco" aria-hidden="true">
        🍽
      </span>

      <div className="auth-visual-copy">
        <p className="eyebrow" style={{ color: "#4ade80" }}>
          Cocina organizada
        </p>
        <h1>Gestiona tus recetas con inteligencia artificial.</h1>
        <p>
          Crea, organiza y adapta preparaciones con IA. Controla tu plan, sube
          imágenes y descubre nuevas ideas culinarias.
        </p>

        <div className="visual-stats-grid">
          <div className="visual-stat">
            <strong>IA</strong>
            <span>Generación y adaptación automática</span>
          </div>
          <div className="visual-stat">
            <strong>
              <AnimatedStat value="4+" />
            </strong>
            <span>Recetas disponibles en plan plus</span>
          </div>
          <div className="visual-stat">
            <strong>∞</strong>
            <span>Recetas ilimitadas en premium</span>
          </div>
          <div className="visual-stat">
            <strong>
              <AnimatedStat value="+33" />
            </strong>
            <span>Tipos de adaptación disponibles</span>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <BadgeGemini size="md" />
        </div>
      </div>
    </section>
  );
};

export default AuthVisual;
