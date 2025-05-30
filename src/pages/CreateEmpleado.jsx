import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CreateEmpleado = () => {
  const [nom, setNom] = useState("");
  const [departamento, setDepartamento] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom.trim() || !departamento.trim()) {
      toast.error("Complete todos los campos");
      return;
    }

    try {
      await axios.post("http://localhost:3000/Empleados", {
        Nom: nom,
        Departamento: departamento,
      });
      toast.success("Empleado creado");
      navigate("/empleados");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al crear empleado");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Nuevo Empleado</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej: Eric Lopez"
          />
        </div>
        <div>
          <label className="block mb-1">Departamento</label>
          <input
            type="text"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej: Informática"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CreateEmpleado;
