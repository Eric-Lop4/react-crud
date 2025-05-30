import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectHardware = ({ value, onChange, disabled = false }) => {
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHardware = async () => {
      try {
        const res = await axios.get("http://localhost:3000/Hardware");
        setHardware(res.data);
      } catch (error) {
        console.error("Error cargando hardware:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHardware();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading || disabled}
      className="w-full p-2 border rounded"
    >
      <option value="">Seleccione hardware</option>
      {hardware.map((item) => (
        <option key={item.IdHardware} value={item.IdHardware}>
          {item.CPU} - {item.RAM} - {item.DisDur}
        </option>
      ))}
    </select>
  );
};

export default SelectHardware;
