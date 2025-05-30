import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateUbicacion = () => {
  const navigate = useNavigate();
  const [departamento, setDepartamento] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!departamento.trim()) {
      toast.error("Ingrese un nombre válido");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/Ubicacion", {
        Departamento: departamento,
      });
      toast.success("Ubicación creada!");
      navigate("/ubicaciones");
    } catch (error) {
      toast.error("Error al crear: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Nuevo Departamento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre del Departamento</label>
          <input
            type="text"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej: Recursos Humanos"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default CreateUbicacion;