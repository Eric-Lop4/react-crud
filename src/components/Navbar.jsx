import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import React from "react";

const Navbar = ({ setIsLoggedIn }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-800 py-3 text-white">
      <div className="container mx-auto px-4 flex items-center">
        <Link to="/" className="text-2xl font-bold" onClick={closeMenu}>
          Dispositivos Plasfesa
        </Link>
        <Link
          to="/dispositivos"
          className="bg-cyan-400 text-white font-bold px-4 py-2 rounded-md ml-4 hover:bg-cyan-600 no-underline"
          onClick={closeMenu}
        >
          Vista tabla de los dispositivos 
        </Link>
        <div className="flex items-center ml-auto gap-4">
          <button
            className="block xs:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 whitespace-nowrap"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="hidden sm:hidden md:flex gap-2 flex-wrap mt-2 px-4">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="shadow-md bg-green-700 text-white rounded px-3 py-1 text-sm font-bold hover:bg-green-600 transition-colors"
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {open && (
        <div className="xs:hidden px-4 mt-2 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className="shadow-md bg-green-700 text-white rounded px-3 py-1 text-sm font-bold hover:bg-green-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
