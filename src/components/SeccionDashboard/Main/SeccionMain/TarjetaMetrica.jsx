import { useEffect, useState } from "react";

const AnimatedValue = ({ value }) => {
  const str = String(value);
  const match = str.match(/^(\d+)(.*)/);
  const target = match ? parseInt(match[1], 10) : null;
  const [count, setCount] = useState(target !== null ? 0 : null);

  useEffect(() => {
    if (target === null || target === 0) return;
    const duration = 700;
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
  }, [target]);

  if (target === null) return <>{value}</>;
  return <>{count}{match[2]}</>;
};

const TarjetaMetrica = ({ label, value, sub, colorClass, icon }) => {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${colorClass}`}>{icon}</div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        <AnimatedValue value={value} />
      </div>
      <div className="metric-sub">{sub}</div>
    </article>
  );
};

export default TarjetaMetrica;
