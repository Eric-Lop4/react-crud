import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import React from "react";

const Navbar = () => {
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

  return (
    <nav className="bg-gray-800 py-3 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold" onClick={closeMenu}>
          Dispositivos Plasfesa
        </Link>

        <button className="block xs:hidden" onClick={toggleMenu}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden sm:hidden md:flex gap-2 flex-wrap">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="shadow-md bg-green-700 text-white rounded px-3 py-1 text-sm font-bold hover:bg-green-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
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
