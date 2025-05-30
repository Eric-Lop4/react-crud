import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListEstado = () => {
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEstados = async () => {
    try {
      const res = await axios.get("http://localhost:3000/estados");
      setEstados(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al cargar estados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstados();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este estado?")) {
      try {
        await axios.delete(`http://localhost:3000/estados/${id}`);
        toast.success("Estado eliminado");
        fetchEstados();
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Estados</h1>
        <Link
          to="/estado/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nuevo Estado
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
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estados.map((item) => (
                <tr key={item.IdEstado} className="border-t">
                  <td className="px-4 py-2 text-center">{item.IdEstado}</td>
                  <td className="px-4 py-2 text-center">{item.ValorEstado}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Link
                      to={`/estado/edit/${item.IdEstado}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(item.IdEstado)}
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

export default ListEstado;
