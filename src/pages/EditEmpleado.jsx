/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [departamento, setDepartamento] = useState("");

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/Empleados/${id}`);
        setNom(res.data.Nom);
        setDepartamento(res.data.Departamento);
      } catch (error) {
        toast.error("Error al cargar empleado");
      }
    };
    fetchEmpleado();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/Empleados/${id}`, {
        Nom: nom,
        Departamento: departamento,
      });
      toast.success("Empleado actualizado");
      navigate("/empleados");
    } catch (error) {
      toast.error("Error al actualizar empleado");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Editar Empleado</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Departamento</label>
          <input
            type="text"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Actualizar
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)} // Regresa a la página anterior
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-4"
        >
          Regresar
        </button>
      </form>
    </div>
  );
};

export default EditEmpleado;
