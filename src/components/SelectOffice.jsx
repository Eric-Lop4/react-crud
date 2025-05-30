import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectOffice = ({ value, onChange, disabled = false }) => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/Office");
        setOffices(res.data);
      } catch (error) {
        console.error("Error cargando licencias Office:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffices();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading || disabled}
      className="w-full p-2 border rounded"
    >
      <option value="">Seleccione licencia Office</option>
      {offices.map((office) => (
        <option key={office.IdOffice} value={office.IdOffice}>
          {office.Licencia}
        </option>
      ))}
    </select>
  );
};

export default SelectOffice;
