import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectUbicacion = ({ value, onChange, disabled = false }) => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const res = await axios.get("http://localhost:3000/Ubicacion");
        setUbicaciones(res.data);
      } catch (error) {
        console.error("Error cargando ubicaciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUbicaciones();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading || disabled}
      className="w-full p-2 border rounded"
    >
      <option value="">Seleccione departamento</option>
      {ubicaciones.map((ubic) => (
        <option key={ubic.IdUbicacion} value={ubic.IdUbicacion}>
          {ubic.Departamento}
        </option>
      ))}
    </select>
  );
};

export default SelectUbicacion;