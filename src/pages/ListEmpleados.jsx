/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);

  const fetchEmpleados = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Empleados");
      setEmpleados(res.data);
     
    } catch (error) {
      toast.error("Error al cargar empleados");
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este empleado?")) {
      try {
        await axios.delete(`http://localhost:3000/Empleados/${id}`);
        toast.success("Empleado eliminado");
        fetchEmpleados();
      } catch (error) {
        toast.error("Error al eliminar empleado");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Empleados</h1>
        <Link
          to="/empleados/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nuevo Empleado
        </Link>
      </div>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Departamento</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp.IdEmpleado} className="border-t">
                <td className="px-4 py-2 text-center">{emp.IdEmpleado}</td>
                <td className="px-4 py-2 text-center">{emp.Nom}</td>
                <td className="px-4 py-2 text-center">{emp.Departamento}</td>
                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/empleados/edit/${emp.IdEmpleado}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(emp.IdEmpleado)}
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
    </div>
  );
};

export default ListEmpleados;
