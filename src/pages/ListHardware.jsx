import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListHardware = () => {
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHardware = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Hardware");
      setHardware(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al cargar hardware");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHardware();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este hardware?")) {
      try {
        await axios.delete(`http://localhost:3000/Hardware/${id}`);
        toast.success("Hardware eliminado");
        fetchHardware();
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hardware</h1>
        <Link
          to="/hardware/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nuevo Hardware
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">CPU</th>
                <th className="px-4 py-2">RAM</th>
                <th className="px-4 py-2">Disco Duro</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {hardware.map((item) => (
                <tr key={item.IdHardware} className="border-t">
                  <td className="px-4 py-2 text-center">{item.IdHardware}</td>
                  <td className="px-4 py-2 text-center">{item.CPU}</td>
                  <td className="px-4 py-2 text-center">{item.RAM}</td>
                  <td className="px-4 py-2 text-center">{item.DisDur}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Link
                      to={`/hardware/edit/${item.IdHardware}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(item.IdHardware)}
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

export default ListHardware;
