import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ListUbicaciones from "./pages/ListUbicaciones";
import EditUbicacion from "./pages/EditUbicacion";
import CreateUbicacion from "./pages/CreateUbicacion";
import ListDispositivos from "./pages/ListDispositivos";
import CreateDispositivos from "./pages/CreateDispositivos";
import EditDispositivos from "./pages/EditDispositivos";
import ListSO from "./pages/ListSO";
import CreateSO from "./pages/CreateSO";
import EditSO from "./pages/EditSO";
import ListOffice from "./pages/ListOffice";
import CreateOffice from "./pages/CreateOffice";
import EditOffice from "./pages/EditOffice";
import ListEstado from "./pages/ListEstado";
import CreateEstado from "./pages/CreateEstado";
import EditEstado from "./pages/EditEstado";
import ListHardware from "./pages/ListHardware";
import CreateHardware from "./pages/CreateHardware";
import EditHardware from "./pages/EditHardware";
import ListEmpleados from "./pages/ListEmpleados";
import CreateEmpleado from "./pages/CreateEmpleado";
import EditEmpleado from "./pages/EditEmpleado";
import ListAsignaciones from "./pages/ListAsignaciones";
import CreateAsignacion from "./pages/CreateAsignacion";
import EditAsignacion from "./pages/EditAsignacion";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import ListDispositivosVista from "./pages/ListDispositivosVista";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <div className="min-h-screen">
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

          <Route
            path="/"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <CreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <EditPage />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/dispositivos"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <ListDispositivosVista />
              </PrivateRoute>
            }
          />

          <Route path="/ubicaciones" element={<PrivateRoute isLoggedIn={isLoggedIn}><ListUbicaciones /></PrivateRoute>} />
          <Route path="/ubicaciones/create" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateUbicacion /></PrivateRoute>} />
          <Route path="/ubicaciones/edit/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditUbicacion /></PrivateRoute>} />

          <Route path="/tipos" element={<PrivateRoute isLoggedIn={isLoggedIn}><ListDispositivos /></PrivateRoute>} />
          <Route path="/tipos/create" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateDispositivos /></PrivateRoute>} />
          <Route path="/tipos/edit/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditDispositivos /></PrivateRoute>} />

          <Route path="/sistemas" element={<PrivateRoute isLoggedIn={isLoggedIn}><ListSO /></PrivateRoute>} />
          <Route path="/sistemas/create" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateSO /></PrivateRoute>} />
          <Route path="/sistemas/edit/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditSO /></PrivateRoute>} />

          <Route path="/office" element={<PrivateRoute isLoggedIn={isLoggedIn}><ListOffice /></PrivateRoute>} />
          <Route path="/office/create" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateOffice /></PrivateRoute>} />
          <Route path="/office/edit/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditOffice /></PrivateRoute>} />

          <Route path="/estado" element={<PrivateRoute isLoggedIn={isLoggedIn}><ListEstado /></PrivateRoute>} />
          <Route path="/estado/create" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateEstado /></PrivateRoute>} />
          <Route path="/estado/edit/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditEstado /></PrivateRoute>} />

          <Route path="/hardware" element={<PrivateRoute isLoggedIn={isLoggedIn}><ListHardware /></PrivateRoute>} />
          <Route path="/hardware/create" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateHardware /></PrivateRoute>} />
          <Route path="/hardware/edit/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditHardware /></PrivateRoute>} />

          <Route path="/empleados" element={<PrivateRoute isLoggedIn={isLoggedIn}><ListEmpleados /></PrivateRoute>} />
          <Route path="/empleados/create" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateEmpleado /></PrivateRoute>} />
          <Route path="/empleados/edit/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditEmpleado /></PrivateRoute>} />

          <Route path="/asignaciones" element={<PrivateRoute isLoggedIn={isLoggedIn}><ListAsignaciones /></PrivateRoute>} />
          <Route path="/asignaciones/create" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateAsignacion /></PrivateRoute>} />
          <Route path="/asignaciones/edit/:idDispositivo/:idEmpleado" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditAsignacion /></PrivateRoute>} />
        </Routes>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default App;
