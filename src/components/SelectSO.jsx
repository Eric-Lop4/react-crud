import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectSO = ({ value, onChange, disabled = false }) => {
  const [sistemas, setSistemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSistemas = async () => {
      try {
        const res = await axios.get("http://localhost:3000/so");
        setSistemas(res.data);
      } catch (error) {
        console.error("Error cargando sistemas operativos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSistemas();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading || disabled}
      className="w-full p-2 border rounded"
    >
      <option value="">Seleccione SO</option>
      {sistemas.map((so) => (
        <option key={so.IdSO} value={so.IdSO}>
          {so.NomSO} ({so.Licencia})
        </option>
      ))}
    </select>
  );
};

export default SelectSO;
