import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectDispositivo = ({ value, onChange, disabled = false }) => {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/tipos");
        setTipos(res.data);
      } catch (error) {
        console.error("Error cargando tipos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTipos();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading || disabled}
      className="w-full p-2 border rounded"
    >
      <option value="">Seleccione tipo de dispositivo</option>
      {tipos.map((tipo) => (
        <option key={tipo.IdTipoDisp} value={tipo.IdTipoDisp}>
          {tipo.ValorTipo}
        </option>
      ))}
    </select>
  );
};

export default SelectDispositivo;
