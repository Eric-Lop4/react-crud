import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEstado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [valorEstado, setValorEstado] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEstado = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/estados/${id}`);
        setValorEstado(res.data.ValorEstado);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al cargar estado");
      }
    };
    fetchEstado();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/estados/${id}`, {
        ValorEstado: valorEstado,
      });
      toast.success("Estado actualizado!");
      navigate("/estado");
    } catch (error) {
      toast.error("Error al actualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Editar Estado</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre del Estado</label>
          <input
            type="text"
            value={valorEstado}
            onChange={(e) => setValorEstado(e.target.value)}
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

export default EditEstado;