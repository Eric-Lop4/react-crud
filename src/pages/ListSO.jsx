import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListSO = () => {
  const [sistemas, setSistemas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSO = async () => {
    try {
      const res = await axios.get("http://localhost:3000/so");
      setSistemas(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al cargar los sistemas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSO();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este sistema operativo?")) {
      try {
        await axios.delete(`http://localhost:3000/so/${id}`);
        toast.success("SO eliminado");
        fetchSO();
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sistemas Operativos</h1>
        <Link
          to="/sistemas/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nuevo SO
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
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Licencia</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sistemas.map((so) => (
                <tr key={so.IdSO} className="border-t">
                  <td className="px-4 py-2 text-center">{so.IdSO}</td>
                  <td className="px-4 py-2 text-center">{so.NomSO}</td>
                  <td className="px-4 py-2 text-center">{so.Licencia}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Link
                      to={`/sistemas/edit/${so.IdSO}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(so.IdSO)}
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

export default ListSO;
