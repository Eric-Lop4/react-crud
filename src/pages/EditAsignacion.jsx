import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditAsignacion = () => {
  const [formData, setFormData] = useState({
    IdEmpleado: "",
    IdDispositivo: "",
    FechaAsignacion: "",
    Observaciones: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { idDispositivo, idEmpleado } = useParams();

  const fetchAsignacion = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/dispositivos-asignacion/${idDispositivo}/${idEmpleado}`);
      
      // Asegúrate de que la respuesta tenga el formato correcto
      if (!res.data) {
        throw new Error("No se recibieron datos");
      }
      
      // Formatea la fecha si es necesario
      const formattedData = {
        ...res.data,
        FechaAsignacion: res.data.FechaAsignacion?.split("T")[0] || ""
      };
      
      setFormData(formattedData);
    } catch (error) {
      console.error("Error al obtener asignación:", error);
      toast.error(`Error al cargar: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:3000/dispositivos-asignacion/${idDispositivo}/${idEmpleado}`,
        formData
      );
      toast.success("Asignación actualizada correctamente!");
      navigate("/asignaciones");
    } catch (error) {
      console.error("Error al editar asignación:", error);
      toast.error(`Error al actualizar: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsignacion();
  }, [idDispositivo, idEmpleado]);

  if (loading) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">Editar Asignación</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">ID Empleado</label>
          <input
            type="number"
            name="IdEmpleado"
            value={formData.IdEmpleado}
            onChange={handleChange}
            className="border p-2 w-full"
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">ID Dispositivo</label>
          <input
            type="number"
            name="IdDispositivo"
            value={formData.IdDispositivo}
            onChange={handleChange}
            className="border p-2 w-full"
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Fecha de Asignación</label>
          <input
            type="date"
            name="FechaAsignacion"
            value={formData.FechaAsignacion}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Observaciones</label>
          <input
            type="text"
            name="Observaciones"
            value={formData.Observaciones}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-yellow-600 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Actualizando..." : "Actualizar"}
        </button>
                <button
          type="button"
          onClick={() => navigate(-1)} // Regresa a la página anterior
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-5"
        >
          Regresar
        </button>
      </form>
    </div>
  );
};

export default EditAsignacion;