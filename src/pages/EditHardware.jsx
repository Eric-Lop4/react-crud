import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditHardware = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [disDur, setDisDur] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHardware = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/Hardware/${id}`);
        setCpu(res.data.CPU);
        setRam(res.data.RAM);
        setDisDur(res.data.DisDur);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al cargar hardware");
      }
    };
    fetchHardware();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/Hardware/${id}`, {
        CPU: cpu,
        RAM: ram,
        DisDur: disDur,
      });
      toast.success("Hardware actualizado!");
      navigate("/hardware");
    } catch (error) {
      toast.error("Error al actualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Editar Hardware</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">CPU</label>
          <input
            type="text"
            value={cpu}
            onChange={(e) => setCpu(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">RAM</label>
          <input
            type="text"
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Disco Duro</label>
          <input
            type="text"
            value={disDur}
            onChange={(e) => setDisDur(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Actualizando..." : "Actualizar"}
        </button>
      </form>
    </div>
  );
};

export default EditHardware;
