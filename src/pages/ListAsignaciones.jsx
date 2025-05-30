import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListAsignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAsignaciones = async () => {
    try {
      const res = await axios.get("http://localhost:3000/dispositivos-asignacion");
      setAsignaciones(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al cargar asignaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (idDispositivo, idEmpleado) => {
    if (window.confirm("¿Eliminar esta asignación?")) {
      try {
        await axios.delete(`http://localhost:3000/dispositivos-asignacion/${idDispositivo}/${idEmpleado}`);
        toast.success("Asignación eliminada");
        getAsignaciones();
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al eliminar asignación");
      }
    }
  };

  useEffect(() => {
    getAsignaciones();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Asignaciones</h1>
        <Link
          to="/asignaciones/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nueva Asignación
        </Link>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Empleado</th>
                <th className="px-4 py-2">Dispositivo</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Observaciones</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.map((a, index) => (
                <tr key={index} className="border-t text-center">
                  <td className="px-4 py-2">{a.IdEmpleado}</td>
                  <td className="px-4 py-2">{a.IdDispositivo}</td>
                  <td className="px-4 py-2">
                    {new Date(a.FechaAsignacion).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{a.Observaciones || "N/A"}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <Link
                      to={`/asignaciones/edit/${a.IdDispositivo}/${a.IdEmpleado}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(a.IdDispositivo, a.IdEmpleado)}
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

export default ListAsignaciones;
