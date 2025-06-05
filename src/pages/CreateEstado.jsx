import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateEstado = () => {
  const navigate = useNavigate();
  const [valorEstado, setValorEstado] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valorEstado.trim()) {
      toast.error("Ingrese un estado válido");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/estados", {
        ValorEstado: valorEstado,
      });
      toast.success("Estado creado!");
      navigate("/estado");
    } catch (error) {
      toast.error("Error al crear: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Nuevo Estado</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre del Estado</label>
          <input
            type="text"
            value={valorEstado}
            onChange={(e) => setValorEstado(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej: Perfecto"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)} // Regresa a la página anterior
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-5"
        >
          Regresar
        </button>
      </form>
    </div>
  );
};

export default CreateEstado;
