import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListDispositivos = () => {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTipos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tipos");
      setTipos(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al cargar tipos de dispositivo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este tipo de dispositivo?")) {
      try {
        await axios.delete(`http://localhost:3000/tipos/${id}`);
        toast.success("Tipo eliminado");
        fetchTipos();
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tipos de Dispositivo</h1>
        <Link
          to="/tipos/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nuevo Tipo
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre del Tipo</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tipos.map((tipo) => (
                <tr key={tipo.IdTipoDisp} className="border-t">
                  <td className="px-4 py-2 text-center">{tipo.IdTipoDisp}</td>
                  <td className="px-4 py-2 text-center">{tipo.ValorTipo}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Link
                      to={`/tipos/edit/${tipo.IdTipoDisp}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(tipo.IdTipoDisp)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListDispositivos;
