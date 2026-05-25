import { useState } from "react";
import "./styles.css";
import Login from "./components/SeccionLogin/Login";
import Registro from "./components/SeccionRegistro/Registro";
import Dashboard from "./components/SeccionDashboard.jsx/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="spa-root">
      <main className="spa-stage">
        <Login />
        <Registro />
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
