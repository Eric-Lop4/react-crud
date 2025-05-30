// src/pages/EditAsignacion.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditAsignacion = () => {
  const [formData, setFormData] = useState({
    IdEmpleado: "",
    IdDispositivo: "",
    FechaAsignacion: "",
    Observaciones: ""
  });
  const navigate = useNavigate();
  const { idDispositivo, idEmpleado } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAsignacion = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/dispositivos-asignacion/${idDispositivo}/${idEmpleado}`);
      setFormData(res.data);
    } catch (error) {
      console.error("Error al obtener asignación:", error);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/dispositivos-asignacion/${idDispositivo}/${idEmpleado}`, formData);
      navigate("/asignaciones");
    } catch (error) {
      console.error("Error al editar asignación:", error);
    }
  };

  useEffect(() => {
    getAsignacion();
  }, [getAsignacion]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Editar Asignación</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" name="IdEmpleado" value={formData.IdEmpleado} onChange={handleChange} className="border p-2 w-full" />
        <input type="number" name="IdDispositivo" value={formData.IdDispositivo} onChange={handleChange} className="border p-2 w-full" />
        <input type="date" name="FechaAsignacion" value={formData.FechaAsignacion?.split("T")[0]} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="Observaciones" value={formData.Observaciones} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">Actualizar</button>
      </form>
    </div>
  );
};

export default EditAsignacion;
