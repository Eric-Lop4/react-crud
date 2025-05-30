import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateHardware = () => {
  const navigate = useNavigate();
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [disDur, setDisDur] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cpu.trim() || !ram.trim() || !disDur.trim()) {
      toast.error("Complete todos los campos");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/Hardware", {
        CPU: cpu,
        RAM: ram,
        DisDur: disDur,
      });
      toast.success("Hardware creado!");
      navigate("/hardware");
    } catch (error) {
      toast.error("Error al crear: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Nuevo Hardware</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">CPU</label>
          <input
            type="text"
            value={cpu}
            onChange={(e) => setCpu(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej: Intel Core i5"
          />
        </div>
        <div>
          <label className="block mb-1">RAM</label>
          <input
            type="text"
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej: 8GB"
          />
        </div>
        <div>
          <label className="block mb-1">Disco Duro</label>
          <input
            type="text"
            value={disDur}
            onChange={(e) => setDisDur(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej: SSD M.2"
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

export default CreateHardware;
