import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListUbicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUbicaciones = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Ubicacion");
      setUbicaciones(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al cargar ubicaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta ubicación?")) {
      try {
        await axios.delete(`http://localhost:3000/Ubicacion/${id}`);
        toast.success("Ubicación eliminada");
        fetchUbicaciones();
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Departamentos</h1>
        <Link
          to="/ubicaciones/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nueva Ubicación
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
                <th className="px-4 py-2">Departamento</th>
              </tr>
            </thead>
            <tbody>
              {ubicaciones.map((ubic) => (
                <tr key={ubic.IdUbicacion} className="border-t">
                  <td className="px-4 py-2 text-center">{ubic.IdUbicacion}</td>
                  <td className="px-4 py-2 text-center">{ubic.Departamento}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Link
                      to={`/ubicaciones/edit/${ubic.IdUbicacion}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(ubic.IdUbicacion)}
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

export default ListUbicaciones;