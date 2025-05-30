import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListOffice = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOffices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Office");
      setOffices(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al cargar Office");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta licencia de Office?")) {
      try {
        await axios.delete(`http://localhost:3000/Office/${id}`);
        toast.success("Licencia eliminada");
        fetchOffices();
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Licencias Office</h1>
        <Link
          to="/office/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nueva Licencia
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
                <th className="px-4 py-2">Licencia</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {offices.map((item) => (
                <tr key={item.IdOffice} className="border-t">
                  <td className="px-4 py-2 text-center">{item.IdOffice}</td>
                  <td className="px-4 py-2 text-center">{item.Licencia}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Link
                      to={`/office/edit/${item.IdOffice}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(item.IdOffice)}
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

export default ListOffice;
