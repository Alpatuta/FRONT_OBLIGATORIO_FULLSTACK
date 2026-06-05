import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#f1f5f9",
      bodyColor: "#94a3b8",
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#64748b", font: { size: 13 } },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1, color: "#64748b", font: { size: 13 } },
      grid: { color: "#f1f5f9" },
      border: { display: false },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#64748b",
        font: { size: 13 },
        padding: 20,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#f1f5f9",
      bodyColor: "#94a3b8",
      padding: 10,
      cornerRadius: 8,
    },
  },
  cutout: "65%",
};

const Grafico = ({ barData, doughnutData }) => {
  return (
    <div className="charts-grid">
      <div>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "12px" }}>
          Recetas por categoría
        </p>
        <div className="chart-container">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "12px" }}>
          Por dificultad
        </p>
        <div style={{ height: "300px" }}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
};

export default Grafico;