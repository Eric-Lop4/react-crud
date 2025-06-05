import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditUbicacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departamento, setDepartamento] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUbicacion = async () => {
      try {
        // IMPORTANTE: Usar el mismo endpoint que en creación pero con el ID
        const res = await axios.get(`http://localhost:3000/Ubicacion/${id}`);

        // Debug: Verifica la estructura completa de la respuesta
        console.log("Respuesta del servidor:", res.data);

        // Asegúrate de acceder al campo correcto (puede variar según backend)
        const nombreDepartamento = res.data.Departamento || res.data.departamento;

        if (!nombreDepartamento) {
          throw new Error("El campo 'Departamento' no fue encontrado en la respuesta");
        }

        setDepartamento(nombreDepartamento);
        setError(null);
      } catch (error) {
        console.error("Error detallado:", error);
        setError("No se pudo cargar la ubicación. Verifica que exista.");
        toast.error(`Error al cargar: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUbicacion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departamento.trim()) {
      toast.error("Ingrese un nombre válido");
      return;
    }

    setLoading(true);
    try {
      // Usar el mismo endpoint base que en creación
      await axios.put(`http://localhost:3000/Ubicacion/${id}`, {
        Departamento: departamento,
      });
      toast.success("¡Ubicación actualizada!");
      navigate("/ubicaciones");
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error(`Error al actualizar: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 max-w-md">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Editar Departamento</h1>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate("/ubicaciones")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Editar Departamento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre del Departamento</label>
          <input
            type="text"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej: Recursos Humanos"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)} // Regresa a la página anterior
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-4"
        >
          Regresar
        </button>
      </form>
    </div>
  );
};

export default EditUbicacion;