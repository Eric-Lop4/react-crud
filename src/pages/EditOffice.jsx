import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditOffice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [licencia, setLicencia] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOffice = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/Office/${id}`);
        setLicencia(res.data.Licencia);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error al cargar licencia");
      }
    };
    fetchOffice();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/Office/${id}`, {
        Licencia: licencia,
      });
      toast.success("Licencia actualizada!");
      navigate("/office");
    } catch (error) {
      toast.error("Error al actualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Editar Licencia Office</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre de la Licencia</label>
          <input
            type="text"
            value={licencia}
            onChange={(e) => setLicencia(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Actualizando..." : "Actualizar"}
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

export default EditOffice;
