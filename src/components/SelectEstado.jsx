import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectEstado = ({ value, onChange, disabled = false }) => {
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const res = await axios.get("http://localhost:3000/estados");
        setEstados(res.data);
      } catch (error) {
        console.error("Error cargando estados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEstados();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading || disabled}
      className="w-full p-2 border rounded"
    >
      <option value="">Seleccione estado</option>
      {estados.map((estado) => (
        <option key={estado.IdEstado} value={estado.IdEstado}>
          {estado.ValorEstado}
        </option>
      ))}
    </select>
  );
};

export default SelectEstado;
