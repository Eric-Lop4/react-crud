import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateOffice = () => {
  const navigate = useNavigate();
  const [licencia, setLicencia] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!licencia.trim()) {
      toast.error("Ingrese una licencia válida");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/Office", {
        Licencia: licencia,
      });
      toast.success("Licencia creada!");
      navigate("/office");
    } catch (error) {
      toast.error("Error al crear: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Nueva Licencia Office</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre de la Licencia</label>
          <input
            type="text"
            value={licencia}
            onChange={(e) => setLicencia(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej: Office 365 Pro Plus"
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

export default CreateOffice;
