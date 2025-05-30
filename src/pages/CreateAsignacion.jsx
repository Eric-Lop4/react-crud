// src/pages/CreateAsignacion.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAsignacion = () => {
  const [formData, setFormData] = useState({
    IdEmpleado: "",
    IdDispositivo: "",
    FechaAsignacion: "",
    Observaciones: ""
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/dispositivos-asignacion", formData);
      navigate("/asignaciones");
    } catch (error) {
      console.error("Error al crear asignación:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Nueva Asignación</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" name="IdEmpleado" placeholder="ID Empleado" onChange={handleChange} required className="border p-2 w-full" />
        <input type="number" name="IdDispositivo" placeholder="ID Dispositivo" onChange={handleChange} required className="border p-2 w-full" />
        <input type="date" name="FechaAsignacion" onChange={handleChange} required className="border p-2 w-full" />
        <input type="text" name="Observaciones" placeholder="Observaciones" onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
      </form>
    </div>
  );
};

export default CreateAsignacion;
