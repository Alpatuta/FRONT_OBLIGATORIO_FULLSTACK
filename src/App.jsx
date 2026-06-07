import "./styles.css";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ContainerPage from "./pages/ContainerPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useState } from "react";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContainerPage />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="registro" element={<RegistroPage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors />
    </Provider>
  );
}

export default App;
