import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/ubicaciones", label: "Ubicaciones" },
    { to: "/tipos", label: "Tipos" },
    { to: "/sistemas", label: "S.O" },
    { to: "/office", label: "Office" },
    { to: "/estado", label: "Estado" },
    { to: "/hardware", label: "Hardware" },
    { to: "/empleados", label: "Empleados" },
    { to: "/asignaciones", label: "Asignaciones" },
  ];

  return (
    <div className="min-h-screen">
      <nav className="bg-gray-800 py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="mr-4">
              <h2 className="text-white text-2xl font-bold">Dispositivos Plasfesa</h2>
            </Link>

            <div className="sm:hidden md:flex flex-wrap gap-2">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="shadow-md bg-green-700 text-white rounded px-3 py-1 text-sm font-bold hover:bg-green-600 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="flex flex-col gap-2 mt-3 s:hidden">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className="shadow-md bg-green-700 text-white rounded px-3 py-2 text-sm font-bold hover:bg-green-600 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/ubicaciones" element={<ListUbicaciones />} />
          <Route path="/ubicaciones/create" element={<CreateUbicacion />} />
          <Route path="/ubicaciones/edit/:id" element={<EditUbicacion />} />
          <Route path="/tipos" element={<ListDispositivos />} />
          <Route path="/tipos/create" element={<CreateDispositivos />} />
          <Route path="/tipos/edit/:id" element={<EditDispositivos />} />
          <Route path="/sistemas" element={<ListSO />} />
          <Route path="/sistemas/create" element={<CreateSO />} />
          <Route path="/sistemas/edit/:id" element={<EditSO />} />
          <Route path="/office" element={<ListOffice />} />
          <Route path="/office/create" element={<CreateOffice />} />
          <Route path="/office/edit/:id" element={<EditOffice />} />
          <Route path="/estado" element={<ListEstado />} />
          <Route path="/estado/create" element={<CreateEstado />} />
          <Route path="/estado/edit/:id" element={<EditEstado />} />
          <Route path="/hardware" element={<ListHardware />} />
          <Route path="/hardware/create" element={<CreateHardware />} />
          <Route path="/hardware/edit/:id" element={<EditHardware />} />
          <Route path="/empleados" element={<ListEmpleados />} />
          <Route path="/empleados/create" element={<CreateEmpleado />} />
          <Route path="/empleados/edit/:id" element={<EditEmpleado />} />
          <Route path="/asignaciones" element={<ListAsignaciones />} />
          <Route path="/asignaciones/create" element={<CreateAsignacion />} />
          <Route path="/asignaciones/edit/:idDispositivo/:idEmpleado" element={<EditAsignacion />} />
        </Routes>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default App;
